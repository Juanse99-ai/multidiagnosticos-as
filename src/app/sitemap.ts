import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/posts";

const BASE = "https://www.multidiagnosticosas.com";
const lastModified = "2026-06-04";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.dateISO,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    { url: `${BASE}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/taller`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/autopartes`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/agendar`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...posts,
  ];
}
