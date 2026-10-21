import Link from "next/link";
import type { Txt } from "@/content/types";
import { T } from "@/components/T";
import s from "./CtaBand.module.css";

/** Closing call to action on inner pages: evening light, one action. */
export function CtaBand({ title, text, cta, ctaHref, secondary }: { title: string; text?: Txt; cta: string; ctaHref: string; secondary?: { label: string; href: string } }) {
  return (
    <section className={s.band} aria-labelledby="cta-title">
      <div className={`wrap ${s.grid}`}>
        <h2 id="cta-title" className={s.title} data-reveal>
          {title}
        </h2>
        <div className={s.body}>
          {text && (
            <p className="lede" data-reveal style={{ ["--d" as string]: 1 }}>
              <T v={text} />
            </p>
          )}
          <div className={s.actions} data-reveal style={{ ["--d" as string]: 2 }}>
            <Link className="btn" href={ctaHref}>
              {cta}
            </Link>
            {secondary && (
              <a className="link-arrow" href={secondary.href} target={secondary.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {secondary.label} <span className="arrow" aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
