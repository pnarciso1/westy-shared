import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: "sm" | "md" | "lg";
  children?: ReactNode;
}

export function Card({ elevation, className = "", children, ...rest }: CardProps) {
  const classes = ["card", elevation ? `elev-${elevation}` : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

export function CardKicker({ children }: { children?: ReactNode }) {
  return <div className="card-kicker">{children}</div>;
}

export function CardTitle({ children }: { children?: ReactNode }) {
  return <div className="card-title">{children}</div>;
}

export function CardBody({ children }: { children?: ReactNode }) {
  return <p className="card-body">{children}</p>;
}

export function CardMeta({ children }: { children?: ReactNode }) {
  return <div className="card-meta">{children}</div>;
}
