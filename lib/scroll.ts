"use client";

import type Lenis from "lenis";

/** Shared handle on the Lenis instance so any component can scroll smoothly. */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scrolls to a y position (number) or element, smoothly when allowed. */
export function scrollToTarget(target: number | HTMLElement, offset = 0) {
  const lenis = instance;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  const y = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: y + offset, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
