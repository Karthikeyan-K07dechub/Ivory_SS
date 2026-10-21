import Link from "next/link";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { T } from "@/components/T";
import { ScenePlaceholder } from "@/components/ScenePlaceholder";
import { SystemsGrid } from "@/components/SystemsGrid";
import { Parallax } from "@/components/Parallax";
import { RoomArt } from "@/components/rooms/RoomArt";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { HowWeWork } from "./HowWeWork";
import { Testimonials } from "./Testimonials";
import { LightZone } from "./LightZone";
import s from "./Sections.module.css";

type P = { locale: Locale; c: SiteContent };

/* c. Everything we automate */
export function SystemsSection({ locale, c }: P) {
  return (
    <section className={`section ${s.systems}`} aria-labelledby="systems-title">
      <div className={`wrap grid ${s.head}`}>
        <h2 id="systems-title" className={s.headTitle} data-reveal>
          {c.home.systems.title}
        </h2>
        <p className={`lede ${s.headLede}`} data-reveal style={{ ["--d" as string]: 1 }}>
          <T v={c.home.systems.intro} />
        </p>
      </div>
      <div className="wrap">
        <SystemsGrid locale={locale} systems={c.systems} learnMore={c.ui.learnMore} />
      </div>
    </section>
  );
}

/* d. Why Ivory: an editorial spread */
export function WhySection({ c }: P) {
  const w = c.home.why;
  return (
    <section className={`section ${s.why}`} aria-labelledby="why-title">
      <div className={`wrap grid ${s.whyGrid}`}>
        <div className={s.whyLead}>
          <h2 id="why-title" data-reveal>
            {w.title}
          </h2>
          <p className="lede" data-reveal style={{ ["--d" as string]: 1 }}>
            <T v={w.intro} />
          </p>
        </div>
        <Parallax className={s.whyImage}>
          <ScenePlaceholder image={w.image} ratio="4 / 5" sizes="(min-width: 900px) 40vw, 100vw" />
        </Parallax>
        <blockquote className={s.pull} data-reveal>
          <p>“{w.pullQuote}”</p>
        </blockquote>
        <div className={s.pillars}>
          {w.pillars.map((p, i) => (
            <article key={p.title} className={s.pillar} data-reveal style={{ ["--d" as string]: i }}>
              <h3>{p.title}</h3>
              <p>
                <T v={p.text} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* e. How we work */
export function HowSection({ c }: P) {
  return (
    <section className={`section ${s.how}`} aria-labelledby="how-title">
      <div className={`wrap grid ${s.head}`}>
        <h2 id="how-title" className={s.headTitle} data-reveal>
          {c.home.how.title}
        </h2>
        <p className={`lede ${s.headLede}`} data-reveal style={{ ["--d" as string]: 1 }}>
          <T v={c.home.how.intro} />
        </p>
      </div>
      <HowWeWork steps={c.home.how.steps} />
    </section>
  );
}

/* f. Selected projects */
export function ProjectsSection({ locale, c }: P) {
  return (
    <section className={`section ${s.projects}`} aria-labelledby="projects-title">
      <div className={`wrap grid ${s.head}`}>
        <h2 id="projects-title" className={s.headTitle} data-reveal>
          {c.home.projects.title}
        </h2>
        <p className={`lede ${s.headLede}`} data-reveal style={{ ["--d" as string]: 1 }}>
          <T v={c.home.projects.intro} />
        </p>
      </div>
      <div className={`wrap ${s.projectList}`}>
        {c.projects.map((p, i) => (
          <article key={p.slug} className={s.project} data-index={i}>
            <Link href={href(locale, `/projects/${p.slug}`)} className={s.projectLink}>
              <Parallax className={s.projectImage} reveal>
                <ScenePlaceholder image={p.cover} ratio={i === 0 ? "16 / 10" : "4 / 5"} sizes="(min-width: 900px) 60vw, 100vw" showCaption={false} />
              </Parallax>
              <div className={s.projectText}>
                <p className="caption">
                  <T v={p.cover.caption} nested />
                </p>
                <h3 className={s.projectTitle}>
                  <T v={p.title} nested />
                </h3>
                <p className={s.projectMeta}>
                  {c.ui.propertyTypes[p.type]} · <T v={p.location} nested />
                </p>
                <span className="link-arrow">
                  {c.ui.viewProject} <span className="arrow" aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

/* g. Supported for Life */
export function CareSection({ locale, c }: P) {
  const care = c.home.care;
  return (
    <section className={`section ${s.care}`} aria-labelledby="care-title">
      <div className={`wrap grid ${s.careGrid}`}>
        <div className={s.careLead}>
          <h2 id="care-title" data-reveal>
            {care.title}
          </h2>
          <p className="lede" data-reveal style={{ ["--d" as string]: 1 }}>
            <T v={care.intro} />
          </p>
          <div className={s.emergency} data-reveal style={{ ["--d" as string]: 2 }}>
            <p className={s.emLabel}>{care.emergencyLabel}</p>
            <p className={s.emValue} dir="ltr">
              <T v={c.contact.emergency} />
            </p>
          </div>
        </div>
        <ul role="list" className={s.tiers}>
          {c.carePlans.map((plan, i) => (
            <li key={plan.name} className={s.tier} data-featured={plan.featured || undefined} data-reveal style={{ ["--d" as string]: i }}>
              <h3 className={s.tierName}>{plan.name}</h3>
              <p className={s.tierFor}>
                <T v={plan.forWhom} />
              </p>
              <p className={s.tierResponse}>
                <T v={plan.response} />
              </p>
              <p className={s.tierPrice}>
                <T v={plan.price} />
              </p>
            </li>
          ))}
        </ul>
        <div className={s.health} data-reveal>
          <p className={s.healthText}>{care.healthCheck}</p>
          <div className={s.healthCtas}>
            <Link className="btn" href={`${href(locale, "/care-plans")}#health-check`}>
              {care.healthCheckCta}
            </Link>
            <Link className="link-arrow" href={href(locale, "/care-plans")}>
              {care.plansCta} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* h. Brands we install */
export function BrandsSection({ c }: P) {
  return (
    <section className={`section ${s.brands}`} aria-labelledby="brands-title">
      <div className={`wrap grid ${s.brandsGrid}`}>
        <div className={s.brandsLead}>
          <h2 id="brands-title" data-reveal>
            {c.home.brands.title}
          </h2>
          <p data-reveal style={{ ["--d" as string]: 1 }}>
            <T v={c.home.brands.intro} />
          </p>
        </div>
        <ul role="list" className={s.brandList}>
          {c.brands.map((b, i) => (
            <li key={b.name} className={s.brand} data-reveal style={{ ["--d" as string]: i }}>
              <span className={s.brandName} lang="en" dir="ltr">
                {b.name}
              </span>
              <span className={s.brandStatus}>{b.status}</span>
            </li>
          ))}
        </ul>
        <div className={s.protocols}>
          <h3 className={s.protocolsTitle}>{c.home.brands.protocolsTitle}</h3>
          <ul role="list" className={s.protocolList} lang="en" dir="ltr">
            {c.protocols.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* i. Testimonials */
export function TestimonialsSection({ c }: P) {
  return (
    <section className={`section ${s.quotes}`} aria-labelledby="quotes-title">
      <div className="wrap">
        <h2 id="quotes-title" className={s.quotesTitle} data-reveal>
          {c.home.testimonials.title}
        </h2>
        <Testimonials items={c.testimonials} previous={c.ui.previous} next={c.ui.next} />
      </div>
    </section>
  );
}

/* j. For professionals */
export function ProsSection({ locale, c }: P) {
  const p = c.home.pros;
  return (
    <section className={`${s.pros} on-dark`} aria-labelledby="pros-title">
      <div className={`wrap grid ${s.prosGrid}`}>
        <h2 id="pros-title" className={s.prosTitle} data-reveal>
          {p.title}
        </h2>
        <div className={s.prosBody}>
          <p className="lede" data-reveal style={{ ["--d" as string]: 1 }}>
            {p.text}
          </p>
          <div className={s.prosCtas} data-reveal style={{ ["--d" as string]: 2 }}>
            <Link className="btn btn--light" href={`${href(locale, "/planner")}?type=professional`}>
              {p.cta}
            </Link>
            <Link className="link-arrow" href={`${href(locale, "/professionals")}#company-profile`}>
              {p.profile} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* k. Final scene: the villa at night, every light warm */
export function FinalScene({ locale, c }: P) {
  const f = c.home.final;
  const waMessage = c.ui.whatsappTemplate.replace("{topic}", c.ui.topics.home);
  return (
    <section className={s.final} aria-labelledby="final-title">
      <LightZone light="night" />
      <div className={`wrap grid ${s.finalGrid}`}>
        <div className={s.finalArt} aria-hidden="true">
          <RoomArt room="night" active={false} uid="final-night" />
        </div>
        <div className={s.finalText}>
          <h2 id="final-title" className={s.finalTitle} data-reveal>
            {f.title}
          </h2>
          <p className="lede" data-reveal style={{ ["--d" as string]: 1 }}>
            <T v={f.text} />
          </p>
          <div className={s.finalCtas} data-reveal style={{ ["--d" as string]: 2 }}>
            <Link className="btn btn--light" href={href(locale, "/planner")}>
              {f.cta}
            </Link>
            <a className="link-arrow" href={waLink(c.contact.whatsappNumber, waMessage)} target="_blank" rel="noopener noreferrer">
              {c.ui.whatsappUs} <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <dl className={s.contactList} data-reveal style={{ ["--d" as string]: 3 }}>
            <div>
              <dt>{c.ui.call}</dt>
              <dd>
                <a href={c.contact.phoneHref} dir="ltr">
                  {c.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>{c.ui.email}</dt>
              <dd>
                <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>{c.ui.address}</dt>
              <dd>{c.contact.address}</dd>
            </div>
            <div>
              <dt>{c.ui.hours}</dt>
              <dd>{c.contact.hours}</dd>
            </div>
          </dl>
        </div>
        <div className={s.finalMap}>
          <MapPlaceholder caption={c.contact.mapCaption} label={c.contact.address} dark />
        </div>
      </div>
    </section>
  );
}
