import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AwardBand } from "@/components/sections/AwardBand";
import { StoryChef } from "@/components/sections/StoryChef";
import { PullQuote } from "@/components/sections/PullQuote";
import { StoryGeste } from "@/components/sections/StoryGeste";
import { CroissantBar } from "@/components/sections/CroissantBar";
import { PressBand } from "@/components/sections/PressBand";
import { VisitTeaser } from "@/components/sections/VisitTeaser";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `https://epicurien.bkk/${locale}`,
      languages: {
        en: "https://epicurien.bkk/en",
        fr: "https://epicurien.bkk/fr",
        th: "https://epicurien.bkk/th",
      },
    },
    openGraph: {
      url: `https://epicurien.bkk/${locale}`,
      locale: locale === "fr" ? "fr_FR" : locale === "th" ? "th_TH" : "en_US",
    },
  };
}

/**
 * Homepage — 8 sections in cinematic order:
 * 1. Hero
 * 2. AwardBand
 * 3. StoryChef (Chapter 1)
 * 4. PullQuote
 * 5. StoryGeste (Chapter 2)
 * 6. CroissantBar
 * 7. PressBand
 * 8. VisitTeaser
 */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <>
      {/* 1. Hero — cinematic full-bleed with parallax */}
      <Hero locale={locale} />

      {/* 2. Award Band — gold marquee */}
      <AwardBand />

      {/* 3. Story Chapter 1: Le Chef */}
      <StoryChef />

      {/* 4. Pull Quote — Enzo's words */}
      <PullQuote />

      {/* 5. Story Chapter 2: La Geste */}
      <StoryGeste />

      {/* 6. Croissant Bar — 6 featured products */}
      <CroissantBar />

      {/* 7. Press Band — "As Seen In" */}
      <PressBand />

      {/* 8. Visit Teaser — location CTA */}
      <VisitTeaser />
    </>
  );
}
