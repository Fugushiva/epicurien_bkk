"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";

interface HeroProps {
  locale: string;
}

/**
 * Hero — Full-bleed cinematic hero section.
 * - Display 1 title (Fraunces) + subtitle
 * - Background image with dark overlay
 * - GSAP ScrollTrigger parallax on desktop (pointer-fine)
 * - Framer Motion word-by-word entrance animation
 * - Scroll indicator chevron
 * - Respects prefers-reduced-motion
 */
export function Hero({ locale }: HeroProps) {
  const t = useTranslations("hero");
  const prefersReducedMotion = usePreferReducedMotion();
  const isDesktop = useMediaQuery("(pointer: fine)");
  const imageRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger parallax — desktop only, no reduced-motion
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let STRef: any;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      STRef = ScrollTrigger;

      if (!imageRef.current) return;

      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    };

    initGSAP();

    return () => {
      if (STRef) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        STRef.getAll().forEach((instance: any) => instance.kill());
      }
    };
  }, [isDesktop, prefersReducedMotion]);

  // Framer Motion variants — entrance
  const titleVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0, 0, 0.58, 1] as const,
        delay: 0.1,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: [0, 0, 0.58, 1] as const,
        delay: 0.35,
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: 0.8,
      },
    },
  };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-label="Hero"
    >
      {/* Background image */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero.jpg"
          alt="Fresh croissants from Épicurien French Bakery"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ transformOrigin: "center center" }}
        />
      </div>

      {/* Dark overlay — 60% opacity for readability */}
      <div className="absolute inset-0 bg-primary/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 max-w-5xl mx-auto">
        {/* Chapter label */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: prefersReducedMotion ? 0 : 0.5 },
            },
          }}
          className="text-caption text-cta mb-6 tracking-widest"
        >
          Bangkok · {new Date().getFullYear()}
        </motion.p>

        {/* Display title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className={cn(
            "text-display-1 text-bg text-center",
            "leading-none tracking-tight",
          )}
        >
          {t("title")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          className="text-display-2 text-bg/80 text-center mt-6 max-w-2xl"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA scroll indicator */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scrollIndicatorVariants}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <Link
            href="#award-band"
            className={cn(
              "flex flex-col items-center gap-2 text-bg/60",
              "hover:text-bg transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm",
            )}
            aria-label={t("scroll_label")}
          >
            <span className="text-caption tracking-widest">
              {t("scroll_label")}
            </span>
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, 6, 0],
                      transition: { repeat: Infinity, duration: 1.5 },
                    }
              }
            >
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
