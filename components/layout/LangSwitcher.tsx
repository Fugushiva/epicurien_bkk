"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

interface LangOption {
  code: Locale;
  label: string;
  flag: string;
}

const LANG_OPTIONS: LangOption[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "th", label: "ภาษาไทย", flag: "🇹🇭" },
];

interface LangSwitcherProps {
  className?: string;
}

export function LangSwitcher({ className }: LangSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current =
    LANG_OPTIONS.find((l) => l.code === locale) ?? LANG_OPTIONS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleLocaleChange(newLocale: Locale) {
    // Replace the current locale prefix in the pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");

    setIsOpen(false);
    router.push(newPath);
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("language")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
          "text-sm font-body font-medium",
          "bg-primary/80 text-bg border border-bg/10 backdrop-blur-sm",
          "hover:bg-secondary transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2",
          "cursor-pointer",
        )}
      >
        <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden />
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 shrink-0 transition-transform duration-150",
            isOpen && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            aria-label={t("language")}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute right-0 top-full mt-1.5 z-50",
              "min-w-[8rem] rounded-xl overflow-hidden",
              "bg-primary border border-bg/10 shadow-xl",
              "py-1",
            )}
          >
            {LANG_OPTIONS.map((option) => (
              <li
                key={option.code}
                role="option"
                aria-selected={option.code === locale}
              >
                <button
                  type="button"
                  onClick={() => handleLocaleChange(option.code)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3.5 py-2",
                    "text-sm font-body text-left cursor-pointer",
                    "transition-colors duration-100",
                    option.code === locale
                      ? "text-cta bg-bg/5"
                      : "text-bg/80 hover:text-bg hover:bg-bg/10",
                  )}
                >
                  <span aria-hidden className="text-base leading-none">
                    {option.flag}
                  </span>
                  <span>{option.label}</span>
                  {option.code === locale && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-cta"
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
