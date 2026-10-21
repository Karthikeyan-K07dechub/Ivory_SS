import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import { SITE_URL, localBusinessJsonLd } from "@/lib/seo";
import { newsreader, hanken, amiri, plexArabic } from "../fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SmoothScroll } from "@/components/SmoothScroll";
import { RevealObserver } from "@/components/RevealObserver";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getContent(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.meta.pages.home.title, template: c.meta.titleTemplate },
    description: c.meta.description,
    applicationName: c.meta.siteName,
    formatDetection: { telephone: true, email: true, address: true },
    icons: { icon: "/icon.svg" },
  };
}

export const viewport: Viewport = {
  themeColor: "#F4EFE6",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);
  const fontVars = [newsreader.variable, hanken.variable, amiri.variable, plexArabic.variable].join(" ");

  return (
    <html lang={locale === "ar" ? "ar-AE" : "en-AE"} dir={dirOf(locale)} className={fontVars} suppressHydrationWarning>
      <head>
        {/* Marks that JS runs, before first paint, so reveal-on-scroll never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(locale)) }}
        />
      </head>
      <body>
        <SiteHeader
          locale={locale}
          ui={c.ui}
          nav={c.nav}
          rooms={c.rooms.map((r) => ({ id: r.id, name: r.name }))}
          brandName={c.brand.name}
          contact={{ phone: c.contact.phone, phoneHref: c.contact.phoneHref, email: c.contact.email }}
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter locale={locale} c={c} />
        <WhatsAppButton
          number={c.contact.whatsappNumber}
          template={c.ui.whatsappTemplate}
          label={c.ui.whatsappFloat}
          topics={c.ui.topics}
        />
        <SmoothScroll />
        <RevealObserver />
      </body>
    </html>
  );
}
