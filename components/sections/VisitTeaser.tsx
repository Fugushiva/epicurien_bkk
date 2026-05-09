"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { MapPin } from "lucide-react";
import { BAKERY_INFO } from "@/lib/constants";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { cn } from "@/lib/cn";

interface VisitTeaserProps {
  className?: string;
}

/**
 * VisitTeaser — Full-width image section with address overlay.
 * Background: interior photo of Épicurien.
 * Overlay: dark gradient, address text, CTA → /[locale]/visit.
 * Framer Motion fade-in from bottom on scroll.
 */
export function VisitTeaser({ className }: VisitTeaserProps) {
  const t = useTranslations("visit_teaser");
  const locale = useLocale();
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
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
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        "min-h-[50svh] flex items-center",
        className,
      )}
      aria-labelledby="visit-teaser-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/interior.jpg"
          alt="Inside Épicurien French Bakery at W District, Bangkok"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Gradient overlay — bottom-heavy for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 py-24 text-center"
      >
        {/* Location pin */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <MapPin className="w-5 h-5 text-cta" aria-hidden="true" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="visit-teaser-heading"
          variants={itemVariants}
          className="text-display-2 text-bg"
        >
          {BAKERY_INFO.name}
        </motion.h2>

        {/* Address */}
        <motion.p variants={itemVariants} className="mt-4 text-body text-bg/70">
          {BAKERY_INFO.address}
        </motion.p>

        {/* Hours */}
        <motion.p
          variants={itemVariants}
          className="mt-2 text-caption text-bg/50 tracking-widest"
        >
          {t("open_daily")} · {BAKERY_INFO.hours.weekdays}
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-10">
          <Link
            href={`/${locale}/visit`}
            className={cn(
              "inline-flex items-center gap-2",
              "px-8 py-3 rounded-full",
              "bg-cta text-primary font-body font-medium text-sm",
              "hover:bg-cta/90 active:scale-95",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            )}
          >
            {t("cta")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
