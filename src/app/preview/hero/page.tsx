import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import {
  CalendarCheck, MessageCircle, ArrowUpRight, ShieldCheck,
  Gauge, ScanSearch, Cpu, CarFront, Disc3, Droplets, Cog, Wrench, MapPin, Phone,
} from "lucide-react";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--f-archivo" });

export const metadata: Metadata = { title: "Preview Industrial — Multidiagnósticos AS", robots: { index: false, follow: false } };

const SERVICES = [
  { n: "01", Icon: Gauge, t: "Sincronización de motor", d: "Puesta a punto para potencia y consumo correctos." },
  { n: "02", Icon: ScanSearch, t: "Escáner automotriz", d: "Lectura de fallas con equipo Launch X-431." },
  { n: "03", Icon: Cpu, t: "Reparación de computadoras", d: "Diagnóstico y reparación de módulos electrónicos." },
  { n: "04", Icon: CarFront, t: "Suspensión", d: "Amortiguadores, rótulas y dirección." },
  { n: "05", Icon: Disc3, t: "Frenos", d: "Pastillas, discos y sistema ABS." },
  { n: "06", Icon: Droplets, t: "Limpieza de inyectores", d: "Inyección limpia, mejor respuesta." },
  { n: "07", Icon: Cog, t: "Reparación de motores", d: "Fugas, consumo de aceite y ruidos." },
  { n: "08", Icon: Wrench, t: "Cambio de aceite", d: "Aceite, filtro y revisión multipunto." },
];

