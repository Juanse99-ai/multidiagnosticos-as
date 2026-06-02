"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROMOS = [
  {
    n: "01",
    tag: "Oferta del mes",
    title: "Diagnóstico\nComputarizado",
    desc: "Escaneo completo con equipo LAUNCH X-431. Detectamos fallas antes de que sean un problema mayor.",
    fallbackImg: "/services/diagnostico.jpg",
    waMsg: "Hola, quisiera información sobre el Diagnóstico Computarizado",
  },
  {
    n: "02",
    tag: "Kit completo",
    title: "Cambio de\nAceite + Filtro",
    desc: "Aceite sintético 5W-30 + filtro de primera calidad. Hasta 10.000 km de protección garantizada.",
    fallbackImg: "/services/cambio-aceite.jpg",
    waMsg: "Hola, quisiera información sobre el Cambio de Aceite + Filtro",
  },
  {
    n: "03",
    tag: "Revisión técnica",
    title: "Check-Up\nCompleto",
    desc: "30 puntos de inspección: frenos, suspensión, dirección, luces, motor y más. Informe detallado incluido.",
    fallbackImg: "/services/suspension.jpg",
    waMsg: "Hola, quisiera información sobre el Check-Up Completo",
  },
  {
    n: "04",
    tag: "Seguridad vial",
    title: "Revisión\nFreno ABS",
    desc: "Diagnóstico del sistema ABS, pastillas y discos. Conducción segura garantizada en todo momento.",
    fallbackImg: "/services/frenos.jpg",
    waMsg: "Hola, quisiera información sobre la Revisión de Frenos ABS",
  },
  {
    n: "05",
    tag: "Preventivo",
    title: "Kit de\nDistribución",
    desc: "Correa o cadena de distribución, tensor y bomba de agua. Evita daños catastróficos al motor.",
    fallbackImg: "/services/cambio-aceite.jpg",
    waMsg: "Hola, quisiera información sobre el Kit de Distribución",
  },
];

function PromoCard({
  p,
  imgSrc,
}: {
  p: (typeof PROMOS)[0];
  imgSrc: string | null;
}) {
  const resolvedImg = imgSrc ?? p.fallbackImg;
  return (
    <article className="shrink-0 w-[88vw] sm:w-[420px] md:w-[440px] h-[520px] md:h-[560px] rounded-3xl bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-sm flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-56 md:h-64 shrink-0 overflow-hidden">
        <img
          src={resolvedImg}
          alt={p.title.replace("\n", " ")}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />

        {/* Number badge — editorial */}
        <span className="absolute top-5 left-6 font-display text-5xl md:text-6xl font-black text-white/85 leading-none tracking-tight">
          {p.n}
        </span>

        {/* Tag */}
        <span className="absolute bottom-4 left-6 inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-blue-light">
          {p.tag}
        </span>
      </div>

      {/* Text body */}
      <div className="flex flex-col flex-1 justify-between p-6 md:p-8">
        <div>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-white leading-[1.05] tracking-tight whitespace-pre-line mb-4">
            {p.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/573003651525?text=${encodeURIComponent(p.waMsg)}`}
          target="_blank"
          rel="noopener"
          className="group/cta mt-6 inline-flex items-center justify-between gap-2 rounded-full bg-white text-brand-dark px-5 py-3 text-sm font-semibold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/95 active:scale-[0.98]"
        >
          Consultar por WhatsApp
          <span className="w-7 h-7 rounded-full bg-brand-dark text-white flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/cta:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/cta:-translate-y-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </span>
        </a>
      </div>
    </article>
  );
}

export function PromotionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/promotions/manifest.json")
      .then((r) => r.json())
      .then((data: Record<string, string>) => setImages(data))
      .catch(() => {});
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const head = headRef.current;
    if (!section || !track) return;

    // Header reveal on enter
    if (head) {
      gsap.set(head.children, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        once: true,
        onEnter: () =>
          gsap.to(head.children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.out",
          }),
      });
    }

    // Desktop only: horizontal pin-scroll
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const getTotal = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -getTotal(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getTotal()}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand-dark overflow-hidden md:h-screen"
    >
      {/* Header — editorial, in-flow */}
      <div
        ref={headRef}
        className="relative z-20 max-w-7xl mx-auto px-6 pt-20 md:pt-24 pb-10 md:pb-12 md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2"
      >
        <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue-light">
          Promociones
        </span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.02] tracking-tight max-w-3xl">
          Servicios estrella,
          <br />
          <span className="text-brand-blue-light">a un mensaje.</span>
        </h2>
      </div>

      {/* Horizontal track on desktop, vertical column on mobile */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-center md:h-full md:will-change-transform md:[width:max-content] px-6 md:pl-[14vw] md:pr-[14vw] pb-24 md:pb-0 md:pt-48"
      >
        {PROMOS.map((p, i) => (
          <PromoCard key={i} p={p} imgSrc={images[String(i)] ?? null} />
        ))}
      </div>
    </section>
  );
}
