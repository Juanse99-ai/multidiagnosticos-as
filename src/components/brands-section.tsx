"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { text: "BOSCH",    color: "#d40000", sub: "Autopartes" },
  { text: "TUDOR",    color: "#003366", sub: "Baterías" },
  { text: "NGK",      color: "#cc0000", sub: "Bujías" },
  { text: "Castrol",  color: "#007a33", sub: "Lubricantes" },
  { text: "Mobil 1",  color: "#e60000", sub: "Aceites" },
  { text: "AC·Delco", color: "#003087", sub: "Repuestos" },
  { text: "Monroe",   color: "#ff6000", sub: "Suspensión" },
  { text: "Varta",    color: "#0033a0", sub: "Baterías" },
  { text: "WD-40",    color: "#005ca9", sub: "Mantenimiento" },
  { text: "Denso",    color: "#c0392b", sub: "Filtros" },
];

export function BrandsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = Array.from(trackRef.current?.children ?? []);
    if (!items.length) return;

    gsap.set(items, { opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        });
      },
    });
  });

  return (
    <section ref={sectionRef} className="bg-brand-dark py-5 overflow-hidden border-t border-white/5">
      <p className="text-center text-white/25 text-[10px] tracking-[0.3em] uppercase mb-4">
        Marcas que comercializamos
      </p>
      <div className="overflow-hidden relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-5 items-center py-3 px-8 animate-brands-scroll"
          style={{ width: "max-content" }}
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex-none flex flex-col items-center justify-center gap-0.5 bg-white rounded-xl px-5 py-3 min-w-[100px] shadow-sm"
              aria-hidden={i >= brands.length}
            >
              <span
                className="font-black text-sm md:text-base tracking-tight leading-none"
                style={{ color: brand.color }}
              >
                {brand.text}
              </span>
              <span className="text-[9px] text-gray-400 uppercase tracking-wider">
                {brand.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
