"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";

interface MarqueeProps {
  /** Text content to repeat in the marquee */
  text: string;
  /** Number of duplicate text copies — more = seamless loop at any container width */
  copies?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Additional class names for the track wrapper */
  className?: string;
  /** Separator between repeated text items */
  separator?: string;
}

/**
 * Marquee — Infinite horizontally scrolling text band.
 * Uses CSS animation (marquee keyframe defined in globals.css).
 * Pauses when prefers-reduced-motion is set.
 */
export function Marquee({
  text,
  copies = 6,
  duration = 30,
  className,
  separator = "★",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePreferReducedMotion();

  const repeatedItems = Array.from({ length: copies }, (_, i) => (
    <span key={i} className="inline-flex items-center gap-6 px-6 shrink-0">
      <span>{text}</span>
      <span aria-hidden="true" className="text-primary/40">
        {separator}
      </span>
    </span>
  ));

  return (
    <div
      className={cn("overflow-hidden select-none", className)}
      aria-label={text}
      role="marquee"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{
          animation: prefersReducedMotion
            ? "none"
            : `marquee ${duration}s linear infinite`,
          // Duplicate content so loop is seamless: original + clone
          width: "max-content",
        }}
      >
        {/* Original set */}
        {repeatedItems}
        {/* Clone — ensures seamless looping (translateX -50% in keyframe) */}
        {repeatedItems}
      </div>
    </div>
  );
}
