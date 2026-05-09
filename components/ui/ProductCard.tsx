"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";

export type ProductCategory =
  | "croissant"
  | "viennoiserie"
  | "bread"
  | "seasonal";

export interface ProductCardProps {
  /** Product identifier (used for anchor links) */
  id: string;
  /** Product name */
  name: string;
  /** Short description */
  description?: string;
  /** Price in THB */
  price?: number;
  /** Product category */
  category: ProductCategory;
  /** Image path relative to /public */
  imageSrc: string;
  /** Image alt text */
  imageAlt: string;
  /** Link href — defaults to /[locale]/menu#id */
  href?: string;
  /** Animation stagger delay (seconds) */
  delay?: number;
  /** Additional class names */
  className?: string;
}

const categoryLabels: Record<ProductCategory, string> = {
  croissant: "Croissant",
  viennoiserie: "Viennoiserie",
  bread: "Bread",
  seasonal: "Seasonal",
};

/**
 * ProductCard — Reusable card for menu items and section grids.
 * Hover: image scales to 1.05 (desktop). Reduced-motion: no scale.
 */
export function ProductCard({
  id,
  name,
  description,
  price,
  category,
  imageSrc,
  imageAlt,
  href,
  delay = 0,
  className,
}: ProductCardProps) {
  const prefersReducedMotion = usePreferReducedMotion();
  const linkHref = href ?? `#${id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0, 0, 0.58, 1],
      }}
      className={cn("group flex flex-col", className)}
    >
      <Link href={linkHref} className="block overflow-hidden rounded-sm">
        {/* Image wrapper with aspect ratio */}
        <div className="relative aspect-[4/3] overflow-hidden bg-accent-butter">
          <motion.div
            className="h-full w-full"
            whileHover={
              prefersReducedMotion
                ? {}
                : { scale: 1.05, transition: { duration: 0.4 } }
            }
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </Link>

      {/* Card body */}
      <div className="mt-4 flex flex-col gap-1">
        {/* Category badge */}
        <span className="text-caption text-secondary">
          {categoryLabels[category]}
        </span>

        {/* Name */}
        <h3 className="text-heading-2 text-primary">{name}</h3>

        {/* Description */}
        {description && (
          <p className="text-body text-secondary line-clamp-2">{description}</p>
        )}

        {/* Price */}
        {price !== undefined && (
          <p className="text-caption text-cta mt-1">{price} ฿</p>
        )}
      </div>
    </motion.article>
  );
}
