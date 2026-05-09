"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";

interface PressArticle {
  publication: string;
  year: number;
  lang: string;
  excerpt: string;
  href: string;
}

const ARTICLES: PressArticle[] = [
  {
    publication: "Le Parisien",
    year: 2021,
    lang: "FR",
    excerpt:
      "Enzo Le Bohec, 17 ans, remporte le concours du meilleur croissant d'Île-de-France au lycée d'Étiolles.",
    href: "#",
  },
  {
    publication: "Koktail Magazine",
    year: 2021,
    lang: "EN",
    excerpt:
      "Where To Find The Best Croissants In Bangkok — Épicurien stands out with its Parisian pedigree.",
    href: "#",
  },
  {
    publication: "The Thaiger",
    year: 2025,
    lang: "EN",
    excerpt:
      "Best Bakeries in Bangkok 2025 — the only bakery on this list with an award-winning Parisian croissant.",
    href: "#",
  },
  {
    publication: "Corner.inc",
    year: 2026,
    lang: "EN",
    excerpt:
      "Buttery & Beautiful: Best Artisan Bakeries in Bangkok — Épicurien earns its place as a neighbourhood gem.",
    href: "#",
  },
];

/**
 * PressMentions — timeline/grid of press articles.
 */
export function PressMentions() {
  const t = useTranslations("press_page.mentions");
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      className="bg-primary py-[var(--spacing-section)]"
      aria-labelledby="press-mentions-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.h2
          id="press-mentions-heading"
          ref={ref}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: [0, 0, 0.58, 1],
          }}
          className="text-display-2 text-bg mb-12"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ARTICLES.map((article, index) => (
            <motion.article
              key={article.publication}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: [0, 0, 0.58, 1],
              }}
              className="group p-6 rounded-sm border border-bg/10 hover:border-cta/40 transition-colors duration-200"
            >
              <header className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-heading-2 text-bg group-hover:text-cta transition-colors duration-150">
                    {article.publication}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-caption text-bg/50">
                      {article.year}
                    </span>
                    <span className="text-caption text-cta">
                      {article.lang}
                    </span>
                  </div>
                </div>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 rounded-sm text-bg/40 hover:text-cta transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
                  aria-label={`Read ${article.publication} article (opens in new tab)`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </header>
              <p className="text-body text-bg/60 line-clamp-3">
                {article.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
