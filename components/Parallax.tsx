"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Slow parallax on the image inside (and an optional clip-path reveal as it enters).
 * Moves only `[data-parallax]` children; with reduced motion it does nothing.
 */
export function Parallax({ children, className, reveal = false }: { children: React.ReactNode; className?: string; reveal?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const target = el.querySelector<HTMLElement>("[data-parallax], img");
      if (target) {
        gsap.fromTo(
          target,
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
        );
      }
      if (reveal) {
        const frame = el.querySelector<HTMLElement>("figure > div") ?? el;
        gsap.fromTo(
          frame,
          { clipPath: "inset(14% 0% 14% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", end: "top 40%", scrub: 0.8 } }
        );
      }
    }, el);
    return () => ctx.revert();
  }, [reveal]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
