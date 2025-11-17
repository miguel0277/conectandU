"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./site-header.module.css";

type NavLink = {
  label: string;
  href: string;
};

const defaultLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Talleres", href: "/eventos" },
  { label: "Contacto", href: "/#contacto" },
];

type SiteHeaderProps = {
  links?: NavLink[];
  actionSlot?: React.ReactNode;
};

export function SiteHeader({
  links = defaultLinks,
  actionSlot,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);
  const innerClassName = [
    styles.inner,
    menuOpen ? styles.mobileOpen : "",
  ]
    .filter(Boolean)
    .join(" ");
  const navClassName = [
    styles.nav,
    menuOpen ? styles.navOpen : "",
  ]
    .filter(Boolean)
    .join(" ");
  const actionsClassName = [
    styles.actions,
    menuOpen ? styles.actionsOpen : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={`${styles.wrapper} ${menuOpen ? styles.wrapperExpanded : ""}`}>
      <div className={innerClassName}>
        <Link href="/" className={styles.brand} onClick={handleLinkClick}>
          <Image
            src="Conectando/Group.svg"
            alt="Conectando"
            width={80}
            height={46}
            priority={false}
          />
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-label="Abrir menú de navegación"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Image
            src="/category.svg"
            alt="Abrir menú"
            width={28}
            height={28}
            priority={false}
          />
        </button>

        <nav className={navClassName} aria-label="Navegación principal">
          {links.map((link) => {
            const isAnchorLink = link.href.includes("#");
            const isActive =
              !isAnchorLink && pathname === link.href
                ? styles.active
                : undefined;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ?? ""}`}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {actionSlot && (
          <div
            className={actionsClassName}
            onClickCapture={handleLinkClick}
          >
            {actionSlot}
          </div>
        )}
      </div>
    </header>
  );
}
