import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import { IndMotion } from "@/components/ind-motion";
import { getPromoImages } from "@/lib/promos";
import {
  ArrowUpRight, ArrowRight, MessageCircle,
  Gauge, ScanSearch, Cpu, CarFront, Disc3, Droplets, Cog, Wrench,
  Filter, Battery, Zap, CircuitBoard, MapPin, Phone, Clock,
} from "lucide-react";

const WA = "https://wa.me/573003651525?text=Hola,%20quisiera%20informaci%C3%B3n";
const WA_AGENDA = "https://wa.me/573003651525?text=Hola,%20quiero%20agendar%20un%20servicio";

const CATS = [
  { t: "Filtros", Icon: Filter }, { t: "Baterías", Icon: Battery }, { t: "Lubricantes", Icon: Droplets },
  { t: "Bujías", Icon: Zap }, { t: "Bobinas", Icon: CircuitBoard }, { t: "Frenos", Icon: Disc3 },
];
const PROMOS = [
  { t: "Diagnóstico computarizado", d: "Escaneo completo con equipo de última tecnología." },
  { t: "Cambio de aceite + filtro", d: "Aceite sintético 5W-30 + filtro. Hasta 10.000 km." },
  { t: "Check-up completo", d: "30 puntos de inspección, con informe detallado." },
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

function SecHead({ a, b }: { k?: string; a: string; b: string }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <h2 className="ind-h2">{a} <span className="blue">{b}</span></h2>
    </div>
  );
}

