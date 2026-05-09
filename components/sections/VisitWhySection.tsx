"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Flame, Star, MapPin } from "lucide-react";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { cn } from "@/lib/cn";

interface USPItem {
  key: "ambiance" | "quality" | "location";
  Icon: React.ElementType;
}

const USP_ITEMS: USPItem[] = [
  { key: "ambiance", Icon: Flame },
  { key: "quality", Icon: Star },
  { key: "location", Icon: MapPin },
];

/**
 * VisitWhySection — 3 USP cards (ambiance, quality, location).
 */
export function VisitWhySection() {
  const t = useTranslations("visit_page.why_visit");
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      className="bg-bg py-[var(--spacing-section)]"
      aria-labelledby="why-visit-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}
        <motion.h2
          id="why-visit-heading"
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

        {/* USP grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {USP_ITEMS.map(({ key, Icon }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReducedMotion ? 0 : 24 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: [0, 0, 0.58, 1],
              }}
              className={cn(
                "p-8 rounded-sm border border-secondary/10",
                "bg-bg hover:border-cta/30 transition-colors duration-300",
              )}
            >
              <div className="w-10 h-10 rounded-full bg-accent-butter flex items-center justify-center mb-6">
                <Icon
                  className="w-5 h-5 text-accent-caramel"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-heading-2 text-primary mb-3">
                {t(`reasons.${key}.title`)}
              </h3>
              <p className="text-body text-secondary">
                {t(`reasons.${key}.body`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
