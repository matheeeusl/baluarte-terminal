# Fallout Terminal UI

> An immersive RPG interface inspired by RobCo terminals (Fallout 4).
> Players log in as individual characters and explore a fictional facility through password-locked folders containing audio logs, emails, images, and interactable systems.
> A rogue AI — the **Janitor** — adds ambient unease (subtle flickers, not text corruption).
> Everyone shares the same terminal — there is no separate DM view.

---

## Stack

| Layer           | Tool                                    |
| --------------- | --------------------------------------- |
| Framework       | React 18 (Vite)                         |
| Language        | TypeScript (strict mode, no `any`)      |
| Styling         | Tailwind CSS 4 (utility-first)          |
| State           | React Context + `useReducer` (FSM)      |
| Audio           | Howler.js                               |
| Testing         | Vitest + Testing Library (co-located)   |
| Animations      | CSS first → Framer Motion as fallback   |
| Font            | Share Tech Mono (monospace, serif-like) |
| Package Manager | pnpm                                    |
| Deploy          | GitHub Pages (static export)            |

---

## Commands

```bash
pnpm dev          # Dev server
pnpm build        # Production build (static)
pnpm lint         # ESLint
pnpm test         # Run all tests
pnpm test --watch # Watch mode
```

---

## Architecture: Event-Driven Finite State Machine

The entire game is driven by a **reducer-based state machine** inside `GameContext`. Every player action dispatches a typed event, the reducer computes the next state, and the UI reacts. This makes every transition deterministic and trivially testable.

### Game States

```
BOOT → GUEST → AUTHENTICATED
```

| State           | Description                                                                       | UI Behavior                                               |
| --------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `BOOT`          | Power-on sequence, fake loading screen (1.5s fixed).                              | CRT warm-up animation, boot sound, loading bar.           |
| `GUEST`         | Default after boot. Only public content visible.                                  | Home screen shows Usuários, Público, Configurações.       |
| `AUTHENTICATED` | A user folder was unlocked. `currentUser` is set, personal content accessible.   | StatusBlock shows the user's `displayId` or name.         |

### Authentication

There is no single admin password. Each player character has a personal password-protected folder. Entering it dispatches `SET_CURRENT_USER`, which sets `state.currentUser` and transitions to `AUTHENTICATED`. Power-off resets everything.

The **home screen** has three options:
- **Usuários** — list of all player characters, each password-locked
- **Público** — public presentation text, no login required
- **Configurações** — theme palette selection

### Event Catalog

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

---

## Data Model

### BaseNode

All file node types extend `BaseNode`:

```typescript
interface BaseNode {
  id: string;
  name: string;
  visibleTo?: string[];     // if non-empty, only listed user IDs can see this node
  password?: string | null; // requires password before entering/activating/reading
}
```

### FileNode

```typescript
type FileNode = Folder | AudioFile | InteractableFile | StatusFile | EmailFile | ImageFile | JanitorControlFile;

interface Folder extends BaseNode {
  type: "folder";
  password: string | null;  // null = open access
  janitorAccess: boolean;
  isUserRoot?: string;      // user ID this folder authenticates as (dispatches SET_CURRENT_USER on unlock)
  children: FileNode[];
}

interface AudioFile extends BaseNode {
  type: "audio";
  src: string;              // path under /public
  duration: number;         // seconds (for UI progress bar)
  transcript?: string;
}

interface InteractableFile extends BaseNode {
  type: "interactable";
  label: string;
  activeLabel: string;
  inactiveLabel: string;
  defaultState: boolean;
  oneWay?: boolean;         // cannot be deactivated once active
  activateAudio?: string;   // src path — auto-plays when toggled false → true
}

interface StatusFile extends BaseNode {
  type: "status";
  text: string;             // read-only, whitespace-pre-wrap
}

interface EmailFile extends BaseNode {
  type: "email";
  text: string;             // email body (supports \n line breaks)
  attachment?: AudioFile;   // shown as clickable button below the text
}

interface ImageFile extends BaseNode {
  type: "image";
  src: string;              // path under /public
  alt?: string;
  caption?: string;
}

interface JanitorControlFile extends BaseNode {
  type: "janitor-control";
}
```

> **Content note:** The file tree is split into per-section files under `src/data/sections/`. Each section exports a `Folder` and is imported by `fileTree.ts`. Long text content lives in `src/data/texts.ts`. To add a new area, create `src/data/sections/nova-area.ts` and add it to `fileTree.ts` or to a user folder in `usuarios.ts`.

### Users

Users are defined in `src/data/users.ts`:

```typescript
interface User {
  id: string;
  displayId?: string;  // shown in StatusBlock (e.g. "Big K")
  name: string;
  title: string;
  password: string;
  parentId?: string;   // hierarchy reference (structural only)
}
```

