"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROMOS = [
  {
    tag: "Oferta del mes",
    title: "Diagnóstico\nComputarizado",
    desc: "Escaneo completo con equipo de última tecnología. Detectamos fallas antes de que sean un problema mayor.",
    color: "from-brand-blue to-blue-900",
    accent: "#60a5fa",
    icon: "🔍",
    fallbackImg:
      "https://images.unsplash.com/photo-1632823471565-1ecdf5c6da77?w=800&q=80&auto=format&fit=crop",
    waMsg: "Hola, quisiera información sobre el Diagnóstico Computarizado",
  },
  {
    tag: "Kit completo",
    title: "Cambio de\nAceite + Filtro",
    desc: "Aceite sintético 5W-30 + filtro de primera calidad incluido. Hasta 10.000 km de protección garantizada.",
    color: "from-emerald-900 to-emerald-700",
    accent: "#34d399",
    icon: "🛢️",
    fallbackImg:
      "https://images.unsplash.com/photo-1635770310629-3257a93b2c9d?w=800&q=80&auto=format&fit=crop",
    waMsg: "Hola, quisiera información sobre el Cambio de Aceite + Filtro",
  },
  {
    tag: "Revisión técnica",
    title: "Check-Up\nCompleto",
    desc: "30 puntos de inspección: frenos, suspensión, dirección, luces, motor y más. Informe detallado incluido.",
    color: "from-violet-900 to-violet-700",
    accent: "#a78bfa",
    icon: "✅",
    fallbackImg:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80&auto=format&fit=crop",
    waMsg: "Hola, quisiera información sobre el Check-Up Completo",
  },
  {
    tag: "Seguridad vial",
    title: "Revisión\nFreno ABS",
    desc: "Diagnóstico del sistema ABS + pastillas + discos. Conducción segura garantizada en todo momento.",
    color: "from-rose-900 to-rose-700",
    accent: "#fb7185",
    icon: "🛑",
    fallbackImg:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&q=80&auto=format&fit=crop",
    waMsg: "Hola, quisiera información sobre la Revisión de Frenos ABS",
  },
  {
    tag: "Preventivo",
    title: "Kit de\nDistribución",
    desc: "Correa o cadena de distribución, tensor y bomba de agua. Evita daños catastróficos al motor.",
    color: "from-amber-900 to-amber-700",
    accent: "#fbbf24",
    icon: "⚙️",
    fallbackImg:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80&auto=format&fit=crop",
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
    <div
      className={`shrink-0 w-[320px] md:w-[380px] h-[480px] rounded-3xl bg-gradient-to-br ${p.color} flex flex-col justify-between relative overflow-hidden shadow-2xl`}
    >
      {/* Glow */}
      <div
        className="absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: p.accent }}
      />

      {/* Image */}
      <div className="relative w-full h-44 shrink-0 overflow-hidden">
        <img
          src={resolvedImg}
          alt={p.title.replace("\n", " ")}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* gradient overlay so text below is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <span
          className="absolute bottom-3 left-4 inline-block px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${p.accent}22`,
            color: p.accent,
            border: `1px solid ${p.accent}44`,
          }}
        >
          {p.tag}
        </span>
      </div>

      {/* Text body */}
      <div className="flex flex-col flex-1 justify-between p-8 pt-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold font-display text-white leading-tight whitespace-pre-line mb-3">
            {p.title}
          </h3>
          <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
        </div>

        {/* Bottom — CTA only, no prices */}
        <div className="pt-6 border-t border-white/10 mt-4">
          <a
            href={`https://wa.me/573003651525?text=${encodeURIComponent(p.waMsg)}`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: p.accent, color: "#080f1e" }}
          >
            Consultar por WhatsApp
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function PromotionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<Record<string, string>>({});

  // Load manifest once on mount
  useEffect(() => {
    fetch("/promotions/manifest.json")
      .then((r) => r.json())
      .then((data: Record<string, string>) => setImages(data))
      .catch(() => {});
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

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

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#09101f]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-10 text-center pointer-events-none">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-white/60 text-xs border border-white/10 mb-3">
          Promociones exclusivas
        </span>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white leading-tight">
          Ofertas que{" "}
          <span className="text-brand-blue-light">no puedes perder</span>
        </h2>
        <p className="text-white/30 mt-3 text-xs tracking-widest uppercase">
          Scroll para ver todas las promociones →
        </p>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-center h-full will-change-transform"
        style={{ width: "max-content", paddingLeft: "12vw", paddingRight: "12vw", gap: "2rem" }}
      >
        {PROMOS.map((p, i) => (
          <PromoCard key={i} p={p} i={i} imgSrc={images[String(i)] ?? null} />
        ))}
      </div>

      {/* Scroll hint — progress bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-blue-light rounded-full"
            style={{ width: "20%" }}
          />
        </div>
      </div>
    </section>
  );
}
