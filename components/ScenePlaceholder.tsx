import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { T } from "./T";
import styles from "./ScenePlaceholder.module.css";

interface Props {
  image: ImageRef;
  /** CSS aspect ratio, e.g. "4 / 5". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  showCaption?: boolean;
}

/**
 * A photograph slot. With `image.src` it shows the real photo; without, a warm tonal
 * panel with grain and a thin inner border, captioned "Photo: … (replace)".
 */
export function ScenePlaceholder({ image, ratio = "4 / 3", sizes = "100vw", priority, className, showCaption = true }: Props) {
  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      <div className={styles.frame} style={{ aspectRatio: ratio }} data-tone={image.tone}>
        {image.src ? (
          <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className={styles.img} />
        ) : (
          <div className={styles.panel} role="img" aria-label={image.alt} data-parallax>
            <span className={styles.border} aria-hidden="true" />
          </div>
        )}
      </div>
      {showCaption && (
        <figcaption className={`caption ${styles.caption}`}>
          <T v={image.caption} />
        </figcaption>
      )}
    </figure>
  );
}
