import type { Metadata } from "next";
import Image from "next/image";
import { Manrope, Bricolage_Grotesque, Archivo } from "next/font/google";
import { CalendarCheck, MessageCircle, ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "700", "800"], variable: "--f-manrope" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--f-bricolage" });
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "600", "800", "900"], variable: "--f-archivo" });

export const metadata: Metadata = { title: "Direcciones — Multidiagnósticos AS", robots: { index: false, follow: false } };

function Label({ n, name, note }: { n: string; name: string; note: string }) {
  return (
    <div style={{ background: "#16140F", color: "#F3EFE7", padding: "12px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, opacity: 0.6 }}>{n}</span>
        <strong style={{ fontSize: 15 }}>{name}</strong>
        <span style={{ fontSize: 13, opacity: 0.65 }}>{note}</span>
      </div>
    </div>
  );
}

/* ---------- Dirección 1: Verde confianza ---------- */
function DirVerde() {
  const BG = "#F2F5F0", INK = "#13201A", MUT = "#5A6B61", ACC = "#0E9466", LINE = "#DCE3DA";
  return (
    <section style={{ background: BG, color: INK, fontFamily: "var(--f-manrope)", padding: "72px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <p style={{ color: ACC, fontWeight: 700, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", margin: 0 }}>
          Taller automotriz · Sabanalarga
        </p>
        <h1 style={{ fontWeight: 800, fontSize: "clamp(2.4rem,5.6vw,4.4rem)", lineHeight: 1.02, letterSpacing: "-0.03em", margin: "16px 0 0", maxWidth: 900 }}>
          Encontramos la falla que otros <span style={{ color: ACC }}>no encuentran.</span>
        </h1>
        <p style={{ color: MUT, fontSize: "1.2rem", lineHeight: 1.5, margin: "22px 0 0", maxWidth: 560 }}>
          Diagnóstico computarizado, mantenimiento y autopartes. Desde 2021, con más de 2.000 órdenes de servicio.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30 }}>
          <a style={{ display: "inline-flex", alignItems: "center", gap: 9, background: ACC, color: "#fff", padding: "14px 22px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            <CalendarCheck size={18} /> Agendar diagnóstico <ArrowRight size={16} />
          </a>
          <a style={{ display: "inline-flex", alignItems: "center", gap: 9, border: `1px solid ${LINE}`, color: INK, padding: "14px 22px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
        <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
          {[["+2.000", "órdenes"], ["2021", "desde"], ["Mazda·Renault·Chevrolet·Ford", "marcas"]].map(([a, b]) => (
            <div key={b}>
              <div style={{ fontWeight: 800, fontSize: 22 }}>{a}</div>
              <div style={{ color: MUT, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Dirección 2: Caribe cálido ---------- */
function DirCaribe() {
  const BG = "#F4EDE0", INK = "#2A241C", MUT = "#6E6354", CLAY = "#C5562F", TEAL = "#2E7D74", LINE = "#E2D8C7";
  return (
    <section style={{ background: BG, color: INK, fontFamily: "var(--f-bricolage)", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 40, alignItems: "center" }} className="caribe-grid">
        <div>
          <p style={{ color: CLAY, fontWeight: 700, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", margin: 0 }}>
            Tu taller de confianza en Sabanalarga
          </p>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(2.3rem,5vw,4rem)", lineHeight: 1.04, letterSpacing: "-0.02em", margin: "16px 0 0" }}>
            El daño que otros no ven, <span style={{ color: CLAY }}>aquí sí.</span>
          </h1>
          <p style={{ color: MUT, fontSize: "1.15rem", lineHeight: 1.55, margin: "20px 0 0", maxWidth: 480 }}>
            Equipo con experiencia desde 2021 y más de 2.000 órdenes de servicio. Te explicamos qué tiene tu carro, sin tecnicismos ni sustos.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <a style={{ display: "inline-flex", alignItems: "center", gap: 9, background: CLAY, color: "#fff", padding: "14px 22px", borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              <CalendarCheck size={18} /> Agendar servicio
            </a>
            <a style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "transparent", border: `1.5px solid ${TEAL}`, color: TEAL, padding: "14px 22px", borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", boxShadow: "0 30px 60px -30px rgba(42,36,28,0.5)" }}>
            <Image src="/services/diagnostico.jpg" alt="Equipo de Multidiagnósticos AS" width={800} height={760} style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ position: "absolute", bottom: -18, left: -10, background: TEAL, color: "#fff", padding: "12px 18px", borderRadius: 14, fontWeight: 700 }}>
            +2.000 órdenes
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dirección 3: Industrial brillante ---------- */
function DirIndustrial() {
  const BG = "#FAFAF7", INK = "#141414", MUT = "#5C5C5A", ACC = "#2D5BFF", LINE = "#E4E4DF";
  return (
    <section style={{ background: BG, color: INK, fontFamily: "var(--f-archivo)", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: "0.1em", color: MUT, textTransform: "uppercase" }}>
          <span style={{ width: 8, height: 8, background: ACC, borderRadius: 2 }} /> Desde 2021 — Sabanalarga, Atlántico
        </div>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(2.8rem,8vw,6rem)", lineHeight: 0.92, letterSpacing: "-0.02em", textTransform: "uppercase", margin: "18px 0 0" }}>
          Encontramos<br />la falla que<br /><span style={{ color: ACC }}>otros no.</span>
        </h1>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginTop: 28 }}>
          <a style={{ display: "inline-flex", alignItems: "center", gap: 9, background: ACC, color: "#fff", padding: "15px 26px", borderRadius: 6, fontWeight: 800, fontSize: 15, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Agendar diagnóstico <ArrowUpRight size={18} />
          </a>
          <a style={{ display: "inline-flex", alignItems: "center", gap: 9, color: INK, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            <MessageCircle size={18} /> Escríbenos por WhatsApp
          </a>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginLeft: "auto", color: MUT, fontWeight: 600, fontSize: 14 }}>
            <ShieldCheck size={16} color={ACC} /> +2.000 órdenes · garantía
          </span>
        </div>
        <div style={{ marginTop: 30, borderTop: `2px solid ${INK}`, paddingTop: 14, display: "flex", gap: 28, flexWrap: "wrap", fontFamily: "ui-monospace, monospace", fontSize: 12, color: MUT, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          <span>Escáner X-431</span><span>Frenos</span><span>Suspensión</span><span>Inyectores</span><span>Motores</span>
        </div>
      </div>
    </section>
  );
}

export default function DireccionesPage() {
  return (
    <main className={`${manrope.variable} ${bricolage.variable} ${archivo.variable}`} style={{ background: "#fff" }}>
      <style>{`@media (max-width: 760px){ .caribe-grid{ grid-template-columns: 1fr !important; } }`}</style>
      <Label n="01" name="Verde confianza" note="Verde esmeralda · limpio y profesional · raro en talleres = te diferencia" />
      <DirVerde />
      <Label n="02" name="Caribe cálido" note="Arena + terracota + teal · humano y cercano · foto del equipo al frente" />
      <DirCaribe />
      <Label n="03" name="Industrial brillante" note="Blanco + azul eléctrico · tipografía gigante tipo cartel · audaz y directo" />
      <DirIndustrial />
      <div style={{ height: 60, background: "#16140F" }} />
    </main>
  );
}
