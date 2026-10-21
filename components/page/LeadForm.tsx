"use client";

import { useId, useState } from "react";
import type { SiteContent } from "@/content/types";
import s from "./LeadForm.module.css";

type Field = "name" | "mobile" | "email" | "company" | "message" | "upload";

interface Props {
  kind: "contact" | "professional" | "health-check" | "care-plan";
  labels: SiteContent["forms"];
  fields: Field[];
  /** Fields that must be filled in (name and mobile always are). */
  required?: Field[];
  /** Extra context sent with the lead, e.g. the chosen plan. */
  context?: Record<string, string>;
  submitLabel?: string;
  /** Optional select of project types (professionals form). */
  projectTypes?: { value: string; label: string }[];
}

const MOBILE = /^\+?[\d\s()-]{8,18}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** A short lead form posting to /api/lead, with friendly inline validation. */
export function LeadForm({ kind, labels, fields, required = [], context, submitLabel, projectTypes }: Props) {
  const id = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [file, setFile] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const must = new Set<Field>(["name", "mobile", ...required]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = () => {
    const next: Record<string, string> = {};
    fields.forEach((f) => {
      if (f === "upload") return;
      const val = (values[f] ?? "").trim();
      if (must.has(f) && !val) next[f] = labels.required;
      else if (f === "email" && val && !EMAIL.test(val)) next[f] = labels.invalidEmail;
      else if (f === "mobile" && val && !MOBILE.test(val)) next[f] = labels.invalidMobile;
    });
    setErrors(next);
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate();
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: kind, ...context, ...values, drawing: file || undefined, page: window.location.pathname }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className={s.done} role="status">
        <p className={s.doneTitle}>{labels.sent}</p>
        <p>{labels.sentText}</p>
      </div>
    );
  }

  const label = (f: Field) =>
    ({ name: labels.name, mobile: labels.mobile, email: labels.email, company: labels.company, message: labels.message, upload: labels.upload })[f];

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      {fields.map((f) => {
        const fid = `${id}-${f}`;
        const err = errors[f];
        const opt = !must.has(f) && <span className="opt"> ({labels.optional})</span>;
        if (f === "upload") {
          return (
            <div key={f} className={`field ${s.full}`}>
              <label htmlFor={fid}>
                {label(f)}
                {opt}
              </label>
              <input
                id={fid}
                type="file"
                accept=".pdf,.dwg,.dxf,.zip"
                className={s.file}
                onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")}
                aria-describedby={`${fid}-hint`}
              />
              <p id={`${fid}-hint`} className={s.hint}>
                {file ? `${labels.uploadChosen} ${file}` : labels.uploadHint}
              </p>
            </div>
          );
        }
        const common = {
          id: fid,
          className: "input",
          value: values[f] ?? "",
          onChange: set(f),
          "aria-invalid": err ? true : undefined,
          "aria-describedby": err ? `${fid}-err` : undefined,
          required: must.has(f),
        };
        return (
          <div key={f} className={`field ${f === "message" ? s.full : ""}`}>
            <label htmlFor={fid}>
              {label(f)}
              {opt}
            </label>
            {f === "message" ? (
              <textarea {...common} rows={5} />
            ) : (
              <input
                {...common}
                type={f === "email" ? "email" : f === "mobile" ? "tel" : "text"}
                inputMode={f === "mobile" ? "tel" : undefined}
                autoComplete={f === "name" ? "name" : f === "mobile" ? "tel" : f === "email" ? "email" : f === "company" ? "organization" : undefined}
                dir={f === "mobile" || f === "email" ? "ltr" : undefined}
              />
            )}
            {err && (
              <p id={`${fid}-err`} className="error">
                {err}
              </p>
            )}
          </div>
        );
      })}
      {projectTypes && (
        <div className="field">
          <label htmlFor={`${id}-type`}>{labels.projectType}</label>
          <select id={`${id}-type`} className="input" value={values.projectType ?? ""} onChange={set("projectType")}>
            <option value="">—</option>
            {projectTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className={s.actions}>
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? labels.sending : submitLabel ?? labels.submit}
        </button>
        {state === "error" && (
          <p className="error" role="alert">
            {labels.error}
          </p>
        )}
      </div>
    </form>
  );
}
