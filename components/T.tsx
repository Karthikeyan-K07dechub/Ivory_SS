import type { Txt } from "@/content/types";
import { Placeholder } from "./Placeholder";
import styles from "./T.module.css";

/**
 * Renders a content value. Invented values become <Placeholder>; English left on the
 * Arabic site is set left-to-right with a small "AR pending" marker.
 * `nested`: the value sits inside a link or button.
 */
export function T({ v, nested = false }: { v: Txt; nested?: boolean }) {
  if (typeof v === "string") return <>{v}</>;
  const inner = v.tbc ? <Placeholder nested={nested}>{v.text}</Placeholder> : v.text;
  if (!v.arPending) return <>{inner}</>;
  return (
    <span className={styles.pending} lang="en" dir="ltr">
      {inner}
      <span className={styles.flag} lang="ar" dir="rtl">
        الترجمة قيد الإعداد · AR pending
      </span>
    </span>
  );
}
