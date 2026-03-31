"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { engineState } from "@/lib/engine-state";

gsap.registerPlugin(ScrollTrigger);

const EngineCanvas = dynamic(() => import("./engine-canvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#060c18]" />,
});

const PARTS = [
  { label: "Bloque Motor",       sub: "Base estructural del motor",        threshold: 0.0 },
  { label: "Junta de Culata",    sub: "Sello entre bloque y culata",       threshold: 0.18 },
  { label: "Culata",             sub: "Cámaras de combustión y válvulas",  threshold: 0.3 },
  { label: "Tapa de Válvulas",   sub: "Protección del árbol de levas",     threshold: 0.44 },
  { label: "Tapa Distribución",  sub: "Cubre cadena y engranajes",         threshold: 0.57 },
  { label: "Cárter",             sub: "Reservorio de aceite lubricante",   threshold: 0.7 },
  { label: "Tapas Frontales",    sub: "Cierres delantero y trasero",       threshold: 0.82 },
];

export function EngineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef       = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(() => {
    gsap.to(engineState, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        onUpdate(self) {
          // progress bar
          if (barRef.current) {
            barRef.current.style.width = `${self.progress * 100}%`;
          }
          // active label
          let idx = 0;
          for (let i = PARTS.length - 1; i >= 0; i--) {
            if (self.progress >= PARTS[i].threshold) { idx = i; break; }
          }
          setActiveIdx(idx);
        },
      },
    });
  });

  return (
    <section className="border-t border-border">
      {/* Scroll container — gives scroll distance to the sticky canvas */}
      <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen bg-[#060c18] overflow-hidden">

          {/* ── 3D canvas ── */}
          <EngineCanvas />

          {/* ── Header ── */}
          <div className="absolute top-0 left-0 right-0 z-10 pt-10 text-center pointer-events-none">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue-light text-xs border border-brand-blue/20 mb-3">
              Ingeniería automotriz
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white leading-tight">
              Tu motor{" "}
              <span className="text-brand-blue-light">por dentro</span>
            </h2>
          </div>

          {/* ── Left: component list ── */}
          <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 z-10 space-y-3 pointer-events-none">
            {PARTS.map((part, i) => (
              <div
                key={part.label}
                className={`flex items-start gap-3 transition-all duration-500 ${
                  i <= activeIdx ? "opacity-100" : "opacity-25"
                }`}
              >
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300 ${
                  i === activeIdx ? "bg-brand-blue-light scale-125" : "bg-white/40"
                }`} />
                <div>
                  <p className={`text-sm font-semibold leading-tight transition-colors duration-300 ${
                    i === activeIdx ? "text-white" : "text-white/50"
                  }`}>
                    {part.label}
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${
                    i === activeIdx ? "text-white/60" : "text-white/20"
                  }`}>
                    {part.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: active part callout ── */}
          <div className="absolute right-6 md:right-14 bottom-24 z-10 pointer-events-none text-right">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Componente activo</p>
            <p className="text-white font-bold text-lg md:text-2xl font-display leading-tight">
              {PARTS[activeIdx].label}
            </p>
            <p className="text-white/50 text-sm mt-1">{PARTS[activeIdx].sub}</p>
          </div>

          {/* ── Bottom: progress bar ── */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                ref={barRef}
                className="h-full bg-brand-blue-light rounded-full"
                style={{ width: "0%", transition: "none" }}
              />
            </div>
            <p className="text-white/25 text-xs">
              {Math.round(
                (PARTS.findIndex((_, i) => i === activeIdx) / (PARTS.length - 1)) * 100
              )}% explorado
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
