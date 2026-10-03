import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/posts";
import { LEGAL_DOCS } from "@/lib/legal";

const BASE = "https://www.multidiagnosticosas.com";
const lastModified = "2026-06-04";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.dateISO,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const legal = LEGAL_DOCS.map((d) => ({
    url: `${BASE}/legal/${d.slug}`,
    lastModified: "2026-10-03",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    { url: `${BASE}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/taller`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/baterias`, lastModified: "2026-09-25", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/autopartes`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/agendar`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...posts,
    { url: `${BASE}/pqrs`, lastModified: "2026-10-03", changeFrequency: "yearly", priority: 0.4 },
    ...legal,
  ];
}
