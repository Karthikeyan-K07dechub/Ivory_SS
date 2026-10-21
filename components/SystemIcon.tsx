import type { SystemSlug } from "@/content/types";
import s from "./SystemIcon.module.css";

/**
 * Thin line icons for the eight systems. Each has a `lit` layer that "switches on"
 * when the icon or its card is hovered, focused, or marked active.
 */
export function SystemIcon({ slug, className, on }: { slug: SystemSlug; className?: string; on?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={`${s.icon} ${className ?? ""}`} data-on={on || undefined} aria-hidden="true">
      {ICONS[slug]}
    </svg>
  );
}

const ICONS: Record<SystemSlug, React.ReactElement> = {
  "smart-lighting": (
    <>
      <path className={s.lit} d="M24 30 12 44h24z" />
      <path d="M24 4v10M16 14h16l-3 10H19z" />
      <path className={s.ray} d="M8 22l4 2M40 22l-4 2M24 34v4" />
    </>
  ),
  "climate-control": (
    <>
      <rect x="6" y="10" width="36" height="12" rx="3" />
      <path d="M10 18h28" className={s.faint} />
      <path className={s.wave} d="M12 28c3 2 6-2 9 0s6 2 9 0 6-2 9 0M14 35c3 2 6-2 9 0s6 2 9 0 6-2 9 0" />
      <circle className={s.dot} cx="37" cy="14" r="1.4" />
    </>
  ),
  "curtains-shades": (
    <>
      <path d="M4 6h40M8 6v36M40 6v36" />
      <path className={s.lit} d="M24 10a8 8 0 1 1 0 .1z" />
      <g className={s.left}>
        <path d="M10 8v32M13 8v32M16 8v32" />
      </g>
      <g className={s.right}>
        <path d="M38 8v32M35 8v32M32 8v32" />
      </g>
    </>
  ),
  "security-cctv": (
    <>
      <path d="M6 10h4M10 6v8M10 10h20l4 6H10z" />
      <path className={s.lit} d="M32 15 44 40 22 36z" />
      <circle className={s.dot} cx="28" cy="12" r="1.4" />
      <path d="M18 16v6h-6" />
    </>
  ),
  "intercom-access": (
    <>
      <rect x="14" y="4" width="20" height="40" rx="2" />
      <rect className={s.screen} x="18" y="9" width="12" height="10" />
      <circle cx="24" cy="31" r="4" />
      <path d="M20 24h8" className={s.faint} />
      <circle className={s.dot} cx="24" cy="39" r="1.3" />
    </>
  ),
  "networking-wifi": (
    <>
      <path className={s.arc3} d="M6 20a26 26 0 0 1 36 0" />
      <path className={s.arc2} d="M12 26a17 17 0 0 1 24 0" />
      <path className={s.arc1} d="M18 32a8 8 0 0 1 12 0" />
      <circle cx="24" cy="38" r="2" />
    </>
  ),
  "audio-video": (
    <>
      <rect x="4" y="8" width="30" height="20" />
      <path className={s.lit} d="M5 9h28v18H5z" />
      <path d="M14 34h10M19 28v6" />
      <rect x="38" y="10" width="6" height="28" rx="1" />
      <circle cx="41" cy="30" r="1.8" />
      <path className={s.wave} d="M36 18c2 2 2 4 0 6" />
    </>
  ),
  "building-management": (
    <>
      <path d="M8 44V8h20v36M28 18h12v26M4 44h40" />
      <path
        className={s.windows}
        d="M13 14h4v4h-4zM19 14h4v4h-4zM13 22h4v4h-4zM19 22h4v4h-4zM13 30h4v4h-4zM19 30h4v4h-4zM32 24h4v4h-4zM32 32h4v4h-4z"
      />
    </>
  ),
};
