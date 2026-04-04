import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { MenuList } from "@/components/ui/MenuList";
import { StatusBlock } from "@/components/ui/StatusBlock";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { AudioPlayer } from "@/components/gameplay/AudioPlayer";
import { formatPath } from "@/lib/format";
import type { MenuItem } from "@/components/ui/MenuList";
import type { AudioFile, FileNode, InteractableFile, StatusFile } from "@/types";
import type { useFileSystem } from "@/hooks/useFileSystem";

type FileSystem = ReturnType<typeof useFileSystem>;

const ICONS: Record<string, string> = {
  folder: "📁",
  audio: "🔊",
  interactable: "⚙",
  status: "📄",
};

interface Props {
  fileSystem: FileSystem;
}

export function FolderView({ fileSystem }: Props) {
  const { state, dispatch } = useGame();
  const { currentFolder, pathStack, navigate, goBack, canAccess } = fileSystem;
  const isAdmin = state.phase === "AUTHENTICATED";
  const [showPassword, setShowPassword] = useState<string | null>(null);
  const [activeAudio, setActiveAudio] = useState<AudioFile | null>(null);
  const [activeStatus, setActiveStatus] = useState<StatusFile | null>(null);

  useEffect(() => {
    setShowPassword(null);
    setActiveAudio(null);
    setActiveStatus(null);
  }, [currentFolder.id]);

  const visibleChildren = currentFolder.children.filter(
    (node) => node.type !== "folder" || !node.adminOnly || isAdmin,
  );

  // Interactables in this folder — used for room status display and labels
  const interactables = visibleChildren.filter(
    (n): n is InteractableFile => n.type === "interactable",
  );

  function interactableLabel(node: InteractableFile): string {
    const active = state.interactableStates.get(node.id) ?? node.defaultState;
    return active ? node.activeLabel : node.inactiveLabel;
  }

  function fileNodeToMenuItem(node: FileNode): MenuItem {
    if (node.type === "interactable") {
      return {
        id: node.id,
        label: interactableLabel(node),
        icon: ICONS.interactable,
        disabled: false,
      };
    }
    const locked = node.type === "folder" && node.password && !canAccess(node);
    return {
      id: node.id,
      label: node.name + (locked ? " [LOCKED]" : ""),
      icon: ICONS[node.type],
      disabled: false,
    };
  }

  const items: MenuItem[] = [
    ...visibleChildren.map(fileNodeToMenuItem),
    ...(pathStack.length > 1
      ? [{ id: "__back", label: "Back", icon: "◄" }]
      : []),
  ];

  return (
    <div className="flex h-full flex-col gap-3 p-10 font-terminal overflow-auto">
      <h1 className="text-base text-(--color-accent)">
        ██ ROBCO INDUSTRIES (TM) TERMLINK
      </h1>
      <StatusBlock currentPath={formatPath(pathStack)} />

      {/* Room status: current state of all interactables in this folder */}
      {interactables.length > 0 && (
        <div className="text-sm text-(--color-fg) space-y-0.5">
          {interactables.map((node) => (
            <p key={node.id}>{interactableLabel(node)}</p>
          ))}
        </div>
      )}

      <hr className="border-(--color-muted)" />
      <p className="text-sm text-(--color-fg)">Choose an option:</p>
      <MenuList
        items={items}
        onSelect={(item) => {
          if (item.id === "__back") {
            goBack();
            return;
          }
          const node = visibleChildren.find((n) => n.id === item.id);
          if (!node) return;

          if (node.type === "folder") {
            if (!canAccess(node)) {
              setShowPassword(node.id);
            } else {
              navigate(node.id);
            }
            return;
          }

          if (node.type === "interactable") {
            dispatch({ type: "TOGGLE_INTERACTABLE", fileId: node.id });
            return;
          }

          if (node.type === "audio") {
            setActiveAudio(node);
            setActiveStatus(null);
            return;
          }

          if (node.type === "status") {
            setActiveStatus(activeStatus?.id === node.id ? null : node);
            setActiveAudio(null);
            return;
          }
        }}
        onBack={goBack}
      />
      {activeStatus && (
        <div className="mt-auto border-t border-(--color-muted) pt-3 text-sm text-(--color-fg) font-terminal whitespace-pre-wrap">
          <p className="text-(--color-accent) mb-1">{activeStatus.name}</p>
          {activeStatus.text}
        </div>
      )}
      {activeAudio && (
        <div className="mt-auto border-t border-(--color-muted) pt-3">
          <AudioPlayer
            file={activeAudio}
            onStop={() => setActiveAudio(null)}
          />
        </div>
      )}
      {showPassword && (
        <div className="mt-auto">
          <PasswordInput
            onSubmit={(pw) => {
              dispatch({
                type: "UNLOCK_FOLDER",
                folderId: showPassword,
                password: pw,
              });
              setShowPassword(null);
              navigate(showPassword);
            }}
            onCancel={() => setShowPassword(null)}
          />
        </div>
      )}
    </div>
  );
}
