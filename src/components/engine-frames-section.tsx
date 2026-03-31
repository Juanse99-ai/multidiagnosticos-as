"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef   = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const barRef       = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLParagraphElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const activeIdxRef = useRef(0);
  const framesRef    = useRef<HTMLImageElement[]>([]);

  // Draw a single frame with "cover" scaling — fills canvas, crops edges if needed
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img    = framesRef.current[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // "cover" math: scale so the image fills the canvas, cropping edges
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const dx = (cw - sw) / 2;
    const dy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, sw, sh);
  }, []);

  // Resize canvas to exactly match the viewport — avoids any CSS stretching
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(activeIdxRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        if (i === 1) drawFrame(0);
        if (loaded === TOTAL_FRAMES) drawFrame(activeIdxRef.current);
      };
      images.push(img);
    }
    framesRef.current = images;
  }, [drawFrame]);

  // GSAP scroll scrub
  useGSAP(() => {
    const state = { frame: 0 };

    gsap.to(state, {
      frame: TOTAL_FRAMES - 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate(self) {
          const idx = Math.round(state.frame);
          activeIdxRef.current = idx;
          drawFrame(idx);

          if (barRef.current) {
            barRef.current.style.width = `${self.progress * 100}%`;
          }

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

          {/* Canvas fills the viewport exactly */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ display: "block" }}
          />

          {/* Subtle gradient so text is readable over any frame */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

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
            {PARTS.map((part) => (
              <div key={part.label} className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0 bg-white/30" />
                <div>
                  <p className="text-sm font-semibold leading-tight text-white/60">{part.label}</p>
                  <p className="text-xs text-white/25">{part.sub}</p>
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
