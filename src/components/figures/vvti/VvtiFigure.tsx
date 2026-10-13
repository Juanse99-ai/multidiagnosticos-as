"use client";

import { useEffect, useRef } from "react";
import { VVTI_PLATE, VVTI_DATA } from "./art.generated";
import { mountVvti } from "./live.js";
import "../iso.css";
import "./vvti.css";

/**
 * Figura interactiva "Aceite y VVT-i · 2TR-FE".
 * El dibujo estático lo genera figures/vvti/build.mjs (no se arma en el navegador);
 * aquí solo se monta y se anima moviendo transformaciones, sin re-renderizar React.
 */
export function VvtiFigure() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    return mountVvti(root.current, VVTI_DATA);
  }, []);

  return (
    <div
      ref={root}
      className="iso vvti vv-figure"
      data-theme="light"
      dangerouslySetInnerHTML={{ __html: VVTI_PLATE }}
    />
  );
}
