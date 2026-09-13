import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  /** Square icon-only button (36x36, no padding) */
  icon?: boolean;
  /** Full-width, left-aligned label — used in stacked action lists */
  block?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = "secondary",
  icon = false,
  block = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    icon ? "btn-icon" : "",
    block ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
