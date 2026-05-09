"use client";

import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down" | null;

interface ScrollState {
  /** Current scroll Y position in pixels */
  scrollY: number;
  /** Scroll direction relative to previous frame — null on first render */
  direction: ScrollDirection;
  /** True when the page has been scrolled past the threshold */
  isPastThreshold: boolean;
}

/**
 * Tracks scroll position and direction.
 * SSR-safe: returns zeroed state on first render.
 *
 * @param threshold - Pixel offset before `isPastThreshold` becomes true (default 80)
 *
 * @example
 * const { scrollY, direction, isPastThreshold } = useScrollTrigger(80);
 * // Hide navbar when scrolling down past 80px
 * const isNavbarHidden = direction === "down" && isPastThreshold;
 */
export function useScrollTrigger(threshold = 80): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    direction: null,
    isPastThreshold: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const direction: ScrollDirection =
        currentScrollY > lastScrollY ? "down" : "up";

      setState({
        scrollY: currentScrollY,
        direction,
        isPastThreshold: currentScrollY > threshold,
      });

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return state;
}
