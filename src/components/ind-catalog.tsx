"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

interface Product { sku: string; name: string; ref: string; price: number; category: string; image?: string }
const CATS = ["Baterías", "Aceites", "Filtros", "Bujías", "Bobinas"];

function imgFor(p: Product) {
  if (p.image) return p.image;
  const n = p.name.toLowerCase();
  if (n.includes("tudor")) return "/tudor.png";
  if (n.includes("bosch")) return "/bosch.png";
  return "/generic.png";
}

export function IndCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  useEffect(() => {
    fetch("/products.json").then((r) => r.json()).then(setProducts).catch(() => {});
  }, []);

  const filtered = products.filter((p) => {
    const t = q.toLowerCase();
    const tm = !t || p.name.toLowerCase().includes(t) || (p.ref || "").toLowerCase().includes(t);
    const cm = !cat || p.category === cat;
    return tm && cm;
  });

  return (
    <>
      <div className="ind-filters">
        <input placeholder="Buscar repuesto…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar repuesto" />
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Categoría">
          <option value="">Todas las categorías</option>
          {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {filtered.length === 0 ? (
        <p className="ind-empty">{products.length ? "No encontramos repuestos con ese filtro." : "Cargando catálogo…"}</p>
      ) : (
        <div className="ind-cgrid">
          {filtered.map((p) => (
            <div className="ind-pcard" key={p.sku}>
              <div className="ph"><img src={imgFor(p)} alt={p.name} /></div>
              <div className="bd">
                <span className="nm">{p.name}</span>
                {p.ref && <span className="rf">{p.ref}</span>}
                <a className="cot" href={`https://wa.me/573003651525?text=${encodeURIComponent("Hola, quiero cotizar: " + p.name)}`} target="_blank" rel="noopener"><MessageCircle size={14} /> Cotizar</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
