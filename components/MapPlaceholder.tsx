import type { Txt } from "@/content/types";
import { T } from "./T";
import s from "./MapPlaceholder.module.css";

/**
 * A stylised map of Ras Al Khaimah (coastline, creek, main roads) with a pin on
 * Al Salam Street. Replace with an embedded live map before launch.
 */
export function MapPlaceholder({ caption, label, dark = false }: { caption: Txt; label: string; dark?: boolean }) {
  return (
    <figure className={s.figure} data-dark={dark || undefined}>
      <svg viewBox="0 0 480 360" className={s.map} role="img" aria-label={label} direction="ltr">
        <rect width="480" height="360" className={s.land} />
        {/* Arabian Gulf */}
        <path className={s.sea} d="M0 0h250c-20 40-30 70-60 100s-80 50-100 90S60 280 0 330z" />
        {/* Creek */}
        <path className={s.water} d="M190 100c30 20 70 22 110 50s60 60 110 70" />
        {/* Roads */}
        <path className={s.road} d="M40 360c60-80 120-140 210-190s150-90 230-110" />
        <path className={s.road} d="M150 360c20-70 70-120 140-160" />
        <path className={s.minor} d="M240 120l90 210M300 160l150-40M200 260l260-30M330 90l40 250" />
        {/* Park */}
        <path className={s.park} d="M300 236h44v30h-44z" />
        {/* Pin */}
        <g className={s.pin}>
          <circle cx="322" cy="214" r="18" className={s.pulse} />
          <path d="M322 230c-12-14-18-22-18-30a18 18 0 0 1 36 0c0 8-6 16-18 30z" />
          <circle cx="322" cy="200" r="6" className={s.pinDot} />
        </g>
        <text x="350" y="206" className={`${s.label} ${s.en}`}>
          Al Salam St
        </text>
        <text x="350" y="206" className={`${s.label} ${s.ar}`}>
          شارع السلام
        </text>
        <text x="40" y="60" className={`${s.label} ${s.en}`}>
          Arabian Gulf
        </text>
        <text x="40" y="60" className={`${s.label} ${s.ar}`}>
          الخليج العربي
        </text>
      </svg>
      <figcaption className="caption">
        <T v={caption} />
      </figcaption>
    </figure>
  );
}