const CSS = `
header, footer, [class*="whatsapp" i] { display: none !important; }
.ind { --bg:#FAFAF7; --ink:#141414; --mut:#5C5C5A; --acc:#2D5BFF; --line:#E4E4DF; --acc-d:#1E45D8;
  font-family: var(--f-archivo), system-ui, sans-serif; background: var(--bg); color: var(--ink); }
.ind a { text-decoration: none; color: inherit; }
.ind .wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.ind .mono { font-family: ui-monospace, "SF Mono", Menlo, monospace; }

.ind-header { position: sticky; top: 0; z-index: 20; background: rgba(250,250,247,0.92); backdrop-filter: blur(8px); border-bottom: 2px solid var(--ink); }
.ind-header .bar { display: flex; align-items: center; gap: 20px; padding: 14px 24px; max-width: 1080px; margin: 0 auto; }
.ind-logo { height: 30px; width: auto; }
.ind-nav { display: flex; gap: 22px; margin-left: auto; }
.ind-nav a { font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--mut); }
.ind-nav a:hover { color: var(--ink); }
.ind-cta { display: inline-flex; align-items: center; gap: 8px; background: var(--acc); color: #fff !important; padding: 10px 18px; border-radius: 6px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.03em; }
.ind-cta:hover { background: var(--acc-d); }

/* Hero con FOTO grande (split) */
.ind-hero { padding: 48px 0 56px; }
.ind-hero .grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: 44px; align-items: center; }
.ind-kick { display: inline-flex; align-items: center; gap: 9px; font-size: 12px; letter-spacing: 0.12em; color: var(--mut); text-transform: uppercase; }
.ind-kick .sq { width: 8px; height: 8px; background: var(--acc); border-radius: 2px; }
.ind-h1 { font-weight: 900; font-size: clamp(2.2rem, 4.6vw, 3.7rem); line-height: 0.95; letter-spacing: -0.02em; text-transform: uppercase; margin: 16px 0 0; }
.ind-h1 .blue { color: var(--acc); }
.ind-sub { color: var(--mut); font-size: 1.1rem; line-height: 1.5; max-width: 460px; margin: 18px 0 0; }
.ind-actions { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; margin-top: 26px; }
.ind-btn { display: inline-flex; align-items: center; gap: 9px; background: var(--acc); color: #fff !important; padding: 14px 24px; border-radius: 6px; font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 0.02em; }
.ind-btn:hover { background: var(--acc-d); }
.ind-btn-ghost { display: inline-flex; align-items: center; gap: 9px; font-weight: 700; font-size: 15px; }
.ind-tags { margin-top: 26px; border-top: 2px solid var(--ink); padding-top: 12px; display: flex; gap: 22px; flex-wrap: wrap; font-size: 12px; letter-spacing: 0.05em; color: var(--mut); text-transform: uppercase; }
.ind-photo { position: relative; border: 2px solid var(--ink); border-radius: 6px; overflow: hidden; height: 460px; }
.ind-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ind-photo .ptag { position: absolute; left: 16px; bottom: 16px; background: var(--acc); color: #fff; font-family: ui-monospace, monospace; font-size: 12px; font-weight: 600; padding: 7px 13px; border-radius: 5px; }
.ind-photo .pnote { position: absolute; top: 14px; right: 14px; background: rgba(20,20,20,0.78); color: #fff; font-size: 11px; padding: 5px 10px; border-radius: 5px; }

.ind-trust { background: var(--acc); color: #fff; }
.ind-trust .grid2 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 40px 24px; max-width: 1080px; margin: 0 auto; }
.ind-trust .n { font-weight: 900; font-size: clamp(2rem, 4.5vw, 3.2rem); line-height: 1; }
.ind-trust .l { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.85; margin-top: 6px; }

.ind-services { padding: 66px 0; }
.ind-services .head { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
.ind-h2 { font-weight: 900; font-size: clamp(2rem, 5vw, 3.4rem); line-height: 0.96; letter-spacing: -0.02em; text-transform: uppercase; margin: 0; }
.ind-h2 .blue { color: var(--acc); }
.ind-grid { margin-top: 34px; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 2px solid var(--ink); border-left: 2px solid var(--ink); }
.ind-cell { border-right: 2px solid var(--ink); border-bottom: 2px solid var(--ink); padding: 22px; min-height: 168px; display: flex; flex-direction: column; background: var(--bg); transition: background 0.15s; }
.ind-cell:hover { background: #fff; }
.ind-cell .top { display: flex; align-items: center; justify-content: space-between; }
.ind-cell .num { font-size: 13px; color: var(--acc); font-weight: 700; }
.ind-cell h3 { font-weight: 800; font-size: 1.02rem; text-transform: uppercase; letter-spacing: 0.01em; margin: 16px 0 6px; line-height: 1.1; }
.ind-cell p { color: var(--mut); font-size: 13px; line-height: 1.45; margin: 0; }

.ind-next { padding: 18px 0 8px; }
.ind-next .box { border: 2px dashed var(--line); border-radius: 8px; padding: 22px; text-align: center; color: var(--mut); }
.ind-next b { color: var(--ink); }

.ind-footer { background: var(--ink); color: #E9E9E6; margin-top: 30px; }
.ind-footer .top { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 30px; padding: 50px 24px 34px; max-width: 1080px; margin: 0 auto; }
.ind-footer .big { font-weight: 900; font-size: clamp(1.6rem, 4vw, 2.6rem); text-transform: uppercase; line-height: 0.98; letter-spacing: -0.01em; }
.ind-footer .big .blue { color: #6E8BFF; }
.ind-footer .fcta { display: inline-flex; align-items: center; gap: 9px; background: var(--acc); color: #fff !important; padding: 13px 22px; border-radius: 6px; font-weight: 800; font-size: 14px; text-transform: uppercase; margin-top: 18px; }
.ind-footer h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8C8C88; margin: 0 0 12px; }
.ind-footer .row { display: flex; align-items: center; gap: 9px; font-size: 14px; margin-bottom: 9px; color: #C9C9C5; }
.ind-footer .bottom { border-top: 1px solid #2A2A28; padding: 16px 24px; max-width: 1080px; margin: 0 auto; display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 12.5px; color: #8C8C88; }
.ind-footer .bottom .veta b { color: #6E8BFF; }

@media (max-width: 860px) {
  .ind-hero .grid { grid-template-columns: 1fr; }
  .ind-photo { height: 300px; order: -1; }
  .ind-nav { display: none; }
  .ind-trust .grid2 { grid-template-columns: repeat(2, 1fr); }
  .ind-grid { grid-template-columns: repeat(2, 1fr); }
  .ind-footer .top { grid-template-columns: 1fr; }
}
`;

