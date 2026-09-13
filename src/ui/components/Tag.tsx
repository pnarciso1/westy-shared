import type { ReactNode } from "react";

export interface TagProps {
  variant?: "accent" | "accent-2" | "neutral" | "outline";
  children?: ReactNode;
}

/**
 * Per the design system's own convention: tag-accent is reserved for things
 * that need the household's attention (e.g. Bill.status === "flagged",
 * Anomaly.severity === "action_needed"). Don't reach for it decoratively.
 */
export function Tag({ variant = "neutral", children }: TagProps) {
  return <span className={`tag tag-${variant}`}>{children}</span>;
}
