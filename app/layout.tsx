// Root layout — minimal wrapper.
// The actual layout with locale, fonts, and providers is in app/[locale]/layout.tsx
// This root layout exists to satisfy Next.js App Router requirements.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
