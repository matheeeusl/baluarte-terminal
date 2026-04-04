import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { JanitorAmbiance } from "@/components/gameplay/JanitorAmbiance";
import { Loading } from "@/components/core/Loading";
import { Shutdown } from "@/components/core/Shutdown";
import { HomeScreen } from "@/components/gameplay/HomeScreen";
import { FolderView } from "@/components/gameplay/FolderView";
import { useFileSystem } from "@/hooks/useFileSystem";
import { playInterface } from "@/lib/audio";

interface Props {
  onTransitionEnd?: () => void;
  onPowerOn?: () => void;
}

export function Terminal({ onTransitionEnd, onPowerOn }: Props) {
  const { state, dispatch } = useGame();
  const fileSystem = useFileSystem();
  const { pathStack } = fileSystem;
  const [bootDone, setBootDone] = useState(false);
  const [shutdownDone, setShutdownDone] = useState(true);

  useEffect(() => {
    if (state.power) {
      setBootDone(false);
      playInterface("startup");
    } else {
      setShutdownDone(false);
      playInterface("off");
    }
  }, [state.power]);

  if (!state.power) {
    if (!shutdownDone) {
      return (
        <Shutdown
          onComplete={() => {
            setShutdownDone(true);
            onTransitionEnd?.();
          }}
        />
      );
    }
    return (
      <div className="flex h-full items-center justify-center">
        <button
          onClick={() => {
            onPowerOn?.();
            dispatch({ type: "POWER_ON" });
          }}
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
          onTransitionEnd?.();
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
      <JanitorAmbiance />
    </NavigationProvider>
  );
}
