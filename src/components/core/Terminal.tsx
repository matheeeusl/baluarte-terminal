import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { Loading } from "@/components/core/Loading";
import { HomeScreen } from "@/components/gameplay/HomeScreen";
import { FolderView } from "@/components/gameplay/FolderView";
import { useFileSystem } from "@/hooks/useFileSystem";
import { playInterface } from "@/lib/audio";

export function Terminal() {
  const { state, dispatch } = useGame();
  const fileSystem = useFileSystem();
  const { pathStack } = fileSystem;
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    if (state.power) {
      setBootDone(false);
      playInterface("startup");
    } else {
      playInterface("off");
    }
  }, [state.power]);

  if (!state.power) {
    return (
      <div className="flex h-full items-center justify-center">
        <button
          onClick={() => dispatch({ type: "POWER_ON" })}
          className="border border-(--color-fg) px-6 py-3 font-terminal text-(--color-fg) hover:bg-(--color-muted)"
        >
          POWER ON
        </button>
      </div>
    );
  }

  if (state.phase === "BOOT" && !bootDone) {
    return (
      <Loading
        onComplete={() => {
          setBootDone(true);
          dispatch({ type: "NAVIGATE", nodeId: "home" });
        }}
      />
    );
  }

  const isHome = pathStack[pathStack.length - 1] === "home";
  return (
    <NavigationProvider currentFolderId={fileSystem.currentFolder.id}>
      {isHome ? (
        <HomeScreen navigate={fileSystem.navigate} />
      ) : (
        <FolderView fileSystem={fileSystem} />
      )}
    </NavigationProvider>
  );
}
