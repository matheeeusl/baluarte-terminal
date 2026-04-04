# Baluarte Terminal UI

An immersive RPG interface inspired by RobCo terminals from Fallout 4. Players explore a fictional facility through password-locked folders containing audio logs, status readouts, and interactable systems. A rogue AI — the **Janitor** — adds ambient unease through subtle screen flickers. Everyone shares the same terminal; there is no separate DM view.

---

## Stack

| Layer           | Tool                               |
| --------------- | ---------------------------------- |
| Framework       | React 18 (Vite)                    |
| Language        | TypeScript (strict)                |
| Styling         | Tailwind CSS 4                     |
| State           | React Context + `useReducer` (FSM) |
| Audio           | Howler.js                          |
| Testing         | Vitest + Testing Library           |
| Animations      | CSS-first → Framer Motion fallback |
| Font            | Share Tech Mono                    |
| Package Manager | pnpm                               |

## Commands

```bash
pnpm dev        # Dev server on port 3000
pnpm build      # Type-check + production build
pnpm lint       # ESLint
pnpm test       # Run all tests
```

---

## Architecture

### State Machine

All game logic lives in `GameReducer.ts` as a pure reducer. Every player action dispatches a typed event; the reducer computes the next state; the UI reacts.

```
BOOT → GUEST / AUTHENTICATED
```

| Phase           | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `BOOT`          | 1.5 s loading screen on every power-on                        |
| `GUEST`         | Default after boot — public folders only                      |
| `AUTHENTICATED` | Admin login — all folders visible, room passwords still apply |

**Events handled by the reducer:**

```typescript
type GameEvent =
  | { type: "POWER_ON" }
  | { type: "POWER_OFF" }
  | { type: "LOGIN_ADMIN"; password: string }
  | { type: "UNLOCK_FOLDER"; folderId: string; password: string }
  | { type: "NAVIGATE"; nodeId: string }
  | { type: "PLAY_AUDIO"; fileId: string }
  | { type: "STOP_AUDIO" }
  | { type: "TOGGLE_INTERACTABLE"; fileId: string }
  | { type: "GRANT_JANITOR_ACCESS"; folderId: string }
  | { type: "REVOKE_JANITOR_ACCESS"; folderId: string }
  | { type: "TOGGLE_ROLEPLAY" }
  | { type: "CHANGE_THEME"; palette: ThemePalette };
```

### Navigation

`useFileSystem` owns a `pathStack` (e.g. `["home", "root", "setor1"]`). `Terminal` is the single caller — it passes the result as props to `HomeScreen` and `FolderView` so there is always exactly one path stack instance.

### Janitor System

Each `Folder` has a `janitorAccess: boolean` flag. `useJanitorActive` walks from root to the **current folder** — if any folder on that path has `janitorAccess: true` (or a player override), the Janitor is active for that context only. Effects: random screen flicker every 1–2 minutes + CRT hum sound.

---

## Data Model

```typescript
type FileNode = Folder | AudioFile | InteractableFile | StatusFile;

interface Folder {
  type: "folder";
  id: string;
  name: string;
  password: string | null; // null = open, string = requires unlock
  janitorAccess: boolean;
  adminOnly: boolean; // invisible to GUEST phase
  children: FileNode[];
}

interface AudioFile {
  type: "audio";
  id: string;
  name: string;
  src: string; // path under /public
  duration: number; // seconds
  transcript?: string;
}

interface InteractableFile {
  type: "interactable";
  id: string;
  name: string;
  label: string;
  activeLabel: string;
  inactiveLabel: string;
  defaultState: boolean;
}

interface StatusFile {
  type: "status";
  id: string;
  name: string;
  text: string; // whitespace-pre-wrap
}
```

> **Access rules**
>
> - `adminOnly: true` → hidden from guests, visible after admin login
> - `password: string` → visible to everyone, requires unlock
> - After 3 failed attempts the input locks for 5 seconds

---

## Audio

All audio files live in `public/assets/audio/`.

| Category             | Location                         | Loading                     |
| -------------------- | -------------------------------- | --------------------------- |
| Interface sounds     | `public/assets/audio/interface/` | Lazy, cached Howl per sound |
| Narrative audio logs | `public/assets/audio/`           | On-demand via `AudioPlayer` |

**Interface sound triggers:**

| File                    | Trigger                                     |
| ----------------------- | ------------------------------------------- |
| `beep_startup.wav`      | Power-on                                    |
| `beep_off.wav`          | Power-off                                   |
| `mechanical-switch.wav` | Menu navigation, selection, password typing |
| `CRT_hum.wav`           | Janitor screen flicker event                |

To add a narrative audio log, place the file in `public/assets/audio/` and add an `AudioFile` node to `src/data/fileTree.ts`:

```typescript
{
  type: "audio",
  id: "my-log-01",
  name: "Audio Log — My Entry",
  src: "/assets/audio/my-log-01.wav",
  duration: 42,
}
```

---

## Adding Content

All game content is defined in **`src/data/fileTree.ts`**. The tree supports arbitrary nesting.

```typescript
// Public folder with a password
{
  type: "folder",
  id: "lab",
  name: "Laboratory",
  password: "SCIENCE",
  janitorAccess: false,
  adminOnly: false,
  children: [ /* FileNode[] */ ],
}

// Admin-only folder, no room password
{
  type: "folder",
  id: "admin-logs",
  name: "Admin Logs",
  password: null,
  janitorAccess: false,
  adminOnly: true,
  children: [ /* FileNode[] */ ],
}
```

---

## Themes

Selectable in the Settings screen (before entering the terminal).

| Palette | Foreground | Accent    |
| ------- | ---------- | --------- |
| `green` | `#33ff33`  | `#66ff66` |
| `amber` | `#ffb833`  | `#ffd580` |
| `white` | `#e0e0e0`  | `#ffffff` |

---

## Project Structure

```
src/
├── assets/images/          # terminal-frame.svg
├── components/
│   ├── core/               # TerminalFrame, Terminal, CRTOverlay, Loading
│   ├── gameplay/           # HomeScreen, FolderView, AudioPlayer,
│   │                       # JanitorAmbiance, SettingsScreen
│   └── ui/                 # MenuList, PasswordInput, StatusBlock, Typewriter
├── context/                # GameContext, GameReducer, NavigationContext
├── data/                   # fileTree.ts
├── hooks/                  # useFileSystem, useJanitor, useKeyboard, useAudio
├── lib/                    # audio.ts, theme.ts, format.ts
├── types/                  # index.ts
└── App.tsx

public/
└── assets/audio/
    ├── interface/          # Interface sound effects
    └── *.wav               # Narrative audio logs
```

---

## Keyboard Navigation

| Key         | Action                |
| ----------- | --------------------- |
| `↑` / `↓`   | Navigate menu items   |
| `Enter`     | Select / confirm      |
| `Backspace` | Go back one level     |
| `Escape`    | Cancel password input |

---

## Code Rules

- Functional components only
- `import type` for type-only imports
- Path alias `@/` → `src/`
- All code, comments, variables, and commits in English
- Run `pnpm lint && pnpm test` before committing
- Commit format: `feat:`, `fix:`, `perf:`, `test:`, `docs:`, `style:`
