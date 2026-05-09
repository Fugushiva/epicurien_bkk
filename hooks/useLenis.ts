"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePreferReducedMotion } from "./usePreferReducedMotion";

/**
 * Initializes Lenis smooth scroll and connects it to GSAP ScrollTrigger.
 *
 * - Desktop (pointer:fine + no reduced-motion): full smooth scroll, GSAP ScrollTrigger synced
 * - Mobile/tablet (any pointer): simplified (no infinite scroll mode), GSAP not connected
 * - prefers-reduced-motion: Lenis disabled, native scroll used
 *
 * GSAP ScrollTrigger integration:
 * When Lenis is active, we forward Lenis scroll events to ScrollTrigger.scrollerProxy
 * so that all GSAP scroll animations track Lenis' virtual scroll position instead
 * of the raw window scroll, preventing jank in parallax/pin animations.
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
      // Disable touch multiplier on mobile (use native scroll momentum)
      ...(isDesktop ? {} : { touchMultiplier: 0 }),
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger on desktop only
    if (isDesktop) {
      const connectGSAP = async () => {
        try {
          const { ScrollTrigger } = await import("gsap/ScrollTrigger");
          const { gsap } = await import("gsap");
          gsap.registerPlugin(ScrollTrigger);

          // Sync ScrollTrigger to Lenis virtual scroll position
          lenis.on("scroll", ScrollTrigger.update);

          // Override ScrollTrigger's scroll measurement to use Lenis
          ScrollTrigger.scrollerProxy(document.documentElement, {
            scrollTop(value) {
              if (arguments.length && value !== undefined) {
                lenis.scrollTo(value, { immediate: true });
              }
              return lenis.scroll;
            },
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              };
            },
            pinType: document.documentElement.style.transform
              ? "transform"
              : "fixed",
          });

          ScrollTrigger.addEventListener("refresh", () => lenis.resize());
          ScrollTrigger.refresh();
        } catch {
          // GSAP not available — Lenis still works independently
        }
      };

      connectGSAP();
    }

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

      // Clean up ScrollTrigger proxy on desktop
      if (isDesktop) {
        import("gsap/ScrollTrigger")
          .then(({ ScrollTrigger }) => {
            ScrollTrigger.scrollerProxy(
              document.documentElement,
              undefined as never,
            );
            ScrollTrigger.refresh();
          })
          .catch(() => {});
      }
    };
  }, [prefersReducedMotion]);

  return lenisRef.current;
}
