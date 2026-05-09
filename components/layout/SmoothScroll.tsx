"use client";

import { useLenis } from "@/hooks/useLenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Client component that initializes Lenis smooth scroll.
 * Must be placed inside a Server Component layout.
 *
 * Behavior:
 * - Desktop (pointer:fine): full smooth scroll enabled
 * - Mobile/tablet: simplified (no parallax chaining)
 * - prefers-reduced-motion: Lenis disabled, native scroll used
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  // Initialize Lenis — effect runs inside this client boundary
  useLenis();

  return <>{children}</>;
}
