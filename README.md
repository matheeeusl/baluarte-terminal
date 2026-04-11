# Baluarte Terminal UI

An immersive RPG interface inspired by RobCo terminals from Fallout 4. Players explore a fictional facility through password-locked folders containing audio logs, status readouts, emails, images, and interactable systems. A rogue AI — the **Janitor** — adds ambient unease through subtle screen flickers. Everyone shares the same terminal; there is no separate DM view.

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
pnpm dev        # Dev server
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

### Navigation

`useFileSystem` owns a `pathStack` (e.g. `["home", "root", "setor1"]`). `Terminal` is the single caller — it passes the result as props to `HomeScreen` and `FolderView`.

### Janitor System

Each `Folder` has a `janitorAccess: boolean` flag. `useJanitorActive` walks from root to the current folder — if any folder on that path has `janitorAccess: true` (or a player override), the Janitor is active. Effects: random screen flicker every 1–2 minutes + CRT hum sound.

---

## Data Model

```typescript
type FileNode =
  | Folder
  | AudioFile
  | InteractableFile
  | StatusFile
  | EmailFile
  | ImageFile
  | JanitorControlFile;

interface Folder {
  type: "folder";
  id: string;
  name: string;
  password: string | null; // null = open, string = requires unlock
  janitorAccess: boolean;
  adminOnly: boolean;       // invisible to GUEST phase
  children: FileNode[];
}

interface AudioFile {
  type: "audio";
  id: string;
  name: string;
  src: string;              // path under /public
  duration: number;         // seconds
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
  oneWay?: boolean;         // cannot be deactivated once active
  activateAudio?: AudioFile; // auto-plays when toggled false → true
}

interface StatusFile {
  type: "status";
  id: string;
  name: string;
  text: string;             // whitespace-pre-wrap
  adminOnly?: boolean;
}

interface EmailFile {
  type: "email";
  id: string;
  name: string;             // subject line shown in menu
  text: string;             // email body
  adminOnly?: boolean;
  attachment?: AudioFile;   // shown as clickable button below the text
}

interface ImageFile {
  type: "image";
  id: string;
  name: string;
  src: string;              // path under /public
  alt?: string;
  caption?: string;         // text shown below the image
  adminOnly?: boolean;
}

interface JanitorControlFile {
  type: "janitor-control";
  id: string;
  name: string;
}
```

> **Access rules**
>
> - `adminOnly: true` → hidden from guests, visible after admin login
> - `password: string` → visible to everyone, requires unlock
> - After 3 failed attempts the input locks for 5 seconds; attempts are tracked per folder

---

## Adding Campaign Content

The file tree is split into per-section files. Each section is a self-contained `Folder`.

### Add a new area

1. Create `src/data/sections/nova-area.ts`:

```typescript
import type { Folder } from "@/types";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) { return `${BASE}${path}`; }

export const novaArea: Folder = {
  type: "folder",
  id: "nova-area",
  name: "Nova Área",
  password: "SENHA",     // null = open
  janitorAccess: false,
  adminOnly: false,
  children: [],
};
```

2. Import and register it in `src/data/fileTree.ts`:

```typescript
import { novaArea } from "./sections/nova-area";

export const fileTree: Folder = {
  ...
  children: [..., novaArea],
};
```

### Add long text

Add a named export to `src/data/texts.ts` and import it in the section file. Never put multi-line strings inline in section files.

---

## Audio

All audio files live in `public/assets/audio/`.

| Category             | Location                         |
| -------------------- | -------------------------------- |
| Interface sounds     | `public/assets/audio/interface/` |
| Narrative audio logs | `public/assets/audio/`           |

---

## Themes

Selectable in the Settings screen before entering the terminal.

| Palette | Foreground | Accent    |
| ------- | ---------- | --------- |
| `green` | `#33ff33`  | `#66ff66` |
| `amber` | `#ffb833`  | `#ffd580` |
| `white` | `#e0e0e0`  | `#ffffff` |

Changing the theme also updates the favicon and the logo in the terminal header.

---

## Project Structure

```
src/
├── data/
│   ├── fileTree.ts          # Composer — imports sections, exports root Folder
│   ├── texts.ts             # All long text content (status, email bodies, etc.)
│   └── sections/            # One file per top-level area of the campaign
│       ├── apresentacao.ts
│       ├── mapa.ts
│       ├── emails.ts
│       ├── documentos.ts
│       └── setores.ts
├── lib/
│   ├── tree.ts              # findFolder + pathToFolder (shared utilities)
│   ├── audio.ts             # Howler init and interface sounds
│   ├── theme.ts             # Palette resolver, CSS var + favicon injector
│   └── format.ts            # Text formatting helpers
├── components/
│   ├── core/                # TerminalFrame, Terminal, CRTOverlay, Loading, Shutdown
│   ├── gameplay/            # HomeScreen, FolderView, AudioPlayer, JanitorAmbiance
│   └── ui/                  # MenuList, PasswordInput, StatusBlock, TerminalBrand
├── context/                 # GameContext, GameReducer, NavigationContext
├── hooks/                   # useFileSystem, useJanitor, useKeyboard, useAudio
└── types/
    └── index.ts             # All interfaces and type unions

public/
├── assets/audio/
│   ├── interface/           # Interface sound effects
│   └── *.wav                # Narrative audio logs
└── assets/imagens/          # Images and favicons
```

---

## Keyboard Navigation

| Key       | Action                                           |
| --------- | ------------------------------------------------ |
| `↑` / `↓` | Navigate menu items (works even while typing password) |
| `Enter`   | Select / confirm                                 |
| `Backspace` | Go back one level                              |
| `Escape`  | Cancel password input                            |

---

## Code Rules

- Functional components only
- `import type` for type-only imports
- Path alias `@/` → `src/`
- All code, comments, variables, and commits in English
- Run `pnpm lint && pnpm test` before committing
- Commit format: `feat:`, `fix:`, `perf:`, `test:`, `docs:`, `style:`
