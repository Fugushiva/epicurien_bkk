"use client";

import { useActionState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { submitPressInquiry } from "@/app/actions/press";
import { usePreferReducedMotion } from "@/hooks/usePreferReducedMotion";
import { cn } from "@/lib/cn";

type FormState = { success: boolean; error?: string } | null;

/**
 * PressContactForm — accessible press inquiry form.
 * Uses React 19 useActionState with a Server Action.
 * Validates name, email, inquiry type, and message.
 */
export function PressContactForm() {
  const t = useTranslations("press_page.contact");
  const prefersReducedMotion = usePreferReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_, formData) => {
      return await submitPressInquiry(formData);
    },
    null,
  );

  const inputClass = cn(
    "w-full rounded-sm border border-secondary/30 bg-bg text-primary",
    "px-4 py-3 text-body placeholder:text-secondary/50",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:border-cta",
    "disabled:opacity-50",
  );

  const INQUIRY_TYPES = [
    { value: "interview", label: t("inquiry_interview") },
    { value: "review", label: t("inquiry_review") },
    { value: "partnership", label: t("inquiry_partnership") },
    { value: "other", label: t("inquiry_other") },
  ];

  return (
    <section
      className="bg-bg py-[var(--spacing-section)]"
      aria-labelledby="press-contact-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: heading */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: prefersReducedMotion ? 0 : 24 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: [0, 0, 0.58, 1],
            }}
          >
            <h2
              id="press-contact-heading"
              className="text-display-2 text-primary mb-4"
            >
              {t("title")}
            </h2>
            <p className="text-body text-secondary max-w-sm">
              {t("description")}
            </p>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: prefersReducedMotion ? 0 : 24 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.15,
              ease: [0, 0, 0.58, 1],
            }}
          >
            {/* Success state */}
            {state?.success ? (
              <div
                role="status"
                aria-live="polite"
                className="flex items-start gap-4 p-6 rounded-sm bg-accent-butter border border-cta/20"
              >
                <CheckCircle
                  className="w-6 h-6 text-cta shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-body text-primary">{t("success")}</p>
              </div>
            ) : (
              <form action={formAction} noValidate className="space-y-5">
                {/* Server error banner */}
                {state?.error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 p-4 rounded-sm bg-red-50 border border-red-200"
                  >
                    <AlertCircle
                      className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-body text-red-700">{state.error}</p>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label
                    htmlFor="press-name"
                    className="block text-caption text-primary mb-2"
                  >
                    {t("name_label")}
                    <span className="text-cta ml-1" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="press-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={inputClass}
                    placeholder={t("name_placeholder")}
                    disabled={isPending}
                    aria-required="true"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="press-email"
                    className="block text-caption text-primary mb-2"
                  >
                    {t("email_label")}
                    <span className="text-cta ml-1" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="press-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    placeholder="you@publication.com"
                    disabled={isPending}
                    aria-required="true"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label
                    htmlFor="press-org"
                    className="block text-caption text-primary mb-2"
                  >
                    {t("organization_label")}
                  </label>
                  <input
                    id="press-org"
                    name="organization"
                    type="text"
                    autoComplete="organization"
                    className={inputClass}
                    placeholder={t("organization_placeholder")}
                    disabled={isPending}
                  />
                </div>

                {/* Inquiry type */}
                <div>
                  <label
                    htmlFor="press-type"
                    className="block text-caption text-primary mb-2"
                  >
                    {t("inquiry_label")}
                    <span className="text-cta ml-1" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <select
                    id="press-type"
                    name="inquiryType"
                    required
                    className={cn(inputClass, "appearance-none cursor-pointer")}
                    disabled={isPending}
                    aria-required="true"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t("inquiry_placeholder")}
                    </option>
                    {INQUIRY_TYPES.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="press-message"
                    className="block text-caption text-primary mb-2"
                  >
                    {t("message_label")}
                    <span className="text-cta ml-1" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="press-message"
                    name="message"
                    required
                    rows={5}
                    className={cn(inputClass, "resize-y min-h-[120px]")}
                    placeholder={t("message_placeholder")}
                    disabled={isPending}
                    aria-required="true"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-3 px-8 py-4 rounded-full",
                    "bg-primary text-bg font-body font-medium text-body",
                    "hover:bg-secondary active:scale-95",
                    "transition-all duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                  aria-busy={isPending}
                >
                  <Send
                    className={cn("w-4 h-4", isPending && "animate-pulse")}
                    aria-hidden="true"
                  />
                  {isPending ? t("sending") : t("submit")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
