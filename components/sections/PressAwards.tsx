"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { cn } from "@/lib/cn";

/**
 * PressAwards — large award card for "Best Croissant Île-de-France 2021".
 */
export function PressAwards() {
  const t = useTranslations("press_page.awards");
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      className="bg-accent-butter py-[var(--spacing-section)]"
      aria-labelledby="awards-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.h2
          id="awards-heading"
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
          className="text-display-2 text-primary mb-12"
        >
          {t("title")}
        </motion.h2>

        {/* Award card */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReducedMotion ? 0 : 30 }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            delay: prefersReducedMotion ? 0 : 0.1,
            ease: [0, 0, 0.58, 1],
          }}
          className={cn(
            "relative overflow-hidden rounded-sm p-10 lg:p-16",
            "bg-primary text-bg",
            "flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16",
          )}
        >
          {/* Star badge */}
          <div
            className="shrink-0 w-24 h-24 rounded-full bg-cta flex items-center justify-center text-primary"
            aria-hidden="true"
          >
            <span className="text-[2.5rem] leading-none">★</span>
          </div>

          {/* Award details */}
          <div>
            <p className="text-caption text-cta mb-3">
              Official Recognition · March 2021
            </p>
            <h3 className="text-display-2 text-bg mb-4">
              Best Croissant
              <br />
              Île-de-France 2021
            </h3>
            <p className="text-body text-bg/70 max-w-2xl">
              Organised at Lycée d&apos;Étiolles, Essonne. Chef Enzo Le Bohec —
              then 17 years old and training at École Ferrandi Paris — won among
              9 candidates from Paris, Essonne, and Yvelines. Judged on form,
              colour, texture, and flavour by 5 professional jurors.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
