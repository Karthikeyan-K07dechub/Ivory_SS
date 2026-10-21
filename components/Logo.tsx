import styles from "./Logo.module.css";

/**
 * Wordmark: "IVORY" with the O drawn as a thin power-symbol circle, "SMART HOME" beneath.
 * Drawn entirely in SVG so it renders identically in both locales.
 */
export function Logo({ className, title = "Ivory Smart Home" }: { className?: string; title?: string }) {
  return (
    <svg
      className={`${styles.logo} ${className ?? ""}`}
      viewBox="0 0 168 50"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="square">
        {/* I */}
        <path d="M6 4v28" />
        {/* V */}
        <path d="M18 4l13 28 13-28" strokeLinejoin="miter" />
        {/* O as a power symbol */}
        <path d="M66.5 8.2a14 14 0 1 0 13 0" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M73 2.5v14" strokeWidth="1.4" strokeLinecap="round" className={styles.stem} />
        {/* R */}
        <path d="M98 32V4h10.5a7.5 7.5 0 0 1 0 15H98m10.5 0L117 32" strokeLinejoin="miter" />
        {/* Y */}
        <path d="M124 4l11 15 11-15M135 19v13" strokeLinejoin="miter" />
      </g>
      <text x="6" y="47" className={styles.sub} textLength="140" lengthAdjust="spacing">
        SMART HOME
      </text>
    </svg>
  );
}
