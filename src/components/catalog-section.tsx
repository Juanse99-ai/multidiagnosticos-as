"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Search } from "lucide-react";

interface Product {
  sku: string;
  name: string;
  ref: string;
  price: number;
  category: string;
  image?: string;
}

function fmt(n: number) {
  return `$${n.toLocaleString("es-CO")}`;
}

export function CatalogSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    fetch("/products.json")
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  // Listen for header search events
  useEffect(() => {
    const handleHeaderSearch = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setQuery(detail || "");
    };
    const handleSetCategory = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setCategory(detail || "");
    };
    window.addEventListener("header-search", handleHeaderSearch);
    window.addEventListener("set-category", handleSetCategory);
    return () => {
      window.removeEventListener("header-search", handleHeaderSearch);
      window.removeEventListener("set-category", handleSetCategory);
    };
  }, []);

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    const textMatch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.ref || "").toLowerCase().includes(q);
    const catMatch = !category || p.category === category;
    return textMatch && catMatch;
  });

  return (
    <section id="catalogo" className="py-14 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-blue mb-6">
          Tienda de Autopartes
        </h2>

        <div className="flex flex-wrap gap-3 items-center mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
          >
            <option value="">Todas</option>
            <option value="Baterías">Baterías</option>
            <option value="Aceites">Aceites</option>
            <option value="Filtros">Filtros</option>
            <option value="Bujías">Bujías</option>
            <option value="Bobinas">Bobinas</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <div
              key={p.sku}
              className="bg-white border border-border rounded-2xl p-4 flex flex-col gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-full h-[200px] bg-white border border-border rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={
                    p.image ||
                    (p.name.toLowerCase().includes("tudor")
                      ? "/tudor.png"
                      : p.name.toLowerCase().includes("bosch")
                        ? "/bosch.png"
                        : "/generic.png")
                  }
                  alt={p.name}
                  width={200}
                  height={200}
                  className="object-contain max-h-full"
                />
              </div>
              <div className="mt-2">
                <p className="font-semibold text-sm leading-tight">{p.name}</p>
                {p.ref && (
                  <p className="text-xs text-muted-foreground">{p.ref}</p>
                )}
              </div>
              <p className="font-bold text-lg">{fmt(p.price)}</p>
              <Button
                onClick={() =>
                  addItem({
                    sku: p.sku,
                    name: p.name,
                    ref: p.ref,
                    price: p.price,
                  })
                }
                className="w-full"
              >
                Agregar al carrito
              </Button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && products.length > 0 && (
          <p className="text-center text-muted-foreground py-12">
            No se encontraron productos con ese filtro.
          </p>
        )}
      </div>
    </section>
  );
}
