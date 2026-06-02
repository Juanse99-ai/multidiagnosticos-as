import type { Metadata } from "next";
import Link from "next/link";
import { CatalogSection } from "@/components/catalog-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ShoppingBag, MessageCircle, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Autopartes y Repuestos | Multidiagnósticos AS",
  description:
    "Compra baterías, aceites, filtros, bujías y bobinas de las mejores marcas. Repuestos originales con envío o retiro en Sabanalarga, Atlántico.",
};

export default function AutopartesPage() {
  return (
    <>
      {/* Hero — dark slim, mismo lenguaje que home y /taller */}
      <section className="relative bg-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <ScrollReveal stagger="[data-reveal]" y={24} staggerAmount={0.12}>
            <p
              data-reveal
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue-light"
            >
              Tienda en línea
            </p>
            <h1
              data-reveal
              className="mt-5 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight max-w-4xl"
            >
              Autopartes
              <br />
              <span className="text-brand-blue-light">y repuestos.</span>
            </h1>
            <p
              data-reveal
              className="mt-8 text-white/65 text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Baterías, aceites, filtros, bujías y bobinas de las mejores marcas.
              Cotiza por WhatsApp y recoge en el taller o te lo enviamos.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <Link
                href="#catalogo"
                className="group/cta inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-white text-brand-dark text-sm font-semibold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/95 active:scale-[0.97]"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
                Ver catálogo
                <span className="ml-1 w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/cta:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/cta:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
              </Link>
              <a
                href="https://wa.me/573003651525?text=Hola,%20quisiera%20información%20sobre%20repuestos"
                target="_blank"
                rel="noopener"
                className="group/cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white/80 text-sm font-medium transition-[color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white hover:bg-white/5"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Catálogo completo */}
      <CatalogSection forceShowAll />
    </>
  );
}
