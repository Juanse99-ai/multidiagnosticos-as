import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Cpu,
  Key,
  Droplets,
  Disc3,
  CarFront,
  Wrench,
  Cog,
  Snowflake,
  CalendarDays,
  MessageCircle,
  ShieldCheck,
  Clock,
  Users,
  ChevronDown,
  ArrowUpRight,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Taller Automotriz en Sabanalarga | Multidiagnósticos AS",
  description:
    "Taller automotriz en Sabanalarga con escáner, programación de llaves, reparación de motor, cambio de aceite, frenos, suspensión y mantenimiento preventivo.",
};

const services = [
  {
    title: "Escáner y diagnóstico computarizado",
    desc: "Lectura de códigos, borrado de fallas, pruebas en vivo y diagnóstico eléctrico con equipo LAUNCH X-431.",
    icon: Cpu,
  },
  {
    title: "Programación de llaves y controles",
    desc: "Sincronización de llaves, mandos y programación de inmovilizadores para todas las marcas.",
    icon: Key,
  },
  {
    title: "Cambio de aceite y filtros",
    desc: "Aceite sintético, filtro de aceite y revisión de niveles. Aceites NGK, Castrol y Mobil 1.",
    icon: Droplets,
  },
  {
    title: "Sistema de frenos",
    desc: "Cambio de pastillas, discos, bandas y revisión de líquido de frenos ABS.",
    icon: Disc3,
  },
  {
    title: "Suspensión y dirección",
    desc: "Cambio de amortiguadores Monroe, rótulas, terminales y revisión completa de suspensión.",
    icon: CarFront,
  },
  {
    title: "Mantenimiento preventivo",
    desc: "Chequeo general de 30 puntos, filtros, correas y revisión por kilometraje.",
    icon: Wrench,
  },
  {
    title: "Reparación de motor",
    desc: "Diagnóstico de consumo de aceite, fallas de potencia, fugas, juntas y ruidos anormales.",
    icon: Cog,
  },
  {
    title: "Aire acondicionado y eléctrico",
    desc: "Carga de gas, revisión de compresor, alternador, batería y sistema de carga.",
    icon: Snowflake,
  },
];

const faqs = [
  {
    q: "¿Cuánto tiempo tarda un diagnóstico computarizado?",
    a: "El diagnóstico básico tarda entre 20 y 45 minutos dependiendo del sistema a evaluar. Te entregamos un informe con los códigos de falla y la recomendación de reparación.",
  },
  {
    q: "¿Trabajan con todas las marcas de vehículos?",
    a: "Sí. Atendemos Chevrolet, Renault, Kia, Hyundai, Toyota, Ford, Volkswagen, Mazda, Mitsubishi, Nissan y más. Contamos con software compatible con más de 100 marcas.",
  },
  {
    q: "¿Puedo comprar los repuestos en el taller?",
    a: "Sí, tenemos tienda de autopartes con baterías, aceites, filtros, bujías y bobinas de marcas como Bosch, Tudor, NGK y Castrol. También puedes comprarlos en línea.",
  },
  {
    q: "¿Cómo agendo mi cita?",
    a: "Puedes hacerlo a través del formulario en nuestra página de 'Agendar', por WhatsApp al 300 365 1525, o llamando directamente al taller.",
  },
  {
    q: "¿Ofrecen garantía en los servicios?",
    a: "Sí. Todos nuestros servicios tienen garantía. Los repuestos instalados llevan la garantía del fabricante y la mano de obra está respaldada por nuestro equipo.",
  },
];

