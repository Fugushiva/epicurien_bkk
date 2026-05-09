"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Clock, Mail, Phone } from "lucide-react";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { BAKERY_INFO } from "@/lib/constants";

/**
 * VisitHours — opening hours table and contact details.
 */
export function VisitHours() {
  const t = useTranslations("visit_page");
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const sectionVariants = {
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

  const rows = [
    { label: t("hours.weekdays"), time: BAKERY_INFO.hours.weekdays },
    { label: t("hours.weekends"), time: BAKERY_INFO.hours.weekends },
  ];

  return (
    <section
      className="bg-primary py-[var(--spacing-section)] text-bg"
      aria-labelledby="hours-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Opening hours */}
          <motion.div
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 id="hours-heading" className="text-display-2 text-bg mb-8">
              {t("hours.title")}
            </h2>

            {/* Hours table */}
            <div className="space-y-0" role="table" aria-label="Opening hours">
              <div
                className="flex items-center gap-2 pb-3 mb-3 border-b border-bg/10"
                role="row"
              >
                <Clock
                  className="w-4 h-4 text-cta shrink-0"
                  aria-hidden="true"
                />
                <span className="text-caption text-cta">Open Every Day</span>
              </div>
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-4 border-b border-bg/10 last:border-0"
                  role="row"
                >
                  <span className="text-body text-bg/80" role="cell">
                    {row.label}
                  </span>
                  <span
                    className="text-body text-cta tabular-nums font-medium"
                    role="cell"
                  >
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.15,
                  ease: [0, 0, 0.58, 1] as const,
                },
              },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 lg:pt-[calc(var(--font-size-display-2)*1.05+2rem)]"
          >
            <h3 className="text-heading-1 text-bg sr-only">Contact</h3>

            <a
              href={`tel:${BAKERY_INFO.phone}`}
              className="flex items-center gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm"
            >
              <Phone className="w-5 h-5 text-cta shrink-0" aria-hidden="true" />
              <span className="text-body text-bg group-hover:text-cta transition-colors duration-150">
                {BAKERY_INFO.phone}
              </span>
            </a>

            <a
              href={`mailto:${BAKERY_INFO.email}`}
              className="flex items-center gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm"
            >
              <Mail className="w-5 h-5 text-cta shrink-0" aria-hidden="true" />
              <span className="text-body text-bg group-hover:text-cta transition-colors duration-150">
                {BAKERY_INFO.email}
              </span>
            </a>

            <p className="text-body text-bg/60 pt-2">
              Parking available at W District complex.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
