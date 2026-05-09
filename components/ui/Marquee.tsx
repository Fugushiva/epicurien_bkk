"use client";

import { useRef, useEffect } from "react";
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
  /** If true, animation speed responds to scroll velocity via Lenis */
  scrollVelocity?: boolean;
}

/**
 * Marquee — Infinite horizontally scrolling text band.
 * Uses CSS animation (marquee keyframe defined in globals.css).
 * Pauses when prefers-reduced-motion is set.
 *
 * When scrollVelocity=true (desktop only), the playback rate accelerates
 * with scroll speed using GSAP + Lenis velocity, then decelerates smoothly.
 */
export function Marquee({
  text,
  copies = 6,
  duration = 30,
  className,
  separator = "★",
  scrollVelocity = false,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePreferReducedMotion();

  // Scroll-velocity effect — desktop only, no reduced motion
  useEffect(() => {
    if (!scrollVelocity || prefersReducedMotion || !trackRef.current) return;

    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    if (!isDesktop) return;

    let currentPlaybackRate = 1;
    let targetPlaybackRate = 1;
    let lastScrollY = window.scrollY;
    let rafId: number;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      const currentScrollY = window.scrollY;
      const velocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Map velocity → playback rate: 0 → 1, max ~40px/frame → 4
      targetPlaybackRate = 1 + Math.min(velocity / 10, 3);

      // Smooth interpolation back to baseline
      currentPlaybackRate = lerp(currentPlaybackRate, targetPlaybackRate, 0.1);

      if (trackRef.current) {
        // Only adjust if CSS animation is running
        const el = trackRef.current as HTMLElement;
        el.style.animationPlayState = "running";
        // Note: CSS animation-duration trick to control speed
        // We scale the duration inversely to simulate playback rate
        const adjustedDuration = duration / currentPlaybackRate;
        el.style.animationDuration = `${adjustedDuration}s`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [scrollVelocity, prefersReducedMotion, duration]);

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
