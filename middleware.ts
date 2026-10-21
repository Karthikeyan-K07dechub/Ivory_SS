import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";

/**
 * Sends any path without a locale prefix to the visitor's language
 * (Arabic when the browser prefers it, English otherwise).
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const accept = request.headers.get("accept-language") ?? "";
  const locale = /^ar\b|,\s*ar\b/i.test(accept) ? "ar" : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|icon.svg|robots.txt|sitemap.xml|images|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|txt|xml|pdf|woff2)$).*)",
  ],
};
