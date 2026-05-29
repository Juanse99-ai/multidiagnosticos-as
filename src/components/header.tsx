"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Truck,
  Wrench,
  MessageCircle,
  Phone,
  MapPin,
  CalendarCheck,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/taller", label: "Taller" },
  { href: "/#catalogo", label: "Autopartes" },
  { href: "/#agenda", label: "Agendar" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
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
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Utility bar — trust signals + direct line, no emojis */}
      <div className="bg-[#070d1a] text-white/60 text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 sm:hidden">
              <MapPin className="w-3.5 h-3.5 text-brand-blue-light" strokeWidth={2} />
              Sabanalarga, Atlántico
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-brand-blue-light" strokeWidth={2} />
              Envío gratis desde <strong className="font-semibold text-white/80">$149.000</strong>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 before:content-[''] before:w-px before:h-3 before:bg-white/15 before:mr-5">
              <Wrench className="w-3.5 h-3.5 text-brand-blue-light" strokeWidth={2} />
              Instalación en taller con cita
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 before:content-[''] before:w-px before:h-3 before:bg-white/15 before:mr-5">
              <MessageCircle className="w-3.5 h-3.5 text-brand-blue-light" strokeWidth={2} />
              Asesoría técnica gratuita
            </span>
          </div>
          <a
            href="tel:+573003651525"
            className="inline-flex items-center gap-1.5 font-medium text-white/75 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-blue-light" strokeWidth={2} />
            (+57) 300 365 1525
          </a>
        </div>
      </div>

      {/* Main header — solid, dark, confident */}
      <header
        className={`sticky top-0 z-50 bg-brand-dark border-b transition-[box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled
            ? "border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] bg-brand-dark/95 backdrop-blur-md supports-[backdrop-filter]:bg-brand-dark/85"
            : "border-white/[0.06]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 lg:gap-6 py-3">
            {/* Logo */}
            <Link href="/" className="group shrink-0" aria-label="Multidiagnósticos AS — inicio">
              <Image
                src="/logo.png"
                alt="Multidiagnósticos AS"
                width={188}
                height={47}
                className="h-10 md:h-11 w-auto transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03] group-active:scale-[0.98]"
                priority
              />
            </Link>

            {/* Desktop search */}
            <form
              className="hidden md:flex flex-1 max-w-md"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" strokeWidth={2} />
                <input
                  type="search"
                  placeholder="Busca repuestos o servicios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Buscar"
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.06] text-white text-sm placeholder:text-white/40 ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue-light/70 focus:bg-white/[0.09] transition-[box-shadow,background-color] duration-200"
                />
              </div>
            </form>

            {/* Desktop nav + actions */}
            <nav className="hidden md:flex items-center gap-1 ml-auto">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.08] transition-[background-color,color] duration-150"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/agendar"
                className="ml-1.5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue text-white text-sm font-semibold shadow-[0_6px_16px_-6px_rgba(37,99,235,0.7)] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-brand-blue-light active:scale-[0.97]"
              >
                <CalendarCheck className="w-4 h-4" strokeWidth={2} />
                Agendar cita
              </Link>

              <button
                onClick={openCart}
                aria-label={`Abrir carrito (${itemCount} ${itemCount === 1 ? "artículo" : "artículos"})`}
                className="relative ml-1 w-10 h-10 rounded-full flex items-center justify-center text-white/80 ring-1 ring-inset ring-white/15 hover:bg-white/[0.08] hover:text-white transition-[background-color,color] duration-150"
              >
                <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={2} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-red text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-brand-dark">
                    {itemCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Mobile actions */}
            <div className="flex md:hidden items-center gap-1 ml-auto">
              <button
                onClick={openCart}
                aria-label={`Abrir carrito (${itemCount} artículos)`}
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-white/85 ring-1 ring-inset ring-white/15"
              >
                <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={2} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-red text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-brand-dark">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile search row */}
          <form
            className="md:hidden pb-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" strokeWidth={2} />
              <input
                type="search"
                placeholder="Busca repuestos o servicios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Buscar"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.06] text-white text-sm placeholder:text-white/40 ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue-light/70 transition-[box-shadow,background-color] duration-200"
              />
            </div>
          </form>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-brand-dark px-4 py-3">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/[0.08] hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/agendar"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-brand-blue text-white text-sm font-semibold active:scale-[0.98] transition-transform"
              >
                <CalendarCheck className="w-4 h-4" strokeWidth={2} />
                Agendar cita
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
