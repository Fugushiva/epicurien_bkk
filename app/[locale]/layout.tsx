import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Playfair_Display,
  Inter,
  IBM_Plex_Sans_Thai,
  JetBrains_Mono,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingCurtain } from "@/components/ui/LoadingCurtain";
import "@/app/globals.css";

// ── Critical fonts (preloaded) ─────────────────────────────────────────────

/** Display font — used for hero h1 and large titles (variable font) */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

/** Heading font — used for h2–h5 and pull quotes */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
  weight: ["400", "600", "700"],
});

/** Body font — used for paragraphs, nav, UI */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600"],
});

// ── Non-critical fonts (not preloaded) ─────────────────────────────────────

/** Thai body font — loaded on demand for /th locale */
const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-thai",
  display: "swap",
  preload: false,
  weight: ["400", "600"],
});

/** Monospace — used for captions, metadata, code */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
  weight: ["400"],
});

// ── Layout ─────────────────────────────────────────────────────────────────

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: "%s | Épicurien French Bakery",
    default: "Épicurien French Bakery | Award-winning Croissants in Bangkok",
  },
  description:
    "Award-winning French bakery in Bangkok. Crafted croissants, viennoiseries, and breads by Chef Enzo Le Bohec — Best Croissant Île-de-France 2021.",
  metadataBase: new URL("https://epicurien.bkk"),
  openGraph: {
    type: "website",
    siteName: "Épicurien French Bakery",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Épicurien French Bakery — Award-winning croissants in Bangkok",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1C1917",
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "fr" | "th")) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const fontVariables = [
    fraunces.variable,
    playfairDisplay.variable,
    inter.variable,
    ibmPlexSansThai.variable,
    jetbrainsMono.variable,
  ].join(" ");

  return (
    <html lang={locale} className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text font-body">
        <NextIntlClientProvider messages={messages}>
          {/* Page entrance animation — only on first session load */}
          <LoadingCurtain />
          <SmoothScroll>
            {/* Skip to main content — a11y */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-cta focus:text-primary focus:rounded-md focus:font-body focus:text-sm"
            >
              {tCommon("skip_to_content")}
            </a>
            <Navbar />
            <main id="main-content" className="flex flex-1 flex-col">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
