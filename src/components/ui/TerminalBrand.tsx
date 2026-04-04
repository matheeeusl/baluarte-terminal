import { useGame } from "@/context/GameContext";
import { TERMINAL_BRAND_TEXT, TERMINAL_BRAND_FULL } from "@/data/labels";
import type { ThemePalette } from "@/types";

interface TerminalBrandProps {
  full?: boolean;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const LOGO: Record<ThemePalette, string> = {
  green: `${BASE}/assets/imagens/favicon.png`,
  amber: `${BASE}/assets/imagens/favicon-amber.png`,
  white: `${BASE}/assets/imagens/favicon-white.png`,
};

export function TerminalBrand({ full = false }: TerminalBrandProps) {
  const { state } = useGame();

  return (
    <span className="inline-flex items-center gap-2">
      <img src={LOGO[state.theme]} alt="" className="h-5 inline-block" />
      {full ? TERMINAL_BRAND_FULL : TERMINAL_BRAND_TEXT}
    </span>
  );
}
