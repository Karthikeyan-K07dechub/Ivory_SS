import type { Light } from "@/content/types";

/** The scroll-driven light states. Values tween on <html> as CSS variables. */
export type LightState = Light | "ivory";

export const LIGHTS: Record<LightState, Record<string, string>> = {
  dawn: { "--scene-bg": "#FFFFFF", "--scene-fg": "#1C1F24", "--scene-line": "rgba(28,31,36,0.14)", "--glow": "#E9C894" },
  noon: { "--scene-bg": "#FFF9EE", "--scene-fg": "#1C1F24", "--scene-line": "rgba(28,31,36,0.12)", "--glow": "#E9C894" },
  golden: { "--scene-bg": "#E9C894", "--scene-fg": "#1C1F24", "--scene-line": "rgba(28,31,36,0.18)", "--glow": "#FFF9EE" },
  dusk: { "--scene-bg": "#2A2622", "--scene-fg": "#FBF8F2", "--scene-line": "rgba(251,248,242,0.16)", "--glow": "#E9C894" },
  night: { "--scene-bg": "#12141A", "--scene-fg": "#FBF8F2", "--scene-line": "rgba(251,248,242,0.14)", "--glow": "#E9C894" },
  ivory: { "--scene-bg": "#F4EFE6", "--scene-fg": "#1C1F24", "--scene-line": "#CFC6B6", "--glow": "#E9C894" },
};

export const LIGHT_VARS = Object.keys(LIGHTS.ivory);

export function clearLight() {
  const s = document.documentElement.style;
  LIGHT_VARS.forEach((v) => s.removeProperty(v));
}
