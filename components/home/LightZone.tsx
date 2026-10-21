"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIGHTS, clearLight, type LightState } from "@/lib/light";

gsap.registerPlugin(ScrollTrigger);

/**
 * Place inside a section: while it is on screen, the page light (header and scene tokens)
 * changes to `light`. With `bounded`, the light returns to `after` once the section has
 * scrolled away (used on inner-page heroes); without it, the light stays (the final night scene).
 */
export function LightZone({ light, after = "ivory", bounded = false }: { light: LightState; after?: LightState; bounded?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.parentElement;
    if (!section) return;
    const root = document.documentElement;
    const d = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.6;
    const to = (state: LightState) => gsap.to(root, { ...LIGHTS[state], duration: d, overwrite: "auto" });
    const st = ScrollTrigger.create({
      trigger: section,
      start: bounded ? "top top" : "top 45%",
      end: bounded ? "bottom 8%" : undefined,
      onEnter: () => to(light),
      onLeaveBack: () => to(after),
      onLeave: bounded ? () => to(after) : undefined,
      onEnterBack: bounded ? () => to(light) : undefined,
    });
    if (bounded && st.isActive) gsap.set(root, LIGHTS[light]);
    return () => {
      st.kill();
      gsap.killTweensOf(root);
      if (bounded) clearLight();
    };
  }, [light, after, bounded]);

  return <span ref={ref} hidden />;
}
