"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROMOS = [
  {
    tag: "Oferta del mes",
    title: "Diagnóstico\nComputarizado",
    desc: "Escaneo completo con equipo de última tecnología. Detectamos fallas antes de que sean un problema mayor.",
    price: "$35.000",
    old: "$60.000",
    color: "from-brand-blue to-blue-900",
    accent: "#60a5fa",
    icon: "🔍",
  },
  {
    tag: "Kit completo",
    title: "Cambio de\nAceite + Filtro",
    desc: "Aceite sintético 5W-30 + filtro de primera calidad incluido. Hasta 10.000 km de protección garantizada.",
    price: "$75.000",
    old: "$110.000",
    color: "from-emerald-900 to-emerald-700",
    accent: "#34d399",
    icon: "🛢️",
  },
  {
    tag: "Revisión técnica",
    title: "Check-Up\nCompleto",
    desc: "30 puntos de inspección: frenos, suspensión, dirección, luces, motor y más. Informe detallado incluido.",
    price: "$55.000",
    old: "$90.000",
    color: "from-violet-900 to-violet-700",
    accent: "#a78bfa",
    icon: "✅",
  },
  {
    tag: "Seguridad vial",
    title: "Revisión\nFreno ABS",
    desc: "Diagnóstico del sistema ABS + pastillas + discos. Conducción segura garantizada en todo momento.",
    price: "$45.000",
    old: "$75.000",
    color: "from-rose-900 to-rose-700",
    accent: "#fb7185",
    icon: "🛑",
  },
  {
    tag: "Preventivo",
    title: "Kit de\nDistribución",
    desc: "Correa o cadena de distribución, tensor y bomba de agua. Evita daños catastróficos al motor.",
    price: "Desde $280.000",
    old: null,
    color: "from-amber-900 to-amber-700",
    accent: "#fbbf24",
    icon: "⚙️",
  },
];

export function PromotionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

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
          <div
            key={i}
            className={`shrink-0 w-[320px] md:w-[380px] h-[440px] rounded-3xl bg-gradient-to-br ${p.color} p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl`}
          >
            {/* Glow */}
            <div
              className="absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ backgroundColor: p.accent }}
            />

            {/* Top */}
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{
                  backgroundColor: `${p.accent}22`,
                  color: p.accent,
                  border: `1px solid ${p.accent}44`,
                }}
              >
                {p.tag}
              </span>
              <div className="text-5xl mb-4">{p.icon}</div>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-white leading-tight whitespace-pre-line">
                {p.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>

            {/* Bottom */}
            <div className="flex items-end justify-between pt-6 border-t border-white/10">
              <div>
                <p className="text-white font-bold text-2xl leading-none">{p.price}</p>
                {p.old && (
                  <p className="text-white/30 text-sm line-through mt-1">{p.old}</p>
                )}
              </div>
              <a
                href="#reservar"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ backgroundColor: p.accent, color: "#080f1e" }}
              >
                Reservar
              </a>
            </div>
          </div>
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
