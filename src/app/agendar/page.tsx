import type { Metadata } from "next";
import { BookingSection } from "@/components/booking-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Agendar Servicio | Multidiagnósticos AS",
  description:
    "Agenda tu cita en el taller Multidiagnósticos AS de Sabanalarga. Cambio de aceite, frenos, diagnóstico OBD-II, suspensión y más. Confirmación por WhatsApp.",
};

export default function AgendarPage() {
  return (
    <>
      {/* Booking form (incluye su propio encabezado editorial) */}
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
