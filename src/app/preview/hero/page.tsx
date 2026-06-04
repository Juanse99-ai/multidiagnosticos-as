import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import {
  CalendarCheck, MessageCircle, ArrowUpRight, ArrowRight, ShieldCheck,
  Gauge, ScanSearch, Cpu, CarFront, Disc3, Droplets, Cog, Wrench,
  Filter, Battery, Zap, CircuitBoard, MapPin, Phone, Mail, Clock,
} from "lucide-react";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--f-archivo" });

export const metadata: Metadata = { title: "Preview Industrial — Multidiagnósticos AS", robots: { index: false, follow: false } };

const CATS = [
  { t: "Filtros", Icon: Filter }, { t: "Baterías", Icon: Battery }, { t: "Lubricantes", Icon: Droplets },
  { t: "Bujías", Icon: Zap }, { t: "Bobinas", Icon: CircuitBoard },
];
const PROMOS = [
  { t: "Diagnóstico computarizado", d: "Escaneo completo con equipo de última tecnología." },
  { t: "Cambio de aceite + filtro", d: "Aceite sintético 5W-30 + filtro. Hasta 10.000 km." },
  { t: "Check-up completo", d: "30 puntos de inspección, con informe detallado." },
  { t: "Revisión freno ABS", d: "Diagnóstico del sistema ABS, pastillas y discos." },
  { t: "Kit de distribución", d: "Correa o cadena, tensor y bomba de agua." },
];
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
const PARTS = [
  { n: "Batería Bosch S4", img: "/bosch.png" }, { n: "Batería Tudor", img: "/tudor.png" },
  { n: "Aceite sintético", img: "/generic.png" }, { n: "Filtro de aceite", img: "/generic.png" },
];
const BRANDS = ["bosch", "castrol", "mobil", "varta", "denso", "valvoline", "acdelco", "shell", "mahle", "wd40", "gates"];
const BRAND_NAMES: Record<string, string> = { bosch: "Bosch", castrol: "Castrol", mobil: "Mobil", varta: "Varta", denso: "Denso", valvoline: "Valvoline", acdelco: "ACDelco", shell: "Shell", mahle: "MAHLE", wd40: "WD-40", gates: "Gates" };

