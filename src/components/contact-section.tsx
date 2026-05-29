"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = Array.from(gridRef.current?.children ?? []);
    gsap.set([headRef.current, ...cards], { opacity: 0, y: 16 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(headRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        });
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="py-24 md:py-32 bg-white border-t border-black/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header — editorial */}
        <div ref={headRef} className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Contacto
          </span>
          <h2 className="mt-4 font-display text-[2.75rem] md:text-6xl font-extrabold tracking-tight text-brand-dark leading-[0.98]">
            Estamos a un mensaje.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Asesoría técnica gratuita por WhatsApp. Atendemos repuestos,
            diagnósticos y agendamiento de citas.
          </p>
        </div>

        {/* Bento — flat, 1px borders */}
        <div ref={gridRef} className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Visit — featured */}
          <div className="md:col-span-3 rounded-xl border border-black/[0.08] bg-[#fbfbfa] p-8 md:p-10">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-[18px] h-[18px] text-brand-blue" strokeWidth={1.75} />
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-blue">
                Visítanos
              </span>
            </div>

            <h3 className="mt-6 font-display text-3xl md:text-4xl font-bold tracking-tight leading-[1.05] text-brand-dark">
              Cra. 27 #13-05
              <br />
              <span className="text-muted-foreground font-semibold">Sabanalarga · Atlántico</span>
            </h3>

            <div className="mt-8 space-y-3 text-[15px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-blue shrink-0" strokeWidth={1.75} />
                <span><strong className="text-brand-dark font-semibold">Lun – Vie</strong> · 08:00 – 17:30</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-blue shrink-0" strokeWidth={1.75} />
                <span><strong className="text-brand-dark font-semibold">Sábado</strong> · 08:30 – 16:00</span>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Multidiagnosticos+AS+Sabanalarga"
              target="_blank"
              rel="noopener"
              className="group mt-9 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#0a2f86] active:scale-[0.98]"
            >
              Cómo llegar
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
          </div>

          {/* Right stack */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Phone */}
            <a
              href="tel:+573003651525"
              className="group flex items-center gap-4 rounded-xl border border-black/[0.08] bg-white p-5 transition-[box-shadow,border-color] duration-200 hover:border-black/[0.14] hover:shadow-[0_2px_10px_rgba(0,32,96,0.05)]"
            >
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-brand-blue/[0.07] shrink-0">
                <Phone className="w-[18px] h-[18px] text-brand-blue" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">Llámanos</span>
                <span className="block text-[15px] font-semibold text-brand-dark truncate">(+57) 300 365 1525</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-black/30 transition-[color,transform] duration-200 group-hover:text-brand-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>

            {/* Email */}
            <a
              href="mailto:contacto@multidiagnosticosas.com"
              className="group flex items-center gap-4 rounded-xl border border-black/[0.08] bg-white p-5 transition-[box-shadow,border-color] duration-200 hover:border-black/[0.14] hover:shadow-[0_2px_10px_rgba(0,32,96,0.05)]"
            >
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-brand-blue/[0.07] shrink-0">
                <Mail className="w-[18px] h-[18px] text-brand-blue" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">Email</span>
                <span className="block text-[14px] font-semibold text-brand-dark truncate">contacto@multidiagnosticosas.com</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-black/30 transition-[color,transform] duration-200 group-hover:text-brand-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>

            {/* WhatsApp — the one accent block */}
            <a
              href="https://wa.me/573003651525?text=Hola,%20quisiera%20información"
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-4 rounded-xl bg-brand-blue p-5 transition-[transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99]"
            >
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-white/12 ring-1 ring-white/15 shrink-0">
                <MessageCircle className="w-[18px] h-[18px] text-white" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-white/65">WhatsApp</span>
                <span className="block text-[15px] font-semibold text-white">Chat con asesor</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
