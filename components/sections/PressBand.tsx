"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { PRESS_PUBLICATIONS } from "@/lib/constants";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { cn } from "@/lib/cn";

interface PressBandProps {
  className?: string;
}

/**
 * PressBand — "As Seen In" horizontal press logos band.
 * Stone background, greyscale→color hover on each logo.
 * Stagger fade-in on scroll. Links to /[locale]/press.
 */
export function PressBand({ className }: PressBandProps) {
  const t = useTranslations("press_band");
  const locale = useLocale();
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className={cn("bg-secondary py-[var(--spacing-section)]", className)}
      aria-labelledby="press-band-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section heading */}
        <motion.h2
          id="press-band-heading"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-caption text-bg/40 tracking-widest text-center mb-12"
        >
          {t("title")}
        </motion.h2>

        {/* Publication list */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-14 lg:gap-20"
          role="list"
        >
          {PRESS_PUBLICATIONS.map((pub) => (
            <motion.li key={pub.name} variants={itemVariants}>
              <Link
                href={`/${locale}/press`}
                className={cn(
                  "group flex flex-col items-center gap-1",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-secondary rounded-sm",
                )}
                aria-label={`${pub.name} — press mention`}
              >
                {/* Publication name as styled text (placeholder for logo) */}
                <span
                  className={cn(
                    "font-heading text-heading-2 font-semibold italic",
                    "text-bg/30 group-hover:text-bg",
                    "transition-colors duration-300",
                    "select-none",
                  )}
                >
                  {pub.name}
                </span>
                <span className="text-caption text-bg/20 tracking-widest group-hover:text-cta/60 transition-colors duration-300">
                  {pub.lang} · {pub.year}
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
