"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/taller", label: "Taller" },
  { href: "/#catalogo", label: "Autopartes" },
  { href: "/#agenda", label: "Agendar" },
  { href: "/#contacto", label: "Contacto" },
];

const WA_LINK = "https://wa.me/573003651525?text=Hola,%20quisiera%20información";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 md:px-6 pt-3 md:pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-2xl bg-white/95 backdrop-blur-md ring-1 transition-[box-shadow,background-color,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled
            ? "ring-black/[0.07] shadow-[0_14px_38px_-14px_rgba(11,18,33,0.30)]"
            : "ring-black/[0.05] shadow-[0_10px_30px_-16px_rgba(11,18,33,0.22)]"
        }`}
      >
        <div className="flex items-center gap-4 px-4 md:px-5 py-2.5 md:py-3">
          {/* Logo (sin cambios) */}
          <Link href="/" className="group mr-auto shrink-0" aria-label="Multidiagnósticos AS — inicio">
            <Image
              src="/logo.png"
              alt="Multidiagnósticos AS"
              width={176}
              height={44}
              priority
              className="h-9 md:h-10 w-auto transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-active:scale-[0.98]"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-[15px] font-medium text-brand-dark/70 hover:text-brand-dark hover:bg-black/[0.04] transition-[color,background-color] duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 lg:gap-3 lg:ml-3">
            {/* Cart */}
            <button
              onClick={openCart}
              aria-label={`Abrir carrito (${itemCount} ${itemCount === 1 ? "artículo" : "artículos"})`}
              className="relative w-11 h-11 rounded-full flex items-center justify-center text-brand-dark/70 ring-1 ring-inset ring-black/[0.08] hover:bg-black/[0.04] hover:text-brand-dark transition-[background-color,color] duration-150"
            >
              <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={2} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-red text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Escríbenos (WhatsApp) */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener"
              className="hidden sm:inline-flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full bg-brand-red text-white text-[15px] font-semibold shadow-[0_8px_20px_-8px_rgba(225,29,72,0.7)] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#c40f3c] active:scale-[0.97]"
            >
              <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2} />
              Escríbenos
            </a>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center text-brand-dark"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-black/[0.06] px-4 py-3">
            <nav className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 rounded-lg text-[15px] font-medium text-brand-dark/80 hover:bg-black/[0.04] hover:text-brand-dark transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-brand-red text-white text-[15px] font-semibold active:scale-[0.98] transition-transform"
              >
                <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2} />
                Escríbenos
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
