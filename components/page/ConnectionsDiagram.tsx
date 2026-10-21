"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SystemSlug, Txt } from "@/content/types";
import { SystemIcon } from "@/components/SystemIcon";
import { T } from "@/components/T";
import s from "./ConnectionsDiagram.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  slug: SystemSlug;
  name: string;
  connections: { label: string; note: Txt }[];
}

const W = 600;
const H = 420;
const CX = W / 2;
const CY = H / 2;

/** "Works with the rest of your home": the system at the centre, its links drawn out with the scroll. */
export function ConnectionsDiagram({ slug, name, connections }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const n = connections.length;
  const nodes = connections.map((c, i) => {
    const angle = -Math.PI / 2 + (i / n) * Math.PI * 2 + Math.PI / n;
    return { ...c, x: CX + Math.cos(angle) * 235, y: CY + Math.sin(angle) * 160 };
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paths = el.querySelectorAll<SVGPathElement>(`.${s.link}`);
    const dots = el.querySelectorAll<HTMLElement>(`.${s.node}`);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(paths, { strokeDashoffset: 0 });
      dots.forEach((d) => d.setAttribute("data-on", ""));
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 75%", end: "center 45%", scrub: 0.6 },
      });
      paths.forEach((p, i) => {
        tl.fromTo(
          p,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            duration: 1,
            onComplete: () => dots[i]?.setAttribute("data-on", ""),
            onReverseComplete: () => dots[i]?.removeAttribute("data-on"),
          },
          i * 0.35
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={s.diagram}>
      <div className={s.stage}>
      <svg viewBox={`0 0 ${W} ${H}`} className={s.svg} aria-hidden="true">
        <ellipse cx={CX} cy={CY} rx="235" ry="160" className={s.orbit} />
        {nodes.map((node, i) => {
          const mx = (CX + node.x) / 2 + (node.y - CY) * 0.18;
          const my = (CY + node.y) / 2 - (node.x - CX) * 0.18;
          return <path key={i} className={s.link} d={`M${CX} ${CY}Q${mx} ${my} ${node.x} ${node.y}`} pathLength={1} />;
        })}
      </svg>
      <div className={s.centre}>
        <SystemIcon slug={slug} on className={s.centreIcon} />
        <span>{name}</span>
      </div>
      {nodes.map((node, i) => (
        <div
          key={i}
          className={s.node}
          style={{ left: `${(node.x / W) * 100}%`, top: `${(node.y / H) * 100}%` }}
        >
          <span className={s.dot} aria-hidden="true" />
          <span className={s.label}>{node.label}</span>
        </div>
      ))}
      </div>
      <dl className={s.notes}>
        {connections.map((c, i) => (
          <div key={i} className={s.note}>
            <dt>{c.label}</dt>
            <dd>
              <T v={c.note} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
