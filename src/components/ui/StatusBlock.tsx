import { useGame } from "@/context/GameContext";
import { useJanitorActive } from "@/hooks/useJanitor";
import { getUserById } from "@/data/users";
import {
  LABEL_STATUS_ONLINE,
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

  const loggedUser = state.currentUser ? getUserById(state.currentUser) : null;
  const userLabel = loggedUser
    ? (loggedUser.displayId ?? loggedUser.name)
    : LABEL_USER_GUEST;

  return (
    <div className="font-terminal text-sm text-(--color-fg) space-y-0.5">
      <p>{LABEL_STATUS_ONLINE}</p>
      <p>Usuário: {userLabel}</p>
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
