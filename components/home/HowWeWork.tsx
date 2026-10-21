"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Txt } from "@/content/types";
import { T } from "@/components/T";
import s from "./HowWeWork.module.css";

gsap.registerPlugin(ScrollTrigger);

/** Five steps on a line that draws itself with the scroll; each step lights up as the line reaches it. */
export function HowWeWork({ steps }: { steps: { title: string; text: Txt }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReached(steps.length - 1);
      return;
    }
    const line = el.querySelector<HTMLElement>(`.${s.progress}`);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.4,
            onUpdate(self) {
              // Steps sit at 0%, 25% … 100% of the line.
              const idx = Math.floor(self.progress * (steps.length - 1) + 0.02);
              setReached((prev) => (prev === idx ? prev : idx));
            },
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [steps.length]);

  return (
    <div ref={ref} className={`wrap ${s.how}`}>
      <div className={s.track} aria-hidden="true">
        <span className={s.base} />
        <span className={s.progress} />
      </div>
      <ol className={s.steps}>
        {steps.map((step, i) => (
          <li key={step.title} className={s.step} data-on={i <= reached || undefined}>
            <span className={s.node} aria-hidden="true" />
            <h3 className={s.title}>{step.title}</h3>
            <p className={s.text}>
              <T v={step.text} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
