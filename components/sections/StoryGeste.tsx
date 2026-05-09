"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";

interface StoryGesteProps {
  className?: string;
}

/**
 * StoryGeste — Story Chapter 2: La Geste (The Craft)
 * 2-column: text left, macro photography right.
 * Image blur→clear reveal on scroll (Framer Motion).
 * GSAP parallax on desktop for image.
 * Mobile: text top, image bottom.
 */
export function StoryGeste({ className }: StoryGesteProps) {
  const t = useTranslations("story_geste");
  const prefersReducedMotion = usePreferReducedMotion();
  const isDesktop = useMediaQuery("(pointer: fine)");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-10% 0px" });
  const imageInView = useInView(imageRef, { once: true, margin: "-5% 0px" });

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
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 },
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
        "relative bg-bg overflow-hidden",
        "py-[var(--spacing-section)]",
        className,
      )}
      aria-labelledby="story-geste-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Text column — left on desktop */}
          <motion.div
            ref={textRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6 order-2 lg:order-1"
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
              id="story-geste-heading"
              variants={itemVariants}
              className="text-display-2 text-primary"
            >
              {t("title")}
            </motion.h2>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="text-body text-secondary max-w-prose leading-relaxed"
            >
              {t("body")}
            </motion.p>

            {/* Ingredient callout */}
            <motion.div
              variants={itemVariants}
              className={cn(
                "flex items-start gap-4 mt-2",
                "border-t border-primary/10 pt-6",
              )}
            >
              <div className="flex flex-col gap-1">
                <span className="text-caption text-cta tracking-widest">
                  Key Ingredients
                </span>
                <ul className="mt-2 flex flex-col gap-1">
                  {[
                    "Organic French butter",
                    "Madagascar vanilla",
                    "Artisan flour — T45",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-body text-secondary flex items-center gap-2"
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-cta inline-block"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Image column — right on desktop */}
          <div className="relative overflow-hidden rounded-sm aspect-[4/5] order-1 lg:order-2">
            <motion.div
              ref={imageRef}
              className="absolute inset-[-10%] will-change-transform"
              animate={
                prefersReducedMotion
                  ? { filter: "blur(0px)", opacity: 1 }
                  : imageInView
                    ? { filter: "blur(0px)", opacity: 1 }
                    : { filter: "blur(12px)", opacity: 0 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.9,
                ease: [0, 0, 0.58, 1],
              }}
            >
              <Image
                src="/images/craft.jpg"
                alt="Croissant feuilletage — layers of buttery pastry"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
