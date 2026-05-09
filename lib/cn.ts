import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely.
 * Resolves conflicts using tailwind-merge, and supports conditional classes via clsx.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-cta", "text-primary")
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
