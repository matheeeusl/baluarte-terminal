# Fallout Terminal UI

> An immersive RPG interface inspired by RobCo terminals (Fallout 4).
> Players explore locations through password-locked folders, each containing audio logs of fictional events.
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

| State           | Description                                                                | UI Behavior                                                |
| --------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `BOOT`          | Power-on sequence, fake loading screen (1.5s fixed).                       | CRT warm-up animation, boot sound, loading bar.            |
| `GUEST`         | Default after boot. Can browse public folders only.                        | Green-on-black theme. "Access Denied" on locked folders.   |
| `AUTHENTICATED` | Player entered the admin password. All folders visible, some still locked. | Status shows "Admin". Room-level passwords still required. |

The **Janitor** is not a game phase — it's a per-folder boolean flag read directly from the file tree (with player overrides). If any folder has `janitorAccess: true`, the ambient effects activate globally (screen flicker every 1–2 minutes, low static hum). The Janitor never corrupts text or blocks navigation.

### Event Catalog

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

Every event maps to a reducer case. Every reducer case gets a unit test.

---

## Data Model

### FileNode

The terminal mimics a **file system**. Everything is either a folder or a file. Folders can contain other folders and files. Files are audio logs, interactable actions, or status readouts.

```typescript
type FileNode = Folder | AudioFile | InteractableFile | StatusFile | EmailFile | ImageFile | JanitorControlFile;

interface Folder {
  type: "folder";
  id: string; // e.g. "laboratory"
  name: string; // Display name: "Laboratory"
  password: string | null; // null = open access
  janitorAccess: boolean; // Janitor can see this folder?
  adminOnly: boolean; // Hidden from guests if true
  children: FileNode[]; // Other folders and files inside
}

interface AudioFile {
  type: "audio";
  id: string; // e.g. "lab-recording-01"
  name: string; // "Recording 01 — Incident Report"
  src: string; // Path in /assets/audio/
  duration: number; // Seconds (for UI progress bar)
  transcript?: string; // Optional text fallback
}

interface InteractableFile {
  type: "interactable";
  id: string; // e.g. "lab-turrets"
  name: string; // "Turret Control"
  label: string; // Action label: "Disable Laboratory Turrets"
  activeLabel: string; // "Turrets: ACTIVE"
  inactiveLabel: string; // "Turrets: DISABLED"
  defaultState: boolean; // Initial state (true = active)
  oneWay?: boolean; // If true, cannot be deactivated once active
  activateAudio?: AudioFile; // Auto-plays when toggled false → true
}

interface StatusFile {
  type: "status";
  id: string;
  name: string; // "System Status"
  text: string; // Read-only text shown in terminal
  adminOnly?: boolean;
}

interface EmailFile {
  type: "email";
  id: string;
  name: string; // Subject line shown in menu
  text: string; // Email body (supports \n line breaks)
  adminOnly?: boolean;
  attachment?: AudioFile; // Optional audio attachment, shown as clickable button
}

interface ImageFile {
  type: "image";
  id: string;
  name: string;
  src: string; // Path in /assets/imagens/
  alt?: string; // Accessibility description
  caption?: string; // Optional text shown below the image
  adminOnly?: boolean;
}

interface JanitorControlFile {
  type: "janitor-control";
  id: string;
  name: string; // Label shown in menu
}
```

> **Content note:** The file tree is split into per-section files under `src/data/sections/`. Each section exports a `Folder` and is imported by `fileTree.ts`. Long text content lives in `src/data/texts.ts`. To add a new area, create `src/data/sections/nova-area.ts` and add it to `fileTree.ts`.

### PasswordGate

```typescript
interface PasswordGate {
  folderId: string;
  maxAttempts: 3; // After 3 fails → "Access Denied" audio + lockout
  lockoutDuration: number; // Seconds before retry is allowed
}
```

### GameState

