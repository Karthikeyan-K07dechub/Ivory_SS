"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/content/types";
import { T } from "@/components/T";
import s from "./Testimonials.module.css";

/** Three short quotes that crossfade. Pauses on hover and focus; controls for keyboard users. */
export function Testimonials({ items, previous, next }: { items: Testimonial[]; previous: string; next: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % items.length), 7000);
    return () => window.clearInterval(t);
  }, [paused, items.length]);

  return (
    <div
      className={s.wrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={s.stage} aria-live="polite">
        {items.map((q, idx) => (
          <figure key={idx} className={s.quote} data-active={idx === i} aria-hidden={idx !== i}>
            <blockquote className={s.text}>
              <p>
                “<T v={q.quote} />”
              </p>
            </blockquote>
            <figcaption className={s.who}>
              <span className={s.name}>
                <T v={q.name} />
              </span>
              <span>
                <T v={q.place} />
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={s.controls}>
        <button type="button" className={s.btn} onClick={() => setI((x) => (x - 1 + items.length) % items.length)} aria-label={previous}>
          <span className="arrow" aria-hidden="true">
            ←
          </span>
        </button>
        <span className={s.count} aria-hidden="true">
          {i + 1} / {items.length}
        </span>
        <button type="button" className={s.btn} onClick={() => setI((x) => (x + 1) % items.length)} aria-label={next}>
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
