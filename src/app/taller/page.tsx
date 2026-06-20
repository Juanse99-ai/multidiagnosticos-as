import type { Metadata } from "next";
import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import { IndMotion } from "@/components/ind-motion";
import { IndMap } from "@/components/ind-map";
import {
  ArrowUpRight, MessageCircle, ChevronDown, Phone, Mail, Navigation, Star, Quote,
  Gauge, ScanSearch, Cpu, CarFront, Disc3, Droplets, Cog, Wrench, Snowflake, Key, Wind, Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Taller Automotriz en Sabanalarga | Multidiagnósticos AS",
  description:
    "Taller automotriz en Sabanalarga: escáner, sincronización, reparación de computadoras, frenos, suspensión, inyectores y motores. Desde 2021, +2.000 órdenes de servicio.",
};

const WA = "https://wa.me/573003651525?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20los%20servicios%20del%20taller";
const WA_AGENDA = "https://wa.me/573023191749?text=Hola,%20quiero%20agendar%20un%20servicio";
const TEL = "+573003651525";
const WA_NUM = "https://wa.me/573023191749?text=Hola,%20quiero%20agendar%20un%20servicio";
const EMAIL = "contacto@multidiagnosticosas.com";
const MAPS = "https://www.google.com/maps/search/?api=1&query=Multidiagnosticos+AS+Sabanalarga";

const SERVICES = [
  { Icon: Gauge, t: "Sincronización de motor", d: "Puesta a punto para potencia y consumo correctos.", ref: "SYN-001" },
  { Icon: ScanSearch, t: "Escáner automotriz", d: "Lectura de fallas con equipo Launch X-431.", ref: "DIAG-002" },
  { Icon: Cpu, t: "Reparación de computadoras", d: "Diagnóstico y reparación de módulos electrónicos.", ref: "ECU-003" },
  { Icon: CarFront, t: "Suspensión y dirección", d: "Amortiguadores, rótulas y terminales.", ref: "SUS-004" },
  { Icon: Disc3, t: "Frenos", d: "Pastillas, discos y sistema ABS.", ref: "BRK-005" },
  { Icon: Droplets, t: "Limpieza de inyectores", d: "Inyección limpia, mejor respuesta.", ref: "FUEL-006" },
  { Icon: Cog, t: "Reparación de motores", d: "Fugas, consumo de aceite y ruidos anormales.", ref: "MOT-007" },
  { Icon: Wrench, t: "Cambio de aceite", d: "Aceite, filtro y revisión multipunto.", ref: "OIL-008" },
  { Icon: Key, t: "Programación de llaves", d: "Llaves, mandos e inmovilizadores.", ref: "KEY-009" },
  { Icon: Snowflake, t: "Aire acondicionado", d: "Carga de gas y revisión del compresor.", ref: "CLM-010" },
  { Icon: Wind, t: "Prueba de humo", d: "Detección de fugas de vacío y admisión.", ref: "SMK-011" },
  { Icon: Activity, t: "Diagnóstico de precisión", d: "Osciloscopio y equipos especializados para sensores y señales.", ref: "OSC-012" },
];

const HOURS = [
  { d: "Lunes a viernes", h: "08:00 – 17:30", off: false },
  { d: "Sábado", h: "08:30 – 16:00", off: false },
  { d: "Domingos y festivos", h: "Cerrado", off: true },
];


