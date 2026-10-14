"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RotateCcw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Voltaje en reposo de una batería de plomo-ácido de 12 V (valores de referencia de la
// industria: 12,6 V = 100 %, 12,4 V = 75 %, 12,2 V = 50 %, 12,0 V = 25 %). Por verificar
// contra la ficha técnica de Tudor.
const LEVELS = [
  { v: 12.6, label: "12,6 V o más", state: "Cargada", tip: "Está lista.", tone: "ok" },
  { v: 12.4, label: "12,4 V", state: "75 %", tip: "Bien. Si el carro anda poco, recárgala.", tone: "ok" },
  { v: 12.2, label: "12,2 V", state: "50 %", tip: "Cárgala pronto.", tone: "warn" },
  { v: 12.0, label: "12,0 V", state: "25 %", tip: "Cárgala ya: puede fallar al arrancar.", tone: "bad" },
  { v: 11.8, label: "11,9 V o menos", state: "Descargada", tip: "Revisa la batería y el alternador.", tone: "bad" },
] as const;

const MIN = 11.6;
const MAX = 12.8;
const TICKS = [11.8, 12.0, 12.2, 12.4, 12.6, 12.8];

const pos = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;
const levelOf = (v: number) => (v >= 12.6 ? 0 : v >= 12.4 ? 1 : v >= 12.2 ? 2 : v >= 12.0 ? 3 : 4);
const pctOf = (v: number) => Math.round(Math.min(100, Math.max(0, ((v - 11.8) / 0.8) * 100)));
const fmt = (v: number) => `${v.toFixed(2).replace(".", ",")} V`;

export function IndVolt() {
  const root = useRef<HTMLDivElement>(null);
  const volt = useRef({ v: 12.6 });
  const drawRef = useRef<() => void>(() => {});

  const { contextSafe } = useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const read = el.querySelector<HTMLElement>("[data-v]");
      const state = el.querySelector<HTMLElement>("[data-s]");
      const marker = el.querySelector<HTMLElement>("[data-m]");
      const meter = el.querySelector<HTMLElement>(".vt-scale");
      const rows = Array.from(el.querySelectorAll<HTMLButtonElement>("[data-row]"));

      const draw = () => {
        const v = volt.current.v;
        const i = levelOf(v);
        const level = LEVELS[i];
        if (read) read.textContent = fmt(v);
        if (state) state.textContent = i === 0 ? `Cargada · ${pctOf(v)} %` : i === 4 ? "Descargada" : `${pctOf(v)} % · ${level.tip}`;
        el.dataset.tone = level.tone;
        if (marker) marker.style.left = `${pos(v)}%`;
        rows.forEach((row, n) => row.setAttribute("aria-pressed", String(n === i)));
        meter?.setAttribute("aria-valuenow", v.toFixed(2));
        meter?.setAttribute("aria-valuetext", `${fmt(v)}: ${level.state}`);
      };
      draw();
      drawRef.current = draw;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Al entrar en pantalla, la batería "se descarga" de 12,6 a 11,8 V.
        gsap.to(volt.current, {
          v: 11.8,
          duration: 3.6,
          ease: "power1.inOut",
          delay: 0.3,
          onUpdate: draw,
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const goTo = contextSafe((v: number) => {
    const draw = drawRef.current;
    gsap.killTweensOf(volt.current);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      volt.current.v = v;
      draw();
      return;
    }
    gsap.to(volt.current, { v, duration: 0.9, ease: "power2.out", onUpdate: draw });
  });

  const replay = contextSafe(() => {
    const draw = drawRef.current;
    gsap.killTweensOf(volt.current);
    volt.current.v = 12.6;
    draw();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(volt.current, { v: 11.8, duration: 3.6, ease: "power1.inOut", delay: 0.2, onUpdate: draw });
  });

  return (
    <div className="ind-volt" ref={root} data-tone="ok">
      <div className="vt-top">
        <div className="vt-read">
          <span className="vt-v mono" data-v>12,60 V</span>
          <span className="vt-s" data-s>Cargada · 100 %</span>
        </div>
        <button type="button" className="vt-replay" onClick={replay}>
          <RotateCcw size={15} /> Ver de nuevo
        </button>
      </div>

      <div className="vt-scale" role="meter" aria-label="Voltaje de la batería en reposo" aria-valuemin={MIN} aria-valuemax={MAX} aria-valuenow={12.6} aria-valuetext="12,60 V: Cargada">
        <div className="vt-zones" aria-hidden>
          <span className="z bad" style={{ width: `${pos(12.2)}%` }} />
          <span className="z warn" style={{ width: `${pos(12.4) - pos(12.2)}%` }} />
          <span className="z ok" style={{ width: `${100 - pos(12.4)}%` }} />
        </div>
        <div className="vt-marker" data-m style={{ left: `${pos(12.6)}%` }} aria-hidden>
          <span />
        </div>
        <div className="vt-ticks mono" aria-hidden>
          {TICKS.map((t) => (
            <span key={t} style={{ left: `${pos(t)}%` }}>{t.toFixed(1).replace(".", ",")}</span>
          ))}
        </div>
      </div>

      <div className="vt-rows">
        {LEVELS.map((l, i) => (
          <button type="button" key={l.label} data-row={i} data-tone={l.tone} aria-pressed={i === 0} onClick={() => goTo(i === 4 ? 11.85 : l.v)}>
            <span className="dot" aria-hidden />
            <span className="lv mono">{l.label}</span>
            <span className="st">{l.state}</span>
            <span className="tp">{l.tip}</span>
          </button>
        ))}
      </div>

      <p className="vt-note">
        Mídela con un multímetro, con el motor apagado y la batería en reposo unas horas. Con el motor encendido, el alternador debe dar entre
        13,7 y 14,7 V. Son valores de referencia para baterías de plomo-ácido de 12 V; confirma con la ficha de tu batería.
      </p>
    </div>
  );
}
