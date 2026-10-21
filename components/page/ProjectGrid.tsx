"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProjectContent, PropertyType, SystemSlug } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/i18n";
import { ScenePlaceholder } from "@/components/ScenePlaceholder";
import { SystemIcon } from "@/components/SystemIcon";
import { T } from "@/components/T";
import s from "./ProjectGrid.module.css";

interface Props {
  locale: Locale;
  projects: ProjectContent[];
  propertyTypes: Record<PropertyType, string>;
  systemNames: Record<SystemSlug, string>;
  labels: { filterType: string; filterSystem: string; all: string; empty: string; viewProject: string };
}

/** Project grid filterable by property type and system (filter buttons expose aria-pressed). */
export function ProjectGrid({ locale, projects, propertyTypes, systemNames, labels }: Props) {
  const [type, setType] = useState<PropertyType | "all">("all");
  const [system, setSystem] = useState<SystemSlug | "all">("all");

  const types = useMemo(() => Array.from(new Set(projects.map((p) => p.type))), [projects]);
  const systems = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.systems))), [projects]);
  const shown = projects.filter((p) => (type === "all" || p.type === type) && (system === "all" || p.systems.includes(system)));

  return (
    <div className={s.wrap}>
      <div className={s.filters}>
        <fieldset className={s.group}>
          <legend className={s.legend}>{labels.filterType}</legend>
          <div className={s.options}>
            {(["all", ...types] as const).map((t) => (
              <button key={t} type="button" className={s.option} aria-pressed={type === t} onClick={() => setType(t)}>
                {t === "all" ? labels.all : propertyTypes[t]}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className={s.group}>
          <legend className={s.legend}>{labels.filterSystem}</legend>
          <div className={s.options}>
            {(["all", ...systems] as const).map((sys) => (
              <button key={sys} type="button" className={s.option} aria-pressed={system === sys} onClick={() => setSystem(sys)} data-switch>
                {sys !== "all" && <SystemIcon slug={sys} className={s.optIcon} on={system === sys} />}
                {sys === "all" ? labels.all : systemNames[sys]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length}
      </p>

      {shown.length === 0 ? (
        <p className={s.empty}>{labels.empty}</p>
      ) : (
        <ul role="list" className={s.grid}>
          {shown.map((p) => (
            <li key={p.slug} className={s.card}>
              <Link href={href(locale, `/projects/${p.slug}`)} className={s.link}>
                <ScenePlaceholder image={p.cover} ratio="4 / 5" sizes="(min-width: 900px) 33vw, 100vw" showCaption={false} />
                <span className={s.meta}>
                  {propertyTypes[p.type]} · <T v={p.location} nested />
                </span>
                <span className={s.title}>
                  <T v={p.title} nested />
                </span>
                <span className={s.summary}>
                  <T v={p.summary} nested />
                </span>
                <span className={s.icons} aria-hidden="true">
                  {p.systems.map((x) => (
                    <SystemIcon key={x} slug={x} className={s.cardIcon} />
                  ))}
                </span>
                <span className="link-arrow">
                  {labels.viewProject} <span className="arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
