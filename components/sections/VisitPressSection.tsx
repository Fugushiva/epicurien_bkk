"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { PRESS_PUBLICATIONS } from "@/lib/constants";
import { ExternalLink } from "lucide-react";

/**
 * VisitPressSection — press mentions ribbon on the Visit page.
 */
export function VisitPressSection() {
  const t = useTranslations("visit_page.press_mentions");
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      className="bg-accent-butter py-[var(--spacing-section)]"
      aria-labelledby="visit-press-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.h2
          id="visit-press-heading"
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
          className="text-display-2 text-primary mb-10"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRESS_PUBLICATIONS.map(({ name, href, year, lang }, index) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReducedMotion ? 0 : 16 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0, 0, 0.58, 1],
              }}
              className="group flex flex-col gap-3 p-6 rounded-sm bg-bg border border-secondary/10 hover:border-cta/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-heading-2 text-primary group-hover:text-cta transition-colors duration-150">
                  {name}
                </p>
                <ExternalLink
                  className="w-4 h-4 text-secondary group-hover:text-cta transition-colors duration-150 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-caption text-secondary">{year}</span>
                <span className="text-caption text-cta">{lang}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
