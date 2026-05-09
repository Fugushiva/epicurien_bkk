"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the given media query matches.
 * SSR-safe: returns false on first render, then updates client-side.
 *
 * @param query - CSS media query string, e.g. "(pointer: fine)"
 *
 * @example
 * const isDesktop = useMediaQuery("(pointer: fine)");
 * const isLarge = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
