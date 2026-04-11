import { useState } from "react";
import {
  WELCOME_MESSAGE,
  LABEL_USERS,
  LABEL_PUBLIC,
  LABEL_SETTINGS,
  LABEL_CHOOSE_OPTION,
} from "@/data/labels";
import { TerminalBrand } from "@/components/ui/TerminalBrand";
import { MenuList } from "@/components/ui/MenuList";
import { SettingsScreen } from "@/components/gameplay/SettingsScreen";
import type { MenuItem } from "@/components/ui/MenuList";

interface Props {
  navigate: (nodeId: string) => void;
}

type HomeView = "menu" | "settings";

const HOME_ITEMS: MenuItem[] = [
  { id: "usuarios", label: LABEL_USERS, icon: "👥" },
  { id: "publico", label: LABEL_PUBLIC, icon: "📋" },
  { id: "settings", label: LABEL_SETTINGS, icon: "⚙" },
];

export function HomeScreen({ navigate }: Props) {
  const [view, setView] = useState<HomeView>("menu");

  if (view === "settings") {
    return <SettingsScreen onBack={() => setView("menu")} />;
  }

  return (
    <div className="flex h-full flex-col gap-4 p-10 font-terminal">
      <h1 className="text-lg text-(--color-accent)">
        <TerminalBrand />
      </h1>
      <p className="text-(--color-fg)">{WELCOME_MESSAGE}</p>
      <p className="text-sm text-(--color-fg)">{LABEL_CHOOSE_OPTION}</p>
      <MenuList
        items={HOME_ITEMS}
        onSelect={(item) => {
          if (item.id === "usuarios") navigate("usuarios");
          if (item.id === "publico") navigate("publico");
          if (item.id === "settings") setView("settings");
        }}
      />
    </div>
  );
}
