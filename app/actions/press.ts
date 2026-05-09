"use server";

import { z } from "zod";

const PressInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  organization: z.string().max(100).optional(),
  inquiryType: z.enum(["interview", "review", "partnership", "other"]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

export type PressInquiryInput = z.infer<typeof PressInquirySchema>;

export interface ActionResult {
  success: boolean;
  error?: string;
}

/**
 * submitPressInquiry — Server Action for the /press contact form.
 * Validates input with Zod, then logs (email backend to be added Phase 7).
 */
export async function submitPressInquiry(
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    organization: formData.get("organization") || undefined,
    inquiryType: formData.get("inquiryType"),
    message: formData.get("message"),
  };

  const parsed = PressInquirySchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Validation failed";
    return { success: false, error: firstError };
  }

  // TODO Phase 7: Send email via Resend/SendGrid
  // For now: log server-side (never exposed to client)
  console.log("[Press Inquiry]", {
    name: parsed.data.name,
    email: parsed.data.email,
    organization: parsed.data.organization,
    inquiryType: parsed.data.inquiryType,
    timestamp: new Date().toISOString(),
  });

  return { success: true };
}
