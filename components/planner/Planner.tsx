"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { SiteContent, SystemSlug, PropertyType } from "@/content/types";
import { waLink } from "@/lib/whatsapp";
import { SystemIcon } from "@/components/SystemIcon";
import { PlannerProvider, usePlanner, type PlannerAnswers, type Who } from "./PlannerContext";
import { PlannerHouse, PropertyIcon } from "./PlannerArt";
import s from "./Planner.module.css";

interface Props {
  planner: SiteContent["planner"];
  forms: SiteContent["forms"];
  systems: { slug: SystemSlug; name: string; short: string }[];
  whatsappNumber: string;
  rtl: boolean;
}

const SYSTEM_SLUGS: SystemSlug[] = [
  "smart-lighting",
  "climate-control",
  "curtains-shades",
  "security-cctv",
  "intercom-access",
  "networking-wifi",
  "audio-video",
  "building-management",
];

/** Reads ?system= and ?type= to pre-select answers, then renders the Planner. */
export function Planner(props: Props) {
  const params = useSearchParams();
  const initial: Partial<PlannerAnswers> = {};
  const sys = params.get("system");
  if (sys && (SYSTEM_SLUGS as string[]).includes(sys)) initial.systems = [sys as SystemSlug];
  const type = params.get("type");
  const whoMap: Record<string, Who> = { professional: "professional", developer: "professional", designer: "designer", homeowner: "homeowner", business: "business" };
  if (type && whoMap[type]) initial.who = whoMap[type];

  return (
    <PlannerProvider initial={initial}>
      <PlannerFlow {...props} />
    </PlannerProvider>
  );
}

