"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Wrench, ShoppingBag, MessageCircle, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROMOS = [
  { icon: "🔍", label: "Diagnóstico Computarizado", price: "$35.000", old: "$60k", color: "#1d4ed8", bg: "#dbeafe" },
  { icon: "🛢️", label: "Aceite + Filtro Sintético",  price: "$75.000", old: "$110k", color: "#065f46", bg: "#d1fae5" },
  { icon: "✅", label: "Check-Up 30 puntos",          price: "$55.000", old: "$90k",  color: "#5b21b6", bg: "#ede9fe" },
  { icon: "🛑", label: "Revisión Frenos ABS",          price: "$45.000", old: "$75k",  color: "#9f1239", bg: "#ffe4e6" },
  { icon: "⚙️", label: "Kit de Distribución",          price: "Desde $280k", old: null, color: "#78350f", bg: "#fef3c7" },
  { icon: "📅", label: "Agendar cita ahora",           price: "Gratis →",    old: null, color: "#1e40af", bg: "#bfdbfe" },
];

function ScannerCard() {
  return (
    <div className="w-full h-full flex flex-col bg-[#e8eaf0] overflow-hidden select-none">
      {/* Status bar — LAUNCH style */}
      <div className="bg-[#2563eb] text-white px-3 py-1 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold tracking-wider opacity-90">X-431 PAD IX Max</span>
          <span className="text-[10px] text-white/50">V8.00.007</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="opacity-70">10:07</span>
          <span className="text-white/40">🔋</span>
          <span className="bg-white/20 px-2 py-0.5 rounded text-[9px] font-semibold">Login</span>
          <span className="bg-white/20 w-6 h-4 rounded-sm flex items-center justify-center text-[8px]">💬</span>
        </div>
      </div>

      {/* Promo grid — styled like LAUNCH app tiles */}
      <div className="flex-1 grid grid-cols-3 gap-1.5 p-2.5 overflow-hidden">
        {PROMOS.map((promo, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-1 rounded-lg p-2 cursor-pointer transition-[transform,filter] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)and(pointer:fine)]:hover:brightness-95"
            style={{ backgroundColor: promo.bg }}
          >
            <span className="text-xl md:text-2xl leading-none">{promo.icon}</span>
            <p
              className="text-[8px] md:text-[10px] font-bold text-center leading-tight"
              style={{ color: promo.color }}
            >
              {promo.label}
            </p>
            <p className="text-[9px] md:text-[11px] font-extrabold leading-none" style={{ color: promo.color }}>
              {promo.price}
            </p>
            {promo.old && (
              <p className="text-[7px] line-through opacity-40" style={{ color: promo.color }}>
                {promo.old}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Android navigation bar */}
      <div className="bg-[#111] shrink-0 flex items-center justify-center gap-8 py-1.5">
        <div className="w-4 h-4 rounded-full border border-white/30" />
        <div className="w-3.5 h-3.5 border border-white/30" />
        <div className="w-3.5 h-3.5 rounded-sm border border-white/30" />
      </div>
    </div>
  );
}

export function HeroSection() {
  const badgeRef    = useRef<HTMLSpanElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const els = [badgeRef.current, titleRef.current, subtitleRef.current, ctaRef.current];
    // Never animate from scale(0); start from a visible position
    gsap.set(els, { opacity: 0, y: 24 });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(badgeRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" })
      .to(titleRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, "-=0.55")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, "-=0.55")
      .to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, "-=0.55");
  });

  return (
    <section className="bg-brand-dark overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="space-y-8">
            {/* Eyebrow tag — microscopic uppercase pill */}
            <span
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/15 text-white/70 text-[10px] uppercase tracking-[0.25em] font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-light animate-pulse" />
              Sabanalarga · Atlántico · Colombia
            </span>

            {/* Massive headline */}
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white leading-[0.95] tracking-tight"
            >
              Tu vehículo
              <br />
              <span className="bg-gradient-to-r from-brand-blue-light via-white to-brand-blue-light bg-clip-text text-transparent">
                en manos expertas.
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-white/65 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
            >
              Diagnóstico computarizado, mantenimiento integral y autopartes
              originales — con asesoría personalizada por WhatsApp.
            </p>

            {/* Premium CTAs with nested icon circles */}
            <div ref={ctaRef} className="flex flex-wrap gap-3 justify-center pt-4">
              <Link
                href="/agendar"
                className="group/cta inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-white text-brand-dark text-sm font-semibold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/95 active:scale-[0.97]"
              >
                <Wrench className="w-4 h-4" strokeWidth={1.75} />
                Agendar servicio
                <span className="ml-1 w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:group-hover/cta:translate-x-0.5 [@media(hover:hover)and(pointer:fine)]:group-hover/cta:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
              </Link>

              <Link
                href="/autopartes"
                className="group/cta inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-white/10 ring-1 ring-white/20 text-white text-sm font-semibold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/15 active:scale-[0.97] backdrop-blur-sm"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
                Ver autopartes
                <span className="ml-1 w-8 h-8 rounded-full bg-white/15 text-white flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:group-hover/cta:translate-x-0.5 [@media(hover:hover)and(pointer:fine)]:group-hover/cta:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
              </Link>

              <a
                href="https://wa.me/573003651525?text=Hola,%20quisiera%20información"
                target="_blank"
                rel="noopener"
                className="group/cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white/80 text-sm font-medium transition-[color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white hover:bg-white/5"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                WhatsApp
              </a>
            </div>
          </div>
        }
      >
        <ScannerCard />
      </ContainerScroll>
    </section>
  );
}