```typescript
interface GameState {
  phase: "BOOT" | "GUEST" | "AUTHENTICATED";
  unlockedFolders: Set<string>;
  janitorOverrides: Map<string, boolean>; // Player-toggled Janitor access (folderId → granted)
  interactableStates: Map<string, boolean>;
  failedAttempts: Map<string, number>;
  roleplayMode: boolean;
  theme: ThemePalette;
  power: boolean;
  knob1Rotation: number; // Degrees, incremented on every NAVIGATE
  knob2Rotation: number; // Degrees, incremented on POWER_ON / POWER_OFF
}
```

> **Janitor resolution:** For any folder, effective `janitorAccess` = `janitorOverrides.get(folderId) ?? folder.janitorAccess` (default from file tree, overridden by player action).

> **Persistence:** In-memory only. Closing the tab resets everything to `BOOT`. No SessionStorage, no localStorage. Players re-enter passwords each session — the passwords themselves are shared knowledge among the group between sessions.

---

## Design Tokens

### Palettes

The default palette is `green`. Players can switch palettes in the **Settings** section on the home screen before entering the terminal.

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
--timing-scanline: 8s; /* Full scanline sweep */
--timing-flicker: 0.15s; /* CRT flicker interval */
--timing-glitch: 100ms; /* Janitor subtle screen flicker */
--timing-boot: 1500ms; /* Boot loading screen */
--timing-lockout: 5000ms; /* Failed password lockout */
```

### CRT Effects

Scanlines, flicker, and vignette are CSS-only. Janitor influence adds subtle screen flicker intensity (CSS animation), never corrupting readable text.

---

## Terminal Frame (SVG)

The terminal is an **SVG file used as an inline React component**. The SVG contains three key elements identified by ID:

| SVG ID         | Element          | Behavior                                                                    |
| -------------- | ---------------- | --------------------------------------------------------------------------- |
| `#screen-area` | Screen rectangle | Defines the screen bounds. Transparent — content shows through from behind. |
| `#knob1`       | Navigation knob  | Rotates clockwise on every `NAVIGATE` event (folder enter, menu move).      |
| `#knob2`       | Power knob       | Rotates clockwise on `POWER_ON` / `POWER_OFF`.                              |

### How it works

The SVG frame renders **on top** (`z-index: 2`) with the screen area transparent (`fill: none` or cut out). A regular React `div` sits **behind** it (`z-index: 1`), absolutely positioned to match the `#screen-area` bounds. All game content and CRTOverlay render inside this div. This avoids `<foreignObject>` entirely, which has known issues in Safari and makes it easier to use standard React rendering, Framer Motion, and CSS transitions inside the screen.

```css
/* Knob rotation via CSS custom properties */
#knob1 {
  transform-origin: center;
  transform: rotate(var(--knob1-rotation, 0deg));
  transition: transform 0.3s ease;
}

#knob2 {
  transform-origin: center;
  transform: rotate(var(--knob2-rotation, 0deg));
  transition: transform 0.3s ease;
}
```

### Knob behavior

**knob1 (navigation):** Every `NAVIGATE` event increments `--knob1-rotation` by a fixed step (e.g. 15deg). This includes entering a folder, selecting a menu item, and moving up/down in the menu. The knob only rotates clockwise (always positive increment).

**knob2 (power):** `POWER_ON` rotates `--knob2-rotation` clockwise by a fixed step (e.g. 90deg). `POWER_OFF` rotates it further clockwise by the same step. It does not rotate back — it's a cumulative turn like a physical dial.

### Asset location

The SVG file lives in `src/assets/images/terminal-frame.svg`. It is imported as a React component via Vite's `?react` SVG plugin or a custom wrapper.

---

## Screen Layout

### Home Screen

The first screen after boot. Renders inside `#screen-area`.

```
┌──────────────────────────────────────┐
│  ██ ROBCO INDUSTRIES (TM) TERMLINK  │
│                                      │
│  Welcome to [Facility Name]...       │
│                                      │
│  Choose an option:                   │
│  [▸ Admin Login]                     │
│  [▸ Guest Access]                    │
│  [▸ Settings]                        │
└──────────────────────────────────────┘
```

The **Settings** submenu allows players to change the terminal color palette (green, amber, white) and toggle roleplay mode. Settings are applied immediately and persist in memory for the session.

