import type { MetadataRoute } from "next";

/**
 * sitemap.ts — generates /sitemap.xml dynamically.
 * Returns an empty sitemap while the site is not yet indexed.
 * Re-enable entries when ready to go public.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
