import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

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
  };
}

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen">
      <h1 className="text-display-1 text-center px-4">{t("title")}</h1>
      <p className="text-display-2 text-secondary text-center px-4 mt-4">
        {t("subtitle")}
      </p>
    </main>
  );
}
