import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { href, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { LiveRoomArt } from "@/components/page/LiveRoomArt";
import { SystemsGrid } from "@/components/SystemsGrid";
import { T } from "@/components/T";
import s from "./solutions.module.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "solutions", "/solutions");
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);

  return (
    <>
      <PageHero
        title={c.solutions.title}
        intro={c.solutions.intro}
        tone="noon"
        aside={<LiveRoomArt room="living" uid="solutions-hero" />}
      />

      <section className="section" aria-label={c.solutions.title}>
        <div className="wrap">
          <SystemsGrid locale={locale} systems={c.systems} learnMore={c.ui.learnMore} />
        </div>
      </section>

      <section className={`section ${s.services}`} aria-labelledby="services-title">
        <div className="wrap grid">
          <h2 id="services-title" className={s.servicesTitle} data-reveal>
            {c.solutions.servicesTitle}
          </h2>
          <ol className={s.serviceList}>
            {c.services.map((svc, i) => (
              <li key={svc.title} className={s.service} data-reveal style={{ ["--d" as string]: i }}>
                <h3 className={s.serviceName}>{svc.title}</h3>
                <p>
                  <T v={svc.text} />
                </p>
                {i < c.services.length - 1 && (
                  <span className={`arrow ${s.serviceArrow}`} aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title={c.solutions.labels.ctaTitle}
        text={c.home.final.text}
        cta={c.ui.plan}
        ctaHref={href(locale, "/planner")}
      />
    </>
  );
}
