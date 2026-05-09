"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";

interface StoryChefProps {
  className?: string;
}

/**
 * StoryChef — Story Chapter 1: Le Chef
 * 2-column layout: image left (with parallax on desktop), text right.
 * Text reveals word-by-word on scroll via Framer Motion.
 * Mobile: image top, text bottom (single column).
 */
export function StoryChef({ className }: StoryChefProps) {
  const t = useTranslations("story_chef");
  const prefersReducedMotion = usePreferReducedMotion();
  const isDesktop = useMediaQuery("(pointer: fine)");
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-10% 0px" });

  // GSAP parallax on image — desktop only
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let STRef: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      STRef = ScrollTrigger;

      if (!imageRef.current || !sectionRef.current) return;

      gsap.fromTo(
        imageRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    };

    init();
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      STRef?.getAll().forEach((i: any) => i.kill());
    };
  }, [isDesktop, prefersReducedMotion]);

  // Framer Motion stagger for text blocks
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
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
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden bg-bg",
        "py-[var(--spacing-section)]",
        className,
      )}
      aria-labelledby="story-chef-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Image column */}
          <div className="relative overflow-hidden rounded-sm aspect-[4/5] lg:aspect-[3/4]">
            <div
              ref={imageRef}
              className="absolute inset-[-10%] will-change-transform"
            >
              <Image
                src="/images/chef-enzo.jpg"
                alt="Chef Enzo Le Bohec, founder of Épicurien French Bakery"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Text column */}
          <motion.div
            ref={textRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {/* Chapter label */}
            <motion.p
              variants={itemVariants}
              className="text-caption text-cta tracking-widest"
            >
              {t("chapter")}
            </motion.p>

            {/* Heading */}
            <motion.h2
              id="story-chef-heading"
              variants={itemVariants}
              className="text-display-2 text-primary"
            >
              {t("title")}
            </motion.h2>

            {/* Body text */}
            <motion.p
              variants={itemVariants}
              className={cn(
                "text-body text-secondary",
                "max-w-prose leading-relaxed",
              )}
            >
              {t("body")}
            </motion.p>

            {/* Inline quote */}
            <motion.blockquote
              variants={itemVariants}
              className={cn(
                "border-l-2 border-cta pl-6",
                "text-heading-2 text-primary font-heading italic",
              )}
            >
              &ldquo;{t("quote")}&rdquo;
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
