import { ImageResponse } from "next/og";
import { locales } from "@/lib/i18n";

export const alt = "Ivory Smart Home — smart homes designed in Ras Al Khaimah and supported for life";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** A simple social card: the wordmark and the promise over the evening "golden" light. Latin only, for font safety. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#12141A",
          color: "#F4EFE6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 44, letterSpacing: 10 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 64,
              border: "3px solid #F4EFE6",
              borderTopColor: "transparent",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 3, height: 34, background: "#B89A6A", marginTop: -14 }} />
          </div>
          IVORY
        </div>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, maxWidth: 980 }}>
          Smart homes, designed in Ras Al Khaimah and supported for life.
        </div>
        <div style={{ display: "flex", width: "100%", height: 10, background: "#E9C894" }} />
      </div>
    ),
    size
  );
}
