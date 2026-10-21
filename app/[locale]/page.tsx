import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import type { SystemSlug } from "@/content/types";
import { HomeExperience } from "@/components/home/HomeExperience";
import {
  SystemsSection,
  WhySection,
  HowSection,
  ProjectsSection,
  CareSection,
  BrandsSection,
  TestimonialsSection,
  ProsSection,
  FinalScene,
} from "@/components/home/Sections";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "home");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);
  const systemNames = Object.fromEntries(c.systems.map((s) => [s.slug, s.name])) as Record<SystemSlug, string>;

  return (
    <>
      <HomeExperience
        locale={locale}
        brand={c.brand}
        hero={c.home.hero}
        walkthrough={c.home.walkthrough}
        ui={{
          plan: c.ui.plan,
          whatsappUs: c.ui.whatsappUs,
          room: c.ui.room,
          roomsNav: c.ui.roomsNav,
          goToRoom: c.ui.goToRoom,
          whatsappTemplate: c.ui.whatsappTemplate,
        }}
        rooms={c.rooms}
        systemNames={systemNames}
        whatsappNumber={c.contact.whatsappNumber}
      />
      <SystemsSection locale={locale} c={c} />
      <WhySection locale={locale} c={c} />
      <HowSection locale={locale} c={c} />
      <ProjectsSection locale={locale} c={c} />
      <CareSection locale={locale} c={c} />
      <BrandsSection locale={locale} c={c} />
      <TestimonialsSection locale={locale} c={c} />
      <ProsSection locale={locale} c={c} />
      <FinalScene locale={locale} c={c} />
    </>
  );
}
