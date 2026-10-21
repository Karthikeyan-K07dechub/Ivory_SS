import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { en } from "@/content/en";
import { href, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { systemRoom } from "@/lib/systemArt";
import { plain } from "@/content/helpers";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { LiveRoomArt } from "@/components/page/LiveRoomArt";
import { ConnectionsDiagram } from "@/components/page/ConnectionsDiagram";
import { Faq } from "@/components/page/Faq";
import { ScenePlaceholder } from "@/components/ScenePlaceholder";
import { WaTopic } from "@/components/WaTopic";
import { T } from "@/components/T";
import s from "../solutions.module.css";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => en.systems.map((sys) => ({ locale, slug: sys.slug })));
}

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const sys = getContent(locale).systems.find((x) => x.slug === slug);
  if (!sys) return {};
  return pageMetadata(locale, "solutions", `/solutions/${slug}`, { title: sys.name, description: plain(sys.short) });
}

export default async function SystemPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);
  const sys = c.systems.find((x) => x.slug === slug);
  if (!sys) notFound();
  const L = c.solutions.labels;
  const project = c.projects.find((p) => p.slug === sys.relatedProject);
  const brandStatus = Object.fromEntries(c.brands.map((b) => [b.name, b.status]));

  return (
    <>
      <WaTopic topic={sys.name} />
      <PageHero
        title={sys.heroTitle}
        intro={sys.heroText}
        tone={sys.slug === "security-cctv" || sys.slug === "networking-wifi" || sys.slug === "building-management" ? "night" : sys.slug === "curtains-shades" ? "dusk" : "noon"}
        back={
          <Link href={href(locale, "/solutions")}>
            <span className="arrow" aria-hidden="true">
              ←
            </span>{" "}
            {L.allSystems} · {sys.name}
          </Link>
        }
        aside={<LiveRoomArt room={systemRoom[sys.slug]} uid={`sys-${sys.slug}`} title={sys.name} />}
      >
        <Link className="btn" href={`${href(locale, "/planner")}?system=${sys.slug}`} data-reveal style={{ ["--d" as string]: 2 }}>
          {L.ctaButton}
        </Link>
      </PageHero>

      {/* What it does */}
      <section className={`section ${s.what}`} aria-labelledby="what-title">
        <div className={`wrap grid ${s.whatGrid}`}>
          <h2 id="what-title" className={s.sectionTitle} data-reveal>
            {L.whatItDoes}
          </h2>
          <div className={s.whatList}>
            {sys.whatItDoes.map((w, i) => (
              <article key={w.title} className={s.whatItem} data-reveal style={{ ["--d" as string]: i % 3 }}>
                <h3>{w.title}</h3>
                <p>
                  <T v={w.text} />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Works with the rest of your home */}
      <section className={`section ${s.works}`} aria-labelledby="works-title">
        <div className={`wrap grid ${s.worksHead}`}>
          <h2 id="works-title" data-reveal>
            {L.worksWith}
          </h2>
          <p data-reveal style={{ ["--d" as string]: 1 }}>
            <T v={L.worksWithIntro} />
          </p>
        </div>
        <div className="wrap">
          <ConnectionsDiagram slug={sys.slug} name={sys.name} connections={sys.connections} />
        </div>
      </section>

      {/* Wired vs wireless */}
      <section className={`section ${s.compare}`} aria-labelledby="compare-title">
        <div className={`wrap grid ${s.compareGrid}`}>
          <h2 id="compare-title" className={s.sectionTitle} data-reveal>
            {L.wiredVsWireless}
          </h2>
          <div className={s.compareCols}>
            {[
              { title: L.wired, for: L.wiredFor, data: sys.wired },
              { title: L.wireless, for: L.wirelessFor, data: sys.wireless },
            ].map((col, i) => (
              <div key={col.title} className={s.col} data-reveal style={{ ["--d" as string]: i }}>
                <h3 className={s.colTitle}>{col.title}</h3>
                <p className={s.colFor}>{col.for}</p>
                <p>
                  <T v={col.data.text} />
                </p>
                <ul className={s.points}>
                  {col.data.points.map((p, j) => (
                    <li key={j}>
                      <span>
                        <T v={p} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related project and brands */}
      <section className={`section ${s.related}`} aria-labelledby="related-title">
        <div className={`wrap grid ${s.relatedGrid}`}>
          {project && (
            <div className={s.relatedProject}>
              <h2 id="related-title" className={s.smallTitle}>
                {L.related}
              </h2>
              <Link href={href(locale, `/projects/${project.slug}`)} className={s.relatedLink}>
                <ScenePlaceholder image={project.cover} ratio="16 / 10" sizes="(min-width: 900px) 55vw, 100vw" showCaption={false} />
                <h3>
                  <T v={project.title} nested />
                </h3>
                <span className="link-arrow">
                  {c.ui.viewProject} <span className="arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          )}
          <div className={s.brandsCol}>
            <h2 className={s.smallTitle}>{L.brands}</h2>
            <ul className={s.badges}>
              {sys.brands.map((b) => (
                <li key={b}>
                  <span lang="en" dir="ltr">
                    {b}
                  </span>
                  <span>{brandStatus[b]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`section ${s.faq}`} aria-labelledby="faq-title">
        <div className={`wrap grid ${s.faqGrid}`}>
          <h2 id="faq-title" className={s.sectionTitle} data-reveal>
            {L.faq}
          </h2>
          <div className={s.faqList}>
            <Faq items={sys.faq} />
          </div>
        </div>
      </section>

      <CtaBand title={L.ctaTitle} text={L.ctaText} cta={L.ctaButton} ctaHref={`${href(locale, "/planner")}?system=${sys.slug}`} />
    </>
  );
}
