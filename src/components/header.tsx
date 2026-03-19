"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const el = document.getElementById("catalogo");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("header-search", { detail: searchQuery })
      );
    }
  };

  return (
    <>
      {/* Promo Ribbon */}
      <div className="bg-brand-dark text-white border-b border-white/10 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap items-center animate-marquee">
          {[...Array(2)].flatMap((_, i) => [
            <span
              key={`envio-${i}`}
              className="flex-none inline-flex items-center gap-2.5 py-2"
            >
              🚚 Envío GRATIS desde $149.000
            </span>,
            <span
              key={`install-${i}`}
              className="flex-none inline-flex items-center gap-2.5 py-2"
            >
              🛠️ Instalación en taller (con cita)
            </span>,
            <span
              key={`wa-${i}`}
              className="flex-none inline-flex items-center gap-2.5 py-2"
            >
              💬 Asesor por WhatsApp
            </span>,
          ])}
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-brand-dark/97 shadow-lg shadow-black/25 backdrop-blur-lg"
            : "bg-transparent backdrop-blur-md border-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center py-2.5">
          <Link href="/" className="group">
            <Image
              src="/logo.png"
              alt="Multidiagnósticos AS"
              width={180}
              height={52}
              className="h-13 w-auto drop-shadow-md group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

          <form
            className="flex gap-2 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Busca repuestos o servicios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
              />
            </div>
          </form>

          <nav className="hidden md:flex gap-3 items-center">
            {[
              { href: "/taller", label: "Taller" },
              { href: "/#catalogo", label: "Autopartes" },
              { href: "/#agenda", label: "Agendar" },
              { href: "/#contacto", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-white hover:bg-white/10"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={openCart}
              className="gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Carrito ({itemCount})
            </Button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? (
              <X
                className={`w-6 h-6 ${scrolled ? "text-white" : "text-foreground"}`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${scrolled ? "text-white" : "text-foreground"}`}
              />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-border p-4 flex flex-wrap gap-2 justify-around">
            {[
              { href: "/taller", label: "Taller" },
              { href: "/#catalogo", label: "Autopartes" },
              { href: "/#agenda", label: "Agendar" },
              { href: "/#contacto", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                openCart();
                setMobileOpen(false);
              }}
              className="gap-2"
            >
              <ShoppingCart className="w-4 h-4" />({itemCount})
            </Button>
          </div>
        )}
      </header>
    </>
  );
}
