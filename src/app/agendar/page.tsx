import type { Metadata } from "next";
import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import { IndMotion } from "@/components/ind-motion";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Agendar Servicio | Multidiagnósticos AS",
  description:
    "Agenda tu cita en Multidiagnósticos AS, Sabanalarga. Diagnóstico, cambio de aceite, frenos, suspensión y más. Confirmación por WhatsApp.",
};

const WA_AGENDA = "https://wa.me/573023191749?text=Hola,%20quiero%20agendar%20un%20servicio";

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
        <form className="ind-form" action={WA_AGENDA}>
          <div className="f full"><label htmlFor="af-servicio">Servicio</label><select id="af-servicio" defaultValue=""><option value="" disabled>Selecciona…</option><option>Diagnóstico computarizado</option><option>Sincronización de motor</option><option>Cambio de aceite</option><option>Frenos</option><option>Suspensión</option><option>Limpieza de inyectores</option><option>Otro</option></select></div>
          <div className="f"><label htmlFor="af-fecha">Fecha</label><input id="af-fecha" type="date" /></div>
          <div className="f"><label htmlFor="af-hora">Hora</label><input id="af-hora" type="time" /></div>
          <div className="f"><label htmlFor="af-placa">Placa</label><input id="af-placa" placeholder="ABC123" /></div>
          <div className="f"><label htmlFor="af-modelo">Modelo</label><input id="af-modelo" placeholder="Ej. Mazda 3" /></div>
          <div className="f"><label htmlFor="af-nombre">Nombre</label><input id="af-nombre" placeholder="Tu nombre" /></div>
          <div className="f"><label htmlFor="af-telefono">Teléfono</label><input id="af-telefono" placeholder="300 000 0000" /></div>
          <a className="submit" href={WA_AGENDA} target="_blank" rel="noopener"><MessageCircle size={16} /> Confirmar por WhatsApp</a>
        </form>
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
