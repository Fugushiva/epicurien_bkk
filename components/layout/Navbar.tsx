"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
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

  // Hide on scroll down past threshold, show on scroll up or at top
  const isHidden = direction === "down" && isPastThreshold;

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
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-full"
          aria-label="Épicurien French Bakery — Home"
        >
          <span className="font-display text-bg text-lg tracking-tight leading-none">
            Épicurien
          </span>
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
