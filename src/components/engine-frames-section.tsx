"use client";

/**
 * EngineFramesSection
 * -------------------
 * Scroll-driven image-sequence player (same technique as Apple's product pages).
 *
 * HOW TO USE:
 * 1. Run:  ffmpeg -i your-video.mp4 -vf fps=24 -q:v 2 public/engine-frames/frame_%04d.jpg
 * 2. Update TOTAL_FRAMES below to match how many frames were generated.
 * 3. Replace <EngineSection /> with <EngineFramesSection /> in page.tsx.
 */

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// ← Update this after running ffmpeg
const TOTAL_FRAMES = 121;
const FRAME_PATH   = (n: number) =>
  `/engine-frames/frame_${String(n).padStart(4, "0")}.jpg`;

const PARTS = [
  { label: "Bloque Motor",      sub: "Base estructural del motor",       threshold: 0.0  },
  { label: "Junta de Culata",   sub: "Sello entre bloque y culata",      threshold: 0.18 },
  { label: "Culata",            sub: "Cámaras de combustión",            threshold: 0.3  },
  { label: "Tapa de Válvulas",  sub: "Protección del árbol de levas",    threshold: 0.44 },
  { label: "Tapa Distribución", sub: "Cubre cadena y engranajes",        threshold: 0.57 },
  { label: "Cárter",            sub: "Reservorio de aceite lubricante",  threshold: 0.7  },
  { label: "Tapas Frontales",   sub: "Cierres delantero y trasero",      threshold: 0.82 },
];

export function EngineFramesSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const barRef      = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const activeIdxRef = useRef(0);

  // Preload all frames into Image objects
  const framesRef = useRef<HTMLImageElement[]>([]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img    = framesRef.current[index];
    if (!canvas || !img?.complete) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Preload frames on mount
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        // Draw first frame as soon as it's ready
        if (i === 1) drawFrame(0);
        // Once all loaded, draw current frame again cleanly
        if (loaded === TOTAL_FRAMES) drawFrame(activeIdxRef.current);
      };
      images.push(img);
    }
    framesRef.current = images;
  }, [drawFrame]);

  useGSAP(() => {
    const state = { frame: 0, progress: 0 };

    gsap.to(state, {
      frame: TOTAL_FRAMES - 1,
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        onUpdate(self) {
          // Draw frame
          const idx = Math.round(state.frame);
          activeIdxRef.current = idx;
          drawFrame(idx);

          // Progress bar
          if (barRef.current) {
            barRef.current.style.width = `${self.progress * 100}%`;
          }

          // Active label
          let activeIdx = 0;
          for (let i = PARTS.length - 1; i >= 0; i--) {
            if (self.progress >= PARTS[i].threshold) { activeIdx = i; break; }
          }
          if (labelRef.current) labelRef.current.textContent = PARTS[activeIdx].label;
          if (subRef.current)   subRef.current.textContent   = PARTS[activeIdx].sub;
        },
      },
    });
  });

  return (
    <section className="border-t border-border">
      <div ref={sectionRef} className="relative" style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen bg-[#060c18] overflow-hidden">

          {/* Canvas — full bleed */}
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* Overlay gradient so UI is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060c18]/80 via-transparent to-[#060c18]/60 pointer-events-none" />

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 pt-10 text-center pointer-events-none">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue-light text-xs border border-brand-blue/20 mb-3">
              Ingeniería automotriz
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white leading-tight">
              Tu motor{" "}
              <span className="text-brand-blue-light">por dentro</span>
            </h2>
          </div>

          {/* Left: component list */}
          <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 z-10 space-y-3 pointer-events-none">
            {PARTS.map((part, i) => (
              <div key={part.label} className="flex items-start gap-3 opacity-40">
                <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0 bg-white/40" />
                <div>
                  <p className="text-sm font-semibold leading-tight text-white/50">{part.label}</p>
                  <p className="text-xs text-white/20">{part.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: active callout */}
          <div className="absolute right-6 md:right-14 bottom-24 z-10 pointer-events-none text-right">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Componente activo</p>
            <p ref={labelRef} className="text-white font-bold text-lg md:text-2xl font-display leading-tight">
              {PARTS[0].label}
            </p>
            <p ref={subRef} className="text-white/50 text-sm mt-1">{PARTS[0].sub}</p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                ref={barRef}
                className="h-full bg-brand-blue-light rounded-full"
                style={{ width: "0%", transition: "none" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
