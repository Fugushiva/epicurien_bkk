import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All supported locales
  locales: ["en", "fr", "th"],

  // Default locale — used when no locale prefix is found
  defaultLocale: "en",

  // Always use locale prefix in URL
  localePrefix: "always",
});
