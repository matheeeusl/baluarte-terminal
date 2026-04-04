import { useGame } from "@/context/GameContext";
import { MenuList } from "@/components/ui/MenuList";
import { PALETTES } from "@/lib/theme";
import type { ThemePalette } from "@/types";
import type { MenuItem } from "@/components/ui/MenuList";

interface Props {
  onBack: () => void;
}

const PALETTE_LABELS: Record<ThemePalette, string> = {
  green: "Green  — Classic phosphor",
  amber: "Amber  — Warm phosphor",
  white: "White  — High contrast",
};

export function SettingsScreen({ onBack }: Props) {
  const { state, dispatch } = useGame();

  const items: MenuItem[] = (Object.keys(PALETTES) as ThemePalette[]).map(
    (palette) => ({
      id: palette,
      label:
        PALETTE_LABELS[palette] +
        (state.theme === palette ? "  [ACTIVE]" : ""),
      icon: "◉",
      disabled: false,
    }),
  );

  const backItem: MenuItem = { id: "__back", label: "Back", icon: "◄" };

  return (
    <div className="flex h-full flex-col gap-4 p-10 font-terminal">
      <h1 className="text-lg text-(--color-accent)">
        ██ ROBCO INDUSTRIES (TM) TERMLINK
      </h1>
      <p className="text-(--color-fg)">Settings — Display</p>
      <hr className="border-(--color-muted)" />
      <p className="text-sm text-(--color-fg)">Select color palette:</p>
      <MenuList
        items={[...items, backItem]}
        onSelect={(item) => {
          if (item.id === "__back") {
            onBack();
            return;
          }
          dispatch({ type: "CHANGE_THEME", palette: item.id as ThemePalette });
        }}
      />
    </div>
  );
}
