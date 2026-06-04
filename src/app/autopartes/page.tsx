import type { Metadata } from "next";
import { IndHeader } from "@/components/ind-header";
import { IndFooter } from "@/components/ind-footer";
import { IndCatalog } from "@/components/ind-catalog";
import { ArrowUpRight, MessageCircle, Filter, Battery, Droplets, Zap, CircuitBoard } from "lucide-react";

export const metadata: Metadata = {
  title: "Autopartes y Repuestos | Multidiagnósticos AS",
  description:
    "Baterías, aceites, filtros, bujías y bobinas de las mejores marcas. Cotiza por WhatsApp y recoge en Sabanalarga o te lo enviamos.",
};

const WA = "https://wa.me/573003651525?text=Hola,%20quisiera%20información%20sobre%20repuestos";
const CATS = [
  { t: "Filtros", Icon: Filter }, { t: "Baterías", Icon: Battery }, { t: "Lubricantes", Icon: Droplets },
  { t: "Bujías", Icon: Zap }, { t: "Bobinas", Icon: CircuitBoard },
];
const BRANDS = ["bosch", "castrol", "mobil", "varta", "denso", "valvoline", "acdelco", "shell", "mahle", "wd40", "gates"];
const BRAND_NAMES: Record<string, string> = { bosch: "Bosch", castrol: "Castrol", mobil: "Mobil", varta: "Varta", denso: "Denso", valvoline: "Valvoline", acdelco: "ACDelco", shell: "Shell", mahle: "MAHLE", wd40: "WD-40", gates: "Gates" };

export default function AutopartesPage() {
  return (
    <div className="ind">
      <IndHeader />

      <section className="ind-hero"><div className="wrap"><div className="grid">
        <div>
          <span className="ind-kick mono"><span className="sq" /> Tienda · Sabanalarga</span>
          <h1 className="ind-h1">Autopartes <span className="blue">originales.</span></h1>
          <p className="ind-sub">Baterías, aceites, filtros, bujías y bobinas de las mejores marcas. Cotiza por WhatsApp y recoge en el taller o te lo enviamos.</p>
          <div className="ind-actions">
            <a className="ind-btn" href="#catalogo">Ver catálogo <ArrowUpRight size={18} /></a>
            <a className="ind-btn-ghost" href={WA} target="_blank" rel="noopener"><MessageCircle size={18} /> WhatsApp</a>
          </div>
          <div className="ind-tags mono"><span>Marcas reconocidas</span><span>Envío o retiro</span><span>Garantía</span></div>
        </div>
        <div className="ind-photo">
          <div className="ind-slide" style={{ animation: "none", opacity: 1 }}><img src="/cats/baterias-bg.jpg" alt="Autopartes Multidiagnósticos AS" /><span className="ptag">Repuestos originales</span></div>
        </div>
      </div></div></section>

      <section className="ind-sec" style={{ paddingTop: 24 }}><div className="wrap">
        <div style={{ marginBottom: 4 }}>
          <span className="ind-kick2"><span className="sq" /> Categorías</span>
          <h2 className="ind-h2">Encuentra tu <span className="blue">repuesto.</span></h2>
        </div>
        <div className="ind-cats">
          {CATS.map((c) => (
            <a className="ind-cat" href="#catalogo" key={c.t}>
              <c.Icon size={24} color="#2D5BFF" strokeWidth={2} />
              <span className="nm">{c.t}</span>
              <span className="go">Ver</span>
            </a>
          ))}
        </div>
      </div></section>

      <section className="ind-sec" id="catalogo" style={{ paddingTop: 0 }}><div className="wrap">
        <div style={{ marginBottom: 4 }}>
          <span className="ind-kick2"><span className="sq" /> Catálogo</span>
          <h2 className="ind-h2">Productos <span className="blue">destacados.</span></h2>
        </div>
        <IndCatalog />
      </div></section>

      <section className="ind-sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="ind-kick2"><span className="sq" /> Respaldo</span>
          <h2 className="ind-h2">Marcas que <span className="blue">vendemos.</span></h2>
        </div>
        <div className="ind-marquee">
          <div className="ind-track">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <div className="ind-bcell" key={b + i}><img src={`/brands/${b}.png`} alt={BRAND_NAMES[b]} /></div>
            ))}
          </div>
        </div>
      </section>

      <IndFooter />
    </div>
  );
}
