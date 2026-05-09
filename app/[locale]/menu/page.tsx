import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { MenuHero } from "@/components/sections/MenuHero";
import { MenuGrid } from "@/components/sections/MenuGrid";
import { buildAlternates, ogLocale, absoluteUrl } from "@/lib/seo";

interface MenuPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MenuPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menu_page" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/menu"),
    openGraph: {
      url: absoluteUrl(locale, "/menu"),
      title: t("title"),
      description: t("subtitle"),
      locale: ogLocale(locale),
    },
  };
}

/**
 * Menu page — full product catalogue with category filtering.
 * SSG (build-time rendered).
 */
export default async function MenuPage({ params }: MenuPageProps) {
  await params;

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
                name: "Home",
                item: "https://epicurien.bkk",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Menu",
                item: "https://epicurien.bkk/menu",
              },
            ],
          }),
        }}
      />

      <MenuHero />
      <MenuGrid />
    </>
  );
}
