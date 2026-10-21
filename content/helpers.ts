import type { Rich, Txt } from "./types";

/** Marks invented content (numbers, names, quotes). Renders with a dotted underline and a "To be confirmed" tooltip. */
export const tbc = (text: string): Rich => ({ text, tbc: true });

/** Keeps an English paragraph on the Arabic site with an "AR pending" marker until it is translated. */
export const arPending = (value: Txt): Rich =>
  typeof value === "string" ? { text: value, arPending: true } : { ...value, arPending: true };

/** Plain string for attributes, metadata and WhatsApp text. */
export const plain = (value: Txt): string => (typeof value === "string" ? value : value.text);
