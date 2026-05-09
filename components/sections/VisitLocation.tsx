"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Train } from "lucide-react";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { BAKERY_INFO } from "@/lib/constants";

/**
 * VisitLocation — address, BTS info, and embedded map placeholder.
 * Google Maps iframe (W District, Sukhumvit 71, Bangkok).
 */
export function VisitLocation() {
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

  return (
    <section
      className="bg-bg py-[var(--spacing-section)]"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Address details */}
          <motion.div
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2
              id="location-heading"
              className="text-display-2 text-primary mb-8"
            >
              {t("location.title")}
            </h2>

            <div className="space-y-6">
              {/* Address */}
              <address className="not-italic">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-cta mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-body text-primary font-medium">
                      Épicurien French Bakery
                    </p>
                    <p className="text-body text-secondary mt-1">
                      {t("location.address")}
                    </p>
                  </div>
                </div>
              </address>

              {/* BTS */}
              <div className="flex items-center gap-3">
                <Train
                  className="w-5 h-5 text-cta shrink-0"
                  aria-hidden="true"
                />
                <p className="text-body text-secondary">{t("location.bts")}</p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <span className="text-caption text-cta shrink-0">TEL</span>
                <a
                  href={`tel:${BAKERY_INFO.phone}`}
                  className="text-body text-primary hover:text-cta transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm"
                >
                  {BAKERY_INFO.phone}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Map embed */}
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
            className="aspect-[4/3] rounded-sm overflow-hidden bg-accent-butter"
          >
            <iframe
              title="Épicurien French Bakery location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.7!2d100.6!3d13.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zEpicurien+French+Bakery!5e0!3m2!1sen!2sth!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
