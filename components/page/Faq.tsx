import type { Txt } from "@/content/types";
import { T } from "@/components/T";
import s from "./Faq.module.css";

/** Accessible accordion on native <details>: keyboard-usable, works without JavaScript. */
export function Faq({ items }: { items: { q: string; a: Txt }[] }) {
  return (
    <div className={s.list}>
      {items.map((item, i) => (
        <details key={i} className={s.item} name="faq">
          <summary className={s.q}>
            <span>{item.q}</span>
            <span className={s.sign} aria-hidden="true" />
          </summary>
          <div className={s.a}>
            <p>
              <T v={item.a} />
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
