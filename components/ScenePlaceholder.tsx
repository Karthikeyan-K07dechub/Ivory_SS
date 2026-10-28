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

/** Responsive photography with source credits and a fallback for future image slots. */
export function ScenePlaceholder({ image, ratio = "4 / 3", sizes = "100vw", priority, className, showCaption = true }: Props) {
  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      <div className={styles.frame} style={{ aspectRatio: ratio }} data-tone={image.tone}>
        {image.src ? (
          <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className={styles.img} style={{ objectPosition: image.position }} />
        ) : (
          <div className={styles.panel} role="img" aria-label={image.alt} data-parallax>
            <span className={styles.border} aria-hidden="true" />
          </div>
        )}
        {image.illustrative && (
          <span className={styles.badge}>
            <span className={styles.english}>Illustrative photo</span>
            <span className={styles.arabic}>صورة توضيحية</span>
          </span>
        )}
      </div>
      {showCaption && (
        <figcaption className={`caption ${styles.caption}`}>
          <T v={image.caption} />
          {image.credit && (
            <span className={styles.credit}>
              <span className={styles.english}>Photography: </span>
              <span className={styles.arabic}>تصوير: </span>
              <a href={image.credit.url} target="_blank" rel="noopener noreferrer">{image.credit.name} / Pexels</a>
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
