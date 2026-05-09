import type { MetadataRoute } from "next";

const BASE_URL = "https://epicurien.bkk";
const LOCALES = ["en", "fr", "th"] as const;

/**
 * sitemap.ts — generates /sitemap.xml dynamically.
 * Includes all pages × all locales with hreflang alternates.
 * Priority: home (1.0) > menu/visit/press (0.8) > others (0.6).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1.0 },
    { path: "/menu", priority: 0.8 },
    { path: "/visit", priority: 0.8 },
    { path: "/press", priority: 0.8 },
  ] as const;

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.path === "" ? "weekly" : "monthly",
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}${page.path}`]),
          ),
        },
      });
    }
  }

  return entries;
}
