import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files
  // - Next.js internals
  matcher: [
    // Enable a redirect for the root path
    "/",
    // Set a cookie to remember the previous locale for all requests that have
    // a locale prefix
    "/(en|fr|th)/:path*",
    // Enable redirects that add missing locales (e.g. `/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
