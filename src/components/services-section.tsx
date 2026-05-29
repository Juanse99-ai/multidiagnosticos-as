"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Wrench, Disc3, CarFront, Cpu, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Diagnóstico OBD-II",
    desc: "Scanner profesional y pruebas electrónicas para detectar fallas antes de que se vuelvan costosas.",
    icon: Cpu,
    img: "/services/diagnostico.jpg",
    featured: true,
  },
  {
    title: "Cambio de aceite",
    desc: "Incluye filtro y revisión multipunto.",
    icon: Wrench,
    img: "/services/cambio-aceite.jpg",
    featured: false,
  },
  {
    title: "Frenos",
    desc: "Pastillas, discos y líquido.",
    icon: Disc3,
    img: "/services/frenos.jpg",
    featured: false,
  },
  {
    title: "Suspensión",
    desc: "Amortiguadores y alineación.",
    icon: CarFront,
    img: "/services/suspension.jpg",
    featured: false,
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = Array.from(gridRef.current?.querySelectorAll("article") ?? []);
    const headerEls = [eyebrowRef.current, headingRef.current].filter(Boolean);

    gsap.set(headerEls, { opacity: 0, y: 24 });
    gsap.set(cards, { opacity: 0, y: 40, filter: "blur(8px)" });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(headerEls, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "expo.out",
        });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.06,
          ease: "expo.out",
          delay: 0.15,
        });
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-24 md:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="absolute top-1/4 -left-32 w-[480px] h-[480px] rounded-full bg-brand-blue/8 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -right-32 w-[420px] h-[420px] rounded-full bg-brand-blue-light/6 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <span
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 ring-1 ring-brand-blue/20 text-brand-blue text-[10px] uppercase tracking-[0.25em] font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            Servicios de Taller
          </span>
          <h2
            ref={headingRef}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold font-display text-brand-dark leading-[1.05] tracking-tight max-w-3xl mx-auto"
          >
            Mantenimiento integral,
            <br />
            <span className="text-brand-blue">sin sorpresas.</span>
          </h2>
        </div>

        {/* Bento grid: 1 featured (col-span-2) + 3 standard */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {services.map((svc) => {
            const isFeatured = svc.featured;
            const Icon = svc.icon;
            return (
              <article
                key={svc.title}
                className={[
                  // Double-bezel outer shell
                  "group relative rounded-[2rem] bg-white/40 backdrop-blur-sm ring-1 ring-black/[0.04] p-1.5 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_24px_48px_-12px_rgba(37,99,235,0.18)]",
                  isFeatured ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : "",
                ].join(" ")}
              >
                {/* Inner core */}
                <div className="relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                  {/* Image */}
                  <div
                    className={[
                      "relative overflow-hidden",
                      isFeatured ? "h-72 md:h-80 lg:h-96" : "h-44",
                    ].join(" ")}
                  >
                    <Image
                      src={svc.img}
                      alt={svc.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent" />

                    {/* Icon badge */}
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center ring-1 ring-white/20">
                        <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Arrow corner */}
                    <div className="absolute top-4 right-4">
                      <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center ring-1 ring-white/15 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-white [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5">
                        <ArrowUpRight
                          className="w-4 h-4 text-white transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-brand-dark"
                          strokeWidth={2}
                        />
                      </div>
                    </div>

                    {/* Featured label */}
                    {isFeatured && (
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-blue text-white text-[10px] uppercase tracking-[0.15em] font-bold">
                          <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                          Más solicitado
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={isFeatured ? "p-6 md:p-7" : "p-5"}>
                    <h3
                      className={[
                        "font-bold font-display tracking-tight text-brand-dark",
                        isFeatured ? "text-2xl md:text-3xl mb-2" : "text-lg mb-1",
                      ].join(" ")}
                    >
                      {svc.title}
                    </h3>
                    <p
                      className={[
                        "text-muted-foreground leading-relaxed",
                        isFeatured ? "text-base" : "text-sm",
                      ].join(" ")}
                    >
                      {svc.desc}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