const CSS = `
header, footer, [class*="whatsapp" i] { display: none !important; }
.ind { --bg:#FAFAF7; --ink:#141414; --mut:#5C5C5A; --acc:#2D5BFF; --line:#E4E4DF; --acc-d:#1E45D8; --ink2:#1d1d1d;
  font-family: var(--f-archivo), system-ui, sans-serif; background: var(--bg); color: var(--ink); }
.ind a { text-decoration: none; color: inherit; }
.ind .wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.ind .mono { font-family: ui-monospace, "SF Mono", Menlo, monospace; }
.ind-sec { padding: 60px 0; }
.ind-kick2 { font-family: ui-monospace, monospace; font-size: 12px; letter-spacing: 0.1em; color: var(--acc); text-transform: uppercase; display:inline-flex; align-items:center; gap:8px; }
.ind-kick2 .sq { width: 8px; height: 8px; background: var(--acc); border-radius: 2px; }
.ind-h2 { font-weight: 900; font-size: clamp(1.9rem, 4.6vw, 3.2rem); line-height: 0.96; letter-spacing: -0.02em; text-transform: uppercase; margin: 12px 0 0; }
.ind-h2 .blue { color: var(--acc); }

.ind-header { position: sticky; top: 0; z-index: 20; background: rgba(250,250,247,0.92); backdrop-filter: blur(8px); border-bottom: 2px solid var(--ink); }
.ind-header .bar { display: flex; align-items: center; gap: 20px; padding: 14px 24px; max-width: 1080px; margin: 0 auto; }
.ind-logo { height: 30px; width: auto; }
.ind-nav { display: flex; gap: 22px; margin-left: auto; }
.ind-nav a { font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--mut); }
.ind-nav a:hover { color: var(--ink); }
.ind-cta { display: inline-flex; align-items: center; gap: 8px; background: var(--acc); color: #fff !important; padding: 10px 18px; border-radius: 6px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.03em; }
.ind-cta:hover { background: var(--acc-d); }

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

/* Categorías */
.ind-cats { display: grid; grid-template-columns: repeat(5, 1fr); border-top: 2px solid var(--ink); border-left: 2px solid var(--ink); margin-top: 30px; }
.ind-cat { border-right: 2px solid var(--ink); border-bottom: 2px solid var(--ink); padding: 24px 18px; display: flex; flex-direction: column; gap: 10px; background: var(--bg); transition: background 0.15s; }
.ind-cat:hover { background: #fff; }
.ind-cat .nm { font-weight: 800; text-transform: uppercase; font-size: 0.95rem; }
.ind-cat .go { margin-top: auto; color: var(--acc); font-size: 12px; font-weight: 700; text-transform: uppercase; display: inline-flex; align-items: center; gap: 5px; }

/* Promociones */
.ind-promos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 30px; }
.ind-promo { border: 2px solid var(--ink); border-radius: 6px; padding: 20px; background: #fff; display: flex; flex-direction: column; }
.ind-promo .pk { font-family: ui-monospace, monospace; font-size: 11px; color: var(--acc); text-transform: uppercase; letter-spacing: 0.08em; }
.ind-promo h3 { font-weight: 800; text-transform: uppercase; font-size: 1.05rem; margin: 10px 0 6px; line-height: 1.05; }
.ind-promo p { color: var(--mut); font-size: 13px; line-height: 1.45; margin: 0 0 16px; }
.ind-promo a { margin-top: auto; color: var(--acc); font-weight: 700; font-size: 13px; text-transform: uppercase; display: inline-flex; align-items: center; gap: 6px; }

/* Servicios */
.ind-grid { margin-top: 30px; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 2px solid var(--ink); border-left: 2px solid var(--ink); }
.ind-cell { border-right: 2px solid var(--ink); border-bottom: 2px solid var(--ink); padding: 22px; min-height: 168px; display: flex; flex-direction: column; background: var(--bg); transition: background 0.15s; }
.ind-cell:hover { background: #fff; }
.ind-cell .top { display: flex; align-items: center; justify-content: space-between; }
.ind-cell .num { font-size: 13px; color: var(--acc); font-weight: 700; }
.ind-cell h3 { font-weight: 800; font-size: 1.02rem; text-transform: uppercase; margin: 16px 0 6px; line-height: 1.1; }
.ind-cell p { color: var(--mut); font-size: 13px; line-height: 1.45; margin: 0; }

.ind-trust { background: var(--acc); color: #fff; }
.ind-trust .grid2 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 40px 24px; max-width: 1080px; margin: 0 auto; }
.ind-trust .n { font-weight: 900; font-size: clamp(2rem, 4.5vw, 3.2rem); line-height: 1; }
.ind-trust .l { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.85; margin-top: 6px; }

/* Autopartes */
.ind-parts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 30px; }
.ind-part { border: 2px solid var(--ink); border-radius: 6px; background: #fff; overflow: hidden; }
.ind-part .ph { height: 150px; display: grid; place-items: center; background: #fff; border-bottom: 2px solid var(--ink); }
.ind-part .ph img { max-height: 120px; max-width: 80%; object-fit: contain; }
.ind-part .nm { padding: 12px 14px; font-weight: 700; font-size: 0.92rem; }

/* Marcas */
.ind-brands { display: grid; grid-template-columns: repeat(6, 1fr); border-top: 2px solid var(--ink); border-left: 2px solid var(--ink); margin-top: 30px; }
.ind-brand { border-right: 2px solid var(--ink); border-bottom: 2px solid var(--ink); height: 96px; display: grid; place-items: center; background: #fff; padding: 14px; }
.ind-brand img { max-height: 42px; max-width: 80%; object-fit: contain; }

/* Agendar */
.ind-book { background: var(--ink); color: #EDEDEA; }
.ind-book .in { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; padding: 56px 24px; max-width: 1080px; margin: 0 auto; align-items: center; }
.ind-book h2 { font-weight: 900; font-size: clamp(2rem, 4.6vw, 3.2rem); text-transform: uppercase; line-height: 0.96; margin: 12px 0 0; }
.ind-book h2 .blue { color: #6E8BFF; }
.ind-book p { color: #ADADA8; margin: 16px 0 0; max-width: 380px; }
.ind-form { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ind-form .f { display: flex; flex-direction: column; gap: 6px; }
.ind-form .f.full { grid-column: 1 / -1; }
.ind-form label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #8C8C88; }
.ind-form input, .ind-form select { background: #1f1f1f; border: 1.5px solid #34342f; color: #fff; border-radius: 6px; padding: 11px 12px; font: inherit; font-size: 14px; }
.ind-form input:focus, .ind-form select:focus { outline: none; border-color: var(--acc); }
.ind-form .submit { grid-column: 1 / -1; display: inline-flex; align-items: center; justify-content: center; gap: 9px; background: var(--acc); color: #fff; border: 0; padding: 14px; border-radius: 6px; font-weight: 800; text-transform: uppercase; cursor: pointer; }

/* Contacto */
.ind-contact { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 30px; }
.ind-ccard { border: 2px solid var(--ink); border-radius: 6px; padding: 22px; background: #fff; }
.ind-ccard .ic { color: var(--acc); }
.ind-ccard h4 { text-transform: uppercase; font-size: 12px; letter-spacing: 0.08em; color: var(--mut); margin: 12px 0 6px; }
.ind-ccard .v { font-weight: 700; }

.ind-footer { background: var(--ink); color: #E9E9E6; }
.ind-footer .top { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 30px; padding: 50px 24px 34px; max-width: 1080px; margin: 0 auto; }
.ind-footer .big { font-weight: 900; font-size: clamp(1.6rem, 4vw, 2.6rem); text-transform: uppercase; line-height: 0.98; letter-spacing: -0.01em; }
.ind-footer .big .blue { color: #6E8BFF; }
.ind-footer .fcta { display: inline-flex; align-items: center; gap: 9px; background: var(--acc); color: #fff !important; padding: 13px 22px; border-radius: 6px; font-weight: 800; font-size: 14px; text-transform: uppercase; margin-top: 18px; }
.ind-footer h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8C8C88; margin: 0 0 12px; }
.ind-footer .row { display: flex; align-items: center; gap: 9px; font-size: 14px; margin-bottom: 9px; color: #C9C9C5; }
.ind-footer .bottom { border-top: 1px solid #2A2A28; padding: 16px 24px; max-width: 1080px; margin: 0 auto; display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 12.5px; color: #8C8C88; }
.ind-footer .bottom .veta b { color: #6E8BFF; }

@media (max-width: 860px) {
  .ind-hero .grid { grid-template-columns: 1fr; } .ind-photo { height: 300px; order: -1; }
  .ind-nav { display: none; }
  .ind-cats { grid-template-columns: repeat(2, 1fr); } .ind-promos { grid-template-columns: 1fr; }
  .ind-grid { grid-template-columns: repeat(2, 1fr); } .ind-parts { grid-template-columns: repeat(2, 1fr); }
  .ind-brands { grid-template-columns: repeat(3, 1fr); } .ind-trust .grid2 { grid-template-columns: repeat(2, 1fr); }
  .ind-book .in { grid-template-columns: 1fr; } .ind-contact { grid-template-columns: 1fr; } .ind-footer .top { grid-template-columns: 1fr; }
}
`;

