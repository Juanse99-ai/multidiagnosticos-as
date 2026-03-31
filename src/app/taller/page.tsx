import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
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
  Star,
  Users,
  ChevronDown,
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
    price: "Desde $35.000",
  },
  {
    title: "Programación de llaves y controles",
    desc: "Sincronización de llaves, mandos y programación de inmovilizadores para todas las marcas.",
    icon: Key,
    price: "Desde $80.000",
  },
  {
    title: "Cambio de aceite y filtros",
    desc: "Aceite sintético, filtro de aceite y revisión de niveles. Aceites NGK, Castrol y Mobil 1.",
    icon: Droplets,
    price: "Desde $75.000",
  },
  {
    title: "Sistema de frenos",
    desc: "Cambio de pastillas, discos, bandas y revisión de líquido de frenos ABS.",
    icon: Disc3,
    price: "Desde $45.000",
  },
  {
    title: "Suspensión y dirección",
    desc: "Cambio de amortiguadores Monroe, rótulas, terminales y revisión completa de suspensión.",
    icon: CarFront,
    price: "Consultar",
  },
  {
    title: "Mantenimiento preventivo",
    desc: "Chequeo general de 30 puntos, filtros, correas y revisión por kilometraje.",
    icon: Wrench,
    price: "Desde $55.000",
  },
  {
    title: "Reparación de motor",
    desc: "Diagnóstico de consumo de aceite, fallas de potencia, fugas, juntas y ruidos anormales.",
    icon: Cog,
    price: "Consultar",
  },
  {
    title: "Aire acondicionado y eléctrico",
    desc: "Carga de gas, revisión de compresor, alternador, batería y sistema de carga.",
    icon: Snowflake,
    price: "Desde $60.000",
  },
];

const stats = [
  { icon: Star,       value: "+10",   label: "Años de experiencia" },
  { icon: Users,      value: "+2.500", label: "Vehículos atendidos" },
  { icon: Wrench,     value: "8",     label: "Servicios especializados" },
  { icon: ShieldCheck, value: "100%", label: "Garantía en repuestos" },
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
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-blue-950 to-brand-dark text-white py-20 px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #2563eb 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/20 text-blue-300 text-xs uppercase tracking-widest mb-4 border border-brand-blue/30">
              Taller automotriz especializado
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
              Diagnóstico y reparación{" "}
              <span className="text-brand-blue-light">en Sabanalarga</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-xl">
              Más de 10 años de experiencia en escáner automotriz, reparación de
              motor, frenos, suspensión y programación de llaves. Repuestos
              originales garantizados.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/agendar" className={cn(buttonVariants({ size: "lg" }))}>
                <CalendarDays className="w-4 h-4 mr-2" />
                Agendar servicio
              </Link>
              <a
                href="https://wa.me/573003651525?text=Hola,%20quisiera%20información%20sobre%20los%20servicios%20del%20taller"
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

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <s.icon className="w-6 h-6 text-brand-blue-light mx-auto mb-2" />
                <p className="text-3xl font-black text-white font-display mb-1">{s.value}</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-blue mb-3">
              Servicios del taller
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Si no encuentras el servicio que necesitas, escríbenos por WhatsApp
              y te orientamos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((svc) => (
              <article
                key={svc.title}
                className="bg-card border border-border rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-3 group-hover:bg-brand-blue/20 transition-colors">
                  <svc.icon className="w-5 h-5 text-brand-blue" />
                </div>
                <h3 className="font-bold text-base mb-1 flex-1">{svc.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{svc.desc}</p>
                <p className="text-brand-blue font-bold text-sm">{svc.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-blue mb-10 text-center">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                desc: "Más de 10 años atendiendo vehículos en Sabanalarga y la región Caribe.",
              },
              {
                icon: Star,
                title: "Satisfacción garantizada",
                desc: "Si no quedas conforme, lo solucionamos. Tu tranquilidad es nuestra prioridad.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-blue mb-8 text-center">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-3 px-6 py-4 cursor-pointer list-none font-semibold text-sm select-none">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <p className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 border-t border-border bg-gradient-to-r from-brand-blue to-blue-700">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-3">
            ¿Listo para agendar tu servicio?
          </h2>
          <p className="text-white/70 mb-8">
            Cuéntanos la placa, el servicio que necesitas y te confirmamos en minutos.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/agendar"
              className={cn(buttonVariants({ size: "lg" }), "bg-white text-brand-blue hover:bg-white/90")}
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Agendar en línea
            </Link>
            <a
              href="https://wa.me/573003651525?text=Hola,%20quiero%20agendar%20un%20servicio%20en%20el%20taller"
              target="_blank"
              rel="noopener"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white"
              )}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
