import { useGame } from "@/context/GameContext";
import { useJanitorActive } from "@/hooks/useJanitor";
import {
  LABEL_STATUS_ONLINE,
  LABEL_USER_ADMIN,
  LABEL_USER_GUEST,
  LABEL_JANITOR,
  LABEL_JANITOR_ACTIVE,
  LABEL_JANITOR_CONTAINED,
  LABEL_CURRENT_PATH,
} from "@/data/labels";

interface StatusBlockProps {
  currentPath: string;
}

export function StatusBlock({ currentPath }: StatusBlockProps) {
  const { state } = useGame();
  const janitorActive = useJanitorActive();

  const user = state.phase === "AUTHENTICATED" ? LABEL_USER_ADMIN : LABEL_USER_GUEST;

  return (
    <div className="font-terminal text-sm text-(--color-fg) space-y-0.5">
      <p>{LABEL_STATUS_ONLINE}</p>
      <p>Usuário: {user}</p>
      <p>
        {LABEL_JANITOR}:{" "}
        <span className={janitorActive ? "text-(--color-accent)" : ""}>
          {janitorActive ? LABEL_JANITOR_ACTIVE : LABEL_JANITOR_CONTAINED}
        </span>
      </p>
      <p>{LABEL_CURRENT_PATH}: {currentPath}</p>
    </div>
  );
}
