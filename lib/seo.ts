import type { Metadata } from "next";
import type { PageKey } from "@/content/types";
import { getContent } from "@/content";
import { locales, type Locale } from "./i18n";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ivorysmarthome.com").replace(/\/$/, "");

/** Per-page, per-locale metadata with hreflang alternates and Open Graph. */
export function pageMetadata(
  locale: Locale,
  page: PageKey,
  path = "",
  override?: { title?: string; description?: string }
): Metadata {
  const c = getContent(locale);
  const base = c.meta.pages[page];
  const title = override?.title ?? base.title;
  const description = override?.description ?? base.description;
  const languages = Object.fromEntries(locales.map((l) => [l === "ar" ? "ar-AE" : "en-AE", `/${l}${path}`]));

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ...languages, "x-default": `/en${path}` },
    },
    openGraph: {
      type: "website",
      siteName: c.meta.siteName,
      title: `${title} · ${c.meta.siteName}`,
      description,
      url: `/${locale}${path}`,
      locale: c.meta.ogLocale,
      alternateLocale: locale === "en" ? ["ar_AE"] : ["en_AE"],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function localBusinessJsonLd(locale: Locale) {
  const c = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: c.brand.name,
    description: c.meta.description,
    url: `${SITE_URL}/${locale}`,
    telephone: c.contact.phone.replace(/\s/g, ""),
    email: c.contact.email,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "ar" ? "شارع السلام، بجوار حديقة الدهان" : "Al Salam Street, next to Al Dahan Park",
      addressLocality: locale === "ar" ? "رأس الخيمة" : "Ras Al Khaimah",
      addressRegion: locale === "ar" ? "رأس الخيمة" : "Ras Al Khaimah",
      addressCountry: "AE",
    },
    geo: { "@type": "GeoCoordinates", latitude: c.contact.geo.lat, longitude: c.contact.geo.lng },
    // Opening hours: "Open daily" is confirmed, exact times are not. Add
    // openingHoursSpecification here once Ivory confirms them (see PLACEHOLDERS.md).
    areaServed: ["Ras Al Khaimah", "Umm Al Quwain", "Ajman", "Sharjah"],
    sameAs: [],
  };
}
