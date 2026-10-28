import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page/PageHero";
import { LeadForm } from "@/components/page/LeadForm";
import { LiveRoomArt } from "@/components/page/LiveRoomArt";
import { T } from "@/components/T";
import s from "../inner.module.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "professionals", "/professionals");
}

export default async function ProfessionalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);
  const p = c.prosPage;

  return (
    <>
      <PageHero title={p.title} intro={p.intro} tone="night" aside={<LiveRoomArt room="outdoor" uid="pros-hero" />}>
        <a className="btn" href="#quote" data-reveal style={{ ["--d" as string]: 2 }}>
          {p.formTitle}
        </a>
      </PageHero>

      {/* Capabilities */}
      <section className="section" aria-labelledby="cap-title">
        <div className="wrap">
          <h2 id="cap-title" className={s.blockTitle} data-reveal>
            {p.capabilitiesTitle}
          </h2>
          <ul role="list" className={s.capabilities}>
            {p.capabilities.map((x, i) => (
              <li key={x.title} className={s.capability} data-reveal style={{ ["--d" as string]: i % 3 }}>
                <h3>{x.title}</h3>
                <p>
                  <T v={x.text} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sectors and teams */}
      <section className={`section ${s.paper}`} aria-labelledby="teams-title">
        <div className={`wrap grid ${s.split}`}>
          <div className={s.splitTitle}>
            <h2 className={s.smallHeading}>{p.sectorsTitle}</h2>
            <ul role="list" className={s.sectors}>
              {p.sectors.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className={s.formCol}>
            <h2 id="teams-title" className={s.blockTitle} data-reveal>
              {p.teamsTitle}
            </h2>
            <dl className={s.teams}>
              {p.teams.map((t) => (
                <div key={t.title} className={s.team} data-reveal>
                  <dt>{t.title}</dt>
                  <dd>
                    <T v={t.text} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Company profile */}
      <section id="company-profile" className={s.profile} aria-labelledby="profile-title">
        <div className={`wrap grid ${s.split}`}>
          <h2 id="profile-title" className={s.splitTitle}>
            {p.profileTitle}
          </h2>
          <div className={s.formCol}>
            <p className="lede">
              <T v={p.profileText} />
            </p>
            <a className="btn btn--light" href="/documents/ivory-smart-home-sample-profile.pdf" download>
              {p.profileCta}
            </a>
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="section" aria-labelledby="quote-title">
        <div className={`wrap grid ${s.split}`}>
          <div className={s.splitTitle}>
            <h2 id="quote-title" data-reveal>
              {p.formTitle}
            </h2>
            <p className={s.splitText} data-reveal style={{ ["--d" as string]: 1 }}>
              <T v={p.formIntro} />
            </p>
          </div>
          <div className={s.formCol}>
            <LeadForm
              kind="professional"
              labels={c.forms}
              fields={["name", "company", "mobile", "email", "message", "upload"]}
              required={["company", "email"]}
              projectTypes={c.planner.steps.property.options.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