export default function PreviewIndustrial() {
  return (
    <div className={archivo.variable}>
      <style>{CSS}</style>
      <div className="ind">
        <div className="ind-header">
          <div className="bar">
            <img src="/logo.png" alt="Multidiagnósticos AS" className="ind-logo" />
            <nav className="ind-nav"><a href="#">Taller</a><a href="#">Autopartes</a><a href="#">Agendar</a><a href="#">Contacto</a></nav>
            <a className="ind-cta" href="#"><CalendarCheck size={16} /> Agendar</a>
          </div>
        </div>

        {/* Hero con foto grande del taller */}
        <section className="ind-hero">
          <div className="wrap">
            <div className="grid">
              <div>
                <span className="ind-kick mono"><span className="sq" /> Desde 2021 — Sabanalarga</span>
                <h1 className="ind-h1">Encontramos la falla que <span className="blue">otros no.</span></h1>
                <p className="ind-sub">Diagnóstico computarizado, mantenimiento y autopartes. Con los mejores equipos y más de 2.000 órdenes de servicio.</p>
                <div className="ind-actions">
                  <a className="ind-btn" href="#">Agendar diagnóstico <ArrowUpRight size={18} /></a>
                  <a className="ind-btn-ghost" href="#"><MessageCircle size={18} /> WhatsApp</a>
                </div>
                <div className="ind-tags mono">
                  <span>+2.000 órdenes</span><span>Garantía</span><span>Mazda · Renault · Chevrolet · Ford</span>
                </div>
              </div>
              <div className="ind-photo">
                <img src="/services/diagnostico.jpg" alt="Taller Multidiagnósticos AS" />
                <span className="ptag">LAUNCH X-431 · OBD-II</span>
                <span className="pnote">Foto de ejemplo — va tu foto real</span>
              </div>
            </div>
          </div>
        </section>

        {/* Franja de confianza */}
        <section className="ind-trust">
          <div className="grid2">
            {[["2021", "Desde el año"], ["+2.000", "Órdenes de servicio"], ["100%", "Garantía en repuestos"], ["1.º", "Taller con web en Sabanalarga"]].map(([n, l]) => (
              <div key={l}><div className="n">{n}</div><div className="l">{l}</div></div>
            ))}
          </div>
        </section>

        {/* Servicios */}
        <section className="ind-services">
          <div className="wrap">
            <div className="head">
              <h2 className="ind-h2">Lo que hacemos<br /><span className="blue">mejor que nadie.</span></h2>
              <span className="mono" style={{ color: "#5C5C5A", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>8 servicios · 1 equipo</span>
            </div>
            <div className="ind-grid">
              {SERVICES.map((s) => (
                <div className="ind-cell" key={s.n}>
                  <div className="top"><s.Icon size={22} color="#2D5BFF" strokeWidth={2} /><span className="num mono">{s.n}</span></div>
                  <h3>{s.t}</h3><p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nota: las demás secciones se conservan (se restilizan igual) */}
        <section className="ind-next">
          <div className="wrap">
            <div className="box">Aquí siguen, en este mismo estilo: <b>Categorías</b> · <b>Promociones</b> · <b>Autopartes (catálogo)</b> · <b>Agendar</b> · <b>Marcas que vendemos</b> · <b>Contacto</b>. No se quita ninguna.</div>
          </div>
        </section>

        {/* Footer a juego */}
        <div className="ind-footer">
          <div className="top">
            <div>
              <div className="big">¿Tu carro<br />falla? <span className="blue">Hablemos.</span></div>
              <a className="fcta" href="#"><MessageCircle size={16} /> Escríbenos por WhatsApp</a>
            </div>
            <div>
              <h4>Servicio</h4>
              <div className="row">Sincronización · Escáner</div>
              <div className="row">Frenos · Suspensión</div>
              <div className="row">Motores · Inyectores</div>
              <div className="row">Autopartes</div>
            </div>
            <div>
              <h4>Contacto</h4>
              <div className="row"><MapPin size={15} color="#6E8BFF" /> Cra. 27 #13-05, Sabanalarga</div>
              <div className="row"><Phone size={15} color="#6E8BFF" /> (+57) 300 365 1525</div>
              <div className="row mono" style={{ fontSize: 12.5 }}>Lun–Vie 08:00–17:30 · Sáb 08:30–16:00</div>
            </div>
          </div>
          <div className="bottom">
            <span>© 2026 Multidiagnósticos AS. Todos los derechos reservados.</span>
            <span className="veta">Diseño y desarrollo · <b>Veta Studio</b></span>
          </div>
        </div>
      </div>
    </div>
  );
}
