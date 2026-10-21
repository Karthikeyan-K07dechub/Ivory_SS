import type { RoomId, SystemSlug } from "@/content/types";

/** Which line-art room best shows each system at work. */
export const systemRoom: Record<SystemSlug, RoomId> = {
  "smart-lighting": "living",
  "climate-control": "kitchen",
  "curtains-shades": "bedroom",
  "security-cctv": "outdoor",
  "intercom-access": "entrance",
  "networking-wifi": "night",
  "audio-video": "living",
  "building-management": "night",
};
