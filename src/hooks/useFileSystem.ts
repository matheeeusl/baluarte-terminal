import { useState, useCallback, useEffect, useRef } from "react";
import { Howl } from "howler";
import type { FileNode } from "@/types";
import { fileTree } from "@/data/fileTree";
import { findFolder } from "@/lib/tree";
import { useGame } from "@/context/GameContext";

export function useFileSystem() {
  const { state, dispatch } = useGame();
  const [pathStack, setPathStack] = useState<string[]>(["home"]);
  const ambientAudioRef = useRef<Howl | null>(null);

  // Reset navigation to home screen on every power-on
  useEffect(() => {
    if (state.power) {
      setPathStack(["home"]);
    }
  }, [state.power]);

  const currentId = pathStack[pathStack.length - 1];
  const currentFolder = findFolder(currentId, fileTree) ?? fileTree;

  // Plays the folder's ambient audio once on entering it, stops it on leaving
  useEffect(() => {
    ambientAudioRef.current?.stop();
    ambientAudioRef.current = null;

    if (currentFolder.activateAudio) {
      const howl = new Howl({ src: [currentFolder.activateAudio], html5: true });
      ambientAudioRef.current = howl;
      howl.play();
    }

    return () => {
      ambientAudioRef.current?.stop();
      ambientAudioRef.current = null;
    };
  }, [currentId, currentFolder]);

  const navigate = useCallback(
    (nodeId: string) => {
      dispatch({ type: "NAVIGATE", nodeId });
      setPathStack((prev) => [...prev, nodeId]);
    },
    [dispatch]
  );

  const goBack = useCallback(() => {
    if (pathStack.length <= 1) return;
    setPathStack((prev) => prev.slice(0, -1));
  }, [pathStack]);

  const canAccess = useCallback(
    (node: FileNode): boolean => {
      if (node.type !== "folder") return true;
      if (node.visibleTo && node.visibleTo.length > 0) {
        if (!state.currentUser) return false;
        if (!node.visibleTo.includes(state.currentUser)) return false;
      }
      if (node.password === null) return true;
      return state.unlockedFolders.has(node.id);
    },
    [state.currentUser, state.unlockedFolders]
  );

  return {
    currentFolder,
    pathStack,
    navigate,
    goBack,
    canAccess,
  };
}
