import type { ReactNode } from "react";

export interface NavLinkItem {
  label: string;
  href: string;
  /** Marks the currently active route — renders aria-current="page" */
  active?: boolean;
}

export interface NavBarProps {
  brand: string;
  links: NavLinkItem[];
  /** Extra content pinned to the right, e.g. an avatar or Ask Westy trigger */
  trailing?: ReactNode;
}

export function NavBar({ brand, links, trailing }: NavBarProps) {
  return (
    <nav className="nav">
      <span className="nav-brand">{brand}</span>
      {links.map((link) => (
        <a key={link.href} href={link.href} aria-current={link.active ? "page" : undefined}>
          {link.label}
        </a>
      ))}
      {trailing}
    </nav>
  );
}
