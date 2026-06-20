"use client";

import { useEffect, useRef } from "react";

// Ubicación aproximada sobre la Carrera 27, Sabanalarga (Atlántico).
// El botón "Cómo llegar" usa Google con la ubicación exacta registrada del negocio.
const LAT = 10.6356;
const LNG = -74.9102;

// Carga Leaflet desde CDN (sin dependencia npm) y monta un mapa oscuro con pin animado.
export function IndMap() {
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current || !ref.current) return;
    started.current = true;

    if (!document.querySelector("link[data-leaflet]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.setAttribute("data-leaflet", "1");
      document.head.appendChild(link);
    }

    const loadJs = () =>
      new Promise<void>((resolve, reject) => {
        const w = window as unknown as { L?: unknown };
        if (w.L) return resolve();
        const existing = document.querySelector("script[data-leaflet]") as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener("load", () => resolve());
          existing.addEventListener("error", () => reject(new Error("leaflet")));
          return;
        }
        const s = document.createElement("script");
        s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        s.async = true;
        s.setAttribute("data-leaflet", "1");
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("leaflet"));
        document.head.appendChild(s);
      });

    loadJs()
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const L = (window as any).L;
        if (!L || !ref.current) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const map = L.map(ref.current, {
          center: [LAT, LNG],
          zoom: reduce ? 16 : 13,
          scrollWheelZoom: false,
          attributionControl: true,
        });
        map.zoomControl.setPosition("topright");

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          maxZoom: 20,
          attribution: "&copy; OpenStreetMap &copy; CARTO",
        }).addTo(map);

        const icon = L.divIcon({
          className: "ind-pin",
          html: '<span class="ring"></span><span class="dot"></span>',
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });
        L.marker([LAT, LNG], { icon, keyboard: false }).addTo(map);

        if (!reduce) {
          window.setTimeout(() => map.flyTo([LAT, LNG], 16, { duration: 2.2 }), 450);
        }
      })
      .catch(() => {});
  }, []);

  return <div ref={ref} className="ind-leaflet" role="img" aria-label="Mapa de la ubicación de Multidiagnósticos AS en Sabanalarga, Atlántico" />;
}
