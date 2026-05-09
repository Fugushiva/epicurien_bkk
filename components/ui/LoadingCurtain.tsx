"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";

/**
 * LoadingCurtain — Page entrance animation that "wipes" open on first load.
 * Two panels (top + bottom) slide away to reveal the page content.
 *
 * - Desktop: 2-panel wipe (top + bottom halves), 1.2s total
 * - Mobile: single fade, 0.6s
 * - prefers-reduced-motion: instant (no curtain, content visible immediately)
 *
 * Only runs once per session (sessionStorage flag).
 */
export function LoadingCurtain() {
  const prefersReducedMotion = usePreferReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    // Only show curtain once per session
    const hasShown = sessionStorage.getItem("epicurien-curtain-shown");
    if (!hasShown && !prefersReducedMotion) {
      setIsVisible(true);
      sessionStorage.setItem("epicurien-curtain-shown", "1");
    }
  }, [prefersReducedMotion]);

  // Don't render on server or when reduced motion is preferred
  if (!hasMounted || prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Top panel */}
          <motion.div
            key="curtain-top"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{}}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={() => setIsVisible(false)}
            style={{ transformOrigin: "top center" }}
            className="fixed inset-x-0 top-0 h-1/2 bg-primary z-[9999] pointer-events-none"
            aria-hidden="true"
          >
            {/* Wordmark centered in top panel */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="font-display text-bg text-4xl tracking-tight select-none"
                aria-hidden="true"
              >
                Épicurien
              </motion.span>
            </div>
          </motion.div>

          {/* Bottom panel */}
          <motion.div
            key="curtain-bottom"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{}}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ transformOrigin: "bottom center" }}
            className="fixed inset-x-0 bottom-0 h-1/2 bg-primary z-[9999] pointer-events-none"
            aria-hidden="true"
          />
        </>
      )}
    </AnimatePresence>
  );
}