### Terminal Screen (inside folders)

```
┌──────────────────────────────────────┐
│  ██ ROBCO INDUSTRIES (TM) TERMLINK  │  ← Header (static)
│                                      │
│  Welcome to [Facility Name]...       │  ← Intro (typewriter)
│                                      │
│  Status: Online                      │  ← Status block
│  User: Admin / Guest                 │
│  Janitor: [Contained / Active]       │
│  Current: /laboratory                │
│                                      │
│  Turrets: ACTIVE                     │  ← Room status (optional)
│                                      │
│  Choose an option:                   │  ← Navigation
│  [▸ 📁 Turrets]                     │  ← Subfolder
│  [▸ 🔊 Recording 01 — Incident]    │  ← Audio file
│  [▸ 🔊 Recording 02 — Distress]    │  ← Audio file
│  [▸ ⚙ System Status]               │  ← Status file
│  [▸ Back]                            │
│                                      │
│  > _                                 │  ← Input prompt (passwords)
└──────────────────────────────────────┘
```

---

## Audio Strategy

### Loading

Audio loading is split into two tiers:

**Boot-critical (preloaded on `POWER_ON`):** Interface sounds loaded as a single Howler sprite sheet before the boot screen finishes. These are small files that must be instant.

```typescript
interface InterfaceSounds {
  boot: string; // Power-on chime
  shutdown: string; // Power-off sound
  keystroke: string; // Menu navigation click
  denied: string; // Access denied (3 failed attempts)
  granted: string; // Password accepted
  loading: string; // Crosswalk-style beeping during fake load
  welcome: string; // Windows-like startup chime after boot
  static: string; // Janitor background static hum (loop)
  voice: Record<string, string>; // Robotic voice per menu option
}
```

**Lazy-loaded (background, after boot):** Narrative audio logs are loaded in the background while the player navigates the home screen and menus. Each log is loaded on-demand or prefetched one folder ahead. If a player opens a folder before its audio is ready, a short loading indicator is shown.

```typescript
interface NarrativeLogs {
  logs: Record<string, string>; // Keyed by AudioFile.id, lazy-loaded
}
```

This keeps the boot fast regardless of how many audio logs the campaign has.

### Playback Rules

- **One narrative audio at a time.** Starting a new log stops the current one.
- **SFX can overlap** (keystroke + static is fine).
- **Volume control:** Master volume accessible from any screen. SFX and narrative have independent channels.
- **Robotic voice:** Each menu option triggers a short robotic TTS clip on hover/focus.
- **Janitor ambiance:** When any folder has `janitorAccess: true`, a low static hum fades in as background loop. No distortion on narrative audio.
- **Mocking:** In tests, Howler is globally mocked. Tests assert `play()` was called with the correct sprite ID, not that sound actually played.

---

## Janitor Behavior

The Janitor is a **binary ambient effect** per folder. Each `Folder` has a `janitorAccess: boolean` flag. The `useJanitor` hook traverses the file tree — if **any** folder has `janitorAccess: true`, the ambient effects activate.

| Any folder with `janitorAccess`? | Status line          | Ambient Effects                                            |
| -------------------------------- | -------------------- | ---------------------------------------------------------- |
| No                               | "Janitor: Contained" | None. Clean terminal.                                      |
| Yes                              | "Janitor: Active"    | Screen flicker every 1–2 min (randomized). Low static hum. |

Players can **grant or revoke** Janitor access to a folder if that folder exposes the option (shown as a menu item inside the folder, e.g. `[▸ Grant Janitor Access]` / `[▸ Revoke Janitor Access]`). This dispatches `GRANT_JANITOR_ACCESS` or `REVOKE_JANITOR_ACCESS`, which toggles `janitorAccess` on that folder in the game state.

The Janitor **never** corrupts readable text, blocks navigation, changes the palette, or distorts audio. It's purely cosmetic immersion.

---

## Project Structure

