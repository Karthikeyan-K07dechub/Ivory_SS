import catalog from "./photo-catalog.json";
import type { ImageRef } from "./types";

export type PhotoKey = keyof typeof catalog;

/** Locally hosted reference photography; never presented as an actual Ivory installation. */
export function photo(key: PhotoKey, tone: ImageRef["tone"] = "stone"): ImageRef {
  const item = catalog[key];
  return {
    src: `/images/${key}.webp`,
    alt: item.alt,
    caption: item.caption,
    tone,
    illustrative: true,
    position: "position" in item ? item.position : "50% 50%",
    credit: {
      name: item.photographer,
      url: `https://www.pexels.com/photo/${item.page}-${item.id}/`,
    },
  };
}
