import type { Metadata } from "next";
import { BookingSection } from "@/components/booking-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Clock, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Agendar Servicio | Multidiagnósticos AS",
  description:
    "Agenda tu cita en el taller Multidiagnósticos AS de Sabanalarga. Cambio de aceite, frenos, diagnóstico OBD-II, suspensión y más. Confirmación por WhatsApp.",
};

export default function AgendarPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-dark to-blue-900 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <ScrollReveal stagger="[data-reveal]" y={40} staggerAmount={0.15}>
            <p data-reveal className="text-blue-200 text-sm uppercase tracking-widest mb-2">
              Reserva en línea
            </p>
            <h1 data-reveal className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
              Agenda tu cita en el taller
            </h1>
            <p data-reveal className="text-white/70 text-lg max-w-xl">
              Selecciona el servicio, la fecha y recibe confirmación por WhatsApp
              en minutos. Sin esperas.
            </p>
          </ScrollReveal>

          {/* Info cards */}
          <ScrollReveal stagger="[data-info]" className="grid grid-cols-2 gap-3" staggerAmount={0.1}>
            {[
              { icon: Clock, title: "Lun – Vie", sub: "8:00 am – 5:30 pm" },
              { icon: Clock, title: "Sábados", sub: "8:30 am – 4:00 pm" },
              { icon: MapPin, title: "Dirección", sub: "Cra. 27 #13-05, Sabanalarga" },
              { icon: Phone, title: "Teléfono", sub: "300 365 1525" },
            ].map((item) => (
              <div
                key={item.title}
                data-info
                className="bg-white/10 rounded-xl p-4 flex flex-col gap-1 border border-white/10"
              >
                <item.icon className="w-4 h-4 text-blue-300 mb-1" />
                <p className="text-white font-semibold text-sm">{item.title}</p>
                <p className="text-white/60 text-xs">{item.sub}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Booking form */}
      <BookingSection />

      {/* What to expect */}
      <section className="py-14 border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal as="h2" className="text-2xl font-bold font-display text-brand-blue mb-8 text-center" y={30}>
            ¿Cómo funciona?
          </ScrollReveal>
          <ScrollReveal stagger="[data-step]" className="grid grid-cols-1 sm:grid-cols-3 gap-6" staggerAmount={0.15}>
            {[
              {
                step: "01",
                title: "Llena el formulario",
                desc: "Selecciona el servicio, fecha, hora y datos de tu vehículo.",
              },
              {
                step: "02",
                title: "Confirmamos por WhatsApp",
                desc: "Te llegará un mensaje de confirmación con los detalles de tu cita.",
              },
              {
                step: "03",
                title: "Llega al taller",
                desc: "Preséntate en la hora acordada. Nuestro equipo estará listo para atenderte.",
              },
            ].map((item) => (
              <div key={item.step} data-step className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue font-black text-lg flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-base mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