User folders live in `src/data/sections/usuarios.ts`. Each user folder has `isUserRoot: userId`. Subordinates are nested as `extraChildren` of their superior's folder.

### GameState

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

---

## Design Tokens

### Palettes

The default palette is `green`. Players can switch palettes in the **Configurações** section on the home screen.

```typescript
type ThemePalette = "green" | "amber" | "white";

const PALETTES = {
  green: { bg: "#0a0a0a", fg: "#33ff33", accent: "#66ff66", muted: "#1a3a1a" },
  amber: { bg: "#0a0a0a", fg: "#ffb833", accent: "#ffd580", muted: "#3a2a0a" },
  white: { bg: "#0a0a0a", fg: "#e0e0e0", accent: "#ffffff", muted: "#2a2a2a" },
} as const;
```

### Typography

```css
--font-terminal: "Share Tech Mono", monospace;
--font-size-base: 16px;
--font-size-sm: 14px;
--font-size-lg: 20px;
--line-height: 1.6;
```

### Animation Timings

```css
--timing-typewriter: 40ms; /* Per character */
--timing-scanline: 8s;     /* Full scanline sweep */
--timing-flicker: 0.15s;   /* CRT flicker interval */
--timing-glitch: 100ms;    /* Janitor subtle screen flicker */
--timing-boot: 1500ms;     /* Boot loading screen */
--timing-lockout: 5000ms;  /* Failed password lockout */
```

### CRT Effects

Scanlines, flicker, and vignette are CSS-only. Janitor influence adds subtle screen flicker intensity (CSS animation), never corrupting readable text.

---

## Terminal Frame (SVG)

The terminal is an **SVG file used as an inline React component**. The SVG contains three key elements identified by ID:

| SVG ID         | Element          | Behavior                                                                    |
| -------------- | ---------------- | --------------------------------------------------------------------------- |
| `#screen-area` | Screen rectangle | Defines the screen bounds. Transparent — content shows through from behind. |
| `#knob1`       | Navigation knob  | Rotates clockwise on every `NAVIGATE` event.                                |
| `#knob2`       | Power knob       | Rotates clockwise on `POWER_ON` / `POWER_OFF`.                              |

The SVG frame renders **on top** (`z-index: 2`) with the screen area transparent. A regular React `div` sits **behind** it (`z-index: 1`), absolutely positioned to match `#screen-area` bounds.

---

## Screen Layout

### Home Screen

```
┌──────────────────────────────────────┐
│  ██ ODS TERMLINK                    │
│                                      │
│  Bem-vindo a Unidade Baluarte 02...  │
│                                      │
│  Escolha uma opção:                  │
│  [▸ 👥 Usuários]                    │
│  [▸ 📋 Público]                     │
│  [▸ ⚙ Configurações]               │
└──────────────────────────────────────┘
```

### Terminal Screen (inside folders)

```
┌──────────────────────────────────────┐
│  ██ ODS TERMLINK                    │
│                                      │
│  Status: Online                      │
│  Usuário: Big K                      │
│  Zelador: [Contido / Ativo]          │
│  Local: /usuarios/user-kelvin        │
│                                      │
│  Comportas [FECHADAS]                │  ← Interactable status
│                                      │
│  Escolha uma opção:                  │
│  [▸ 📁 Emails]                      │
│  [▸ 📁 Whatsapp]                    │
│  [▸ 📁 Setores]                     │
│  [▸ ◄ Voltar]                       │
│                                      │
│  > _                                 │
└──────────────────────────────────────┘
```

---

## Janitor Behavior

The Janitor is a **binary ambient effect** per folder. Each `Folder` has a `janitorAccess: boolean` flag. The `useJanitor` hook traverses the file tree — if **any** folder has `janitorAccess: true`, the ambient effects activate.

| Any folder with `janitorAccess`? | Status line        | Ambient Effects                                             |
| -------------------------------- | ------------------ | ----------------------------------------------------------- |
| No                               | "Zelador: Contido" | None. Clean terminal.                                       |
| Yes                              | "Zelador: Ativo"   | Screen flicker every 1–2 min (randomized). Low static hum.  |

The Janitor **never** corrupts readable text, blocks navigation, changes the palette, or distorts audio.

---

## Project Structure

