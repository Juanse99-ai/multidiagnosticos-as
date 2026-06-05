import { existsSync, readFileSync } from "fs";
import path from "path";

export type PromoImage = { index: number; src: string };

/**
 * Lee las imágenes de promociones desde public/promotions/manifest.json
 * (el mismo manifest que escribe /admin). Se lee en build (server component).
 * Si no hay manifest o está vacío, devuelve [] y la home muestra el fallback.
 */
export function getPromoImages(): PromoImage[] {
  try {
    const p = path.join(process.cwd(), "public", "promotions", "manifest.json");
    if (!existsSync(p)) return [];
    const data = JSON.parse(readFileSync(p, "utf-8")) as Record<string, string>;
    return Object.entries(data)
      .map(([k, v]) => ({ index: parseInt(k, 10), src: v }))
      .filter((x) => !Number.isNaN(x.index) && typeof x.src === "string")
      .sort((a, b) => a.index - b.index);
  } catch {
    return [];
  }
}
