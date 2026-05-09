"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";

interface NavItem {
  key: "home" | "menu" | "visit" | "press";
  href: string;
}

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const locale = useLocale();
  const t = useTranslations("navigation");
  const tCommon = useTranslations("common");
  const prefersReducedMotion = usePreferReducedMotion();
  const { direction, isPastThreshold } = useScrollTrigger(80);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hide on scroll down past threshold, show on scroll up or at top
  const isHidden = direction === "down" && isPastThreshold;

  // Easter egg: triple-click on logo
  const handleLogoClick = useCallback(() => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 600);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      setEasterEggActive(true);
      setTimeout(() => setEasterEggActive(false), 3000);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on route changes (scroll to top)
  useEffect(() => {
    setIsMobileOpen(false);
  }, [locale]);

  const navItems: NavItem[] = [
    { key: "home", href: `/${locale}` },
    { key: "menu", href: `/${locale}/menu` },
    { key: "visit", href: `/${locale}/visit` },
    { key: "press", href: `/${locale}/press` },
  ];

  return (
    <>
      {/* ── Floating pill navbar ──────────────────────────────────────── */}
      <motion.header
        role="banner"
        initial={false}
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: isHidden ? "-140%" : "0%",
                opacity: isHidden ? 0 : 1,
              }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "fixed top-4 inset-x-4 z-50",
          "flex items-center justify-between",
          "px-4 py-3",
          "rounded-full",
          "bg-primary/90 backdrop-blur-md",
          "border border-bg/10 shadow-lg",
          className,
        )}
      >
        {/* Logo — triple-click triggers easter egg */}
        <Link
          href={`/${locale}`}
          onClick={handleLogoClick}
          className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-full"
          aria-label="Épicurien French Bakery — Home"
        >
          <motion.span
            animate={
              prefersReducedMotion
                ? {}
                : easterEggActive
                  ? { color: "#CA8A04", scale: 1.1 }
                  : { color: "#FAFAF9", scale: 1 }
            }
            transition={{ duration: 0.3 }}
            className="font-display text-lg tracking-tight leading-none"
          >
            Épicurien
          </motion.span>
        </Link>

        {/* Desktop nav links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1"
        >
          {navItems.map((item) => (
            <NavLink key={item.key} href={item.href} label={t(item.key)} />
          ))}
        </nav>

        {/* Right side: LangSwitcher + mobile toggle */}
        <div className="flex items-center gap-2">
          <LangSwitcher />

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={
              isMobileOpen ? tCommon("close_menu") : tCommon("open_menu")
            }
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className={cn(
              "md:hidden flex items-center justify-center w-8 h-8 rounded-full",
              "text-bg hover:bg-bg/10 transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta",
            )}
          >
            {isMobileOpen ? (
              <X className="w-4 h-4" aria-hidden />
            ) : (
              <Menu className="w-4 h-4" aria-hidden />
            )}
          </button>
        </div>
      </motion.header>

      {/* ── Easter egg overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {easterEggActive && (
          <motion.div
            key="easter-egg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="bg-primary/95 backdrop-blur-lg rounded-2xl px-12 py-10 text-center border border-cta/20 shadow-2xl">
              <p className="font-display text-cta text-4xl mb-3 tracking-tight">
                ★ Meilleur Croissant ★
              </p>
              <p className="font-body text-bg/70 text-sm tracking-widest uppercase">
                Île-de-France 2021
              </p>
              <p className="font-mono text-bg/40 text-xs mt-4 tracking-widest">
                — Enzo Le Bohec
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed top-20 inset-x-4 z-40",
              "rounded-2xl overflow-hidden",
              "bg-primary/95 backdrop-blur-md",
              "border border-bg/10 shadow-xl",
              "py-2",
            )}
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "block px-5 py-3.5",
                  "font-body text-sm font-medium text-bg/80",
                  "hover:text-bg hover:bg-bg/5",
                  "transition-colors duration-100",
                  "focus-visible:outline-none focus-visible:bg-bg/10",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

// ── NavLink sub-component ─────────────────────────────────────────────────

interface NavLinkProps {
  href: string;
  label: string;
}

function NavLink({ href, label }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3.5 py-1.5 rounded-full",
        "font-body text-sm font-medium text-bg/70",
        "hover:text-bg hover:bg-bg/10",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
      )}
    >
      {label}
    </Link>
  );
}