```
src/
├── assets/
│   ├── audio/                      # All audio files + sprite sheet
│   ├── images/                     # terminal-frame.svg
│   └── fonts/                      # Share Tech Mono
├── components/
│   ├── core/
│   │   ├── CRTOverlay.tsx          # Scanlines, flicker, vignette (CSS-only)
│   │   ├── TerminalFrame.tsx       # SVG wrapper, knob rotation
│   │   └── Loading.tsx             # Fake boot screen (timer-based)
│   ├── ui/
│   │   ├── MenuList.tsx            # [▸ Option] list with keyboard nav
│   │   ├── PasswordInput.tsx       # Masked input with attempt tracking
│   │   ├── StatusBlock.tsx         # Status / User / Janitor readout
│   │   ├── TerminalBrand.tsx       # Header brand text
│   │   ├── ActiveContent.tsx       # Bottom panel: status/email/image/audio
│   │   ├── EmailPanel.tsx          # Email display with optional audio attachment
│   │   ├── ImagePanel.tsx          # Image display with caption
│   │   └── FolderPasswordGate.tsx  # Folder unlock form (persistent via reducer)
│   └── gameplay/
│       ├── HomeScreen.tsx          # Boot landing: Usuários / Público / Configurações
│       ├── FolderView.tsx          # Main navigation and content display
│       ├── AudioPlayer.tsx         # Narrative audio log player
│       ├── JanitorAmbiance.tsx     # Subtle flicker/static overlay
│       └── SettingsScreen.tsx      # Theme palette picker
├── context/
│   ├── GameReducer.ts              # Pure reducer (FSM core, no React)
│   ├── GameReducer.test.ts         # Every transition = 1 test
│   └── GameContext.tsx             # Provider wrapping useReducer
├── data/
│   ├── fileTree.ts                 # Composer — imports sections, exports root Folder
│   ├── users.ts                    # User registry (id, displayId, name, title, password)
│   ├── texts.ts                    # All long text content
│   ├── labels.ts                   # All user-facing UI strings
│   └── sections/                   # One file per top-level folder area
│       ├── usuarios.ts             # All user folders + makeUserFolder helper
│       ├── publico.ts              # Public presentation folder
│       ├── emails.ts               # Shared emails content
│       ├── documentos.ts           # Indemnification documents
│       └── setores.ts              # Sector control folders
├── hooks/
│   ├── useFileSystem.ts            # Folder navigation (pathStack, canAccess)
│   ├── useFolderViewState.ts       # All local state for FolderView
│   ├── useProcessing.ts            # Loading delay helper for interactables
│   ├── useJanitor.ts               # Ambient flicker scheduler
│   ├── useKeyboard.ts              # Menu keyboard navigation
│   └── useAudio.ts                 # Howler wrapper (play, stop, volume)
├── lib/
│   ├── audio.ts                    # Howler init, sprite sheet loader
│   ├── theme.ts                    # Palette resolver, CSS var injector
│   ├── format.ts                   # Text formatting helpers
│   └── tree.ts                     # findFolder + pathToFolder
├── types/
│   └── index.ts                    # All interfaces and type unions
└── App.tsx                         # Root: GameContext + TerminalFrame + CRTOverlay
```

---

## Code Rules

- Functional components only, no class components.
- `import type` for type-only imports.
- Path alias `@/` → `src/`.
- PascalCase for components (`Terminal.tsx`), camelCase for utilities (`useAudio.ts`, `format.ts`).
- All code, comments, variables, commits, and filenames in English.

---

## TDD Rules (Mandatory)

1. **Test first.** Write the failing test, then implement. No exceptions.
2. **Co-located.** `Component.test.tsx` lives next to `Component.tsx`.
3. **Behavior over state.** Assert what the user sees or hears, not internal variables.
4. **Reducer tests are pure.** `GameReducer.test.ts` imports the reducer directly — no React, no providers, just `(state, event) → newState`.
5. **Mock Howler globally.** Tests never play real audio. Assert `play()` calls with correct sprite IDs.
6. **Timers are fake.** Use `vi.useFakeTimers()` for boot screens, lockouts, and Janitor scheduling.

---

## Keyboard & Navigation

| Key         | Action                |
| ----------- | --------------------- |
| `↑` / `↓`   | Navigate menu items   |
| `Enter`     | Select / confirm      |
| `Backspace` | Go back one level     |
| `Escape`    | Cancel password input |

Focus management: when a folder opens, focus moves to the first menu item. When going back, focus returns to the previously selected item.

---

## Responsiveness

Desktop-first. The monitor frame scales proportionally on smaller screens. Minimum supported width: `768px`.

---

## Error Handling

| Scenario                 | Behavior                                                      |
| ------------------------ | ------------------------------------------------------------- |
| Audio file fails to load | Silent fallback. Log warning to console. Game continues.      |
| Invalid password format  | Input is sanitized (alphanumeric only, max 20 chars).         |
| Unknown route / room ID  | Redirect to root folder with "FILE NOT FOUND" typewriter msg. |
| Howler not supported     | Show text-only mode. Audio controls hidden.                   |

---

## Git

- Commit messages in English, semantic format: `feat:`, `fix:`, `perf:`, `test:`, `docs:`, `style:`.
- One commit per logical change.
- Always run `pnpm lint && pnpm test` before committing.
- Branch strategy: `main` ← `feat/*`, `fix/*`.
