"use client";

import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/cn";

interface AwardBandProps {
  className?: string;
}

/**
 * AwardBand — Full-width gold marquee band.
 * Displays award text in an infinite horizontal scroll loop.
 * Gold background (--color-cta) with ink text.
 * Respects prefers-reduced-motion via Marquee component.
 */
export function AwardBand({ className }: AwardBandProps) {
  const t = useTranslations("award_band");

  return (
    <section
      id="award-band"
      className={cn(
        "w-full overflow-hidden bg-cta py-5",
        "border-y border-primary/10",
        className,
      )}
      aria-label="Award recognition"
    >
      <Marquee
        text={t("text")}
        copies={8}
        duration={28}
        separator="·"
        className="text-primary font-mono text-caption tracking-widest font-medium"
      />
    </section>
  );
}
