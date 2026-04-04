import { TERMINAL_BRAND_TEXT, TERMINAL_BRAND_FULL } from "@/data/labels";

interface TerminalBrandProps {
  full?: boolean;
}

const LOGO_SRC = `${import.meta.env.BASE_URL}assets/imagens/baluarte_logo.png`;

export function TerminalBrand({ full = false }: TerminalBrandProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <img src={LOGO_SRC} alt="" className="h-5 inline-block" />
      {full ? TERMINAL_BRAND_FULL : TERMINAL_BRAND_TEXT}
    </span>
  );
}
