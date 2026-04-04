export type ThemePalette = "green" | "amber" | "white";

export interface Folder {
  type: "folder";
  id: string;
  name: string;
  password: string | null;
  janitorAccess: boolean;
  adminOnly: boolean;
  children: FileNode[];
}

export interface AudioFile {
  type: "audio";
  id: string;
  name: string;
  src: string;
  duration: number;
  transcript?: string;
}

export interface InteractableFile {
  type: "interactable";
  id: string;
  name: string;
  label: string;
  activeLabel: string;
  inactiveLabel: string;
  defaultState: boolean;
  activateAudio?: AudioFile;
  oneWay?: boolean;
}

export interface StatusFile {
  type: "status";
  id: string;
  name: string;
  text: string;
  adminOnly?: boolean;
}

export interface EmailFile {
  type: "email";
  id: string;
  name: string;
  text: string;
  adminOnly?: boolean;
  attachment?: AudioFile;
}

export interface ImageFile {
  type: "image";
  id: string;
  name: string;
  src: string;
  alt?: string;
  caption?: string;
  adminOnly?: boolean;
}

export interface JanitorControlFile {
  type: "janitor-control";
  id: string;
  name: string;
}

export type FileNode = Folder | AudioFile | InteractableFile | StatusFile | EmailFile | ImageFile | JanitorControlFile;

export interface PasswordGate {
  folderId: string;
  maxAttempts: 3;
  lockoutDuration: number;
}

export interface GameState {
  phase: "BOOT" | "GUEST" | "AUTHENTICATED";
  unlockedFolders: Set<string>;
  janitorOverrides: Map<string, boolean>;
  interactableStates: Map<string, boolean>;
  failedAttempts: Map<string, number>;
  roleplayMode: boolean;
  theme: ThemePalette;
  power: boolean;
  knob1Rotation: number;
  knob2Rotation: number;
}

export type GameEvent =
  | { type: "POWER_ON" }
  | { type: "POWER_OFF" }
  | { type: "LOGIN_ADMIN"; password: string }
  | { type: "UNLOCK_FOLDER"; folderId: string; password: string }
  | { type: "RECORD_FAILED_ATTEMPT"; folderId: string }
  | { type: "NAVIGATE"; nodeId: string }
  | { type: "PLAY_AUDIO"; fileId: string }
  | { type: "STOP_AUDIO" }
  | { type: "TOGGLE_INTERACTABLE"; fileId: string }
  | { type: "GRANT_JANITOR_ACCESS"; folderId: string }
  | { type: "REVOKE_JANITOR_ACCESS"; folderId: string }
  | { type: "TOGGLE_ROLEPLAY" }
  | { type: "CHANGE_THEME"; palette: ThemePalette };