// Reseñas reales del perfil de Google de Multidiagnósticos AS (verbatim del cliente).
const REVIEWS: { stars: number; text: string; name: string; role: string }[] = [
  { stars: 5, text: "Un buen lugar para realizar la sincronización del carro en Sabanalarga, recomendado.", name: "Ing. Jose Bermudez", role: "Local Guide · Google" },
  { stars: 5, text: "Excelente servicio en Multidiagnósticos. Muy responsables, honestos y con precios justos. Súper recomendados para repuestos y mantenimiento de carros.", name: "Carolina CP", role: "Cliente · Google" },
  { stars: 5, text: "Excelente servicio. Desde el primer momento la atención fue muy profesional. Me explicaron claramente cuál era el problema de mi vehículo y las opciones de reparación, sin costos ocultos ni sorpresas. El trabajo fue rápido, eficiente y de muy buena calidad. Se nota la experiencia y el compromiso con el cliente. Además, entregaron el carro en el tiempo acordado y en perfectas condiciones. Sin duda volveré y lo recomiendo totalmente a quienes busquen un taller confiable y responsable.", name: "Luis Daniel Prieto", role: "Cliente · Google" },
];

const FAQS = [
  { q: "¿Cuánto tarda un diagnóstico computarizado?", a: "Entre 20 y 45 minutos según el sistema. Te entregamos los códigos de falla y la recomendación de reparación." },
  { q: "¿Trabajan con todas las marcas?", a: "Sí. Chevrolet, Renault, Kia, Hyundai, Toyota, Ford, Volkswagen, Mazda, Mitsubishi, Nissan y más. Software compatible con más de 100 marcas." },
  { q: "¿Puedo comprar los repuestos ahí mismo?", a: "Sí, tenemos autopartes: baterías, aceites, filtros, bujías y bobinas de marcas reconocidas. También puedes cotizar por WhatsApp." },
  { q: "¿Ofrecen garantía?", a: "Sí. Los repuestos llevan la garantía del fabricante y la mano de obra está respaldada por nuestro equipo." },
];

