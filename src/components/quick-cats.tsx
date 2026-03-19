"use client";

import Image from "next/image";

const categories = [
  { name: "Filtros", img: "/cats/filtros.webp" },
  { name: "Baterías", img: "/cats/baterias.webp" },
  { name: "Lubricantes", img: "/cats/aceites.webp" },
  { name: "Bujías", img: "/cats/bujias.webp" },
  { name: "Bobinas", img: "/cats/bobinas.webp" },
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
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleClick(cat.name)}
            className="flex flex-col items-center justify-center border border-border rounded-2xl p-4 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <Image
              src={cat.img}
              alt={cat.name}
              width={88}
              height={88}
              className="w-20 h-20 object-contain"
            />
            <span className="mt-2 text-sm font-semibold text-foreground">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
