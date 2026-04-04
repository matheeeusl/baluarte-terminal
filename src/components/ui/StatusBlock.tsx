import { useGame } from "@/context/GameContext";
import { useJanitorActive } from "@/hooks/useJanitor";

interface StatusBlockProps {
  currentPath: string;
}

export function StatusBlock({ currentPath }: StatusBlockProps) {
  const { state } = useGame();
  const janitorActive = useJanitorActive();

  const user = state.phase === "AUTHENTICATED" ? "Admin" : "Guest";

  return (
    <div className="font-terminal text-sm text-(--color-fg) space-y-0.5">
      <p>Status: Online</p>
      <p>User: {user}</p>
      <p>
        Janitor:{" "}
        <span className={janitorActive ? "text-(--color-accent)" : ""}>
          {janitorActive ? "Active" : "Contained"}
        </span>
      </p>
      <p>Current: {currentPath}</p>
    </div>
  );
}
