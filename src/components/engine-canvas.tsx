"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { engineState } from "@/lib/engine-state";

type Vec3 = [number, number, number];

/* ── Per-part group: GSAP updates engineState.progress, useFrame reads it ── */
function Part({
  children,
  aPos,
  ePos,
  aRot = [0, 0, 0],
  eRot = [0, 0, 0],
}: {
  children: React.ReactNode;
  aPos: Vec3;
  ePos: Vec3;
  aRot?: Vec3;
  eRot?: Vec3;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const t = engineState.progress;
    ref.current.position.set(
      THREE.MathUtils.lerp(aPos[0], ePos[0], t),
      THREE.MathUtils.lerp(aPos[1], ePos[1], t),
      THREE.MathUtils.lerp(aPos[2], ePos[2], t)
    );
    ref.current.rotation.set(
      THREE.MathUtils.lerp(aRot[0], eRot[0], t),
      THREE.MathUtils.lerp(aRot[1], eRot[1], t),
      THREE.MathUtils.lerp(aRot[2], eRot[2], t)
    );
  });
  return <group ref={ref}>{children}</group>;
}

/* ── Materials ── */
function useMats() {
  return useMemo(() => ({
    alum: new THREE.MeshStandardMaterial({ color: "#c9c9c9", metalness: 0.85, roughness: 0.2 }),
    darkAlum: new THREE.MeshStandardMaterial({ color: "#505050", metalness: 0.78, roughness: 0.32 }),
    bore: new THREE.MeshStandardMaterial({ color: "#111111", metalness: 0.3, roughness: 0.85 }),
    gasket: new THREE.MeshStandardMaterial({ color: "#1c1c1c", metalness: 0.15, roughness: 0.95, side: THREE.DoubleSide }),
    steel: new THREE.MeshStandardMaterial({ color: "#9a9a9a", metalness: 0.95, roughness: 0.1 }),
  }), []);
}

