"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";

/**
 * MenuHero — page header for the /menu page.
 * Minimal editorial header with title + subtitle.
 */
export function MenuHero() {
  const t = useTranslations("menu_page");
  const prefersReducedMotion = usePreferReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <section
      className="bg-primary py-[var(--spacing-section)] text-bg"
      aria-labelledby="menu-page-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.span
            variants={itemVariants}
            className="text-caption text-cta block mb-4"
          >
            Épicurien French Bakery
          </motion.span>

          {/* Title */}
          <motion.h1
            id="menu-page-heading"
            variants={itemVariants}
            className="text-display-2 text-bg"
          >
            {t("title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-body text-bg/70 mt-4 max-w-xl"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
