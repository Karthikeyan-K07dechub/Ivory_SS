import localFont from "next/font/local";

/*
 * Fonts are self-hosted through next/font (files vendored from Fontsource, SIL Open Font Licence),
 * so builds never depend on reaching Google Fonts and nothing shifts while fonts load.
 */

export const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/newsreader-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const hanken = localFont({
  src: [{ path: "./fonts/hanken-grotesk-latin-wght-normal.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-hanken",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const amiri = localFont({
  src: [
    { path: "./fonts/amiri-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/amiri-arabic-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
  fallback: ["Times New Roman", "serif"],
});

export const plexArabic = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-ar",
  display: "swap",
  preload: false,
  fallback: ["Tahoma", "Arial", "sans-serif"],
});
