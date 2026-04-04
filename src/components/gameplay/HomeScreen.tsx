import { useState } from "react";
import { useGame } from "@/context/GameContext";
import {
  TERMINAL_BRAND,
  WELCOME_MESSAGE,
  LABEL_ADMIN_LOGIN,
  LABEL_GUEST_ACCESS,
  LABEL_SETTINGS,
  LABEL_CHOOSE_OPTION,
} from "@/data/labels";
import { MenuList } from "@/components/ui/MenuList";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SettingsScreen } from "@/components/gameplay/SettingsScreen";
import type { MenuItem } from "@/components/ui/MenuList";

interface Props {
  navigate: (nodeId: string) => void;
}

type HomeView = "menu" | "settings";

const HOME_ITEMS: MenuItem[] = [
  { id: "admin-login", label: LABEL_ADMIN_LOGIN, icon: "🔐" },
  { id: "guest", label: LABEL_GUEST_ACCESS, icon: "👤" },
  { id: "settings", label: LABEL_SETTINGS, icon: "⚙" },
];

export function HomeScreen({ navigate }: Props) {
  const { dispatch } = useGame();
  const [view, setView] = useState<HomeView>("menu");
  const [showPassword, setShowPassword] = useState(false);

  if (view === "settings") {
    return <SettingsScreen onBack={() => setView("menu")} />;
  }

  return (
    <div className="flex h-full flex-col gap-4 p-10 font-terminal">
      <h1 className="text-lg text-(--color-accent)">
        {TERMINAL_BRAND}
      </h1>
      <p className="text-(--color-fg)">{WELCOME_MESSAGE}</p>
      <p className="text-sm text-(--color-fg)">{LABEL_CHOOSE_OPTION}</p>
      <MenuList
        items={HOME_ITEMS}
        onSelect={(item) => {
          if (item.id === "admin-login") setShowPassword(true);
          if (item.id === "guest") navigate("root");
          if (item.id === "settings") setView("settings");
        }}
      />
      {showPassword && (
        <div className="mt-auto">
          <PasswordInput
            onSubmit={(pw) => {
              dispatch({ type: "LOGIN_ADMIN", password: pw });
              setShowPassword(false);
              navigate("root");
            }}
            onCancel={() => setShowPassword(false)}
          />
        </div>
      )}
    </div>
  );
}