function initials(name: string) {
  return name.split(" ").filter((w) => w && !w.includes(".")).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function TallerPage() {
  return (
    <div className="ind">
      <IndHeader />
      <IndMotion />

      <section className="ind-hero">
        <div className="bg"><img src="/hero/banner.jpg" alt="Taller Multidiagnósticos AS: paredes ACDelco, LIQUI MOLY y DENSO, camioneta en el elevador LAUNCH" style={{ objectPosition: "center 50%" }} /></div>
        <div className="scrim" />
        <div className="hero-content"><div className="wrap" data-hero-content>
          <h1 className="ind-h1">Diagnóstico y reparación que <span className="blue">sí encuentra la falla.</span></h1>
          <p className="ind-sub">Escáner, motor, frenos, suspensión y programación de llaves. Desde 2021 y más de 2.000 órdenes de servicio. Repuestos originales garantizados.</p>
          <div className="ind-actions">
            <a className="ind-btn" href="/agendar">Agendar servicio <ArrowUpRight size={18} /></a>
            <a className="ind-btn-ghost" href={WA} target="_blank" rel="noopener"><MessageCircle size={18} /> WhatsApp</a>
          </div>
        </div></div>
      </section>

      <section className="ind-sec" id="servicios" style={{ paddingTop: 40 }}><div className="wrap">
        <div className="ind-svchead">
          <div>
            <h2 className="ind-h2">Soluciones de <span className="blue">precisión.</span></h2>
          </div>
        </div>
        <div className="ind-grid"><div className="ind-cells">
          {SERVICES.map((s) => (
            <div className="ind-svc" key={s.ref}>
              <div className="bd">
                <s.Icon className="ic" size={30} color="#2D5BFF" strokeWidth={2} />
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </div>
          ))}
        </div></div>
      </div></section>

      <section className="ind-trust"><div className="grid2">
        {[["2021", "Desde el año"], ["+2.000", "Órdenes de servicio"], ["+100", "Marcas compatibles"], ["100%", "Garantía"]].map(([n, l]) => (
          <div key={l}><div className="n">{n}</div><div className="l">{l}</div></div>
        ))}
      </div></section>

      <section className="ind-sec" id="contacto" style={{ paddingTop: 60 }}><div className="wrap">
        <div className="ind-sched">
          <div className="hrs">
            <h2 className="ind-h2sm">Horarios de atención</h2>
            <div className="rows">
              {HOURS.map((r) => (
                <div className={`row${r.off ? " off" : ""}`} key={r.d}>
                  <span className="d">{r.d}</span>
                  <span className="badge mono">{r.h}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="contact">
            <h2 className="ind-h2sm">Información de contacto</h2>
            <div className="clist">
              <a className="citem" href={`tel:${TEL}`}>
                <span className="ico"><Phone size={20} /></span>
                <span><span className="lb mono">Teléfono</span><span className="vv">(+57) 300 365 1525</span></span>
              </a>
              <a className="citem" href={WA_NUM} target="_blank" rel="noopener">
                <span className="ico"><MessageCircle size={20} /></span>
                <span><span className="lb mono">WhatsApp · Agenda</span><span className="vv">(+57) 302 319 1749</span></span>
              </a>
              <a className="citem" href={`mailto:${EMAIL}`}>
                <span className="ico"><Mail size={20} /></span>
                <span><span className="lb mono">Correo electrónico</span><span className="vv">{EMAIL}</span></span>
              </a>
            </div>
          </div>
        </div>
      </div></section>

      <section className="ind-sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="ind-lochead">
          <div>
            <h2 className="ind-h2">Nuestra <span className="blue">ubicación.</span></h2>
            <p className="addr">Cra. 27 #13-05, Sabanalarga · Atlántico</p>
          </div>
          <a className="ind-btn-dark" href={MAPS} target="_blank" rel="noopener"><Navigation size={18} /> Cómo llegar</a>
        </div>
        <div className="ind-map">
          <IndMap />
          <div className="pin-card">
            <h4>Central Sabanalarga</h4>
            <p>Fácil acceso desde la vía principal. Zona de parqueo y recepción.</p>
          </div>
        </div>
      </div></section>

      {REVIEWS.length > 0 && (
        <section className="ind-sec ind-revs" style={{ paddingTop: 0 }}><div className="wrap">
          <div className="rhead">
            <h2 className="ind-h2">Lo que dicen <span className="blue">nuestros clientes.</span></h2>
          </div>
          <div className="rgrid">
            {REVIEWS.map((r, i) => (
              <div className="rcard" key={i}>
                <Quote className="qt" size={56} />
                <div className="stars">{Array.from({ length: r.stars }).map((_, j) => (<Star key={j} size={18} fill="#2D5BFF" color="#2D5BFF" />))}</div>
                <p className="qtext">{r.text}</p>
                <div className="who">
                  <span className="av">{initials(r.name)}</span>
                  <span><span className="nm">{r.name}</span><span className="rl mono">{r.role}</span></span>
                </div>
              </div>
            ))}
          </div>
          <div className="rmore"><a className="ind-btn-dark" href={MAPS} target="_blank" rel="noopener"><Star size={16} fill="#fff" color="#fff" /> Ver todas las reseñas en Google</a></div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "AutoRepair", name: "Multidiagnósticos AS",
            image: "https://www.multidiagnosticosas.com/hero/banner.jpg", url: "https://www.multidiagnosticosas.com/taller",
            review: REVIEWS.map((r) => ({ "@type": "Review", author: { "@type": "Person", name: r.name }, reviewRating: { "@type": "Rating", ratingValue: r.stars, bestRating: 5 }, reviewBody: r.text })),
          }) }} />
        </div></section>
      )}

      <section className="ind-sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div style={{ marginBottom: 4 }}>
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

      <section className="ind-ctaband"><div className="wrap">
        <h2>No esperes más,<br /><span className="blue">agenda tu cita hoy.</span></h2>
        <div className="acts">
          <a className="ind-btn" href="/agendar">Agendar ahora <ArrowUpRight size={18} /></a>
          <a className="ind-btn-ghost" href="#servicios">Ver servicios</a>
        </div>
        <p className="note mono">Respuesta inmediata por WhatsApp · Sin filas · Calidad garantizada</p>
      </div></section>

      <IndFooter />
    </div>
  );
}