/* ── Full engine scene ── */
function EngineScene() {
  const { alum, darkAlum, bore, gasket, steel } = useMats();
  const rootRef = useRef<THREE.Group>(null);

  // Slow idle rotation on the whole engine
  useFrame(({ clock }) => {
    if (!rootRef.current) return;
    rootRef.current.rotation.y =
      -0.38 + Math.sin(clock.getElapsedTime() * 0.18) * 0.07;
  });

  const boreX: number[] = [-0.9, -0.3, 0.3, 0.9];

  return (
    <group ref={rootRef} rotation={[0.15, 0, 0.03]}>

      {/* ════════════════ ENGINE BLOCK ════════════════ */}
      <Part aPos={[0, 0, 0]} ePos={[0, 0, 0]}>
        {/* Main casting */}
        <mesh material={alum} castShadow receiveShadow>
          <boxGeometry args={[2.4, 1.2, 1.9]} />
        </mesh>
        {/* Cylinder bore rings */}
        {boreX.map((x) => (
          <group key={x}>
            <mesh position={[x, 0.63, 0]} material={alum} castShadow>
              <cylinderGeometry args={[0.27, 0.27, 0.1, 36]} />
            </mesh>
            <mesh position={[x, 0.69, 0]} material={bore}>
              <cylinderGeometry args={[0.205, 0.205, 0.02, 36]} />
            </mesh>
          </group>
        ))}
        {/* Cooling fins — front */}
        {([-0.7, -0.23, 0.23, 0.7] as number[]).map((x) => (
          <mesh key={x} position={[x, 0, 1.06]} material={alum} castShadow>
            <boxGeometry args={[0.1, 1.0, 0.12]} />
          </mesh>
        ))}
        {/* Cooling fins — rear */}
        {([-0.7, -0.23, 0.23, 0.7] as number[]).map((x) => (
          <mesh key={x} position={[x, 0, -1.06]} material={alum} castShadow>
            <boxGeometry args={[0.1, 1.0, 0.12]} />
          </mesh>
        ))}
        {/* Bottom deck flange */}
        <mesh position={[0, -0.72, 0]} material={alum} castShadow>
          <boxGeometry args={[2.55, 0.1, 2.05]} />
        </mesh>
        {/* Mount bosses */}
        <mesh position={[1.35, 0.1, 0.55]} material={alum} castShadow>
          <boxGeometry args={[0.28, 0.28, 0.58]} />
        </mesh>
        <mesh position={[1.35, 0.1, -0.55]} material={alum} castShadow>
          <boxGeometry args={[0.28, 0.28, 0.58]} />
        </mesh>
      </Part>

      {/* ════════════════ HEAD GASKET ════════════════ */}
      <Part aPos={[0, 0.67, 0]} ePos={[0, 2.1, 0.3]}>
        <mesh material={gasket}>
          <boxGeometry args={[2.22, 0.04, 1.76]} />
        </mesh>
        {boreX.map((x) => (
          <mesh key={x} position={[x, 0.03, 0]} material={bore}>
            <cylinderGeometry args={[0.2, 0.2, 0.06, 36]} />
          </mesh>
        ))}
      </Part>

      {/* ════════════════ CYLINDER HEAD ════════════════ */}
      <Part aPos={[0, 0.99, 0]} ePos={[0.4, 4.4, 0.6]}>
        {/* Head body */}
        <mesh material={alum} castShadow receiveShadow>
          <boxGeometry args={[2.22, 0.52, 1.72]} />
        </mesh>
        {/* Cooling fins on sides */}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={i} position={[0, 0.29, -0.81 + i * 0.18]} material={alum} castShadow>
            <boxGeometry args={[2.1, 0.1, 0.04]} />
          </mesh>
        ))}
        {/* Combustion chamber recesses */}
        {boreX.map((x) => (
          <mesh key={x} position={[x, -0.27, 0]} material={darkAlum}>
            <cylinderGeometry args={[0.22, 0.22, 0.04, 36]} />
          </mesh>
        ))}
        {/* Cam journal caps */}
        {boreX.map((x) => (
          <mesh key={x} position={[x, 0.3, 0]} material={alum} castShadow>
            <boxGeometry args={[0.16, 0.16, 1.42]} />
          </mesh>
        ))}
        {/* Spark plug bosses */}
        {boreX.map((x) => (
          <mesh key={x} position={[x, 0.18, 0.45]} material={darkAlum}>
            <cylinderGeometry args={[0.048, 0.048, 0.38, 14]} />
          </mesh>
        ))}
      </Part>

      {/* ════════════════ VALVE COVER ════════════════ */}
      <Part aPos={[0, 1.38, 0]} ePos={[0.6, 7.2, 0.9]}>
        <mesh material={alum} castShadow>
          <boxGeometry args={[2.12, 0.24, 1.62]} />
        </mesh>
        {/* Longitudinal ribs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, 0.16, -0.56 + i * 0.28]} material={alum}>
            <boxGeometry args={[1.9, 0.1, 0.09]} />
          </mesh>
        ))}
        {/* Oil filler cap */}
        <mesh position={[-0.62, 0.22, 0]} material={darkAlum}>
          <cylinderGeometry args={[0.115, 0.115, 0.14, 20]} />
        </mesh>
        {/* PCV port */}
        <mesh position={[0.72, 0.22, -0.3]} material={steel}>
          <cylinderGeometry args={[0.048, 0.048, 0.24, 12]} />
        </mesh>
      </Part>

      {/* ════════════════ TIMING COVER ════════════════ */}
      <Part
        aPos={[1.33, 0.05, 0]}
        ePos={[5.8, 0.7, 1.4]}
        aRot={[0, 0, 0]}
        eRot={[0, 0.45, 0.28]}
      >
        {/* Main circular cover */}
        <mesh material={alum} castShadow rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.94, 0.94, 0.15, 52]} />
        </mesh>
        {/* Crankshaft nose hub */}
        <mesh position={[0.09, 0, 0]} material={steel} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.21, 0.21, 0.24, 24]} />
        </mesh>
        {/* Bolt pattern */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i}
              position={[0.09, Math.sin(a) * 0.72, Math.cos(a) * 0.72]}
              material={steel}
              rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[0.042, 0.042, 0.2, 12]} />
            </mesh>
          );
        })}
        {/* Lower cover tab */}
        <mesh position={[0, -0.62, 0]} material={alum} castShadow>
          <boxGeometry args={[0.13, 0.52, 0.78]} />
        </mesh>
      </Part>

      {/* ════════════════ OIL PAN ════════════════ */}
      <Part aPos={[0, -1.01, 0]} ePos={[0, -4.8, 0]}>
        <mesh material={alum} castShadow receiveShadow>
          <boxGeometry args={[2.42, 0.64, 1.96]} />
        </mesh>
        {/* Drain plug */}
        <mesh position={[0, -0.39, 0.56]} material={steel}>
          <cylinderGeometry args={[0.072, 0.072, 0.15, 16]} />
        </mesh>
        {/* Internal baffles hint */}
        {([-0.45, 0.0, 0.45] as number[]).map((z) => (
          <mesh key={z} position={[0, -0.08, z]} material={alum}>
            <boxGeometry args={[2.1, 0.07, 0.055]} />
          </mesh>
        ))}
      </Part>

      {/* ════════════════ FRONT TIMING PLATE ════════════════ */}
      <Part aPos={[0, 0, 1.06]} ePos={[0.9, 0.35, 5.2]}>
        <mesh material={alum} castShadow>
          <boxGeometry args={[2.22, 1.3, 0.14]} />
        </mesh>
        {/* Water pump boss */}
        <mesh position={[-0.56, 0.22, 0.13]} material={alum} castShadow>
          <cylinderGeometry args={[0.31, 0.31, 0.19, 26]} />
        </mesh>
        {/* Bolt holes */}
        {([[0.82, 0.46], [-0.82, 0.46], [0.82, -0.44], [-0.82, -0.44]] as [number,number][]).map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.12]} material={steel}>
            <cylinderGeometry args={[0.055, 0.055, 0.16, 12]} />
          </mesh>
        ))}
      </Part>

      {/* ════════════════ REAR FLYWHEEL PLATE ════════════════ */}
      <Part aPos={[0, 0, -1.06]} ePos={[-0.7, 0.35, -5.2]}>
        <mesh material={darkAlum} castShadow>
          <boxGeometry args={[2.22, 1.3, 0.1]} />
        </mesh>
        {/* Flywheel register ring */}
        <mesh position={[0, 0, -0.07]} material={darkAlum} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.56, 0.56, 0.07, 44]} />
        </mesh>
        <mesh position={[0, 0, -0.1]} material={bore} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.04, 44]} />
        </mesh>
      </Part>

    </group>
  );
}

/* ── Canvas export (loaded dynamically, no SSR) ── */
export default function EngineCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [5.2, 2.6, 6.8], fov: 36 }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.22} />
      <spotLight
        position={[9, 11, 9]}
        angle={0.22}
        penumbra={1}
        intensity={4.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight position={[-7, -4, -9]} angle={0.3} penumbra={1} intensity={1.4} />
      <pointLight position={[0, 7, 0]} intensity={0.7} color="#a8c4f8" />
      <Environment preset="studio" />
      <EngineScene />
    </Canvas>
  );
}
