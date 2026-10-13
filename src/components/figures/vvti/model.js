// Modelo de la figura "Aceite y VVT-i · 2TR-FE".
//
// Datos del motor (manual de reparación Toyota, doc. M-EG-0002): 4 cilindros en línea,
// DOHC 16 válvulas, diámetro × carrera 95,0 × 95,0 mm, VVT-i. Cilindrada 2.694 cm³
// (95² · π/4 · 95 · 4 = 2.693,5 cm³). Por verificar: orden de encendido 1-3-4-2 y
// Dual VVT-i desde 2015. Del taller: aceite 5W-30, cambio cada 5.000 km.
//
// MODELO ILUSTRATIVO: Toyota no publica cómo crece el retraso del VVT-i con los
// kilómetros. Las curvas de abajo solo siguen la física cualitativa (el aceite se
// oxida, junta hollín y se espesa; la malla de la OCV se tapa; llega menos caudal y
// el actuador tarda más). Los porcentajes que muestra la figura no son mediciones.

export const KM_MAX = 5000;
export const VISCOSITY = "5W-30";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** Estado del aceite a `km` kilómetros desde el último cambio. */
export function oilAt(km) {
  const w = clamp(km / KM_MAX, 0, 1);
  const thick = 1 + 0.22 * Math.pow(w, 1.5); // viscosidad relativa
  const screen = 0.3 * w * w; // fracción tapada de la malla de la OCV
  const flow = 1 / (thick * (1 + 1.2 * screen)); // caudal relativo hacia las cámaras
  const lag = 1 / flow; // tiempo de respuesta relativo
  const dirt = Math.pow(w, 1.15); // oscurecimiento 0..1
  return { w, thick, screen, flow, lag, dirt };
}

/** Constante de tiempo del rotor (segundos, solo para la animación). */
export const TAU_FRESH = 0.32;

export function phaseOf(km) {
  if (km >= KM_MAX - 0.5) return "vencido";
  if (km >= 4000) return "casi vencido";
  if (km >= 1000) return "uso normal";
  return "aceite nuevo";
}

const fmt = (n) => Math.round(n).toLocaleString("es-CO");

export function readoutOf(km) {
  const o = oilAt(km);
  const lag = Math.round((o.lag - 1) * 100);
  const word = phaseOf(km);
  return `${fmt(km)} km · ${word} · ${lag === 0 ? "respuesta normal" : `${lag} % más lento`}`;
}

export function valueTextOf(km) {
  const o = oilAt(km);
  const lag = Math.round((o.lag - 1) * 100);
  return `${fmt(km)} km desde el cambio, ${phaseOf(km)}. Caudal al actuador ${Math.round(o.flow * 100)} %, el VVT-i responde ${lag} % más lento (modelo ilustrativo).`;
}

// Color del aceite: miel (nuevo) a casi negro (vencido).
const FRESH = [217, 184, 92, 0.6];
const OLD = [43, 33, 24, 0.94];
export function oilColor(dirt) {
  const c = FRESH.map((v, i) => v + (OLD[i] - v) * dirt);
  return `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${c[3].toFixed(3)})`;
}