const MOBILE = /^\+?[\d\s()-]{8,18}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function PlannerFlow({ planner: P, forms: F, systems, whatsappNumber, rtl }: Props) {
  const { answers, step, setStep, update, setContact, toggleSystem, isPro } = usePlanner();
  const reduce = useReducedMotion();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<"idle" | "sending" | "booked" | "error">("idle");
  const [direction, setDirection] = useState(1);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const total = 6;
  const showSummary = step >= total;
  const steps = P.steps;
  const titles = [steps.who.title, steps.property.title, steps.stage.title, steps.location.title, steps.systems.title, steps.contact.title];

  // Move focus to the new step's heading so screen-reader and keyboard users follow along.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const validate = (): boolean => {
    setError(null);
    if (step === 0 && !answers.who) return fail(P.errors.choose);
    if (step === 1 && !answers.property) return fail(P.errors.choose);
    if (step === 2 && !answers.stage) return fail(P.errors.choose);
    if (step === 3 && !answers.location) return fail(P.errors.choose);
    if (step === 4 && answers.systems.length === 0) return fail(P.errors.chooseSystems);
    if (step === 5) {
      const e: Record<string, string> = {};
      const c = answers.contact;
      if (!c.name.trim()) e.name = F.required;
      if (!c.mobile.trim()) e.mobile = F.required;
      else if (!MOBILE.test(c.mobile.trim())) e.mobile = F.invalidMobile;
      if (c.email.trim() && !EMAIL.test(c.email.trim())) e.email = F.invalidEmail;
      if (isPro && !c.company.trim()) e.company = F.required;
      setFieldErrors(e);
      const first = Object.keys(e)[0];
      if (first) {
        document.getElementById(`pl-${first}`)?.focus();
        return false;
      }
    }
    return true;
  };

  function fail(msg: string) {
    setError(msg);
    return false;
  }

  const next = () => {
    if (!validate()) return;
    setDirection(1);
    setStep(step + 1);
  };
  const back = () => {
    setError(null);
    setDirection(-1);
    setStep(Math.max(0, step - 1));
  };

  /* ---------- Summary text ---------- */
  const label = <T extends string>(opts: { value: T; label: string }[], v: T | null) => opts.find((o) => o.value === v)?.label ?? "";
  const propertyLabel = label(steps.property.options, answers.property);
  const locationLabel = answers.location === "other" ? P.summary.otherLocation : label(steps.location.options, answers.location);
  const lead = P.summary.lead
    .replace("{property}", rtl ? propertyLabel : propertyLabel.toLowerCase())
    .replace("{location}", locationLabel);
  const count = answers.systems.length === 1 ? P.summary.systemsCountOne : P.summary.systemsCount.replace("{count}", String(answers.systems.length));
  const stageNote = answers.stage ? P.summary.stageNotes[answers.stage] : "";
  const sysNames = answers.systems.map((x) => systems.find((y) => y.slug === x)?.name ?? x);
  const A = P.summary.answerLabels;

  const lines = [
    `${A.who}: ${label(steps.who.options, answers.who)}`,
    `${A.property}: ${propertyLabel}`,
    `${A.stage}: ${label(steps.stage.options, answers.stage)}`,
    `${A.location}: ${label(steps.location.options, answers.location)}`,
    `${A.systems}: ${sysNames.join(", ")}`,
    `${F.name}: ${answers.contact.name}`,
    `${F.mobile}: ${answers.contact.mobile}`,
    answers.contact.email && `${F.email}: ${answers.contact.email}`,
    answers.contact.company && `${F.company}: ${answers.contact.company}`,
    answers.contact.visitDate && `${A.visit}: ${answers.contact.visitDate}`,
    answers.contact.drawing && `${F.upload}: ${answers.contact.drawing}`,
    answers.contact.notes && `${F.notes}: ${answers.contact.notes}`,
  ].filter(Boolean) as string[];
  const waMessage = `${P.summary.waIntro}\n\n${lead} – ${count} – ${stageNote}\n\n${lines.map((l) => `• ${l}`).join("\n")}`;

  const book = async () => {
    setDone("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "planner", summary: `${lead} – ${count} – ${stageNote}`, ...answers }),
      });
      setDone(res.ok ? "booked" : "error");
    } catch {
      setDone("error");
    }
  };

  const slide = reduce ? 0 : 28 * direction * (rtl ? -1 : 1);

  return (
    <div className={s.planner}>
      {/* Progress */}
      <div className={s.progress} aria-hidden={showSummary}>
        <p className={s.stepCount}>
          {showSummary ? P.summary.title : `${P.stepLabel} ${step + 1} ${P.of} ${total}`}
        </p>
        <div
          className={s.bar}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={Math.min(step + 1, total)}
          aria-label={P.title}
        >
          <span style={{ transform: `scaleX(${Math.min(step + 1, total) / total})` }} />
        </div>
        <ol className={s.dots} aria-hidden="true">
          {titles.map((t, i) => (
            <li key={t} data-state={i < step ? "done" : i === step ? "now" : undefined} />
          ))}
        </ol>
      </div>

      <div className={s.body}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={showSummary ? "summary" : step}
            className={s.panel}
            initial={{ opacity: 0, x: slide }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -slide }}
            transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {!showSummary ? (
              <fieldset className={s.fieldset}>
                <legend className={s.legendWrap}>
                  <h2 ref={headingRef} tabIndex={-1} className={s.stepTitle}>
                    {titles[step]}
                  </h2>
                </legend>

                {step === 0 && (
                  <Choices name="who" options={steps.who.options} value={answers.who} onChange={(v) => update("who", v)} />
                )}
                {step === 1 && (
                  <Choices
                    name="property"
                    options={steps.property.options}
                    value={answers.property}
                    onChange={(v) => update("property", v)}
                    icon={(v) => <PropertyIcon type={v as PropertyType} />}
                    wide
                  />
                )}
                {step === 2 && (
                  <Choices name="stage" options={steps.stage.options} value={answers.stage} onChange={(v) => update("stage", v)} />
                )}
                {step === 3 && (
                  <Choices name="location" options={steps.location.options} value={answers.location} onChange={(v) => update("location", v)} />
                )}
                {step === 4 && (
                  <div className={s.systemsStep}>
                    <p className={s.hint}>{steps.systems.hint}</p>
                    <div className={s.systemsGrid}>
                      {systems.map((x) => {
                        const checked = answers.systems.includes(x.slug);
                        return (
                          <label key={x.slug} className={s.system} data-checked={checked || undefined} data-switch>
                            <input type="checkbox" className={s.native} checked={checked} onChange={() => toggleSystem(x.slug)} />
                            <SystemIcon slug={x.slug} on={checked} className={s.sysIcon} />
                            <span className={s.sysName}>{x.name}</span>
                            <span className={s.check} aria-hidden="true" />
                          </label>
                        );
                      })}
                    </div>
                    <div className={s.houseWrap}>
                      <PlannerHouse on={answers.systems} />
                    </div>
                  </div>
                )}
                {step === 5 && (
                  <div className={s.contact}>
                    <p className={s.hint}>{steps.contact.hint}</p>
                    <div className={s.fields}>
                      <Field id="name" label={F.name} value={answers.contact.name} onChange={(v) => setContact("name", v)} error={fieldErrors.name} autoComplete="name" required />
                      <Field id="mobile" label={F.mobile} value={answers.contact.mobile} onChange={(v) => setContact("mobile", v)} error={fieldErrors.mobile} type="tel" autoComplete="tel" ltr required />
                      <Field id="email" label={F.email} value={answers.contact.email} onChange={(v) => setContact("email", v)} error={fieldErrors.email} type="email" autoComplete="email" ltr optional={F.optional} />
                      <Field
                        id="visitDate"
                        label={F.visitDate}
                        value={answers.contact.visitDate}
                        onChange={(v) => setContact("visitDate", v)}
                        type="date"
                        min={new Date().toISOString().slice(0, 10)}
                        optional={F.optional}
                      />
                      {isPro && (
                        <Field id="company" label={F.company} value={answers.contact.company} onChange={(v) => setContact("company", v)} error={fieldErrors.company} autoComplete="organization" required />
                      )}
                      {isPro && (
                        <div className={`field ${s.full}`}>
                          <label htmlFor="pl-drawing">
                            {F.upload} <span className="opt">({F.optional})</span>
                          </label>
                          <input
                            id="pl-drawing"
                            type="file"
                            accept=".pdf,.dwg,.dxf,.zip"
                            className={s.file}
                            onChange={(e) => setContact("drawing", e.target.files?.[0]?.name ?? "")}
                            aria-describedby="pl-drawing-hint"
                          />
                          <p id="pl-drawing-hint" className={s.fileHint}>
                            {answers.contact.drawing ? `${F.uploadChosen} ${answers.contact.drawing}` : F.uploadHint}
                          </p>
                        </div>
                      )}
                      <div className={`field ${s.full}`}>
                        <label htmlFor="pl-notes">
                          {F.notes} <span className="opt">({F.optional})</span>
                        </label>
                        <textarea id="pl-notes" className="input" rows={4} value={answers.contact.notes} onChange={(e) => setContact("notes", e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <p className={`error ${s.stepError}`} role="alert">
                    {error}
                  </p>
                )}
              </fieldset>
            ) : (
              <div className={s.summary}>
                {done === "booked" ? (
                  <div className={s.booked} role="status">
                    <h2 ref={headingRef} tabIndex={-1} className={s.stepTitle}>
                      {P.summary.bookedTitle}
                    </h2>
                    <p className="lede">{P.summary.bookedText}</p>
                    <a className="btn btn--ghost" href={waLink(whatsappNumber, waMessage)} target="_blank" rel="noopener noreferrer">
                      <span>{P.summary.whatsapp}</span>
                    </a>
                  </div>
                ) : (
                  <>
                    <h2 ref={headingRef} tabIndex={-1} className={s.summaryLead}>
                      {lead}
                      <span className={s.summaryMeta}>
                        {" "}
                        – {count} – {stageNote}
                      </span>
                    </h2>
                    <div className={s.summaryGrid}>
                      <div className={s.answersCol}>
                      <h3 className={s.answersTitle}>{P.summary.yourAnswers}</h3>
                      <dl className={s.answers}>
                        {lines.map((l) => {
                          const [k, ...v] = l.split(": ");
                          return (
                            <div key={l} className={s.answer}>
                              <dt>{k}</dt>
                              <dd>{v.join(": ")}</dd>
                            </div>
                          );
                        })}
                      </dl>
                      </div>
                      <div className={s.summaryHouse}>
                        <PlannerHouse on={answers.systems} />
                      </div>
                    </div>
                    <div className={s.summaryActions}>
                      <button type="button" className="btn" onClick={book} disabled={done === "sending"}>
                        {done === "sending" ? F.sending : P.summary.book}
                      </button>
                      <a className="btn btn--ghost" href={waLink(whatsappNumber, waMessage)} target="_blank" rel="noopener noreferrer">
                        <span>{P.summary.whatsapp}</span>
                      </a>
                      <button
                        type="button"
                        className={s.textBtn}
                        onClick={() => {
                          setDirection(-1);
                          setStep(0);
                        }}
                      >
                        {P.summary.edit}
                      </button>
                    </div>
                    {done === "error" && (
                      <p className="error" role="alert">
                        {F.error}
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {!showSummary && (
        <div className={s.nav}>
          <button type="button" className={s.back} onClick={back} disabled={step === 0}>
            <span className="arrow" aria-hidden="true">
              ←
            </span>{" "}
            {P.back}
          </button>
          <button type="button" className="btn" onClick={next}>
            {step === total - 1 ? P.submit : P.next}{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Choice cards (native radios, so arrow keys work) ---------- */
function Choices<T extends string>({
  name,
  options,
  value,
  onChange,
  icon,
  wide,
}: {
  name: string;
  options: { value: T; label: string; note?: string }[];
  value: T | null;
  onChange: (v: T) => void;
  icon?: (v: T) => React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={s.choices} data-wide={wide || undefined}>
      {options.map((o) => (
        <label key={o.value} className={s.choice} data-checked={value === o.value || undefined}>
          <input type="radio" className={s.native} name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
          {icon && <span className={s.choiceIcon}>{icon(o.value)}</span>}
          <span className={s.choiceLabel}>{o.label}</span>
          {o.note && <span className={s.choiceNote}>{o.note}</span>}
          <span className={s.radio} aria-hidden="true" />
        </label>
      ))}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  ltr,
  required,
  optional,
  min,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  ltr?: boolean;
  required?: boolean;
  optional?: string;
  min?: string;
}) {
  const fid = `pl-${id}`;
  return (
    <div className="field">
      <label htmlFor={fid}>
        {label}
        {optional && <span className="opt"> ({optional})</span>}
      </label>
      <input
        id={fid}
        className="input"
        type={type}
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        dir={ltr ? "ltr" : undefined}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fid}-err` : undefined}
      />
      {error && (
        <p id={`${fid}-err`} className="error">
          {error}
        </p>
      )}
    </div>
  );
}

