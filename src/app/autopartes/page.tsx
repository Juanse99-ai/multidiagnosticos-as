import type { Metadata } from "next";
import { CatalogSection } from "@/components/catalog-section";

export const metadata: Metadata = {
  title: "Autopartes y Repuestos | Multidiagnósticos AS",
  description:
    "Compra baterías, aceites, filtros, bujías y bobinas de las mejores marcas. Repuestos originales con envío o retiro en Sabanalarga, Atlántico.",
};

export default function AutopartesPage() {
  return (
    <>
      {/* Hero strip */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-dark text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-200 text-sm uppercase tracking-widest mb-2">Tienda en línea</p>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-3">
            Autopartes y Repuestos
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Baterías, aceites, filtros, bujías y bobinas de las mejores marcas.
            Compra online y recoge en el taller o te lo enviamos.
          </p>
        </div>
      </section>

      {/* Full catalog */}
      <CatalogSection forceShowAll />
    </>
  );
}
