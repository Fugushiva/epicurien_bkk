"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/cn";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const tVisit = useTranslations("visit_page");
  const tPress = useTranslations("press_page");

  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className={cn("bg-primary text-bg", "border-t border-bg/10", className)}
    >
      {/* ── Main footer grid ─────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 — About */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Wordmark */}
            <Link
              href={`/${locale}`}
              aria-label="Épicurien French Bakery — Home"
              className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded"
            >
              <span className="font-display text-2xl text-bg tracking-tight">
                Épicurien
              </span>
            </Link>
            <p className="text-bg/60 text-sm leading-relaxed font-body max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2 — Location */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-bg/40 uppercase tracking-widest mb-4">
              {tVisit("location.title")}
            </h3>
            <address className="not-italic space-y-3">
              <FooterContactItem
                icon={<MapPin className="w-4 h-4 shrink-0 mt-0.5" />}
              >
                <span className="text-sm text-bg/70 leading-relaxed">
                  {t("address")}
                </span>
              </FooterContactItem>
              <FooterContactItem icon={<Phone className="w-4 h-4 shrink-0" />}>
                <a
                  href="tel:+66807912902"
                  className="text-sm text-bg/70 hover:text-cta transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  {tVisit("hours.phone")}
                </a>
              </FooterContactItem>
              <FooterContactItem icon={<Mail className="w-4 h-4 shrink-0" />}>
                <a
                  href="mailto:hello@epicurien.bkk"
                  className="text-sm text-bg/70 hover:text-cta transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  {tVisit("hours.email")}
                </a>
              </FooterContactItem>
            </address>
          </div>

          {/* Column 3 — Resources */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-bg/40 uppercase tracking-widest mb-4">
              Resources
            </h3>
            <nav aria-label="Footer resources navigation">
              <ul className="space-y-2.5">
                <FooterNavItem href={`/${locale}/menu`} label={tNav("menu")} />
                <FooterNavItem
                  href={`/${locale}/press`}
                  label={tPress("media_kit.title")}
                />
                <FooterNavItem
                  href={`/${locale}/visit`}
                  label={tNav("visit")}
                />
                <FooterNavItem
                  href={`/${locale}/press`}
                  label={tNav("press")}
                />
              </ul>
            </nav>
          </div>

          {/* Column 4 — Follow */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-bg/40 uppercase tracking-widest mb-4">
              {t("social")}
            </h3>
            <div className="flex items-center gap-3">
              <SocialLink
                href="https://instagram.com/epicurienbkk"
                aria-label="Follow Épicurien on Instagram"
                label="IG"
              />
              <SocialLink
                href="https://facebook.com/epicurienbkk"
                aria-label="Follow Épicurien on Facebook"
                label="FB"
              />
              <SocialLink
                href="https://twitter.com/epicurienbkk"
                aria-label="Follow Épicurien on X"
                label="X"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div className="border-t border-bg/10">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-bg/40 font-mono">
            {t("legal").replace("2026", String(currentYear))}
          </p>
          <nav aria-label="Legal navigation">
            <ul className="flex items-center gap-4">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-xs text-bg/40 hover:text-bg/70 transition-colors duration-150 font-mono focus-visible:outline-none focus-visible:underline"
                >
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

interface FooterContactItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function FooterContactItem({ icon, children }: FooterContactItemProps) {
  return (
    <div className="flex items-start gap-2.5 text-bg/70">
      <span aria-hidden className="text-bg/40">
        {icon}
      </span>
      {children}
    </div>
  );
}

interface FooterNavItemProps {
  href: string;
  label: string;
}

function FooterNavItem({ href, label }: FooterNavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-bg/60 hover:text-bg transition-colors duration-150 font-body focus-visible:outline-none focus-visible:underline"
      >
        {label}
      </Link>
    </li>
  );
}

interface SocialLinkProps {
  href: string;
  "aria-label": string;
  label: string;
}

function SocialLink({ href, "aria-label": ariaLabel, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-full",
        "bg-bg/10 text-bg/60 text-xs font-mono font-medium",
        "hover:bg-bg/20 hover:text-bg",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta",
      )}
    >
      {label}
    </a>
  );
}
