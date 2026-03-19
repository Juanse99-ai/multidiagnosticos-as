"use client";

import Image from "next/image";
import { Filter, Battery, Droplets, Zap, CircuitBoard } from "lucide-react";

const categories = [
  {
    name: "Filtros",
    icon: Filter,
    img: "/cats/filtros-bg.jpg",
    desc: "Aire, aceite y combustible",
  },
  {
    name: "Baterías",
    icon: Battery,
    img: "/cats/baterias-bg.jpg",
    desc: "Todas las marcas",
  },
  {
    name: "Lubricantes",
    icon: Droplets,
    img: "/cats/aceites-bg.jpg",
    desc: "Sintéticos y minerales",
  },
  {
    name: "Bujías",
    icon: Zap,
    img: "/cats/bujias-bg.jpg",
    desc: "Iridio, platino y cobre",
  },
  {
    name: "Bobinas",
    icon: CircuitBoard,
    img: "/cats/bobinas-bg.jpg",
    desc: "Encendido directo y COP",
  },
];

export function QuickCats() {
  const handleClick = (cat: string) => {
    window.dispatchEvent(
      new CustomEvent("set-category", { detail: cat })
    );
    const el = document.getElementById("catalogo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-blue mb-8">
          Categorías de autopartes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleClick(cat.name)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-left"
            >
              {/* Image */}
              <div className="relative h-32 sm:h-36 overflow-hidden">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <cat.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="p-3">
                <h3 className="font-bold text-sm sm:text-base">{cat.name}</h3>
                <p className="text-muted-foreground text-xs mt-0.5">{cat.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
