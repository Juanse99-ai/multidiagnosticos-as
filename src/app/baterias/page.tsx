import type { Metadata } from "next";
import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import { IndMotion } from "@/components/ind-motion";
import {
  ArrowUpRight, MessageCircle, ChevronDown, BatteryFull, Activity, ShieldCheck, Truck,
  Gauge, Lightbulb, TriangleAlert, CalendarClock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Baterías para carro en Sabanalarga, Atlántico | Multidiagnósticos AS",
  description:
    "Baterías Tudor en stock en Sabanalarga, Atlántico. Hacemos la prueba de carga para saber si es la batería o el alternador. Cotiza por WhatsApp. Cra. 27 #13-05.",
  alternates: { canonical: "/baterias" },
  openGraph: {
    type: "website",
    siteName: "Multidiagnósticos AS",
    locale: "es_CO",
    title: "Baterías para carro en Sabanalarga | Multidiagnósticos AS",
    description: "Baterías Tudor en stock en Sabanalarga, Atlántico. Cotiza por WhatsApp.",
    url: "https://www.multidiagnosticosas.com/baterias",
    images: ["/cats/baterias-bg.jpg"],
  },
};

const WA = "https://wa.me/573003651525?text=Hola,%20quiero%20cotizar%20una%20bater%C3%ADa%20para%20mi%20carro";

const WHY = [
  { Icon: BatteryFull, t: "Tudor en stock", d: "Baterías Tudor disponibles en el taller. Dinos marca, modelo y año de tu carro y te confirmamos la referencia." },
  { Icon: Activity, t: "Prueba de carga", d: "Antes de cambiarla confirmamos si la falla es la batería o el alternador. Sin adivinar." },
  { Icon: ShieldCheck, t: "Garantía", d: "Las baterías llevan la garantía del fabricante." },
  { Icon: Truck, t: "Recoge o te la enviamos", d: "Pásala a recoger al taller en Sabanalarga o te la enviamos." },
];

const SIGNS = [
  { Icon: Gauge, t: "Arranque lento", d: "Al motor le cuesta prender o necesitas varios intentos." },
  { Icon: Lightbulb, t: "Luces tenues", d: "Las luces bajan de intensidad, sobre todo al arrancar." },
  { Icon: TriangleAlert, t: "Testigo encendido", d: "Se prende el testigo de la batería en el tablero." },
  { Icon: CalendarClock, t: "De 2 a 4 años", d: "Es la vida normal de una batería. Con el calor de la región se desgasta más rápido." },
];

const FAQS = [
  { q: "¿Qué baterías tienen?", a: "Tenemos baterías Tudor en stock. Escríbenos por WhatsApp con la marca, el modelo y el año de tu carro y te confirmamos la referencia que le sirve." },
  { q: "¿Cómo sé si es la batería o el alternador?", a: "Te hacemos la prueba de carga en el taller. Si el alternador no carga, una batería nueva también se descarga, así que primero confirmamos dónde está la falla." },
  { q: "¿Cuánto dura una batería de carro?", a: "Por lo general entre 2 y 4 años, según el uso. En tierra caliente como Sabanalarga el calor la desgasta más rápido." },
  { q: "¿Las baterías tienen garantía?", a: "Sí, llevan la garantía del fabricante." },
  { q: "¿Dónde están ubicados?", a: "En la Cra. 27 #13-05, Sabanalarga, Atlántico. Atendemos de lunes a viernes de 8:00 a 17:30 y los sábados de 8:30 a 16:00." },
];

export default function BateriasPage() {
  return (
    <div className="ind">
      <IndHeader />
      <IndMotion />

      <section className="ind-hero">
        <div className="bg"><img src="/cats/baterias-bg.jpg" alt="Baterías para carro en Sabanalarga" /></div>
        <div className="scrim" />
        <div className="hero-content"><div className="wrap" data-hero-content>
          <h1 className="ind-h1">Baterías para carro en <span className="blue">Sabanalarga.</span></h1>
          <div className="ind-actions">
            <a className="ind-btn" href={WA} target="_blank" rel="noopener"><MessageCircle size={18} /> Cotizar batería</a>
          </div>
        </div></div>
      </section>

      <section className="ind-sec"><div className="wrap">
        <div style={{ marginBottom: 4 }}>
          <h2 className="ind-h2">Baterías Tudor <span className="blue">en stock.</span></h2>
        </div>
        <div className="ind-grid"><div className="ind-cells">
          {WHY.map((w, i) => (
            <div className="ind-cell" key={w.t}>
              <div className="top"><w.Icon size={22} color="#2D5BFF" strokeWidth={2} /><span className="num mono">{String(i + 1).padStart(2, "0")}</span></div>
              <h3>{w.t}</h3><p>{w.d}</p>
            </div>
          ))}
        </div></div>
      </div></section>

      <section className="ind-sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div style={{ marginBottom: 4 }}>
          <h2 className="ind-h2">¿Tu batería <span className="blue">está fallando?</span></h2>
        </div>
        <div className="ind-grid"><div className="ind-cells">
          {SIGNS.map((s, i) => (
            <div className="ind-cell" key={s.t}>
              <div className="top"><s.Icon size={22} color="#2D5BFF" strokeWidth={2} /><span className="num mono">{String(i + 1).padStart(2, "0")}</span></div>
              <h3>{s.t}</h3><p>{s.d}</p>
            </div>
          ))}
        </div></div>
        <div style={{ marginTop: 22 }}>
          <a className="ind-btn" href="/blog/cuando-cambiar-la-bateria-del-carro">Cuándo cambiar la batería <ArrowUpRight size={16} /></a>
        </div>
      </div></section>

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }) }} />
      </div></section>

      <section className="ind-ctaband"><div className="wrap">
        <h2>¿El carro no prende?<br /><span className="blue">Escríbenos.</span></h2>
        <div className="acts">
          <a className="ind-btn" href={WA} target="_blank" rel="noopener"><MessageCircle size={18} /> Cotizar por WhatsApp</a>
          <a className="ind-btn-ghost" href="/agendar">Agendar prueba de carga</a>
        </div>
        <p className="note mono">Cra. 27 #13-05 · Sabanalarga, Atlántico</p>
      </div></section>

      <IndFooter />
    </div>
  );
}
