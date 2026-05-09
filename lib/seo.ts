const BASE_URL = "https://epicurien.bkk";
const LOCALES = ["en", "fr", "th"] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * Build hreflang alternates for all 3 locales for a given page path.
 * Path should include leading slash, e.g. "/menu"
 *
 * @example
 * buildAlternates("en", "/menu")
 * // => { canonical: "https://epicurien.bkk/en/menu", languages: { en: "...", fr: "...", th: "..." } }
 */
export function buildAlternates(
  locale: string,
  path: string = "",
): {
  canonical: string;
  languages: Record<string, string>;
} {
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: Object.fromEntries(
      LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}${path}`]),
    ),
  };
}

/**
 * Build Open Graph locale string from next-intl locale code.
 */
export function ogLocale(locale: string): string {
  const map: Record<string, string> = {
    en: "en_US",
    fr: "fr_FR",
    th: "th_TH",
  };
  return map[locale] ?? "en_US";
}

/**
 * Build an absolute URL for the given locale and optional path.
 */
export function absoluteUrl(locale: string, path: string = ""): string {
  return `${BASE_URL}/${locale}${path}`;
}
