"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, TextPlugin);

/**
 * Movimiento tipo Apple para el sistema industrial.
 * Regla dura (DESIGN.md): el contenido es visible por defecto. GSAP SOLO realza:
 * los `opacity:0` se aplican en runtime con gsap.from, así que si el JS no corre
 * o el usuario pidió menos movimiento, todo queda visible (nunca invisible).
 * Sin `scope`: los selectores se resuelven contra el documento completo, porque
 * las secciones animadas son hermanas de este componente, no hijas.
 */
export function IndMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hero: el titular se revela letra por letra desde una máscara (GSAP SplitText)
      const heroTitle = document.querySelector<HTMLElement>(".ind-hero .ind-h1");
      let heroSplit: SplitType | null = null;
      if (heroTitle) {
        try {
          if (heroTitle.dataset.anim === "scramble") {
            // Scramble / "descifrado": cada parte (blanco + azul) se descifra a su texto real
            heroTitle.querySelectorAll<HTMLElement>(":scope > span").forEach((part, i) => {
              const finalText = part.textContent ?? "";
              gsap.to(part, {
                duration: 1.4,
                ease: "none",
                delay: 0.2 + i * 0.18,
                scrambleText: { text: finalText, chars: "upperCase", speed: 0.5, revealDelay: 0.2 },
              });
            });
          } else {
            // Assemble / "fly-in" sobrio: cada letra llega desde un punto/giro al azar y se acomoda
            heroSplit = new SplitType(heroTitle, { types: "words,chars" });
            heroSplit.chars?.forEach((c) => {
              gsap.from(c, {
                opacity: 0,
                x: gsap.utils.random(-36, 36),
                y: gsap.utils.random(-28, 28),
                rotation: gsap.utils.random(-12, 12),
                duration: 0.7,
                ease: "power3.out",
                delay: 0.3 + gsap.utils.random(0, 0.5),
              });
            });
          }
        } catch {
          gsap.from(heroTitle, { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.2 });
        }
      }
      gsap.from("[data-hero-content] > *:not(.ind-h1)", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
      });

      // Hero: parallax (zoom suave de la foto + el texto sube y se desvanece)
      const hero = document.querySelector(".ind-hero");
      if (hero) {
        gsap.fromTo(
          ".ind-hero .bg",
          { scale: 1 },
          {
            scale: 1.14,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 },
          }
        );
        gsap.to(".ind-hero .hero-content", {
          yPercent: -14,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 },
        });
      }

      // Reveal de encabezados de sección
      gsap.utils.toArray<HTMLElement>(".ind-sec .wrap > div:first-child").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Reveal escalonado de las tarjetas dentro de cada grid
      gsap.utils
        .toArray<HTMLElement>(".ind-cats, .ind-grid, .ind-promos, .ind-parts, .ind-faq, .ind-contact")
        .forEach((grid) => {
          gsap.from(Array.from(grid.children), {
            y: 26,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: grid, start: "top 86%", once: true },
          });
        });

      // Franja de confianza: números que entran escalonados
      if (document.querySelector(".ind-trust .grid2 > div")) {
        gsap.from(".ind-trust .grid2 > div", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ind-trust", start: "top 82%", once: true },
        });
      }

      // Bloque de agenda / CTA oscuro
      if (document.querySelector(".ind-book .in")) {
        gsap.from(".ind-book .in > *", {
          y: 26,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ind-book", start: "top 80%", once: true },
        });
      }

      // Línea rotativa tipo "typewriter" bajo el titular: escribe y borra servicios (GSAP TextPlugin)
      const tw = document.querySelector<HTMLElement>(".ind-hero .ind-typeline .tw");
      if (tw) {
        const phrases = [
          "Escáner automotriz",
          "Reparación de computadoras",
          "Frenos y suspensión",
          "Programación de llaves",
          "Limpieza de inyectores",
          "Cambio de aceite",
        ];
        tw.textContent = "";
        const twl = gsap.timeline({ repeat: -1, delay: 0.7 });
        phrases.forEach((p) => {
          twl
            .to(tw, { text: p, duration: Math.max(0.45, p.length * 0.045), ease: "none" })
            .to({}, { duration: 1.5 })
            .to(tw, { text: "", duration: 0.35, ease: "none" });
        });
      }

      // Números que cuentan hacia arriba al entrar en pantalla (ScrollTrigger)
      gsap.utils.toArray<HTMLElement>(".ind-trust .grid2 .n").forEach((el) => {
        const raw = (el.textContent ?? "").trim();
        const m = raw.match(/^(\D*)([\d.]+)(\D*)$/);
        if (!m) return;
        const prefix = m[1];
        const grouped = m[2].includes(".");
        const target = parseInt(m[2].replace(/\./g, ""), 10);
        const suffix = m[3];
        if (!Number.isFinite(target)) return;
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            const n = Math.round(counter.v);
            el.textContent = prefix + (grouped ? n.toLocaleString("es-CO") : String(n)) + suffix;
          },
        });
      });

      // Parallax sutil de las fotos de producto: profundidad atada al scroll (scrub)
      gsap.utils.toArray<HTMLElement>(".ind-part .ph img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 0.5 } }
        );
      });

      // Recalcular posiciones cuando fuentes/imágenes ya cargaron
      ScrollTrigger.refresh();

      return () => heroSplit?.revert();
    });

    return () => mm.revert();
  });

  return null;
}
