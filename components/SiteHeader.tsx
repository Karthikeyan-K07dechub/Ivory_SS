"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/i18n";
import { Logo } from "./Logo";
import { FloorPlanMenu } from "./FloorPlanMenu";
import styles from "./SiteHeader.module.css";

interface Props {
  locale: Locale;
  ui: SiteContent["ui"];
  nav: SiteContent["nav"];
  rooms: { id: string; name: string }[];
  brandName: string;
  contact: { phone: string; phoneHref: string; email: string };
}

export function SiteHeader({ locale, ui, nav, rooms, brandName, contact }: Props) {
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const other: Locale = locale === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);

  return (
    <>
      <a className="skip-link" href="#main">
        {ui.skipToContent}
      </a>
      <header className={styles.header}>
        <div className={`wrap ${styles.bar}`}>
          <Link href={href(locale)} className={styles.home} aria-label={brandName}>
            <Logo title={brandName} />
          </Link>
          <nav className={styles.actions} aria-label="Primary">
            <ul role="list" className={styles.desktopLinks}>
              {nav.links.map((link) => {
                const target = href(locale, link.path);
                const active = pathname === target || pathname.startsWith(`${target}/`);
                return (
                  <li key={link.path}>
                    <Link className={styles.navLink} href={target} aria-current={active ? "page" : undefined}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link className={styles.lang} href={switchHref} hrefLang={other} lang={other} aria-label={ui.switchLanguage}>
              <span aria-hidden="true" className={locale === "en" ? styles.current : undefined}>
                EN
              </span>
              <span aria-hidden="true" className={styles.sep}>
                |
              </span>
              <span aria-hidden="true" className={locale === "ar" ? styles.current : styles.arGlyph}>
                ع
              </span>
            </Link>
            <Link className={`btn ${styles.plan}`} href={href(locale, "/planner")}>
              {ui.plan}
            </Link>
            <button
              ref={menuButton}
              type="button"
              className={styles.menu}
              aria-expanded={open}
              aria-controls="floor-plan-menu"
              onClick={() => setOpen(true)}
            >
              <span className={styles.menuIcon} aria-hidden="true">
                <span />
                <span />
              </span>
              {ui.menu}
            </button>
          </nav>
        </div>
      </header>
      <FloorPlanMenu
        id="floor-plan-menu"
        open={open}
        onClose={() => {
          setOpen(false);
          menuButton.current?.focus();
        }}
        locale={locale}
        ui={ui}
        nav={nav}
        rooms={rooms}
        contact={contact}
      />
    </>
  );
}
