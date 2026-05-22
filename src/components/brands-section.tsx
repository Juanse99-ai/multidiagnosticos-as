"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  {
    name: "Bosch",
    sub: "Autopartes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Robert_Bosch_GmbH_logo.svg/320px-Robert_Bosch_GmbH_logo.svg.png",
  },
  {
    name: "Tudor",
    sub: "Baterías",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Tudor_batteries_logo.svg/320px-Tudor_batteries_logo.svg.png",
  },
  {
    name: "NGK",
    sub: "Bujías",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/NGK_logo.svg/320px-NGK_logo.svg.png",
  },
  {
    name: "Castrol",
    sub: "Lubricantes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Castrol_logo.svg/320px-Castrol_logo.svg.png",
  },
  {
    name: "Mobil 1",
    sub: "Aceites",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Mobil_logo.svg/320px-Mobil_logo.svg.png",
  },
  {
    name: "ACDelco",
    sub: "Repuestos",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/ACDelco-logo.svg/320px-ACDelco-logo.svg.png",
  },
  {
    name: "Monroe",
    sub: "Suspensión",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Monroe_logo.svg/320px-Monroe_logo.svg.png",
  },
  {
    name: "Varta",
    sub: "Baterías",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Varta-logo.svg/320px-Varta-logo.svg.png",
  },
  {
    name: "WD-40",
    sub: "Mantenimiento",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/WD-40_logo.svg/320px-WD-40_logo.svg.png",
  },
  {
    name: "Denso",
    sub: "Filtros",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Denso-Logo.svg/320px-Denso-Logo.svg.png",
  },
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
    <section
      ref={sectionRef}
      className="relative py-10 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white border-t border-black/[0.04]"
    >
      <p className="text-center text-brand-dark/40 text-[10px] tracking-[0.3em] uppercase mb-6 font-semibold">
        Marcas que comercializamos
      </p>
      <div className="overflow-hidden relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-4 items-stretch py-3 px-8 animate-brands-scroll"
          style={{ width: "max-content" }}
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex-none flex flex-col items-center justify-center gap-2 bg-white rounded-2xl px-6 py-4 min-w-[140px] ring-1 ring-black/[0.04] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]"
              aria-hidden={i >= brands.length}
            >
              <div className="h-9 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="max-h-9 max-w-[110px] object-contain grayscale opacity-70 transition-[filter,opacity] duration-300 hover:grayscale-0 hover:opacity-100"
                />
              </div>
              <span className="text-[9px] text-brand-dark/45 uppercase tracking-[0.18em] font-semibold">
                {brand.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
