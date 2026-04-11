import { useState, useEffect } from "react";
import type { AudioFile, EmailFile, ImageFile, StatusFile } from "@/types";

export interface FolderViewState {
  showPassword: string | null;
  setShowPassword: (id: string | null) => void;
  pendingPasswordNode: string | null;
  setPendingPasswordNode: (id: string | null) => void;
  unlockedNodes: Set<string>;
  unlockNode: (id: string) => void;
  activeAudio: AudioFile | null;
  setActiveAudio: (f: AudioFile | null) => void;
  activeStatus: StatusFile | null;
  setActiveStatus: (f: StatusFile | null) => void;
  activeEmail: EmailFile | null;
  setActiveEmail: (f: EmailFile | null) => void;
  activeImage: ImageFile | null;
  setActiveImage: (f: ImageFile | null) => void;
}

export function useFolderViewState(folderId: string): FolderViewState {
  const [showPassword, setShowPassword] = useState<string | null>(null);
  const [pendingPasswordNode, setPendingPasswordNode] = useState<string | null>(null);
  const [unlockedNodes, setUnlockedNodes] = useState<Set<string>>(new Set());
  const [activeAudio, setActiveAudio] = useState<AudioFile | null>(null);
  const [activeStatus, setActiveStatus] = useState<StatusFile | null>(null);
  const [activeEmail, setActiveEmail] = useState<EmailFile | null>(null);
  const [activeImage, setActiveImage] = useState<ImageFile | null>(null);

  useEffect(() => {
    setShowPassword(null);
    setPendingPasswordNode(null);
    setUnlockedNodes(new Set());
    setActiveAudio(null);
    setActiveStatus(null);
    setActiveEmail(null);
    setActiveImage(null);
  }, [folderId]);

  function unlockNode(id: string) {
    setUnlockedNodes((prev) => new Set(prev).add(id));
  }

  return {
    showPassword, setShowPassword,
    pendingPasswordNode, setPendingPasswordNode,
    unlockedNodes, unlockNode,
    activeAudio, setActiveAudio,
    activeStatus, setActiveStatus,
    activeEmail, setActiveEmail,
    activeImage, setActiveImage,
  };
}
