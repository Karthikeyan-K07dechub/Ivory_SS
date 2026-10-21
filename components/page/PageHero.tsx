import type { ReactNode } from "react";
import type { Txt } from "@/content/types";
import { T } from "@/components/T";
import { LightZone } from "@/components/home/LightZone";
import s from "./PageHero.module.css";

interface Props {
  title: ReactNode;
  intro?: Txt;
  /** Small italic line above the fold, e.g. a breadcrumb back to the index. */
  back?: ReactNode;
  /** Right-hand illustration or facts. */
  aside?: ReactNode;
  tone?: "ivory" | "dawn" | "noon" | "golden" | "dusk" | "night";
  children?: ReactNode;
}

/** Inner-page opening: large title left, intro under it, an illustration or facts on the far side. */
export function PageHero({ title, intro, back, aside, tone = "ivory", children }: Props) {
  return (
    <section className={s.hero} data-tone={tone}>
      {tone !== "ivory" && <LightZone light={tone} bounded />}
      <div className={`wrap ${s.grid}`} data-has-aside={aside ? true : undefined}>
        <div className={s.text}>
          {back && <div className={s.back}>{back}</div>}
          <h1 className={s.title} data-reveal>
            {title}
          </h1>
          {intro && (
            <p className={`lede ${s.intro}`} data-reveal style={{ ["--d" as string]: 1 }}>
              <T v={intro} />
            </p>
          )}
          {children}
        </div>
        {aside && <div className={s.aside}>{aside}</div>}
      </div>
    </section>
  );
}