```
src/
├── assets/
│   ├── audio/                    # All audio files + sprite sheet
│   ├── images/                   # terminal-frame.svg (with #screen-area, #knob1, #knob2)
│   └── fonts/                    # Share Tech Mono
├── components/
│   ├── core/
│   │   ├── CRTOverlay.tsx        # Scanlines, flicker, vignette (CSS-only)
│   │   ├── CRTOverlay.test.tsx
│   │   ├── TerminalFrame.tsx      # SVG wrapper: renders SVG, manages knob refs, hosts <foreignObject>
│   │   ├── TerminalFrame.test.tsx
│   │   ├── Loading.tsx            # Fake boot screen (timer-based)
│   │   └── Loading.test.tsx
│   ├── ui/
│   │   ├── Folder.tsx             # Directory item (presentational)
│   │   ├── Folder.test.tsx
│   │   ├── MenuList.tsx           # [▸ Option] list with keyboard nav
│   │   ├── MenuList.test.tsx
│   │   ├── Typewriter.tsx         # Animated text renderer
│   │   ├── Typewriter.test.tsx
│   │   ├── PasswordInput.tsx      # Masked input with attempt tracking
│   │   ├── PasswordInput.test.tsx
│   │   ├── StatusBlock.tsx        # Status / User / Janitor readout
│   │   └── StatusBlock.test.tsx
│   └── gameplay/
│       ├── AudioPlayer.tsx        # Narrative audio log player
│       ├── AudioPlayer.test.tsx
│       ├── JanitorAmbiance.tsx    # Subtle flicker/static overlay (CSS-only)
│       └── JanitorAmbiance.test.tsx
├── context/
│   ├── GameReducer.ts             # Pure reducer (FSM core, no React)
│   ├── GameReducer.test.ts        # Every transition = 1 test
│   ├── GameContext.tsx             # Provider wrapping useReducer
│   └── GameContext.test.tsx
├── data/
│   ├── fileTree.ts                # Composer — imports all sections, exports root Folder
│   ├── texts.ts                   # All long text content (status, email bodies, etc.)
│   └── sections/                  # One file per top-level folder area
│       ├── apresentacao.ts        # Folder id: "presentation"
│       ├── mapa.ts                # Folder id: "map"
│       ├── emails.ts              # Folder id: "emails"
│       ├── documentos.ts          # Folder id: "audio-files" (indenização)
│       └── setores.ts             # Folder id: "setores"
├── hooks/
│   ├── useAudio.ts                # Howler wrapper (play, stop, volume)
│   ├── useAudio.test.ts
│   ├── useFileSystem.ts           # Folder navigation logic
│   ├── useFileSystem.test.ts
│   ├── useJanitor.ts              # Ambient flicker scheduler (CSS class toggler)
│   ├── useJanitor.test.ts
│   ├── useKeyboard.ts             # Menu keyboard navigation
│   └── useKeyboard.test.ts
├── lib/
│   ├── audio.ts                   # Howler init, sprite sheet loader
│   ├── theme.ts                   # Palette resolver, CSS var injector
│   ├── format.ts                  # Text formatting helpers
│   └── tree.ts                    # findFolder + pathToFolder (shared tree utilities)
├── types/
│   └── index.ts                   # All interfaces and type unions
└── App.tsx                        # Root: GameContext + TerminalFrame + CRTOverlay
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

The terminal is **fully keyboard-navigable** since the source material (Fallout 4) is keyboard-driven.

| Key         | Action                |
| ----------- | --------------------- |
| `↑` / `↓`   | Navigate menu items   |
| `Enter`     | Select / confirm      |
| `Backspace` | Go back one level     |
| `Escape`    | Cancel password input |

Focus management: when a folder opens, focus moves to the first menu item. When going back, focus returns to the previously selected item.

---

## Responsiveness

The terminal is designed for **desktop-first** (matching the in-game CRT aesthetic). On smaller screens, the monitor frame scales down proportionally, maintaining aspect ratio. There is no mobile-specific layout — the CRT monitor is the viewport.

Minimum supported width: `768px`. Below that, a fullscreen "rotate device" message is shown.

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