export default function Home() {
  const promoImgs = getPromoImages();
  return (
    <div className="ind">
      <IndHeader />
      <IndMotion />

      <section className="ind-hero">
        <div className="bg">
          <div className="ind-slide"><img src="/hero/taller.jpg" alt="Taller Multidiagnósticos AS: camioneta en el elevador LAUNCH" style={{ objectPosition: "center 40%", filter: "contrast(1.07) saturate(1.1) brightness(1.03)" }} /></div>
          <div className="ind-slide"><img src="/services/cambio-aceite.jpg" alt="Cambio de aceite" /></div>
          <div className="ind-slide"><img src="/cats/baterias-bg.jpg" alt="Mantenimiento y reparación" /></div>
          <div className="ind-slide"><img src="/services/suspension.jpg" alt="Suspensión" /></div>
        </div>
        <div className="scrim" />
        <div className="hero-content"><div className="wrap" data-hero-content>
          <h1 className="ind-h1">Encontramos la falla que <span className="blue">otros no.</span></h1>
          <p className="ind-sub">Diagnóstico computarizado, mantenimiento y autopartes. Con los mejores equipos y más de 2.000 órdenes de servicio.</p>
          <div className="ind-actions">
            <a className="ind-btn" href="/agendar">Agendar diagnóstico <ArrowUpRight size={18} /></a>
            <a className="ind-btn-ghost" href={WA} target="_blank" rel="noopener"><MessageCircle size={18} /> WhatsApp</a>
          </div>
        </div></div>
      </section>

      <section className="ind-sec"><div className="wrap">
        <SecHead k="Autopartes" a="Categorías de" b="repuestos." />
        <div className="ind-cats"><div className="ind-cells">
          {CATS.map((c) => (
            <a className="ind-cat" href="/autopartes" key={c.t}>
              <c.Icon size={24} color="#2D5BFF" strokeWidth={2} />
              <span className="nm">{c.t}</span>
              <span className="go">Ver <ArrowRight size={13} /></span>
            </a>
          ))}
        </div></div>
      </div></section>

      <section className="ind-sec" style={{ paddingTop: 0 }}><div className="wrap">
        <SecHead k="Ofertas" a="Promociones" b="del mes." />
        {promoImgs.length > 0 ? (
          <div className="ind-promoimgs">
            {promoImgs.map((pi) => (
              <a className="ind-promoimg" href={WA} target="_blank" rel="noopener" key={pi.index}>
                <div className="ph"><img src={pi.src} alt="Promoción de Multidiagnósticos AS" /></div>
                <span className="cta"><MessageCircle size={15} /> Consultar por WhatsApp</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="ind-promos">
            {PROMOS.map((p) => (
              <div className="ind-promo" key={p.t}>
                <span className="pk">Oferta</span><h3>{p.t}</h3><p>{p.d}</p>
                <a href={WA} target="_blank" rel="noopener">Consultar <ArrowUpRight size={14} /></a>
              </div>
            ))}
          </div>
        )}
      </div></section>

      <section className="ind-sec" id="servicios" style={{ paddingTop: 0 }}><div className="wrap">
        <SecHead k="Servicios" a="Lo que hacemos" b="mejor que nadie." />
        <div className="ind-grid"><div className="ind-cells">
          {SERVICES.map((s) => (
            <div className="ind-cell" key={s.n}>
              <div className="top"><s.Icon size={22} color="#2D5BFF" strokeWidth={2} /><span className="num mono">{s.n}</span></div>
              <h3>{s.t}</h3><p>{s.d}</p>
            </div>
          ))}
        </div></div>
      </div></section>

      <section className="ind-trust"><div className="grid2">
        {[["2021", "Desde el año"], ["+2.000", "Órdenes de servicio"], ["100%", "Garantía en repuestos"], ["#1", "Taller en Sabanalarga"]].map(([n, l]) => (
          <div key={l}><div className="n">{n}</div><div className="l">{l}</div></div>
        ))}
      </div></section>

      <section className="ind-sec" id="catalogo"><div className="wrap">
        <SecHead k="Tienda" a="Autopartes" b="originales." />
        <div className="ind-parts">
          {PARTS.map((p) => (
            <a className="ind-part" href="/autopartes" key={p.n}>
              <div className="ph"><img src={p.img} alt={p.n} /></div>
              <div className="nm">{p.n}</div>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 22 }}><a className="ind-btn" href="/autopartes">Ver catálogo completo <ArrowRight size={16} /></a></div>
      </div></section>

      <section className="ind-sec" style={{ paddingTop: 0 }}>
        <div className="wrap"><SecHead k="Respaldo" a="Marcas que" b="vendemos." /></div>
        <div className="ind-marquee">
          <div className="ind-track">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <div className="ind-bcell" key={b + i}><img src={`/brands/${b}.png`} alt={BRAND_NAMES[b]} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-book" id="agenda"><div className="in">
        <div>
          <h2>Tu cita, <span className="blue">sin filas.</span></h2>
          <p>Reserva tu diagnóstico o mantenimiento. Te confirmamos por WhatsApp en minutos.</p>
        </div>
        <form className="ind-form" action="/agendar">
          <div className="f full"><label>Servicio</label><select defaultValue=""><option value="" disabled>Selecciona…</option><option>Diagnóstico</option><option>Cambio de aceite</option><option>Frenos</option></select></div>
          <div className="f"><label>Fecha</label><input type="date" /></div>
          <div className="f"><label>Placa</label><input placeholder="ABC123" /></div>
          <div className="f"><label>Nombre</label><input placeholder="Tu nombre" /></div>
          <div className="f"><label>Teléfono</label><input placeholder="300 000 0000" /></div>
          <a className="submit" href={WA_AGENDA} target="_blank" rel="noopener"><MessageCircle size={16} /> Confirmar por WhatsApp</a>
        </form>
      </div></section>

      <section className="ind-sec" id="contacto"><div className="wrap">
        <SecHead k="Contacto" a="Estamos a un" b="mensaje." />
        <div className="ind-contact">
          <a className="ind-ccard" href="https://www.google.com/maps/search/?api=1&query=Multidiagnosticos+AS+Sabanalarga" target="_blank" rel="noopener"><MapPin className="ic" size={22} /><h4>Visítanos</h4><div className="v">Cra. 27 #13-05</div><div style={{ color: "#5C5C5A" }}>Sabanalarga · Atlántico</div></a>
          <div className="ind-ccard"><Clock className="ic" size={22} /><h4>Horario</h4><div className="v">Lun–Vie 08:00–17:30</div><div className="v">Sábado 08:30–16:00</div></div>
          <a className="ind-ccard" href={WA} target="_blank" rel="noopener"><Phone className="ic" size={22} /><h4>Llámanos / WhatsApp</h4><div className="v">(+57) 300 365 1525</div><div style={{ color: "#5C5C5A" }}>contacto@multidiagnosticosas.com</div></a>
        </div>
      </div></section>

      <IndFooter />
    </div>
  );
}
