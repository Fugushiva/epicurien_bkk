import type { MetadataRoute } from "next";

/**
 * robots.ts — generates /robots.txt.
 * Allow all crawlers to index all pages.
 * Sitemap URL provided for discoverability.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://epicurien.bkk/sitemap.xml",
  };
}
