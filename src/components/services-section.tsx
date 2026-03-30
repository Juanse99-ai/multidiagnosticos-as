"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Wrench, Disc3, CarFront, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Cambio de aceite",
    desc: "Incluye filtro y revisión multipunto.",
    icon: Wrench,
    img: "/services/cambio-aceite.jpg",
  },
  {
    title: "Frenos",
    desc: "Pastillas, discos y líquido.",
    icon: Disc3,
    img: "/services/frenos.jpg",
  },
  {
    title: "Suspensión",
    desc: "Amortiguadores y alineación.",
    icon: CarFront,
    img: "/services/suspension.jpg",
  },
  {
    title: "Diagnóstico OBD-II",
    desc: "Scanner y pruebas electrónicas.",
    icon: Cpu,
    img: "/services/diagnostico.jpg",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll("article");
    if (!cards?.length) return;

    gsap.fromTo(
      Array.from(cards),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  });

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="py-14 border-t border-border bg-gradient-to-br from-blue-50/50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-blue mb-8">
          Servicios de taller
        </h2>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((svc) => (
            <article
              key={svc.title}
              style={{ opacity: 0 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={svc.img}
                  alt={svc.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <svc.icon className="w-4.5 h-4.5 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{svc.title}</h3>
                <p className="text-muted-foreground text-sm">{svc.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
