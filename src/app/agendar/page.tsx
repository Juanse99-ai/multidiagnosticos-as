import type { Metadata } from "next";
import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import { IndMotion } from "@/components/ind-motion";
import { IndBookForm } from "@/components/ind-book-form";

export const metadata: Metadata = {
  title: "Agendar Servicio | Multidiagnósticos AS",
  description:
    "Agenda tu cita en Multidiagnósticos AS, Sabanalarga. Diagnóstico, cambio de aceite, frenos, suspensión y más. Confirmación por WhatsApp.",
};

const STEPS = [
  { n: "01", t: "Llena el formulario", d: "Elige el servicio, la fecha y los datos de tu vehículo." },
  { n: "02", t: "Confirmamos por WhatsApp", d: "Te escribimos para confirmar día y hora en minutos." },
  { n: "03", t: "Llega al taller", d: "Preséntate a la hora acordada. Te atendemos sin filas." },
];

export default function AgendarPage() {
  return (
    <div className="ind">
      <IndHeader />
      <IndMotion />

      <section className="ind-book"><div className="in">
        <div>
          <h2>Tu cita, <span className="blue">sin filas.</span></h2>
          <p>Reserva tu diagnóstico o mantenimiento. Te confirmamos por WhatsApp en minutos. Desde 2021 y más de 2.000 órdenes de servicio.</p>
        </div>
        <IndBookForm />
      </div></section>

      <section className="ind-sec"><div className="wrap">
        <div style={{ marginBottom: 4 }}>
          <h2 className="ind-h2">Agendar es <span className="blue">así de fácil.</span></h2>
        </div>
        <div className="ind-promos">
          {STEPS.map((s) => (
            <div className="ind-promo" key={s.n}>
              <span className="pk">Paso {s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div></section>

      <IndFooter />
    </div>
  );
}
