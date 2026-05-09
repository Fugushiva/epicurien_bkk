"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { cn } from "@/lib/cn";

interface TextRevealProps {
  /** The text content to animate */
  text: string;
  /** Optional additional class names applied to the wrapper div */
  className?: string;
  /** Tag to render the text inside — defaults to p */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "blockquote";
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Stagger delay between words (s) */
  stagger?: number;
  /** Whether to split by words (default) or chars */
  splitBy?: "words" | "chars";
}

/**
 * TextReveal — Animates text word-by-word on scroll entrance.
 * Falls back to instant opacity reveal when prefers-reduced-motion is set.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "p",
  delay = 0,
  stagger = 0.04,
  splitBy = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = usePreferReducedMotion();

  const units = splitBy === "chars" ? text.split("") : text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : stagger,
        delayChildren: prefersReducedMotion ? 0 : delay / 1000,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 12,
    },
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
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Tag className={cn(className)}>
        {units.map((unit, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {unit}
            {splitBy === "words" && i < units.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
