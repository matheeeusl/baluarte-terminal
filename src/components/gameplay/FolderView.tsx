import { Howl } from "howler";
import { useGame } from "@/context/GameContext";
import { useProcessing } from "@/hooks/useProcessing";
import { useFolderViewState } from "@/hooks/useFolderViewState";
import { MenuList } from "@/components/ui/MenuList";
import { StatusBlock } from "@/components/ui/StatusBlock";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { FolderPasswordGate } from "@/components/ui/FolderPasswordGate";
import { ActiveContent } from "@/components/ui/ActiveContent";
import { formatPath } from "@/lib/format";
import { TerminalBrand } from "@/components/ui/TerminalBrand";
import {
  LABEL_CHOOSE_OPTION,
  LABEL_LOCKED,
  LABEL_BACK,
  LABEL_JANITOR_GRANT,
  LABEL_JANITOR_REVOKE,
  LABEL_PROCESSING,
} from "@/data/labels";
import type { MenuItem } from "@/components/ui/MenuList";
import type { FileNode, InteractableFile } from "@/types";
import type { useFileSystem } from "@/hooks/useFileSystem";

type FileSystem = ReturnType<typeof useFileSystem>;

const ICONS: Record<string, string> = {
  folder: "📁",
  audio: "🔊",
  interactable: "⚙",
  status: "📄",
  email: "✉",
  image: "🖼",
  "janitor-control": "👁",
};

interface Props {
  fileSystem: FileSystem;
}

