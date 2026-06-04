import type { Metadata } from "next";
import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import {
  ArrowUpRight, MessageCircle, ChevronDown,
  Gauge, ScanSearch, Cpu, CarFront, Disc3, Droplets, Cog, Wrench, Snowflake, Key,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Taller Automotriz en Sabanalarga | Multidiagnósticos AS",
  description:
    "Taller automotriz en Sabanalarga: escáner, sincronización, reparación de computadoras, frenos, suspensión, inyectores y motores. Desde 2021, +2.000 órdenes de servicio.",
};

const WA = "https://wa.me/573003651525?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20los%20servicios%20del%20taller";

const SERVICES = [
  { n: "01", Icon: Gauge, t: "Sincronización de motor", d: "Puesta a punto para potencia y consumo correctos." },
  { n: "02", Icon: ScanSearch, t: "Escáner automotriz", d: "Lectura de fallas con equipo Launch X-431." },
  { n: "03", Icon: Cpu, t: "Reparación de computadoras", d: "Diagnóstico y reparación de módulos electrónicos." },
  { n: "04", Icon: CarFront, t: "Suspensión y dirección", d: "Amortiguadores, rótulas y terminales." },
  { n: "05", Icon: Disc3, t: "Frenos", d: "Pastillas, discos y sistema ABS." },
  { n: "06", Icon: Droplets, t: "Limpieza de inyectores", d: "Inyección limpia, mejor respuesta." },
  { n: "07", Icon: Cog, t: "Reparación de motores", d: "Fugas, consumo de aceite y ruidos anormales." },
  { n: "08", Icon: Wrench, t: "Cambio de aceite", d: "Aceite, filtro y revisión multipunto." },
  { n: "09", Icon: Key, t: "Programación de llaves", d: "Llaves, mandos e inmovilizadores." },
  { n: "10", Icon: Snowflake, t: "Aire acondicionado", d: "Carga de gas y revisión del compresor." },
];

const FAQS = [
  { q: "¿Cuánto tarda un diagnóstico computarizado?", a: "Entre 20 y 45 minutos según el sistema. Te entregamos los códigos de falla y la recomendación de reparación." },
  { q: "¿Trabajan con todas las marcas?", a: "Sí. Chevrolet, Renault, Kia, Hyundai, Toyota, Ford, Volkswagen, Mazda, Mitsubishi, Nissan y más. Software compatible con más de 100 marcas." },
  { q: "¿Puedo comprar los repuestos ahí mismo?", a: "Sí, tenemos autopartes: baterías, aceites, filtros, bujías y bobinas de marcas reconocidas. También puedes cotizar por WhatsApp." },
  { q: "¿Ofrecen garantía?", a: "Sí. Los repuestos llevan la garantía del fabricante y la mano de obra está respaldada por nuestro equipo." },
];

export default function TallerPage() {
  return (
    <div className="ind">
      <IndHeader />

      <section className="ind-hero"><div className="wrap"><div className="grid">
        <div>
          <span className="ind-kick mono"><span className="sq" /> Taller automotriz · Sabanalarga</span>
          <h1 className="ind-h1">Diagnóstico y reparación que <span className="blue">sí encuentra la falla.</span></h1>
          <p className="ind-sub">Escáner, motor, frenos, suspensión y programación de llaves. Desde 2021 y más de 2.000 órdenes de servicio. Repuestos originales garantizados.</p>
          <div className="ind-actions">
            <a className="ind-btn" href="/agendar">Agendar servicio <ArrowUpRight size={18} /></a>
            <a className="ind-btn-ghost" href={WA} target="_blank" rel="noopener"><MessageCircle size={18} /> WhatsApp</a>
          </div>
        </div>
        <div className="ind-photo">
          <div className="ind-slide" style={{ animation: "none", opacity: 1 }}><img src="/services/diagnostico.jpg" alt="Diagnóstico computarizado con Launch X-431" /><span className="ptag">LAUNCH X-431 · OBD-II</span></div>
        </div>
      </div></div></section>

      <section className="ind-sec" style={{ paddingTop: 24 }}><div className="wrap">
        <div style={{ marginBottom: 4 }}>
          <span className="ind-kick2"><span className="sq" /> Servicios</span>
          <h2 className="ind-h2">Lo que hacemos <span className="blue">mejor que nadie.</span></h2>
        </div>
        <div className="ind-grid">
          {SERVICES.map((s) => (
            <div className="ind-cell" key={s.n}>
              <div className="top"><s.Icon size={22} color="#2D5BFF" strokeWidth={2} /><span className="num mono">{s.n}</span></div>
              <h3>{s.t}</h3><p>{s.d}</p>
            </div>
          ))}
        </div>
      </div></section>

      <section className="ind-trust"><div className="grid2">
        {[["2021", "Desde el año"], ["+2.000", "Órdenes de servicio"], ["+100", "Marcas compatibles"], ["100%", "Garantía"]].map(([n, l]) => (
          <div key={l}><div className="n">{n}</div><div className="l">{l}</div></div>
        ))}
      </div></section>

      <section className="ind-sec"><div className="wrap">
        <div style={{ marginBottom: 4 }}>
          <span className="ind-kick2"><span className="sq" /> Dudas</span>
          <h2 className="ind-h2">Preguntas <span className="blue">frecuentes.</span></h2>
        </div>
        <div className="ind-faq">
          {FAQS.map((f, i) => (
            <details key={i}>
              <summary>{f.q} <ChevronDown size={18} /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div></section>

      <section className="ind-book"><div className="in">
        <div>
          <span className="ind-kick2" style={{ color: "#6E8BFF" }}><span className="sq" style={{ background: "#6E8BFF" }} /> Listo para atenderte</span>
          <h2>¿Listo para <span className="blue">agendar?</span></h2>
          <p>Cuéntanos la placa y el servicio que necesitas. Te confirmamos por WhatsApp en minutos.</p>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          <a className="ind-btn" href="/agendar">Agendar en línea <ArrowUpRight size={18} /></a>
          <a className="ind-btn-ghost" style={{ color: "#fff" }} href={WA} target="_blank" rel="noopener"><MessageCircle size={18} /> WhatsApp</a>
        </div>
      </div></section>

      <IndFooter />
    </div>
  );
}
