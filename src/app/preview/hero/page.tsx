import type { Metadata } from "next";
import Image from "next/image";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import {
  CalendarCheck, MessageCircle, ArrowRight, Star, ShieldCheck,
  Gauge, ScanSearch, Cpu, CarFront, Disc3, Droplets, Cog, Wrench,
} from "lucide-react";

const grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-grotesk",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-tech",
});

export const metadata: Metadata = {
  title: "Preview — Multidiagnósticos AS (rediseño)",
  robots: { index: false, follow: false },
};

const BG = "#F7F5F1";
const CARD = "#FCFBF8";
const INK = "#1A1714";
const MUTED = "#6B635A";
const LINE = "#E6E1D8";
const ACCENT = "#E0202C";

const MONO = "var(--font-mono-tech)";

function Hero() {
  return (
    <section style={{ backgroundColor: BG, color: INK }} className="overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-24">
        <p style={{ fontFamily: MONO, color: ACCENT }} className="text-[11px] md:text-xs uppercase tracking-[0.22em] font-medium">
          Desde 2021 — Sabanalarga, Atlántico
        </p>

        <h1 className="mt-5 font-extrabold tracking-[-0.03em] leading-[0.97] max-w-4xl" style={{ fontSize: "clamp(2.6rem, 7vw, 5.4rem)" }}>
          Encontramos la falla
          <br />
          que otros <span style={{ color: ACCENT }}>no encuentran.</span>
        </h1>

        <p className="mt-7 text-lg md:text-xl leading-relaxed max-w-xl" style={{ color: MUTED }}>
          Diagnóstico computarizado, mantenimiento y autopartes en Sabanalarga.
          Con los mejores equipos y más de 2.000 órdenes de servicio.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#" style={{ backgroundColor: ACCENT, color: "#fff" }} className="inline-flex items-center gap-2.5 rounded-full pl-6 pr-5 py-3.5 text-[15px] font-semibold transition-transform duration-200 hover:scale-[0.98]">
            <CalendarCheck className="w-[18px] h-[18px]" strokeWidth={2} />
            Agendar diagnóstico
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </a>
          <a href="#" style={{ borderColor: LINE, color: INK }} className="inline-flex items-center gap-2.5 rounded-full border bg-transparent pl-5 pr-6 py-3.5 text-[15px] font-semibold transition-colors duration-200 hover:bg-black/[0.03]">
            <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2} />
            Escríbenos por WhatsApp
          </a>
        </div>

        <div className="mt-14 relative">
          <div className="relative overflow-hidden rounded-3xl border" style={{ borderColor: LINE }}>
            <Image
              src="/services/diagnostico.jpg"
              alt="Técnico de Multidiagnósticos AS realizando un diagnóstico computarizado con escáner Launch X-431"
              width={1600}
              height={900}
              className="w-full h-[280px] md:h-[460px] object-cover"
              priority
            />
            <span style={{ fontFamily: MONO, backgroundColor: CARD, borderColor: LINE, color: INK }} className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium shadow-sm">
              <span style={{ width: 7, height: 7, borderRadius: 99, backgroundColor: ACCENT, display: "inline-block" }} />
              LAUNCH X-431 · OBD-II
            </span>
          </div>
          <div className="absolute -bottom-6 right-4 md:right-8 rounded-2xl border px-5 py-4 shadow-[0_18px_40px_-18px_rgba(26,23,20,0.35)]" style={{ backgroundColor: CARD, borderColor: LINE }}>
            <p style={{ fontFamily: MONO, color: MUTED }} className="text-[10px] uppercase tracking-[0.18em]">Órdenes de servicio</p>
            <p className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: INK }}>+2.000</p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-3">
          <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: INK }}>
            <Star className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={2} fill={ACCENT} />
            Reseñas reales en Google
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: INK }}>
            <ShieldCheck className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={2} />
            Garantía en repuestos
          </span>
          <span style={{ fontFamily: MONO, color: MUTED }} className="text-xs uppercase tracking-[0.18em]">
            Mazda · Renault · Chevrolet · Ford
          </span>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { big: "2021", label: "Año de apertura" },
  { big: "+2.000", label: "Órdenes de servicio" },
  { big: "100%", label: "Garantía en repuestos" },
  { big: "1.º", label: "Taller con web en Sabanalarga" },
];

function TrustBand() {
  return (
    <section style={{ backgroundColor: INK, color: BG }}>
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em]">{s.big}</p>
            <p style={{ fontFamily: MONO, color: "#B8AEA2" }} className="mt-2 text-[11px] uppercase tracking-[0.16em]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const SERVICES = [
  { n: "01", icon: Gauge, name: "Sincronización de motor", desc: "Puesta a punto para potencia y consumo correctos." },
  { n: "02", icon: ScanSearch, name: "Escáner automotriz", desc: "Lectura de fallas con equipo Launch X-431." },
  { n: "03", icon: Cpu, name: "Reparación de computadoras", desc: "Diagnóstico y reparación de módulos electrónicos." },
  { n: "04", icon: CarFront, name: "Suspensión", desc: "Amortiguadores, rótulas y dirección." },
  { n: "05", icon: Disc3, name: "Frenos", desc: "Pastillas, discos y revisión del sistema ABS." },
  { n: "06", icon: Droplets, name: "Limpieza de inyectores", desc: "Inyección limpia para mejor respuesta." },
  { n: "07", icon: Cog, name: "Reparación de motores", desc: "Fugas, consumo de aceite y ruidos anormales." },
  { n: "08", icon: Wrench, name: "Cambio de aceite", desc: "Aceite, filtro y revisión multipunto." },
];

function Services() {
  return (
    <section style={{ backgroundColor: BG, color: INK }}>
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28">
        <p style={{ fontFamily: MONO, color: ACCENT }} className="text-[11px] md:text-xs uppercase tracking-[0.22em] font-medium">
          Servicios
        </p>
        <h2 className="mt-4 font-extrabold tracking-[-0.03em] leading-[1.0] max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
          Lo que hacemos <span style={{ color: ACCENT }}>mejor que nadie.</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: MUTED }}>
          Ocho frentes cubiertos con equipos de alta gama. Si no ves lo que buscas, escríbenos por WhatsApp.
        </p>

        <div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border rounded-2xl overflow-hidden"
          style={{ borderColor: LINE, gap: 1, backgroundColor: LINE }}
        >
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} style={{ backgroundColor: CARD }} className="group p-6 md:p-7 transition-colors duration-200 hover:bg-white">
                <div className="flex items-center justify-between">
                  <span className="grid place-items-center w-10 h-10 rounded-xl" style={{ backgroundColor: "rgba(224,32,44,0.08)" }}>
                    <Icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
                  </span>
                  <span style={{ fontFamily: MONO, color: MUTED }} className="text-xs">{s.n}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug" style={{ color: INK }}>{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function PreviewPage() {
  return (
    <main className={`${grotesk.variable} ${mono.variable}`} style={{ fontFamily: "var(--font-grotesk)", backgroundColor: BG }}>
      <Hero />
      <TrustBand />
      <Services />
    </main>
  );
}
