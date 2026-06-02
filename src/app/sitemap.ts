import type { MetadataRoute } from "next";

const BASE = "https://www.multidiagnosticosas.com";
const lastModified = "2026-06-02";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/taller`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/autopartes`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/agendar`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
