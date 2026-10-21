import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/page/PageHero";
import { LeadForm } from "@/components/page/LeadForm";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { T } from "@/components/T";
import s from "../inner.module.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);
  const p = c.contactPage;
  const wa = waLink(c.contact.whatsappNumber, c.ui.whatsappTemplate.replace("{topic}", c.ui.topics.contact));

  return (
    <>
      <PageHero title={p.title} intro={p.intro} tone="dawn" aside={<MapPlaceholder caption={c.contact.mapCaption} label={c.contact.address} />} />

      <section className="section" aria-label={p.title}>
        <div className={`wrap ${s.channels}`}>
          <a className={s.channel} href={wa} target="_blank" rel="noopener noreferrer" data-reveal>
            <span className={s.channelLabel}>WhatsApp</span>
            <span className={s.channelValue} dir="ltr">
              {c.contact.phone}
            </span>
            <span className={s.channelNote}>{p.whatsappText}</span>
          </a>
          <a className={s.channel} href={c.contact.phoneHref} data-reveal style={{ ["--d" as string]: 1 }}>
            <span className={s.channelLabel}>{c.ui.call}</span>
            <span className={s.channelValue} dir="ltr">
              {c.contact.phone}
            </span>
            <span className={s.channelNote}>{p.openDaily}</span>
          </a>
          <a className={s.channel} href={`mailto:${c.contact.email}`} data-reveal style={{ ["--d" as string]: 2 }}>
            <span className={s.channelLabel}>{c.ui.email}</span>
            <span className={`${s.channelValue} ${s.small}`}>{c.contact.email}</span>
          </a>
          <div className={s.channel} data-reveal style={{ ["--d" as string]: 3 }}>
            <span className={s.channelLabel}>{c.ui.address}</span>
            <span className={`${s.channelValue} ${s.small}`}>{c.contact.address}</span>
            <span className={s.channelNote}>
              {c.ui.hours}: {c.contact.hours}
            </span>
          </div>
        </div>
      </section>

      <section className={`section ${s.paper}`} aria-labelledby="form-title">
        <div className={`wrap grid ${s.split}`}>
          <div className={s.splitTitle}>
            <h2 id="form-title" data-reveal>
              {p.formTitle}
            </h2>
            <div className={s.emergencyBox} data-reveal style={{ ["--d" as string]: 1 }}>
              <h3>{p.emergencyTitle}</h3>
              <p dir="ltr">
                <T v={c.contact.emergency} />
              </p>
            </div>
            <div className={s.area}>
              <h3 className={s.smallHeading}>{c.contact.serviceAreaLabel}</h3>
              <p>
                {c.contact.serviceArea.map((a, i) => (
                  <span key={i}>
                    {i > 0 && " · "}
                    <T v={a} />
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className={s.formCol}>
            <LeadForm kind="contact" labels={c.forms} fields={["name", "mobile", "email", "message"]} />
          </div>
        </div>
      </section>
    </>
  );
}
