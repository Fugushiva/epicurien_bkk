"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Download, FileText } from "lucide-react";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { cn } from "@/lib/cn";

/**
 * PressMediaKit — media kit download section.
 * Links to public/press-kit.zip (placeholder until real kit is uploaded).
 */
export function PressMediaKit() {
  const t = useTranslations("press_page.media_kit");
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const contents = [
    t("contents_logo"),
    t("contents_photos"),
    t("contents_bio"),
    t("contents_factsheet"),
  ];

  return (
    <section
      className="bg-bg py-[var(--spacing-section)]"
      aria-labelledby="media-kit-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: description */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: prefersReducedMotion ? 0 : 24 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: [0, 0, 0.58, 1],
            }}
          >
            <h2
              id="media-kit-heading"
              className="text-display-2 text-primary mb-6"
            >
              {t("title")}
            </h2>
            <p className="text-body text-secondary mb-8">{t("body")}</p>

            {/* Kit contents list */}
            <ul className="space-y-3 mb-10" aria-label="Media kit contents">
              {contents.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <FileText
                    className="w-4 h-4 text-cta shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-body text-primary">{item}</span>
                </li>
              ))}
            </ul>

            {/* Download CTA */}
            <a
              href="/press-kit.zip"
              download
              className={cn(
                "inline-flex items-center gap-3 px-8 py-4 rounded-full",
                "bg-cta text-primary font-body font-medium text-body",
                "hover:bg-cta/90 active:scale-95",
                "transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2",
              )}
              aria-label="Download Épicurien media kit ZIP"
            >
              <Download className="w-5 h-5" aria-hidden="true" />
              {t("cta")}
            </a>
          </motion.div>

          {/* Right: decorative award visual */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: prefersReducedMotion ? 0 : 24 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.15,
              ease: [0, 0, 0.58, 1],
            }}
            className={cn(
              "p-10 rounded-sm border border-cta/20 bg-accent-butter",
              "flex flex-col items-center justify-center text-center gap-4 min-h-[280px]",
            )}
            aria-hidden="true"
          >
            <span className="text-[4rem]">★</span>
            <p className="text-heading-1 text-primary">
              Best Croissant
              <br />
              Île-de-France
            </p>
            <p className="text-caption text-accent-caramel">2021</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
