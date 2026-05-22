"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = Array.from(gridRef.current?.children ?? []);
    const headerEls = [eyebrowRef.current, headingRef.current, subRef.current].filter(Boolean);

    gsap.set(headerEls, { opacity: 0, y: 24 });
    gsap.set(cards, { opacity: 0, y: 40, filter: "blur(8px)" });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 78%",
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
          stagger: 0.08,
          ease: "expo.out",
          delay: 0.2,
        });
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative py-24 md:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="absolute top-1/4 -right-32 w-[480px] h-[480px] rounded-full bg-brand-blue/8 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-brand-blue-light/6 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
          <span
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 ring-1 ring-brand-blue/20 text-brand-blue text-[10px] uppercase tracking-[0.25em] font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            Contacto
          </span>
          <h2
            ref={headingRef}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold font-display text-brand-dark leading-[1.05] tracking-tight"
          >
            Estamos
            <br />
            <span className="text-brand-blue">a un mensaje.</span>
          </h2>
          <p ref={subRef} className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Asesoría técnica gratuita por WhatsApp. Atendemos repuestos,
            diagnósticos y agendamiento de citas.
          </p>
        </div>

        {/* Bento grid: 1 featured (visit) + stacked contact */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Visit card - featured */}
          <div className="md:col-span-3 rounded-[2rem] bg-white/40 backdrop-blur-sm ring-1 ring-black/[0.04] p-1.5 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)and(pointer:fine)]:hover:shadow-[0_24px_48px_-12px_rgba(37,99,235,0.18)]">
            <div className="relative h-full rounded-[calc(2rem-0.375rem)] bg-white p-8 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 ring-1 ring-brand-blue/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-blue" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-blue">
                  Visítanos
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight leading-tight mb-3 text-brand-dark">
                Cra. 27 #13-05
                <br />
                <span className="text-muted-foreground">Sabanalarga · Atlántico</span>
              </h3>

              <div className="mt-8 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-brand-blue shrink-0" strokeWidth={1.5} />
                  <span>
                    <strong className="text-brand-dark">Lun – Vie</strong> · 08:00 AM – 05:30 PM
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-brand-blue shrink-0" strokeWidth={1.5} />
                  <span>
                    <strong className="text-brand-dark">Sábado</strong> · 08:30 AM – 04:00 PM
                  </span>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Multidiagnosticos+AS+Sabanalarga"
                target="_blank"
                rel="noopener"
                className="group/cta mt-8 inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-brand-blue text-white text-sm font-semibold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-brand-blue/90 active:scale-[0.97]"
              >
                Cómo llegar
                <span className="ml-1 w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:group-hover/cta:translate-x-0.5 [@media(hover:hover)and(pointer:fine)]:group-hover/cta:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
              </a>
            </div>
          </div>

          {/* Phone + Email + WhatsApp stack */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Phone */}
            <a
              href="tel:+573003651525"
              className="group rounded-[1.5rem] bg-white/40 backdrop-blur-sm ring-1 ring-black/[0.04] p-1 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)and(pointer:fine)]:hover:shadow-[0_16px_32px_-12px_rgba(37,99,235,0.15)]"
            >
              <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 ring-1 ring-brand-blue/20 flex items-center justify-center shrink-0">
                  <Phone className="w-[18px] h-[18px] text-brand-blue" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-blue mb-0.5">
                    Llámanos
                  </p>
                  <p className="text-base font-semibold text-brand-dark truncate">
                    (+57) 300 365 1525
                  </p>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-muted-foreground transition-[color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:group-hover:text-brand-blue [@media(hover:hover)and(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)and(pointer:fine)]:group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:contacto@multidiagnosticosas.com"
              className="group rounded-[1.5rem] bg-white/40 backdrop-blur-sm ring-1 ring-black/[0.04] p-1 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)and(pointer:fine)]:hover:shadow-[0_16px_32px_-12px_rgba(37,99,235,0.15)]"
            >
              <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 ring-1 ring-brand-blue/20 flex items-center justify-center shrink-0">
                  <Mail className="w-[18px] h-[18px] text-brand-blue" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-blue mb-0.5">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-brand-dark truncate">
                    contacto@multidiagnosticosas.com
                  </p>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-muted-foreground transition-[color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:group-hover:text-brand-blue [@media(hover:hover)and(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)and(pointer:fine)]:group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </div>
            </a>

            {/* WhatsApp - primary CTA */}
            <a
              href="https://wa.me/573003651525?text=Hola,%20quisiera%20información"
              target="_blank"
              rel="noopener"
              className="group rounded-[1.5rem] bg-gradient-to-br from-brand-blue to-brand-blue-light p-1 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)and(pointer:fine)]:hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.5)]"
            >
              <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-br from-brand-blue to-brand-blue-light/95 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/15 ring-1 ring-white/25 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-[18px] h-[18px] text-white" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white/80 mb-0.5">
                    WhatsApp
                  </p>
                  <p className="text-base font-semibold text-white">
                    Chat con asesor →
                  </p>
                </div>
                <ArrowUpRight
                  className="w-5 h-5 text-white transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:group-hover:translate-x-1 [@media(hover:hover)and(pointer:fine)]:group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
