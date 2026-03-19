import type { Metadata } from "next";
import Image from "next/image";
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
  ShoppingBag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Taller automotriz en Sabanalarga | Multidiagnósticos AS",
  description:
    "Taller automotriz en Sabanalarga con escáner, programación de llaves, reparación de motor, cambio de aceite, frenos, suspensión y mantenimiento preventivo.",
};

const services = [
  {
    title: "Escáner y diagnóstico computarizado",
    desc: "Lectura de códigos, borrado de fallas, pruebas en vivo y diagnóstico eléctrico.",
    icon: Cpu,
  },
  {
    title: "Programación de llaves y controles",
    desc: "Sincronización de llaves, mandos y programación de inmovilizadores según modelo.",
    icon: Key,
  },
  {
    title: "Cambio de aceite y filtros",
    desc: "Cambio de aceite, filtro de aceite y revisión rápida de niveles y fugas.",
    icon: Droplets,
  },
  {
    title: "Sistema de frenos",
    desc: "Cambio de pastillas, discos, bandas y revisión de líquido de frenos.",
    icon: Disc3,
  },
  {
    title: "Suspensión y dirección",
    desc: "Cambio de amortiguadores, rótulas, terminales y revisión de ruidos en suspensión.",
    icon: CarFront,
  },
  {
    title: "Mantenimiento preventivo",
    desc: "Chequeo general, filtros, correas y revisión por kilometraje.",
    icon: Wrench,
  },
  {
    title: "Reparación de motor",
    desc: "Diagnóstico de consumo de aceite, fallas de potencia, fugas y ruidos anormales.",
    icon: Cog,
  },
  {
    title: "Otros servicios",
    desc: "Aire acondicionado, sistema de carga, batería y escaneo antes de comprar vehículo.",
    icon: Snowflake,
  },
];

export default function TallerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-50/50 via-white to-red-50/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-brand-blue leading-tight mb-4">
              Taller automotriz especializado en Sabanalarga
            </h1>
            <p className="text-muted-foreground text-lg mb-6 max-w-xl">
              Escáner profesional, programación de llaves, reparación de motor y
              mantenimiento preventivo. Agenda tu cita y recibe confirmación por
              WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#agenda" className={cn(buttonVariants({ size: "lg" }))}>
                <CalendarDays className="w-4 h-4 mr-2" />
                Agendar servicio
              </Link>
              <Link href="/#catalogo" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Comprar autopartes
              </Link>
              <a
                href="https://wa.me/573003651525"
                target="_blank"
                rel="noopener"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp taller
              </a>
            </div>
          </div>
          <Image
            src="/mascota.png"
            alt="Mascota Multidiagnósticos AS"
            width={420}
            height={420}
            className="mx-auto max-w-[420px] w-full h-auto drop-shadow-lg"
          />
        </div>
      </section>

      {/* Servicios */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-blue mb-4">
            Servicios del taller
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Estos son los servicios que prestamos en nuestro taller de
            Sabanalarga. Si no ves el servicio que necesitas, escríbenos por
            WhatsApp y te orientamos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((svc) => (
              <article
                key={svc.title}
                className="bg-card border border-border rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-3 group-hover:bg-brand-blue/20 transition-colors">
                  <svc.icon className="w-5 h-5 text-brand-blue" />
                </div>
                <h3 className="font-bold text-base mb-1">{svc.title}</h3>
                <p className="text-muted-foreground text-sm">{svc.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-14 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold font-display text-brand-blue mb-3">
              ¿Listo para agendar tu servicio?
            </h2>
            <p className="text-muted-foreground mb-6">
              Cuéntanos la placa, el servicio que necesitas y te confirmamos la
              cita por WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/#agenda" className={cn(buttonVariants({ size: "lg" }))}>
                <CalendarDays className="w-4 h-4 mr-2" />
                Agendar en línea
              </Link>
              <a
                href="https://wa.me/573003651525?text=Hola,%20quiero%20agendar%20un%20servicio%20en%20el%20taller"
                target="_blank"
                rel="noopener"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
