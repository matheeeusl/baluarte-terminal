export type ThemePalette = "green" | "amber" | "white";

interface BaseNode {
  id: string;
  name: string;
  visibleTo?: string[]; // if non-empty, only these user IDs can see this node
  password?: string | null; // if set to a string, requires password before entering/activating/reading
}

export interface Folder extends BaseNode {
  type: "folder";
  janitorAccess: boolean;
  isUserRoot?: string; // user ID this folder authenticates as
  children: FileNode[];
}

export interface AudioFile extends BaseNode {
  type: "audio";
  src: string;
  duration: number;
  transcript?: string;
}

export interface InteractableFile extends BaseNode {
  type: "interactable";
  label: string;
  activeLabel: string;
  inactiveLabel: string;
  defaultState: boolean;
  oneWay?: boolean;
  activateAudio?: string; // src path — plays as a one-shot sound on activation
}

export interface StatusFile extends BaseNode {
  type: "status";
  text: string;
}

export interface EmailFile extends BaseNode {
  type: "email";
  text: string;
  attachment?: AudioFile;
}

export interface ImageFile extends BaseNode {
  type: "image";
  src: string;
  alt?: string;
  caption?: string;
}

export interface JanitorControlFile extends BaseNode {
  type: "janitor-control";
}

export type FileNode =
  | Folder
  | AudioFile
  | InteractableFile
  | StatusFile
  | EmailFile
  | ImageFile
  | JanitorControlFile;

export interface PasswordGate {
  folderId: string;
  maxAttempts: 3;
  lockoutDuration: number;
}

export interface GameState {
  phase: "BOOT" | "GUEST" | "AUTHENTICATED";
  currentUser: string | null;
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
  | { type: "SET_CURRENT_USER"; userId: string }
  | { type: "LOGOUT_USER" }
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
