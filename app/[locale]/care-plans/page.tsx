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
  return pageMetadata(locale, "carePlans", "/care-plans");
}

export default async function CarePlansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);
  const p = c.carePage;

  return (
    <>
      <PageHero title={p.title} intro={p.intro} tone="dusk" aside={<LiveRoomArt room="night" uid="care-hero" />}>
        <p className={s.heroEmergency} data-reveal style={{ ["--d" as string]: 2 }}>
          <span>{c.home.care.emergencyLabel}</span>
          <span dir="ltr">
            <T v={c.contact.emergency} />
          </span>
        </p>
      </PageHero>

      {/* Our promise */}
      <section className="section" aria-labelledby="promise-title">
        <div className={`wrap grid ${s.split}`}>
          <h2 id="promise-title" className={s.splitTitle} data-reveal>
            {p.promiseTitle}
          </h2>
          <dl className={s.promises}>
            {p.promises.map((x, i) => (
              <div key={x.title} className={s.promise} data-reveal style={{ ["--d" as string]: i % 2 }}>
                <dt>{x.title}</dt>
                <dd>
                  <T v={x.text} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Tiers */}
      <section className={`section ${s.paper}`} aria-labelledby="tiers-title">
        <div className="wrap">
          <h2 id="tiers-title" className={s.blockTitle} data-reveal>
            {p.tiersTitle}
          </h2>
          <ul role="list" className={s.tiers}>
            {c.carePlans.map((plan, i) => (
              <li key={plan.name} className={s.tier} data-featured={plan.featured || undefined} data-reveal style={{ ["--d" as string]: i }}>
                <h3 className={s.tierName}>{plan.name}</h3>
                <p className={s.tierFor}>
                  <T v={plan.forWhom} />
                </p>
                <p className={s.tierPrice}>
                  <T v={plan.price} />
                </p>
                <p className={s.tierResponse}>
                  <span>{p.responseLabel}</span> <T v={plan.response} />
                </p>
                <ul className={s.tierFeatures}>
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <T v={f} />
                    </li>
                  ))}
                </ul>
                <a className={plan.featured ? "btn" : "btn btn--ghost"} href="#health-check">
                  <span>{p.choose}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Health check */}
      <section id="health-check" className="section" aria-labelledby="health-title">
        <div className={`wrap grid ${s.split}`}>
          <div className={s.splitTitle}>
            <h2 id="health-title" data-reveal>
              {p.healthTitle}
            </h2>
            <p className={s.splitText} data-reveal style={{ ["--d" as string]: 1 }}>
              <T v={p.healthText} />
            </p>
          </div>
          <div className={s.formCol}>
            <LeadForm
              kind="health-check"
              labels={c.forms}
              fields={["name", "mobile", "email", "message"]}
              submitLabel={p.healthCta}
            />
          </div>
        </div>
      </section>
    </>
  );
}
