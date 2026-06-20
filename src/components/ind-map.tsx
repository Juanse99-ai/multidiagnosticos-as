"use client";

import { useEffect, useRef } from "react";

// Ubicación aproximada sobre la Carrera 27, Sabanalarga (Atlántico).
// El botón "Cómo llegar" usa Google con la ubicación exacta registrada del negocio.
const LAT = 10.6356;
const LNG = -74.9102;

// Token PÚBLICO de Mapbox (pk.*). Es público por diseño: Mapbox lo expone en el navegador.
// IMPORTANTE: restringir este token al dominio multidiagnosticosas.com en la cuenta de Mapbox.
const MAPBOX_TOKEN = "pk.eyJ1IjoianVhbnNlY3AxMiIsImEiOiJjbXFscDFrdzgwM2s1MnJvaDBsZmgxbjQ4In0.cVWcUervZBTv8MCED11iSw";
const GL_VERSION = "v3.9.0";

// Carga Mapbox GL JS desde CDN (sin dependencia npm) y monta un mapa oscuro con pin animado.
export function IndMap() {
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current || !ref.current) return;
    started.current = true;

    if (!document.querySelector("link[data-mapboxgl]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://api.mapbox.com/mapbox-gl-js/${GL_VERSION}/mapbox-gl.css`;
      link.setAttribute("data-mapboxgl", "1");
      document.head.appendChild(link);
    }

    const loadJs = () =>
      new Promise<void>((resolve, reject) => {
        const w = window as unknown as { mapboxgl?: unknown };
        if (w.mapboxgl) return resolve();
        const existing = document.querySelector("script[data-mapboxgl]") as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener("load", () => resolve());
          existing.addEventListener("error", () => reject(new Error("mapbox")));
          return;
        }
        const s = document.createElement("script");
        s.src = `https://api.mapbox.com/mapbox-gl-js/${GL_VERSION}/mapbox-gl.js`;
        s.async = true;
        s.setAttribute("data-mapboxgl", "1");
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("mapbox"));
        document.head.appendChild(s);
      });

    loadJs()
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapboxgl = (window as any).mapboxgl;
        if (!mapboxgl || !ref.current) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        mapboxgl.accessToken = MAPBOX_TOKEN;
        const map = new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [LNG, LAT],
          zoom: reduce ? 15.5 : 12.5,
          scrollZoom: false,
          attributionControl: true,
        });
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

        const el = document.createElement("div");
        el.className = "ind-pin";
        el.innerHTML = '<span class="ring"></span><span class="dot"></span>';
        new mapboxgl.Marker({ element: el }).setLngLat([LNG, LAT]).addTo(map);

        if (!reduce) {
          map.on("load", () => {
            map.flyTo({ center: [LNG, LAT], zoom: 15.5, duration: 2600, essential: true });
          });
        }
      })
      .catch(() => {});
  }, []);

  return <div ref={ref} className="ind-mapcanvas" role="img" aria-label="Mapa de la ubicación de Multidiagnósticos AS en Sabanalarga, Atlántico" />;
}
