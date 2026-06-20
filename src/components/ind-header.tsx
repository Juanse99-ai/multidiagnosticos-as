"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck } from "lucide-react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const LINKS = [
  { href: "/taller", label: "Taller" },
  { href: "/autopartes", label: "Autopartes" },
  { href: "/blog", label: "Blog" },
  { href: "/agendar", label: "Agendar" },
  { href: "/#contacto", label: "Contacto" },
];

// Tres barras (hamburguesa) y dos diagonales + punto central (X). Mismo número de
// subtrazos (3) en ambos para que el morph sea limpio: la barra del medio colapsa al centro.
const BURGER_D = "M4 7L20 7M4 12L20 12M4 17L20 17";
const CLOSE_D = "M6 6L18 18M12 12L12 12M6 18L18 6";

export function IndHeader() {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<SVGPathElement>(null);

  // Morph hamburguesa <-> X al abrir/cerrar el menú.
  useEffect(() => {
    if (!burgerRef.current) return;
    gsap.to(burgerRef.current, {
      duration: 0.4,
      ease: "power2.inOut",
      morphSVG: open ? CLOSE_D : BURGER_D,
      overwrite: true,
    });
  }, [open]);

  return (
    <div className="ind-header">
      <div className="bar">
        <a href="/" aria-label="Multidiagnósticos AS — inicio">
          <img src="/logo-as.png" alt="Multidiagnósticos AS" className="ind-logo" />
        </a>
        <nav className="ind-nav">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <button
          className="ind-burger"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="ind-mobnav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path ref={burgerRef} d={BURGER_D} />
          </svg>
        </button>
      </div>
      <a className="ind-cta ind-cta-pill" href="/agendar"><CalendarCheck size={16} /> Agendar</a>

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
