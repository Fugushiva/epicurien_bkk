import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { VisitHero } from "@/components/sections/VisitHero";
import { VisitLocation } from "@/components/sections/VisitLocation";
import { VisitHours } from "@/components/sections/VisitHours";
import { VisitWhySection } from "@/components/sections/VisitWhySection";
import { VisitPressSection } from "@/components/sections/VisitPressSection";
import { BAKERY_INFO } from "@/lib/constants";
import { buildAlternates, ogLocale, absoluteUrl } from "@/lib/seo";

interface VisitPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: VisitPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visit_page" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/visit"),
    openGraph: {
      url: absoluteUrl(locale, "/visit"),
      title: t("title"),
      description: t("subtitle"),
      locale: ogLocale(locale),
    },
  };
}

/**
 * Visit page — location, hours, map, USPs, and press mentions.
 * SSG (build-time rendered).
 */
export default async function VisitPage({ params }: VisitPageProps) {
  const { locale } = await params;

  return (
    <>
      {/* LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: BAKERY_INFO.name,
            telephone: BAKERY_INFO.phone,
            email: BAKERY_INFO.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "W District, Sukhumvit 71 Rd",
              addressLocality: "Phra Khanong",
              addressRegion: "Watthana",
              postalCode: "10110",
              addressCountry: "TH",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "08:00",
                closes: "21:00",
              },
            ],
            servesCuisine: ["French", "Bakery", "Pastry"],
            priceRange: "฿฿฿",
            url: `https://epicurien.bkk/${locale}/visit`,
          }),
        }}
      />

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://epicurien.bkk",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Visit",
                item: "https://epicurien.bkk/visit",
              },
            ],
          }),
        }}
      />

      <VisitHero />
      <VisitLocation />
      <VisitHours />
      <VisitWhySection />
      <VisitPressSection />
    </>
  );
}
