import type { Metadata } from "next";
import { CatalogSection } from "@/components/catalog-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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
        <ScrollReveal className="max-w-7xl mx-auto" stagger="[data-reveal]" staggerAmount={0.15} y={40}>
          <p data-reveal className="text-blue-200 text-sm uppercase tracking-widest mb-2">Tienda en línea</p>
          <h1 data-reveal className="text-3xl md:text-5xl font-bold font-display leading-tight mb-3">
            Autopartes y Repuestos
          </h1>
          <p data-reveal className="text-white/70 text-lg max-w-2xl">
            Baterías, aceites, filtros, bujías y bobinas de las mejores marcas.
            Compra online y recoge en el taller o te lo enviamos.
          </p>
        </ScrollReveal>
      </section>

      {/* Full catalog */}
      <CatalogSection forceShowAll />
    </>
  );
}
