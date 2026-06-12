---
name: architecture
description: Defines the FSM architecture, game phases, authentication flow, event catalog, and GameState shape for the Fallout Terminal UI. Use when implementing or modifying game state transitions, reducer cases, or authentication logic.
---

# Architecture: Event-Driven Finite State Machine

The entire game is driven by a **reducer-based state machine** inside `GameContext`. Every player action dispatches a typed event, the reducer computes the next state, and the UI reacts. This makes every transition deterministic and trivially testable.

## Game States

```
BOOT → GUEST → AUTHENTICATED
```

| State           | Description                                                                     | UI Behavior                                             |
| --------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `BOOT`          | Power-on sequence, fake loading screen (1.5s fixed).                            | CRT warm-up animation, boot sound, loading bar.         |
| `GUEST`         | Default after boot. Only public content visible.                                | Home screen shows Usuários, Público, Configurações.     |
| `AUTHENTICATED` | A user folder was unlocked. `currentUser` is set, personal content accessible. | StatusBlock shows the user's `displayId` or name.       |

## Authentication

There is no single admin password. Each player character has a personal password-protected folder. Entering it dispatches `SET_CURRENT_USER`, which sets `state.currentUser` and transitions to `AUTHENTICATED`. Power-off resets everything.

The **home screen** has three options:
- **Usuários** — list of all player characters, each password-locked
- **Público** — public presentation text, no login required
- **Configurações** — theme palette selection

## Event Catalog

```typescript
type GameEvent =
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
```

Every event maps to a reducer case. Every reducer case gets a unit test.

## GameState

```typescript
interface GameState {
  phase: "BOOT" | "GUEST" | "AUTHENTICATED";
  currentUser: string | null;               // ID of logged-in user, null = guest
  unlockedFolders: Set<string>;
  janitorOverrides: Map<string, boolean>;   // player-toggled Janitor access (folderId → granted)
  interactableStates: Map<string, boolean>;
  failedAttempts: Map<string, number>;
  roleplayMode: boolean;
  theme: ThemePalette;
  power: boolean;
  knob1Rotation: number;                    // degrees, incremented on every NAVIGATE
  knob2Rotation: number;                    // degrees, incremented on POWER_ON / POWER_OFF
}
```

> **Persistence:** In-memory only. Closing the tab resets everything to `BOOT`. No SessionStorage, no localStorage. Players re-enter passwords each session.
