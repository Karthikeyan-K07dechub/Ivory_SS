import type { Txt } from "@/content/types";
import { T } from "./T";
import s from "./MapPlaceholder.module.css";

/** A real regional map, without claiming an unconfirmed exact office pin. */
export function MapPlaceholder({ caption, label, dark = false }: { caption: Txt; label: string; dark?: boolean }) {
  return (
    <figure className={s.figure} data-dark={dark || undefined}>
      <iframe
        className={s.map}
        title={label}
        src="https://www.openstreetmap.org/export/embed.html?bbox=55.906%2C25.764%2C55.978%2C25.815&layer=mapnik"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <figcaption className="caption">
        <a href="https://www.openstreetmap.org/#map=14/25.7895/55.9432" target="_blank" rel="noopener noreferrer">
          <T v={caption} /> <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
