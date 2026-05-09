"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/constants";
import type { ProductCategory } from "@/components/ui/ProductCard";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { cn } from "@/lib/cn";

type CategoryFilter = "all" | ProductCategory;

/**
 * MenuGrid — full product catalogue with category tab filtering.
 * 4-col desktop, 3-col tablet, 2-col mobile, 1-col small mobile.
 */
export function MenuGrid() {
  const t = useTranslations("menu_page");
  const locale = useLocale();
  const prefersReducedMotion = usePreferReducedMotion();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const categories: CategoryFilter[] = [
    "all",
    "croissant",
    "viennoiserie",
    "bread",
  ];

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const tabVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <section
      className="bg-bg py-[var(--spacing-section)]"
      aria-labelledby="menu-grid-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Category filter tabs */}
        <motion.div
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          className="mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-caption px-5 py-2 rounded-full border transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2",
                activeCategory === cat
                  ? "bg-primary text-bg border-primary"
                  : "bg-transparent text-secondary border-secondary/40 hover:border-primary hover:text-primary",
              )}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </motion.div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10"
            aria-live="polite"
            aria-atomic="true"
          >
            {filteredProducts.map((product, index) => (
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
                delay={index * 0.06}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <p className="text-body text-secondary text-center py-16">
            No products in this category.
          </p>
        )}
      </div>
    </section>
  );
}
