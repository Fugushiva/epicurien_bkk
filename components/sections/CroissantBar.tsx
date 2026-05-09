"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { FEATURED_PRODUCTS } from "@/lib/constants";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { cn } from "@/lib/cn";

interface CroissantBarProps {
  className?: string;
}

/**
 * CroissantBar — 6-product showcase grid on the homepage.
 * 3-col desktop, 2-col tablet, 1-col mobile.
 * Cards stagger-animate in on scroll.
 * CTA → /[locale]/menu
 */
export function CroissantBar({ className }: CroissantBarProps) {
  const t = useTranslations("croissant_bar");
  const locale = useLocale();
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const headingVariants = {
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
      className={cn("bg-bg py-[var(--spacing-section)]", className)}
      aria-labelledby="croissant-bar-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          ref={ref}
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 flex items-end justify-between"
        >
          <h2
            id="croissant-bar-heading"
            className="text-display-2 text-primary"
          >
            {t("title")}
          </h2>
          <Link
            href={`/${locale}/menu`}
            className={cn(
              "hidden sm:inline-flex items-center gap-2",
              "text-caption text-cta hover:text-cta/80 tracking-widest",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 rounded-sm",
            )}
          >
            {t("cta")}
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {FEATURED_PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              category={product.category}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              href={`/${locale}/menu#${product.id}`}
              delay={index * 0.08}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
          className="mt-10 flex justify-center sm:hidden"
        >
          <Link
            href={`/${locale}/menu`}
            className={cn(
              "inline-flex items-center gap-2",
              "px-8 py-3 rounded-full",
              "bg-primary text-bg font-body font-medium text-sm",
              "hover:bg-secondary active:scale-95",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            )}
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