export default function TallerPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero — dark slim, mismo lenguaje que home */}
      <section className="relative bg-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <ScrollReveal stagger="[data-reveal]" y={24} staggerAmount={0.12}>
            <p
              data-reveal
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue-light"
            >
              Taller automotriz
            </p>
            <h1
              data-reveal
              className="mt-5 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight max-w-4xl"
            >
              Diagnóstico y reparación
              <br />
              <span className="text-brand-blue-light">en Sabanalarga.</span>
            </h1>
            <p
              data-reveal
              className="mt-8 text-white/65 text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Desde 2021 y más de 2.000 órdenes de servicio en escáner
              automotriz, reparación de motor, frenos, suspensión y programación
              de llaves. Repuestos originales garantizados.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/agendar"
                className="group/cta inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-white text-brand-dark text-sm font-semibold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/95 active:scale-[0.97]"
              >
                <CalendarDays className="w-4 h-4" strokeWidth={1.75} />
                Agendar servicio
                <span className="ml-1 w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/cta:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/cta:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
              </Link>
              <a
                href="https://wa.me/573003651525?text=Hola,%20quisiera%20información%20sobre%20los%20servicios%20del%20taller"
                target="_blank"
                rel="noopener"
                className="group/cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white/80 text-sm font-medium transition-[color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white hover:bg-white/5"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                WhatsApp
              </a>
            </div>

            {/* Stats — línea editorial inline, sin tarjetas hero-metric */}
            <div
              data-reveal
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 max-w-4xl border-t border-white/10 pt-10"
            >
              {[
                { value: "2021", label: "Desde el año" },
                { value: "+2.000", label: "Órdenes de servicio" },
                { value: "8", label: "Servicios especializados" },
                { value: "100%", label: "Garantía en repuestos" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl md:text-4xl font-black text-white leading-none tracking-tight">
                    {s.value}
                  </p>
                  <p className="mt-2 text-white/50 text-xs uppercase tracking-[0.16em]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services — editorial heading + flat cards */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="mb-14 max-w-2xl" y={24}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-[1.05] tracking-tight">
              Mantenimiento integral,
              <br />
              <span className="text-brand-blue">sin sorpresas.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Si no encuentras el servicio que necesitas, escríbenos por
              WhatsApp y te orientamos.
            </p>
          </ScrollReveal>

          <ScrollReveal
            stagger="article"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            staggerAmount={0.1}
          >
            {services.map((svc) => (
              <article
                key={svc.title}
                className="group rounded-2xl border border-black/[0.08] bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-black/[0.14] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_18px_36px_-18px_rgba(0,32,96,0.18)] flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-blue/[0.08] flex items-center justify-center mb-4">
                  <svc.icon
                    className="w-5 h-5 text-brand-blue"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="font-bold text-base mb-1 flex-1 text-brand-dark">
                  {svc.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  {svc.desc}
                </p>
                <a
                  href={`https://wa.me/573003651525?text=${encodeURIComponent(
                    `Hola, quisiera información sobre ${svc.title}`
                  )}`}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-between gap-2 text-xs font-semibold text-brand-blue mt-auto transition-colors duration-200 group-hover:text-brand-dark"
                >
                  <span className="uppercase tracking-[0.15em]">Consultar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </a>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Why us — editorial */}
      <section className="py-24 md:py-32 bg-[#fbfbfa] border-t border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal as="h2" className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-[1.05] tracking-tight max-w-2xl mb-14" y={24}>
            ¿Por qué <span className="text-brand-blue">elegirnos?</span>
          </ScrollReveal>
          <ScrollReveal
            stagger="[data-feature]"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12"
            staggerAmount={0.1}
          >
            {[
              {
                icon: Cpu,
                title: "Escáner de última generación",
                desc: "Equipo LAUNCH X-431 PAD compatible con más de 100 marcas y 10.000 modelos de vehículos.",
              },
              {
                icon: ShieldCheck,
                title: "Repuestos originales garantizados",
                desc: "Solo trabajamos con marcas reconocidas. Bosch, NGK, Castrol, Tudor, Monroe y más.",
              },
              {
                icon: Clock,
                title: "Servicio rápido sin citas largas",
                desc: "Agenda por WhatsApp y en minutos confirmamos tu cita. No esperas horas para atención.",
              },
              {
                icon: MessageCircle,
                title: "Asesoría personalizada",
                desc: "Te explicamos qué tiene tu vehículo y qué necesita. Sin tecnicismos, sin cobros de más.",
              },
              {
                icon: Users,
                title: "Equipo con experiencia",
                desc: "Atendemos vehículos en Sabanalarga y la región Caribe desde 2021, con más de 2.000 órdenes de servicio.",
              },
              {
                icon: Star,
                title: "Satisfacción garantizada",
                desc: "Si no quedas conforme, lo solucionamos. Tu tranquilidad es nuestra prioridad.",
              },
            ].map((item) => (
              <div key={item.title} data-feature className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon
                    className="w-5 h-5 text-brand-blue"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1 text-brand-dark">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 border-t border-black/[0.06]">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal
            as="h2"
            className="font-display text-4xl md:text-5xl font-bold text-brand-dark leading-[1.05] tracking-tight mb-12 text-center"
            y={24}
          >
            Preguntas <span className="text-brand-blue">frecuentes.</span>
          </ScrollReveal>
          <ScrollReveal stagger="details" className="space-y-3" staggerAmount={0.08}>
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-black/[0.08] bg-white overflow-hidden transition-colors duration-200 hover:border-black/[0.14]"
              >
                <summary className="flex items-center justify-between gap-3 px-6 py-4 cursor-pointer list-none font-semibold text-sm select-none text-brand-dark">
                  {faq.q}
                  <ChevronDown
                    className="w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={2}
                  />
                </summary>
                <p className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-brand-dark">
        <ScrollReveal
          className="max-w-3xl mx-auto px-6 text-center"
          stagger="[data-cta]"
          staggerAmount={0.12}
          y={24}
        >
          <h2
            data-cta
            className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight"
          >
            ¿Listo para agendar
            <br />
            <span className="text-brand-blue-light">tu servicio?</span>
          </h2>
          <p data-cta className="mt-6 text-white/65 text-base md:text-lg">
            Cuéntanos la placa, el servicio que necesitas y te confirmamos en minutos.
          </p>
          <div data-cta className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link
              href="/agendar"
              className="group/cta inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-white text-brand-dark text-sm font-semibold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/95 active:scale-[0.97]"
            >
              <CalendarDays className="w-4 h-4" strokeWidth={1.75} />
              Agendar en línea
              <span className="ml-1 w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/cta:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/cta:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </span>
            </Link>
            <a
              href="https://wa.me/573003651525?text=Hola,%20quiero%20agendar%20un%20servicio%20en%20el%20taller"
              target="_blank"
              rel="noopener"
              className="group/cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white/80 text-sm font-medium transition-[color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white hover:bg-white/5"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
              WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
