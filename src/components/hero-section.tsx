"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { Wrench, ShoppingBag, MessageCircle } from "lucide-react";

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
            className="flex flex-col items-center justify-center gap-1 rounded-lg p-2 cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-95"
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
    gsap.set(els, { opacity: 0, y: 60 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(badgeRef.current,    { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .to(titleRef.current,    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.65")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.65")
      .to(ctaRef.current,      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.65");
  });

  return (
    <section className="bg-brand-dark overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="space-y-6">
            <span
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm"
            >
              Multidiagnósticos AS · Sabanalarga, Colombia
            </span>
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-tight"
            >
              Tu vehículo en{" "}
              <span className="text-brand-blue-light">manos expertas</span>
            </h1>
            <p
              ref={subtitleRef}
              className="text-white/70 text-lg max-w-2xl mx-auto"
            >
              Revisión, cambio de aceite, frenos, suspensión y más. Repuestos
              originales con asesoría personalizada por WhatsApp.
            </p>
            <div ref={ctaRef} className="flex flex-wrap gap-3 justify-center pt-2">
              <Link href="/agendar" className={cn(buttonVariants({ size: "lg" }))}>
                <Wrench className="w-4 h-4 mr-2" />
                Agendar servicio
              </Link>
              <Link
                href="/autopartes"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
                )}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Ver autopartes
              </Link>
              <a
                href="https://wa.me/573003651525?text=Hola,%20quisiera%20información"
                target="_blank"
                rel="noopener"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
                )}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
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
