import { useGame } from "@/context/GameContext";
import {
  TERMINAL_BRAND,
  LABEL_SETTINGS_TITLE,
  LABEL_SELECT_PALETTE,
  LABEL_BACK,
  LABEL_THEME_ACTIVE,
  PALETTE_LABELS,
} from "@/data/labels";
import { MenuList } from "@/components/ui/MenuList";
import { PALETTES } from "@/lib/theme";
import type { ThemePalette } from "@/types";
import type { MenuItem } from "@/components/ui/MenuList";

interface Props {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: Props) {
  const { state, dispatch } = useGame();

  const items: MenuItem[] = (Object.keys(PALETTES) as ThemePalette[]).map(
    (palette) => ({
      id: palette,
      label:
        PALETTE_LABELS[palette] +
        (state.theme === palette ? `  ${LABEL_THEME_ACTIVE}` : ""),
      icon: "◉",
      disabled: false,
    }),
  );

  const backItem: MenuItem = { id: "__back", label: LABEL_BACK, icon: "◄" };

  return (
    <div className="flex h-full flex-col gap-4 p-10 font-terminal">
      <h1 className="text-lg text-(--color-accent)">
        {TERMINAL_BRAND}
      </h1>
      <p className="text-(--color-fg)">{LABEL_SETTINGS_TITLE}</p>
      <hr className="border-(--color-muted)" />
      <p className="text-sm text-(--color-fg)">{LABEL_SELECT_PALETTE}</p>
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
