"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/taller", label: "Taller" },
  { href: "/autopartes", label: "Autopartes" },
  { href: "/agendar", label: "Agendar" },
  { href: "/#contacto", label: "Contacto" },
];

export function IndHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // El header es transparente mientras estás sobre el banner (hero) y se vuelve
  // sólido al bajar o al abrir el menú. Si la página no tiene hero, queda sólido.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const hero = document.querySelector(".ind-hero") as HTMLElement | null;
    const update = () => {
      const overHero = !!hero && window.scrollY < hero.offsetHeight - 72;
      el.classList.toggle("at-hero-top", overHero && !open);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  return (
    <div className="ind-header" ref={headerRef}>
      <div className="bar">
        <a href="/" aria-label="Multidiagnósticos AS — inicio">
          <img src="/logo.png" alt="Multidiagnósticos AS" className="ind-logo" />
        </a>
        <nav className="ind-nav">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <a className="ind-cta" href="/agendar"><CalendarCheck size={16} /> Agendar</a>
        <button
          className="ind-burger"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="ind-mobnav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav id="ind-mobnav" className={`ind-mobnav${open ? " open" : ""}`}>
        <div className="ind-mobnav-in">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a className="ind-cta" href="/agendar" onClick={() => setOpen(false)}><CalendarCheck size={16} /> Agendar servicio</a>
        </div>
      </nav>
    </div>
  );
}