function SecHead({ k, a, b }: { k: string; a: string; b: string }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <span className="ind-kick2"><span className="sq" /> {k}</span>
      <h2 className="ind-h2">{a} <span className="blue">{b}</span></h2>
    </div>
  );
}

export default function PreviewIndustrial() {
  return (
    <div className={archivo.variable}>
      <style>{CSS}</style>
      <div className="ind">
        {/* Header */}
        <div className="ind-header">
          <div className="bar">
            <img src="/logo.png" alt="Multidiagnósticos AS" className="ind-logo" />
            <nav className="ind-nav"><a href="#">Taller</a><a href="#">Autopartes</a><a href="#">Agendar</a><a href="#">Contacto</a></nav>
            <a className="ind-cta" href="#"><CalendarCheck size={16} /> Agendar</a>
          </div>
        </div>

        {/* Hero con foto */}
        <section className="ind-hero"><div className="wrap"><div className="grid">
          <div>
            <span className="ind-kick mono"><span className="sq" /> Desde 2021 — Sabanalarga</span>
            <h1 className="ind-h1">Encontramos la falla que <span className="blue">otros no.</span></h1>
            <p className="ind-sub">Diagnóstico computarizado, mantenimiento y autopartes. Con los mejores equipos y más de 2.000 órdenes de servicio.</p>
            <div className="ind-actions">
              <a className="ind-btn" href="#">Agendar diagnóstico <ArrowUpRight size={18} /></a>
              <a className="ind-btn-ghost" href="#"><MessageCircle size={18} /> WhatsApp</a>
            </div>
            <div className="ind-tags mono"><span>+2.000 órdenes</span><span>Garantía</span><span>Mazda · Renault · Chevrolet · Ford</span></div>
          </div>
          <div className="ind-photo">
            <img src="/services/diagnostico.jpg" alt="Taller Multidiagnósticos AS" />
            <span className="ptag">LAUNCH X-431 · OBD-II</span>
            <span className="pnote">Foto de ejemplo — va tu foto real</span>
          </div>
        </div></div></section>

        {/* Categorías */}
        <section className="ind-sec"><div className="wrap">
          <SecHead k="Autopartes" a="Categorías de" b="repuestos." />
          <div className="ind-cats">
            {CATS.map((c) => (
              <div className="ind-cat" key={c.t}>
                <c.Icon size={24} color="#2D5BFF" strokeWidth={2} />
                <span className="nm">{c.t}</span>
                <span className="go">Ver <ArrowRight size={13} /></span>
              </div>
            ))}
          </div>
        </div></section>

        {/* Promociones */}
        <section className="ind-sec" style={{ paddingTop: 0 }}><div className="wrap">
          <SecHead k="Ofertas" a="Promociones" b="del mes." />
          <div className="ind-promos">
            {PROMOS.slice(0, 3).map((p) => (
              <div className="ind-promo" key={p.t}>
                <span className="pk">Oferta</span><h3>{p.t}</h3><p>{p.d}</p>
                <a href="#">Consultar <ArrowUpRight size={14} /></a>
              </div>
            ))}
          </div>
        </div></section>

        {/* Servicios */}
        <section className="ind-sec" style={{ paddingTop: 0 }}><div className="wrap">
          <SecHead k="Servicios" a="Lo que hacemos" b="mejor que nadie." />
          <div className="ind-grid">
            {SERVICES.map((s) => (
              <div className="ind-cell" key={s.n}>
                <div className="top"><s.Icon size={22} color="#2D5BFF" strokeWidth={2} /><span className="num mono">{s.n}</span></div>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div></section>

        {/* Franja de confianza */}
        <section className="ind-trust"><div className="grid2">
          {[["2021", "Desde el año"], ["+2.000", "Órdenes de servicio"], ["100%", "Garantía en repuestos"], ["1.º", "Taller con web en Sabanalarga"]].map(([n, l]) => (
            <div key={l}><div className="n">{n}</div><div className="l">{l}</div></div>
          ))}
        </div></section>

        {/* Autopartes (catálogo) */}
        <section className="ind-sec"><div className="wrap">
          <SecHead k="Tienda" a="Autopartes" b="originales." />
          <div className="ind-parts">
            {PARTS.map((p) => (
              <div className="ind-part" key={p.n}>
                <div className="ph"><img src={p.img} alt={p.n} /></div>
                <div className="nm">{p.n}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22 }}><a className="ind-btn" href="#">Ver catálogo completo <ArrowRight size={16} /></a></div>
        </div></section>

        {/* Marcas que vendemos */}
        <section className="ind-sec" style={{ paddingTop: 0 }}><div className="wrap">
          <SecHead k="Respaldo" a="Marcas que" b="vendemos." />
          <div className="ind-brands">
            {BRANDS.map((b) => (
              <div className="ind-brand" key={b}><img src={`/brands/${b}.png`} alt={BRAND_NAMES[b]} /></div>
            ))}
          </div>
        </div></section>

        {/* Agendar */}
        <section className="ind-book"><div className="in">
          <div>
            <span className="ind-kick2" style={{ color: "#6E8BFF" }}><span className="sq" style={{ background: "#6E8BFF" }} /> Agenda en línea</span>
            <h2>Tu cita, <span className="blue">sin filas.</span></h2>
            <p>Reserva tu diagnóstico o mantenimiento. Te confirmamos por WhatsApp en minutos.</p>
          </div>
          <form className="ind-form" action="#">
            <div className="f full"><label>Servicio</label><select defaultValue=""><option value="" disabled>Selecciona…</option><option>Diagnóstico</option><option>Cambio de aceite</option><option>Frenos</option></select></div>
            <div className="f"><label>Fecha</label><input type="date" /></div>
            <div className="f"><label>Placa</label><input placeholder="ABC123" /></div>
            <div className="f"><label>Nombre</label><input placeholder="Tu nombre" /></div>
            <div className="f"><label>Teléfono</label><input placeholder="300 000 0000" /></div>
            <button className="submit" type="button"><MessageCircle size={16} /> Confirmar por WhatsApp</button>
          </form>
        </div></section>

        {/* Contacto */}
        <section className="ind-sec"><div className="wrap">
          <SecHead k="Contacto" a="Estamos a un" b="mensaje." />
          <div className="ind-contact">
            <div className="ind-ccard"><MapPin className="ic" size={22} /><h4>Visítanos</h4><div className="v">Cra. 27 #13-05</div><div style={{ color: "#5C5C5A" }}>Sabanalarga · Atlántico</div></div>
            <div className="ind-ccard"><Clock className="ic" size={22} /><h4>Horario</h4><div className="v">Lun–Vie 08:00–17:30</div><div style={{ color: "#5C5C5A" }}>Sábado 08:30–16:00</div></div>
            <div className="ind-ccard"><Phone className="ic" size={22} /><h4>Llámanos / WhatsApp</h4><div className="v">(+57) 300 365 1525</div><div style={{ color: "#5C5C5A" }}>contacto@multidiagnosticosas.com</div></div>
          </div>
        </div></section>

        {/* Footer */}
        <div className="ind-footer">
          <div className="top">
            <div>
              <div className="big">¿Tu carro<br />falla? <span className="blue">Hablemos.</span></div>
              <a className="fcta" href="#"><MessageCircle size={16} /> Escríbenos por WhatsApp</a>
            </div>
            <div><h4>Servicio</h4><div className="row">Sincronización · Escáner</div><div className="row">Frenos · Suspensión</div><div className="row">Motores · Inyectores</div><div className="row">Autopartes</div></div>
            <div><h4>Contacto</h4><div className="row"><MapPin size={15} color="#6E8BFF" /> Cra. 27 #13-05, Sabanalarga</div><div className="row"><Phone size={15} color="#6E8BFF" /> (+57) 300 365 1525</div><div className="row"><Mail size={15} color="#6E8BFF" /> contacto@multidiagnosticosas.com</div></div>
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
