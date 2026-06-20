"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

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
      let heroSplit: SplitText | null = null;
      if (heroTitle) {
        try {
          heroSplit = new SplitText(heroTitle, { type: "lines,words,chars", mask: "lines" });
          gsap.from(heroSplit.chars, {
            yPercent: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.018,
            delay: 0.3,
          });
        } catch {
          gsap.from(heroTitle, { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.2 });
        }
      }
      // Subrayado cobalto que se "dibuja" solo bajo el titular (GSAP DrawSVG)
      const heroUnderline = document.querySelector(".ind-hero .ind-underline path");
      if (heroUnderline) {
        gsap.from(heroUnderline, { drawSVG: "0%", duration: 1.1, delay: 1.05, ease: "power2.inOut" });
      }
      gsap.from("[data-hero-content] > *:not(.ind-h1):not(.ind-underline)", {
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

      // Recalcular posiciones cuando fuentes/imágenes ya cargaron
      ScrollTrigger.refresh();

      return () => heroSplit?.revert();
    });

    return () => mm.revert();
  });

  return null;
}
