"use client";

import { useSyncExternalStore } from "react";

/**
 * A tiny store for "what the visitor is looking at", used to pre-fill the
 * floating WhatsApp message (current page, room or system).
 */
let topic: string | null = null;
const listeners = new Set<() => void>();

export function setWaTopic(next: string | null) {
  topic = next;
  listeners.forEach((l) => l());
}

export function useWaTopic() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => topic,
    () => null
  );
}

export { waLink } from "./whatsapp";
