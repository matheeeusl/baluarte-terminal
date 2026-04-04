import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { MenuList } from "@/components/ui/MenuList";
import { StatusBlock } from "@/components/ui/StatusBlock";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { AudioPlayer } from "@/components/gameplay/AudioPlayer";
import { formatPath } from "@/lib/format";
import { TerminalBrand } from "@/components/ui/TerminalBrand";
import { fileTree } from "@/data/fileTree";
import type { Folder } from "@/types";
import {
  LABEL_CHOOSE_OPTION,
  LABEL_LOCKED,
  LABEL_BACK,
  LABEL_JANITOR_GRANT,
  LABEL_JANITOR_REVOKE,
  LABEL_PROCESSING,
} from "@/data/labels";
import type { MenuItem } from "@/components/ui/MenuList";
import type { AudioFile, EmailFile, FileNode, InteractableFile, StatusFile } from "@/types";
import type { useFileSystem } from "@/hooks/useFileSystem";

type FileSystem = ReturnType<typeof useFileSystem>;

function findFolder(id: string, node: Folder): Folder | null {
  if (node.id === id) return node;
  for (const child of node.children) {
    if (child.type !== "folder") continue;
    const found = findFolder(id, child);
    if (found) return found;
  }
  return null;
}

const ICONS: Record<string, string> = {
  folder: "📁",
  audio: "🔊",
  interactable: "⚙",
  status: "📄",
  email: "✉",
  "janitor-control": "👁",
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
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [activeStatus, setActiveStatus] = useState<StatusFile | null>(null);
  const [activeEmail, setActiveEmail] = useState<EmailFile | null>(null);
  const [emailAudio, setEmailAudio] = useState<AudioFile | null>(null);
  const [processing, setProcessing] = useState<Set<string>>(new Set());

  useEffect(() => {
    setShowPassword(null);
    setActiveAudio(null);
    setAutoPlayAudio(false);
    setActiveStatus(null);
    setActiveEmail(null);
    setEmailAudio(null);
  }, [currentFolder.id]);

  const PROCESSING_DELAY = 1500;

  function withProcessing(id: string, action: () => void) {
    setProcessing((prev) => new Set(prev).add(id));
    setTimeout(() => {
      action();
      setProcessing((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, PROCESSING_DELAY);
  }

  const visibleChildren = currentFolder.children.filter((node) => {
    if (node.type === "folder" && node.adminOnly && !isAdmin) return false;
    if (node.type === "status" && node.adminOnly && !isAdmin) return false;
    if (node.type === "email" && node.adminOnly && !isAdmin) return false;
    return true;
  });

  // Interactables in this folder — used for room status display and labels
  const interactables = visibleChildren.filter(
    (n): n is InteractableFile => n.type === "interactable",
  );

  function janitorControlLabel(): string {
    const granted =
      state.janitorOverrides.get(currentFolder.id) ??
      currentFolder.janitorAccess;
    return granted ? LABEL_JANITOR_REVOKE : LABEL_JANITOR_GRANT;
  }

  function interactableLabel(node: InteractableFile): string {
    const active = state.interactableStates.get(node.id) ?? node.defaultState;
    return active ? node.activeLabel : node.inactiveLabel;
  }

  function fileNodeToMenuItem(node: FileNode): MenuItem {
    if (node.type === "interactable") {
      const isProcessing = processing.has(node.id);
      const isActive = state.interactableStates.get(node.id) ?? node.defaultState;
      const isLocked = node.oneWay && isActive;
      return {
        id: node.id,
        label: isProcessing ? LABEL_PROCESSING : interactableLabel(node),
        icon: ICONS.interactable,
        disabled: isProcessing || isLocked,
      };
    }
    if (node.type === "janitor-control") {
      const isProcessing = processing.has(node.id);
      return {
        id: node.id,
        label: isProcessing ? LABEL_PROCESSING : janitorControlLabel(),
        icon: ICONS["janitor-control"],
        disabled: isProcessing,
      };
    }
    const locked = node.type === "folder" && node.password && !canAccess(node);
    return {
      id: node.id,
      label: node.name + (locked ? ` ${LABEL_LOCKED}` : ""),
      icon: ICONS[node.type],
      disabled: false,
    };
  }

  const items: MenuItem[] = [
    ...visibleChildren.map(fileNodeToMenuItem),
    ...(pathStack.length > 1
      ? [{ id: "__back", label: LABEL_BACK, icon: "◄" }]
      : []),
  ];

  return (
    <div className="flex h-full flex-col gap-3 p-10 font-terminal overflow-auto">
      <h1 className="text-base text-(--color-accent)">
        <TerminalBrand />
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
      <p className="text-sm text-(--color-fg)">{LABEL_CHOOSE_OPTION}</p>
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
            const currentlyActive =
              state.interactableStates.get(node.id) ?? node.defaultState;
            withProcessing(node.id, () => {
              dispatch({ type: "TOGGLE_INTERACTABLE", fileId: node.id });
              if (!currentlyActive && node.activateAudio) {
                setActiveAudio(node.activateAudio);
                setAutoPlayAudio(true);
                setActiveStatus(null);
                setActiveEmail(null);
              }
            });
            return;
          }

          if (node.type === "janitor-control") {
            const granted =
              state.janitorOverrides.get(currentFolder.id) ??
              currentFolder.janitorAccess;
            withProcessing(node.id, () =>
              dispatch({
                type: granted ? "REVOKE_JANITOR_ACCESS" : "GRANT_JANITOR_ACCESS",
                folderId: currentFolder.id,
              }),
            );
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
            setActiveEmail(null);
            return;
          }

          if (node.type === "email") {
            const next = activeEmail?.id === node.id ? null : node;
            setActiveEmail(next);
            setEmailAudio(null);
            setActiveStatus(null);
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
      {activeEmail && (
        <div className="mt-auto border-t border-(--color-muted) pt-3 text-sm text-(--color-fg) font-terminal space-y-3">
          <p className="text-(--color-accent)">{activeEmail.name}</p>
          <p className="whitespace-pre-wrap">{activeEmail.text}</p>
          {activeEmail.attachment && (
            <div className="border-t border-(--color-muted) pt-2">
              {emailAudio ? (
                <AudioPlayer
                  file={emailAudio}
                  onStop={() => setEmailAudio(null)}
                />
              ) : (
                <button
                  className="flex items-center gap-2 cursor-pointer hover:text-(--color-accent) transition-colors"
                  onClick={() => setEmailAudio(activeEmail.attachment!)}
                >
                  <span>🔊</span>
                  <span>{activeEmail.attachment.name}</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {activeAudio && (
        <div className="mt-auto border-t border-(--color-muted) pt-3">
          <AudioPlayer
            file={activeAudio}
            autoPlay={autoPlayAudio}
            onStop={() => { setActiveAudio(null); setAutoPlayAudio(false); }}
          />
        </div>
      )}
      {showPassword && (
        <div className="mt-auto">
          <PasswordInput
            key={showPassword}
            folderName={findFolder(showPassword, fileTree)?.name}
            initialAttempts={state.failedAttempts.get(showPassword) ?? 0}
            validate={(pw) => {
              const folder = findFolder(showPassword, fileTree);
              return folder?.password?.toUpperCase() === pw.toUpperCase();
            }}
            onFailure={() =>
              dispatch({ type: "RECORD_FAILED_ATTEMPT", folderId: showPassword })
            }
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
