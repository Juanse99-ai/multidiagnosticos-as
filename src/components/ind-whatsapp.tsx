"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const WA = "https://wa.me/573023191749?text=Hola,%20quisiera%20informaci%C3%B3n";

// Marca oficial de WhatsApp (estado en reposo).
const WA_D =
  "M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.683-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z";

// Burbuja de chat (estado al pasar el cursor). Misma familia semántica: "escríbenos".
const BUBBLE_D =
  "M12 2.4C6.2 2.4 1.5 6.3 1.5 11.1c0 2.5 1.3 4.7 3.3 6.3-.1 1.3-.7 2.9-1.5 4.2 1.9-.3 3.7-1 5-1.8 1.2.3 2.4.5 3.7.5 5.8 0 10.5-3.9 10.5-8.7S17.8 2.4 12 2.4z";

export function IndWhatsApp() {
  const pathRef = useRef<SVGPathElement>(null);

  const morph = (to: string) => {
    if (pathRef.current) {
      gsap.to(pathRef.current, { duration: 0.45, ease: "power3.inOut", morphSVG: to, overwrite: true });
    }
  };

  return (
    <a
      className="ind-wa"
      href={WA}
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
      onMouseEnter={() => morph(BUBBLE_D)}
      onMouseLeave={() => morph(WA_D)}
    >
      <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path ref={pathRef} d={WA_D} />
      </svg>
    </a>
  );
}
