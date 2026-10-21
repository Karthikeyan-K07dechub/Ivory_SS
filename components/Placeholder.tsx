import type { ReactNode } from "react";
import styles from "./Placeholder.module.css";

/**
 * Wraps invented content (numbers, names, quotes). Dotted underline, with a
 * "To be confirmed" tooltip on hover or focus. The tooltip text follows the page
 * language, so this works in server components without props.
 * Pass `nested` when it sits inside a link or button, so it adds no extra tab stop.
 */
export function Placeholder({ children, nested = false }: { children: ReactNode; nested?: boolean }) {
  return (
    <span className={styles.ph} tabIndex={nested ? undefined : 0}>
      {children}
      <span className={styles.tip} role="tooltip">
        <span className={styles.en}>To be confirmed</span>
        <span className={styles.ar}>بانتظار التأكيد</span>
      </span>
    </span>
  );
}
