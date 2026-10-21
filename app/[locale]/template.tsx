"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** True only until the first page has mounted: the first load is never dimmed or hidden. */
let firstLoad = true;

/**
 * Page transition: a brief "lights dimming" veil lifts while the new page fades in.
 * App Router re-mounts templates on navigation, so this plays on every route change
 * (and never on the first server-rendered load, so content is never hidden without JS).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = !firstLoad && !reduce;

  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        initial={animate ? { opacity: 0.6 } : false}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ position: "fixed", inset: 0, background: "#12141A", pointerEvents: "none", zIndex: 90 }}
      />
      <motion.div
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
