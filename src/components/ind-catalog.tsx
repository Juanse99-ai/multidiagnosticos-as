"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Droplets, Filter, Zap, CircuitBoard, BatteryFull, Disc3, Package, type LucideIcon } from "lucide-react";

interface Product { sku: string; name: string; ref: string; price: number; category: string; image?: string }

const CATS = ["Baterías", "Aceites", "Filtros", "Bujías", "Bobinas", "Frenos"];

const CAT_ICON: Record<string, LucideIcon> = {
  "Aceites": Droplets,
  "Filtros": Filter,
  "Bujías": Zap,
  "Bobinas": CircuitBoard,
  "Baterías": BatteryFull,
  "Frenos": Disc3,
};

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
          {filtered.map((p) => {
            const Ic = CAT_ICON[p.category] ?? Package;
            return (
              <div className="ind-pcard" key={p.sku}>
                <div className="ph">
                  {p.image ? <img src={p.image} alt={p.name} /> : <Ic size={54} color="#2D5BFF" strokeWidth={1.6} aria-hidden />}
                </div>
                <div className="bd">
                  <span className="cat mono">{p.category}</span>
                  <span className="nm">{p.name}</span>
                  {p.ref && <span className="rf">{p.ref}</span>}
                  <a className="cot" href={`https://wa.me/573003651525?text=${encodeURIComponent("Hola, quiero cotizar: " + p.name + " (Ref " + p.ref + ")")}`} target="_blank" rel="noopener"><MessageCircle size={14} /> Cotizar</a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
