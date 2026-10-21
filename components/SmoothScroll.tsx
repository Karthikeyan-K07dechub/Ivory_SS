"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. Off for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      if (mq.matches || lenis) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    };
    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      setLenis(null);
    };

    start();
    const onChange = () => (mq.matches ? stop() : start());
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
