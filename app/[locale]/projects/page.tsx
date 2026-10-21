import { notFound } from "next/navigation";
import { getContent } from "@/content";
import type { SystemSlug } from "@/content/types";
import { href, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { ProjectGrid } from "@/components/page/ProjectGrid";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "projects", "/projects");
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);
  const systemNames = Object.fromEntries(c.systems.map((x) => [x.slug, x.name])) as Record<SystemSlug, string>;

  return (
    <>
      <PageHero title={c.projectsPage.title} intro={c.projectsPage.intro} tone="ivory" />
      <section className="section" style={{ paddingTop: 0 }} aria-label={c.projectsPage.title}>
        <div className="wrap">
          <ProjectGrid
            locale={locale}
            projects={c.projects}
            propertyTypes={c.ui.propertyTypes}
            systemNames={systemNames}
            labels={{
              filterType: c.projectsPage.filterType,
              filterSystem: c.projectsPage.filterSystem,
              all: c.projectsPage.all,
              empty: c.projectsPage.empty,
              viewProject: c.ui.viewProject,
            }}
          />
        </div>
      </section>
      <CtaBand title={c.projectsPage.labels.ctaTitle} text={c.home.final.text} cta={c.ui.plan} ctaHref={href(locale, "/planner")} />
    </>
  );
}
