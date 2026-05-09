"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { cn } from "@/lib/cn";

interface PullQuoteProps {
  className?: string;
}

/**
 * PullQuote — Full-width dark section with a large Enzo quote.
 * Word-by-word reveal on scroll (Framer Motion stagger).
 * Dark stone background (#44403C), gold accent lines, CTA → /visit.
 */
export function PullQuote({ className }: PullQuoteProps) {
  const t = useTranslations("pull_quote");
  const locale = useLocale();
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  // Split quote into words for staggered reveal
  const quoteText = t("text");
  const words = quoteText.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.35,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  const fadeInVariants = {
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
      className={cn(
        "relative bg-secondary py-[var(--spacing-section)] overflow-hidden",
        className,
      )}
      aria-label="Chef quote"
    >
      {/* Gold accent line top */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-cta/30"
        aria-hidden="true"
      />
      {/* Gold accent line bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-cta/30"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
        {/* Large quote mark — decorative */}
        <motion.span
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="block font-display text-cta/30 text-[8rem] leading-none select-none mb-4"
          aria-hidden="true"
        >
          &ldquo;
        </motion.span>

        {/* Quote text — word-by-word reveal */}
        <motion.blockquote
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-display-2 text-bg font-heading italic leading-snug"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </motion.blockquote>

        {/* Attribution */}
        <motion.p
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
          className="mt-8 text-caption text-bg/60 tracking-widest"
        >
          {t("attribution")}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: prefersReducedMotion ? 0 : 0.75 }}
          className="mt-10"
        >
          <Link
            href={`/${locale}/visit`}
            className={cn(
              "inline-flex items-center gap-2",
              "px-8 py-3 rounded-full",
              "bg-cta text-primary font-body font-medium text-sm",
              "hover:bg-cta/90 active:scale-95",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
            )}
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
