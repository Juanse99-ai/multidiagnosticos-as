"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Real, locally-hosted brand logos (public/brands/*.png).
 * Ordered for visual rhythm — alternating wide wordmarks and compact marks.
 */
const brands = [
  { name: "Bosch", sub: "Autopartes", logo: "/brands/bosch.png" },
  { name: "Castrol", sub: "Lubricantes", logo: "/brands/castrol.png" },
  { name: "Mobil", sub: "Aceites", logo: "/brands/mobil.png" },
  { name: "Varta", sub: "Baterías", logo: "/brands/varta.png" },
  { name: "Denso", sub: "Bujías y filtros", logo: "/brands/denso.png" },
  { name: "Valvoline", sub: "Lubricantes", logo: "/brands/valvoline.png" },
  { name: "ACDelco", sub: "Repuestos", logo: "/brands/acdelco.png" },
  { name: "Shell", sub: "Aceites", logo: "/brands/shell.png" },
  { name: "MAHLE", sub: "Filtros", logo: "/brands/mahle.png" },
  { name: "WD-40", sub: "Mantenimiento", logo: "/brands/wd40.png" },
  { name: "Gates", sub: "Distribución", logo: "/brands/gates.png" },
];

export function BrandsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set([headRef.current, trackRef.current], { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to([headRef.current, trackRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        });
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 overflow-hidden bg-white border-t border-black/[0.05]"
    >
      {/* Section header — editorial line, no eyebrow */}
      <div ref={headRef} className="max-w-7xl mx-auto px-6 mb-12 md:mb-14">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-[1.05] tracking-tight max-w-2xl">
          Marcas que <span className="text-brand-blue">comercializamos.</span>
        </h2>
      </div>

      <div ref={trackRef} className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div
          className="flex gap-3 md:gap-4 items-stretch px-8 animate-brands-scroll"
          style={{ width: "max-content" }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              aria-hidden={i >= brands.length}
              className="group flex-none flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-white px-7 py-5 min-w-[180px] ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,18,33,0.04),0_8px_24px_-16px_rgba(11,18,33,0.18)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_2px_4px_rgba(11,18,33,0.05),0_18px_36px_-18px_rgba(37,99,235,0.32)]">
              <div className="h-11 w-[124px] flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={124}
                  height={44}
                  style={{ width: "auto", height: "auto" }}
                  className="max-h-11 w-auto object-contain opacity-95 transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:opacity-85 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
                />
              </div>
              <span className="text-[10px] text-brand-dark/45 uppercase tracking-[0.16em] font-semibold">
                {brand.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
