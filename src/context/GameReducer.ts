import type { GameState, GameEvent } from "@/types";
import { fileTree } from "@/data/fileTree";

const KNOB1_STEP = 15;
const KNOB2_STEP = 90;

export function getInitialState(): GameState {
  const interactableStates = new Map<string, boolean>();
  seedInteractables(fileTree.children, interactableStates);

  return {
    phase: "BOOT",
    currentUser: null,
    unlockedFolders: new Set<string>(),
    janitorOverrides: new Map<string, boolean>(),
    interactableStates,
    failedAttempts: new Map<string, number>(),
    roleplayMode: false,
    theme: "green",
    power: true,
    knob1Rotation: 0,
    knob2Rotation: 0,
  };
}

function seedInteractables(
  nodes: import("@/types").FileNode[],
  map: Map<string, boolean>
): void {
  for (const node of nodes) {
    if (node.type === "interactable") {
      map.set(node.id, node.defaultState);
    } else if (node.type === "folder") {
      seedInteractables(node.children, map);
    }
  }
}

export function gameReducer(state: GameState, event: GameEvent): GameState {
  switch (event.type) {
    case "POWER_ON":
      return {
        ...state,
        power: true,
        phase: "BOOT",
        knob2Rotation: state.knob2Rotation + KNOB2_STEP,
      };

    case "POWER_OFF":
      return {
        ...getInitialState(),
        power: false,
        theme: state.theme,
        knob2Rotation: state.knob2Rotation + KNOB2_STEP,
      };

    case "SET_CURRENT_USER":
      return { ...state, currentUser: event.userId, phase: "AUTHENTICATED" };

    case "LOGOUT_USER":
      return { ...state, currentUser: null, phase: "GUEST" };

    case "UNLOCK_FOLDER":
      // Password validation happens in the component; reducer only records the unlock
      return {
        ...state,
        unlockedFolders: new Set([...state.unlockedFolders, event.folderId]),
        failedAttempts: new Map([...state.failedAttempts, [event.folderId, 0]]),
      };

    case "RECORD_FAILED_ATTEMPT": {
      const prev = state.failedAttempts.get(event.folderId) ?? 0;
      return {
        ...state,
        failedAttempts: new Map([...state.failedAttempts, [event.folderId, prev + 1]]),
      };
    }

    case "NAVIGATE":
      return { ...state, knob1Rotation: state.knob1Rotation + KNOB1_STEP };

    case "PLAY_AUDIO":
      return state;

    case "STOP_AUDIO":
      return state;

    case "TOGGLE_INTERACTABLE": {
      const current = state.interactableStates.get(event.fileId) ?? false;
      return {
        ...state,
        interactableStates: new Map([
          ...state.interactableStates,
          [event.fileId, !current],
        ]),
      };
    }

    case "GRANT_JANITOR_ACCESS":
      return {
        ...state,
        janitorOverrides: new Map([
          ...state.janitorOverrides,
          [event.folderId, true],
        ]),
      };

    case "REVOKE_JANITOR_ACCESS":
      return {
        ...state,
        janitorOverrides: new Map([
          ...state.janitorOverrides,
          [event.folderId, false],
        ]),
      };

    case "TOGGLE_ROLEPLAY":
      return { ...state, roleplayMode: !state.roleplayMode };

    case "CHANGE_THEME":
      return { ...state, theme: event.palette };

    default:
      return state;
  }
}
