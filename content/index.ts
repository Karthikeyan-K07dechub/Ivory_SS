import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "./types";
import { en } from "./en";
import { ar } from "./ar";

const dictionaries: Record<Locale, SiteContent> = { en, ar };

/** The simple dictionary loader: everything a page needs, typed. */
export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

export type { SiteContent } from "./types";
