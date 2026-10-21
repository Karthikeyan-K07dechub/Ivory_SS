import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { en } from "@/content/en";
import { plain } from "@/content/helpers";
import { href, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { ScenePlaceholder } from "@/components/ScenePlaceholder";
import { SystemIcon } from "@/components/SystemIcon";
import { Parallax } from "@/components/Parallax";
import { WaTopic } from "@/components/WaTopic";
import { T } from "@/components/T";
import s from "./project.module.css";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => en.projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = getContent(locale).projects.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata(locale, "projects", `/projects/${slug}`, { title: plain(p.title), description: plain(p.summary) });
}

export default async function ProjectPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);
  const p = c.projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const L = c.projectsPage.labels;
  const sysName = Object.fromEntries(c.systems.map((x) => [x.slug, x.name]));
  const similar = c.projects
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => b.systems.filter((x) => p.systems.includes(x)).length - a.systems.filter((x) => p.systems.includes(x)).length)
    .slice(0, 2);

  const facts = [
    { k: L.location, v: p.location },
    { k: L.type, v: c.ui.propertyTypes[p.type] },
    { k: L.size, v: p.size },
    { k: L.timeline, v: p.timeline },
  ];

  return (
    <>
      <WaTopic topic={plain(p.title)} />
      <PageHero
        title={<T v={p.title} />}
        intro={p.summary}
        tone="golden"
        back={
          <Link href={href(locale, "/projects")}>
            <span className="arrow" aria-hidden="true">
              ←
            </span>{" "}
            {c.projectsPage.title}
          </Link>
        }
        aside={
          <dl className={s.facts}>
            {facts.map((f) => (
              <div key={f.k} className={s.fact}>
                <dt>{f.k}</dt>
                <dd>
                  <T v={f.v} />
                </dd>
              </div>
            ))}
            <div className={s.fact}>
              <dt>{L.systems}</dt>
              <dd>{p.systems.length}</dd>
            </div>
          </dl>
        }
      />

      <div className={s.cover}>
        <Parallax>
          <ScenePlaceholder image={p.cover} ratio="21 / 9" sizes="100vw" priority />
        </Parallax>
      </div>

      {/* Challenge → Solution → Result */}
      <section className="section" aria-label={`${L.challenge}, ${L.solution}, ${L.result}`}>
        <div className={`wrap ${s.story}`}>
          {[
            { t: L.challenge, v: p.challenge },
            { t: L.solution, v: p.solution },
            { t: L.result, v: p.result },
          ].map((b, i) => (
            <article key={b.t} className={s.storyItem} data-reveal style={{ ["--d" as string]: i }}>
              <h2 className={s.storyTitle}>{b.t}</h2>
              <p className={s.storyText}>
                <T v={b.v} />
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Systems */}
      <section className={s.systems} aria-labelledby="systems-title">
        <div className="wrap">
          <h2 id="systems-title" className={s.smallTitle}>
            {L.systems}
          </h2>
          <ul role="list" className={s.chips}>
            {p.systems.map((x) => (
              <li key={x}>
                <Link href={href(locale, `/solutions/${x}`)} className={s.chip} data-switch>
                  <SystemIcon slug={x} className={s.chipIcon} />
                  {sysName[x]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Magazine gallery */}
      <section className="section" aria-labelledby="gallery-title">
        <div className="wrap">
          <h2 id="gallery-title" className={s.galleryTitle} data-reveal>
            {L.gallery}
          </h2>
          <div className={s.gallery}>
            {p.gallery.map((img, i) => (
              <div key={i} className={s.shot} data-reveal style={{ ["--d" as string]: i % 3 }}>
                <ScenePlaceholder image={img} ratio={["4 / 5", "16 / 10", "1 / 1", "3 / 4", "16 / 9", "4 / 5"][i]} sizes="(min-width: 900px) 50vw, 100vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client quote */}
      <section className={s.quote} aria-label={L.result}>
        <div className="wrap">
          <figure className={s.quoteFig} data-reveal>
            <blockquote>
              <p>
                “<T v={p.quote.text} />”
              </p>
            </blockquote>
            <figcaption>
              <T v={p.quote.author} />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Similar projects */}
      <section className="section" aria-labelledby="similar-title">
        <div className="wrap">
          <h2 id="similar-title" className={s.galleryTitle} data-reveal>
            {L.similar}
          </h2>
          <ul role="list" className={s.similar}>
            {similar.map((x) => (
              <li key={x.slug}>
                <Link href={href(locale, `/projects/${x.slug}`)} className={s.similarLink}>
                  <ScenePlaceholder image={x.cover} ratio="16 / 10" sizes="(min-width: 900px) 50vw, 100vw" showCaption={false} />
                  <span className={s.similarTitle}>
                    <T v={x.title} nested />
                  </span>
                  <span className={s.similarMeta}>
                    {c.ui.propertyTypes[x.type]} · <T v={x.location} nested />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={L.ctaTitle} text={c.home.final.text} cta={L.ctaButton} ctaHref={href(locale, "/planner")} />
    </>
  );
}