export function FolderView({ fileSystem }: Props) {
  const { state, dispatch } = useGame();
  const { currentFolder, pathStack, navigate, goBack, canAccess } = fileSystem;
  const { processing, withProcessing } = useProcessing();
  const s = useFolderViewState(currentFolder.id);

  const visibleChildren = currentFolder.children.filter((node) => {
    if (node.visibleTo && node.visibleTo.length > 0) {
      if (!state.currentUser) return false;
      if (!node.visibleTo.includes(state.currentUser)) return false;
    }
    return true;
  });

  const interactables = visibleChildren.filter(
    (n): n is InteractableFile => n.type === "interactable",
  );

  function interactableLabel(node: InteractableFile): string {
    const active = state.interactableStates.get(node.id) ?? node.defaultState;
    return active ? node.activeLabel : node.inactiveLabel;
  }

  function janitorControlLabel(): string {
    const granted = state.janitorOverrides.get(currentFolder.id) ?? currentFolder.janitorAccess;
    return granted ? LABEL_JANITOR_REVOKE : LABEL_JANITOR_GRANT;
  }

  function isNodeLocked(node: FileNode): boolean {
    if (node.type === "folder") return !!node.password && !canAccess(node);
    return !!node.password && !s.unlockedNodes.has(node.id);
  }

  function fileNodeToMenuItem(node: FileNode): MenuItem {
    const locked = isNodeLocked(node);
    const lockSuffix = locked ? ` ${LABEL_LOCKED}` : "";

    if (node.type === "interactable") {
      const isProcessing = processing.has(node.id);
      const isActive = state.interactableStates.get(node.id) ?? node.defaultState;
      return {
        id: node.id,
        label: isProcessing ? LABEL_PROCESSING : interactableLabel(node) + lockSuffix,
        icon: ICONS.interactable,
        disabled: isProcessing || (node.oneWay === true && isActive),
      };
    }
    if (node.type === "janitor-control") {
      const isProcessing = processing.has(node.id);
      return {
        id: node.id,
        label: isProcessing ? LABEL_PROCESSING : janitorControlLabel() + lockSuffix,
        icon: ICONS["janitor-control"],
        disabled: isProcessing,
      };
    }
    return {
      id: node.id,
      label: node.name + lockSuffix,
      icon: ICONS[node.type],
      disabled: false,
    };
  }

  function executeNodeAction(node: FileNode) {
    if (node.type === "interactable") {
      const currentlyActive = state.interactableStates.get(node.id) ?? node.defaultState;
      withProcessing(node.id, () => {
        dispatch({ type: "TOGGLE_INTERACTABLE", fileId: node.id });
        if (!currentlyActive && node.activateAudio) {
          new Howl({ src: [node.activateAudio], html5: true }).play();
        }
      });
      return;
    }
    if (node.type === "janitor-control") {
      const granted = state.janitorOverrides.get(currentFolder.id) ?? currentFolder.janitorAccess;
      withProcessing(node.id, () =>
        dispatch({
          type: granted ? "REVOKE_JANITOR_ACCESS" : "GRANT_JANITOR_ACCESS",
          folderId: currentFolder.id,
        }),
      );
      return;
    }
    if (node.type === "audio") {
      s.setActiveAudio(node);
      s.setActiveStatus(null);
      return;
    }
    if (node.type === "status") {
      s.setActiveStatus(s.activeStatus?.id === node.id ? null : node);
      s.setActiveAudio(null);
      s.setActiveEmail(null);
      return;
    }
    if (node.type === "image") {
      s.setActiveImage(s.activeImage?.id === node.id ? null : node);
      s.setActiveStatus(null);
      s.setActiveEmail(null);
      s.setActiveAudio(null);
      return;
    }
    if (node.type === "email") {
      s.setActiveEmail(s.activeEmail?.id === node.id ? null : node);
      s.setActiveStatus(null);
      s.setActiveAudio(null);
      return;
    }
  }

  function handleSelect(item: MenuItem) {
    if (item.id === "__back") { goBack(); return; }

    const node = visibleChildren.find((n) => n.id === item.id);
    if (!node) return;

    if (node.type === "folder") {
      if (!canAccess(node)) {
        s.setShowPassword(node.id);
      } else {
        if (node.isUserRoot) dispatch({ type: "SET_CURRENT_USER", userId: node.isUserRoot });
        navigate(node.id);
      }
      return;
    }

    if (node.password && !s.unlockedNodes.has(node.id)) {
      s.setPendingPasswordNode(node.id);
      return;
    }

    executeNodeAction(node);
  }

  const items: MenuItem[] = [
    ...visibleChildren.map(fileNodeToMenuItem),
    ...(pathStack.length > 1 ? [{ id: "__back", label: LABEL_BACK, icon: "◄" }] : []),
  ];

  const pendingNode = s.pendingPasswordNode
    ? visibleChildren.find((n) => n.id === s.pendingPasswordNode)
    : null;

  return (
    <div className="flex h-full flex-col gap-3 p-10 font-terminal overflow-auto">
      <h1 className="text-base text-(--color-accent)">
        <TerminalBrand />
      </h1>
      <StatusBlock currentPath={formatPath(pathStack)} />

      {interactables.length > 0 && (
        <div className="text-sm text-(--color-fg) space-y-0.5">
          {interactables.map((node) => (
            <p key={node.id}>{interactableLabel(node)}</p>
          ))}
        </div>
      )}

      <hr className="border-(--color-muted)" />
      <p className="text-sm text-(--color-fg)">{LABEL_CHOOSE_OPTION}</p>
      <MenuList items={items} onSelect={handleSelect} onBack={goBack} />

      <ActiveContent
        activeStatus={s.activeStatus}
        activeEmail={s.activeEmail}
        activeImage={s.activeImage}
        activeAudio={s.activeAudio}
        onAudioStop={() => s.setActiveAudio(null)}
      />

      {s.showPassword && (
        <div className="mt-auto">
          <FolderPasswordGate
            folderId={s.showPassword}
            onSuccess={(id) => { s.setShowPassword(null); navigate(id); }}
            onCancel={() => s.setShowPassword(null)}
          />
        </div>
      )}

      {pendingNode && (
        <div className="mt-auto">
          <PasswordInput
            key={pendingNode.id}
            validate={(pw) => pendingNode.password?.toUpperCase() === pw.toUpperCase()}
            onSubmit={() => {
              s.unlockNode(pendingNode.id);
              s.setPendingPasswordNode(null);
              executeNodeAction(pendingNode);
            }}
            onCancel={() => s.setPendingPasswordNode(null)}
          />
        </div>
      )}
    </div>
  );
}
