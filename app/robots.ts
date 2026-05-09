import type { MetadataRoute } from "next";

/**
 * robots.ts — generates /robots.txt.
 * Disallow all crawlers from indexing any page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
