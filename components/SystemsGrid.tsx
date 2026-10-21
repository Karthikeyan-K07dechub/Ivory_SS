import Link from "next/link";
import type { SystemContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/i18n";
import { SystemIcon } from "./SystemIcon";
import { T } from "./T";
import s from "./SystemsGrid.module.css";

/** A calm grid of the eight systems. Hovering or focusing an entry "switches on" its icon. */
export function SystemsGrid({ locale, systems, learnMore }: { locale: Locale; systems: SystemContent[]; learnMore: string }) {
  return (
    <ul role="list" className={s.grid}>
      {systems.map((sys, i) => (
        <li key={sys.slug} className={s.item} data-reveal style={{ ["--d" as string]: i % 4 }}>
          <Link href={href(locale, `/solutions/${sys.slug}`)} className={s.link} data-switch>
            <SystemIcon slug={sys.slug} className={s.icon} />
            <span className={s.text}>
              <span className={s.name}>{sys.name}</span>
              <span className={s.short}>
                <T v={sys.short} nested />
              </span>
            </span>
            <span className={s.more}>
              <span className="sr-only">{learnMore}</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
