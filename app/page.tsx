// This page is never reached — next-intl middleware
// intercepts all requests at "/" and redirects to "/en".
// Kept as a no-op to satisfy Next.js App Router conventions.

export default function RootPage() {
  return null;
}
