import type { ThemePalette } from "@/types";

export const PALETTES = {
  green: { bg: "#0a0a0a", fg: "#33ff33", accent: "#66ff66", muted: "#1a3a1a" },
  amber: { bg: "#0a0a0a", fg: "#ffb833", accent: "#ffd580", muted: "#3a2a0a" },
  white: { bg: "#0a0a0a", fg: "#e0e0e0", accent: "#ffffff", muted: "#2a2a2a" },
} as const;

export function applyTheme(palette: ThemePalette): void {
  const colors = PALETTES[palette];
  const root = document.documentElement;
  root.style.setProperty("--color-bg", colors.bg);
  root.style.setProperty("--color-fg", colors.fg);
  root.style.setProperty("--color-accent", colors.accent);
  root.style.setProperty("--color-muted", colors.muted);
}
