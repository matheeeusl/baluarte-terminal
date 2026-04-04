import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import { useNavigation } from "@/context/NavigationContext";
import { fileTree } from "@/data/fileTree";
import type { Folder } from "@/types";

/** Returns the path from root to targetId, or null if not found. */
function pathToFolder(targetId: string, node: Folder): Folder[] | null {
  if (node.id === targetId) return [node];
  for (const child of node.children) {
    if (child.type !== "folder") continue;
    const sub = pathToFolder(targetId, child);
    if (sub) return [node, ...sub];
  }
  return null;
}

/**
 * Janitor is active when the current folder OR any ancestor on the path
 * from root has janitorAccess: true (respecting player overrides).
 */
export function useJanitorActive(): boolean {
  const { state } = useGame();
  const { currentFolderId } = useNavigation();

  const path = pathToFolder(currentFolderId, fileTree) ?? [fileTree];
  return path.some(
    (folder) => state.janitorOverrides.get(folder.id) ?? folder.janitorAccess,
  );
}

/** Triggers a brief flicker on a random 1–2 min interval when Janitor is active. */
export function useJanitor(): boolean {
  const isActive = useJanitorActive();
  const [isFlickering, setIsFlickering] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsFlickering(false);
      return;
    }

    function scheduleFlicker() {
      const delay = 30_000 + Math.random() * 30_000;
      return setTimeout(() => {
        setIsFlickering(true);
        setTimeout(() => {
          setIsFlickering(false);
          timerRef = scheduleFlicker();
        }, 150);
      }, delay);
    }

    let timerRef = scheduleFlicker();
    return () => clearTimeout(timerRef);
  }, [isActive]);

  return isFlickering;
}
