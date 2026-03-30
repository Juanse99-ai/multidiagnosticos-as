"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import {
  Wrench,
  ShoppingBag,
  MessageCircle,
  Activity,
  Gauge,
  Thermometer,
  Battery,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function OBDCard() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-brand-dark to-[#1a2744] text-white p-6 md:p-10 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center">
          <Activity className="w-5 h-5 text-brand-blue-light" />
        </div>
        <div>
          <p className="text-xs text-white/60 uppercase tracking-wider">
            Diagnóstico en vivo
          </p>
          <p className="font-bold font-display text-lg">Scanner OBD-II</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          {
            icon: Gauge,
            label: "RPM",
            value: "850",
            unit: "rpm",
            color: "text-green-400",
          },
          {
            icon: Thermometer,
            label: "Temperatura",
            value: "92",
            unit: "°C",
            color: "text-yellow-400",
          },
          {
            icon: Battery,
            label: "Voltaje",
            value: "14.2",
            unit: "V",
            color: "text-blue-400",
          },
          {
            icon: Zap,
            label: "Estado",
            value: "OK",
            unit: "",
            color: "text-green-400",
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="bg-white/5 rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className="w-4 h-4 text-white/50" />
              <span className="text-xs text-white/50">{metric.label}</span>
            </div>
            <p className={`text-2xl font-bold ${metric.color}`}>
              {metric.value}
              <span className="text-sm font-normal text-white/40 ml-1">
                {metric.unit}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <p className="text-green-400 text-sm font-medium">
          ✓ Sin códigos de falla activos
        </p>
      </div>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "transform" }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "transform" },
        "-=0.45"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "transform" },
        "-=0.45"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "transform" },
        "-=0.45"
      );
  });

  return (
    <section ref={sectionRef} className="bg-brand-dark overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="space-y-6">
            <span
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm"
              style={{ opacity: 0 }}
            >
              Taller en Sabanalarga · Diagnóstico computarizado
            </span>
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-tight"
              style={{ opacity: 0 }}
            >
              Tu vehículo en{" "}
              <span className="text-brand-blue-light">manos expertas</span>
            </h1>
            <p
              ref={subtitleRef}
              className="text-white/70 text-lg max-w-2xl mx-auto"
              style={{ opacity: 0 }}
            >
              Revisión, cambio de aceite, frenos, suspensión y más. Repuestos
              originales con asesoría personalizada por WhatsApp.
            </p>
            <div
              ref={ctaRef}
              className="flex flex-wrap gap-3 justify-center pt-2"
              style={{ opacity: 0 }}
            >
              <Link href="#agenda" className={cn(buttonVariants({ size: "lg" }))}>
                <Wrench className="w-4 h-4 mr-2" />
                Agendar servicio
              </Link>
              <Link
                href="#catalogo"
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
        <OBDCard />
      </ContainerScroll>
    </section>
  );
}
