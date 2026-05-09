"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePreferReducedMotion } from "./usePreferReducedMotion";

/**
 * Initializes Lenis smooth scroll.
 *
 * - Desktop (pointer:fine + no reduced-motion): full smooth scroll
 * - Mobile/tablet (any pointer): simplified (no infinite scroll mode)
 * - prefers-reduced-motion: Lenis disabled, native scroll used
 *
 * @returns The Lenis instance (or null if disabled)
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = usePreferReducedMotion();

  useEffect(() => {
    // Disable Lenis when user prefers reduced motion
    if (prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    // Detect device type
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    // Initialize Lenis with device-appropriate settings
    const lenis = new Lenis({
      duration: isDesktop ? 1.2 : 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Disable on mobile (touch devices use native scroll momentum)
      ...(isDesktop ? {} : { touchMultiplier: 0 }),
    });

    lenisRef.current = lenis;

    // RAF loop
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return lenisRef.current;
}
