"use client";

import { useEffect } from "react";
import { setWaTopic } from "@/lib/wa";

/** Drop into a page to name what the visitor is looking at in the WhatsApp message. */
export function WaTopic({ topic }: { topic: string }) {
  useEffect(() => {
    setWaTopic(topic);
    return () => setWaTopic(null);
  }, [topic]);
  return null;
}
