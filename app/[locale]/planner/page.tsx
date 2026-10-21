import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { plain } from "@/content/helpers";
import { isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { Planner } from "@/components/planner/Planner";
import { T } from "@/components/T";
import s from "./planner.module.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "planner", "/planner");
}

export default async function PlannerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);

  return (
    <section className={s.page} aria-labelledby="planner-title">
      <div className={`wrap ${s.grid}`}>
        <header className={s.head}>
          <h1 id="planner-title" className={s.title}>
            {c.planner.title}
          </h1>
          <p className="lede">
            <T v={c.planner.intro} />
          </p>
        </header>
        <div className={s.tool}>
          <Suspense fallback={null}>
            <Planner
              planner={c.planner}
              forms={c.forms}
              systems={c.systems.map((x) => ({ slug: x.slug, name: x.name, short: plain(x.short) }))}
              whatsappNumber={c.contact.whatsappNumber}
              rtl={locale === "ar"}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
