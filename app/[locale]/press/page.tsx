import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PressHero } from "@/components/sections/PressHero";
import { PressMediaKit } from "@/components/sections/PressMediaKit";
import { PressMentions } from "@/components/sections/PressMentions";
import { PressContactForm } from "@/components/sections/PressContactForm";
import { PressAwards } from "@/components/sections/PressAwards";
import { buildAlternates, ogLocale, absoluteUrl } from "@/lib/seo";

interface PressPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PressPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "press_page" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/press"),
    openGraph: {
      url: absoluteUrl(locale, "/press"),
      title: t("title"),
      description: t("subtitle"),
      locale: ogLocale(locale),
    },
  };
}

/**
 * Press page — media kit, press mentions, contact form, awards.
 * SSG (build-time rendered).
 */
export default async function PressPage({ params }: PressPageProps) {
  const { locale } = await params;
  const tPress = await getTranslations({ locale, namespace: "press_page" });
  const tNav = await getTranslations({ locale, namespace: "navigation" });

  return (
    <>
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
                name: tNav("home"),
                item: "https://epicurien.bkk",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: tPress("title"),
                item: "https://epicurien.bkk/press",
              },
            ],
          }),
        }}
      />

      <PressHero />
      <PressMediaKit />
      <PressMentions />
      <PressContactForm />
      <PressAwards />
    </>
  );
}
