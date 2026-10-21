import type { PropertyType, SystemSlug } from "@/content/types";
import s from "./PlannerArt.module.css";

/** A small line-art house; each selected system lights up its part of the home. */
export function PlannerHouse({ on }: { on: SystemSlug[] }) {
  const lit = (slug: SystemSlug) => (on.includes(slug) ? true : undefined);
  return (
    <svg viewBox="0 0 360 300" className={s.house} aria-hidden="true">
      <g className={s.lines}>
        {/* Shell */}
        <path d="M40 280V90h280v190M30 90h300M40 100h280M40 185h280M150 100v85M230 185v95M10 280h340" />

        {/* Networking & Wi-Fi: arcs over the roof */}
        <g className={s.zone} data-on={lit("networking-wifi")}>
          <path d="M150 62a42 42 0 0 1 60 0M160 72a28 28 0 0 1 40 0M170 82a14 14 0 0 1 20 0" />
        </g>

        {/* Climate: AC unit with cool air */}
        <g className={s.zone} data-on={lit("climate-control")}>
          <rect x="54" y="110" width="70" height="16" rx="4" />
          <path className={s.flow} d="M60 136c6 4 12-4 18 0s12 4 18 0 12-4 18 0M66 146c6 4 12-4 18 0s12 4 18 0" />
        </g>

        {/* Lighting: pendants and pools */}
        <g className={s.zone} data-on={lit("smart-lighting")}>
          <path d="M190 100v22M270 100v22M186 126h8l-4-4zM266 126h8l-4-4z" />
          <path className={s.pool} d="M190 128l-22 56h44zM270 128l-22 56h44z" />
        </g>

        {/* Curtains: upper-floor window */}
        <g className={s.zone} data-on={lit("curtains-shades")}>
          <rect x="56" y="140" width="76" height="38" />
          <path className={s.curtainL} d="M58 140v38M62 140v38" />
          <path className={s.curtainR} d="M130 140v38M126 140v38" />
        </g>

        {/* Security: camera on the corner */}
        <g className={s.zone} data-on={lit("security-cctv")}>
          <path d="M320 112h8M302 106h18l4 10h-22z" />
          <path className={s.pool} d="M302 114l-58 70 34 10z" />
        </g>

        {/* Intercom: front door and panel */}
        <g className={s.zone} data-on={lit("intercom-access")}>
          <rect x="164" y="212" width="40" height="68" />
          <path d="M196 246v8" />
          <rect x="212" y="226" width="10" height="16" rx="1" />
          <rect className={s.fill} x="214" y="228" width="6" height="5" />
        </g>

        {/* Audio-video: screen and speaker */}
        <g className={s.zone} data-on={lit("audio-video")}>
          <rect x="60" y="210" width="68" height="38" />
          <rect className={s.fill} x="62" y="212" width="64" height="34" />
          <path d="M84 254h20M94 248v6" />
          <rect x="136" y="214" width="10" height="30" rx="1" />
        </g>

        {/* Building management: panel with meters */}
        <g className={s.zone} data-on={lit("building-management")}>
          <rect x="262" y="206" width="40" height="52" />
          <path className={s.fill} d="M270 248v-12h6v12zM280 248v-22h6v22zM290 248v-30h6v30z" />
        </g>
      </g>
    </svg>
  );
}

/** Small line icons for the property-type cards. */
export function PropertyIcon({ type }: { type: PropertyType }) {
  const paths: Record<PropertyType, string> = {
    villa: "M6 42V20h36v22M4 20h40M14 42V30h8v12M28 26h8v8h-8zM18 20v-6h12v6",
    apartment: "M12 44V6h24v38M18 12h4v4h-4zM26 12h4v4h-4zM18 22h4v4h-4zM26 22h4v4h-4zM18 32h4v4h-4zM26 32h4v4h-4zM22 44v-6h4v6",
    office: "M8 44V14h20v30M28 22h12v22M13 20h10M13 26h10M13 32h10M13 38h10M32 28h4M32 34h4M4 44h40",
    hotel: "M6 44V12h36v32M6 18h36M14 24h6v6h-6zM28 24h6v6h-6zM14 34h6v6h-6zM28 34h6v6h-6zM20 6h8v6h-8z",
    building: "M10 44V4h28v40M16 10h4v4h-4zM28 10h4v4h-4zM16 18h4v4h-4zM28 18h4v4h-4zM16 26h4v4h-4zM28 26h4v4h-4zM20 44v-8h8v8M4 44h40",
  };
  return (
    <svg viewBox="0 0 48 48" className={s.prop} aria-hidden="true">
      <path d={paths[type]} />
    </svg>
  );
}
