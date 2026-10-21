import Link from "next/link";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/i18n";
import { Logo } from "./Logo";
import { T } from "./T";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ locale, c }: { locale: Locale; c: SiteContent }) {
  const year = new Date().getFullYear();
  return (
    <footer className={`${styles.footer} on-dark`}>
      <div className={`wrap ${styles.top}`}>
        <div className={styles.brand}>
          <Logo className={styles.logo} title={c.brand.name} />
          <p className={styles.promise}>{c.brand.promise}</p>
          <p className={styles.badge}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.5 5.6a8 8 0 1 0 7 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M12 3v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {c.footer.supportedBadge}
          </p>
        </div>

        <nav className={`${styles.col} ${styles.colLinks}`} aria-label={c.footer.quickLinks}>
          <h2 className={styles.colTitle}>{c.footer.quickLinks}</h2>
          <ul role="list">
            <li>
              <Link href={href(locale, "/planner")}>{c.ui.plan}</Link>
            </li>
            {c.nav.links.map((l) => (
              <li key={l.path}>
                <Link href={href(locale, l.path)}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`${styles.col} ${styles.colContact}`}>
          <h2 className={styles.colTitle}>{c.footer.contact}</h2>
          <address className={styles.address}>
            <a href={c.contact.phoneHref} dir="ltr">
              {c.contact.phone}
            </a>
            <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
            <span>{c.contact.address}</span>
            <span>{c.contact.hours}</span>
          </address>
        </div>

        <div className={`${styles.col} ${styles.colArea}`}>
          <h2 className={styles.colTitle}>{c.contact.serviceAreaLabel}</h2>
          <ul role="list">
            {c.contact.serviceArea.map((a, i) => (
              <li key={i}>
                <T v={a} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className={`wrap ${styles.name}`} aria-hidden="true">
        {locale === "ar" ? "آيفوري" : "Ivory"}
      </p>

      <div className={`wrap ${styles.bottom}`}>
        <span>
          © {year} {c.brand.name}. {c.footer.rights} <T v={c.brand.nameNote} />
        </span>
        <span>{c.footer.concept}</span>
      </div>
    </footer>
  );
}
