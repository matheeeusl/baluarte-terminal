# Baluarte Terminal UI

An immersive RPG interface inspired by RobCo terminals from Fallout 4. Players log in as individual characters and explore a fictional facility through password-locked folders containing audio logs, status readouts, emails, images, and interactable systems. A rogue AI — the **Janitor** — adds ambient unease through subtle screen flickers. Everyone shares the same terminal; there is no separate DM view.

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

| Phase           | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `BOOT`          | 1.5 s loading screen on every power-on                               |
| `GUEST`         | Default after boot — only public folders visible                     |
| `AUTHENTICATED` | A user folder was unlocked — `currentUser` set, personal content accessible |

### Authentication

There is no single admin password. Each player character has their own password-protected folder inside **Usuários**. Entering a folder with `isUserRoot` set dispatches `SET_CURRENT_USER`, which transitions the phase to `AUTHENTICATED` and sets `state.currentUser` to that user's ID.

The home screen has three options:

- **Usuários** — list of all player characters, each behind their own password
- **Público** — public presentation text, no login required
- **Configurações** — theme palette selection

### Navigation

`useFileSystem` owns a `pathStack` (e.g. `["home", "usuarios", "user-kelvin"]`). `Terminal` is the single caller — it passes the result as props to `HomeScreen` and `FolderView`.

### Janitor System

Each `Folder` has a `janitorAccess: boolean` flag. `useJanitorActive` walks from root to the current folder — if any folder on that path has `janitorAccess: true` (or a player override), the Janitor is active. Effects: random screen flicker every 1–2 minutes + CRT hum sound.

---

## Data Model

```typescript
// All node types share these base fields
interface BaseNode {
  id: string;
  name: string;
  visibleTo?: string[];   // if non-empty, only listed user IDs can see this node
  password?: string | null; // requires password before entering/activating/reading
}

interface Folder extends BaseNode {
  type: "folder";
  password: string | null; // null = open
  janitorAccess: boolean;
  isUserRoot?: string;     // user ID this folder logs in as
  children: FileNode[];
}

interface AudioFile extends BaseNode {
  type: "audio";
  src: string;
  duration: number;        // seconds
  transcript?: string;
}

interface InteractableFile extends BaseNode {
  type: "interactable";
  label: string;
  activeLabel: string;
  inactiveLabel: string;
  defaultState: boolean;
  oneWay?: boolean;        // cannot be deactivated once active
  activateAudio?: string;  // src path — auto-plays when toggled false → true
}

interface StatusFile extends BaseNode {
  type: "status";
  text: string;            // whitespace-pre-wrap
}

interface EmailFile extends BaseNode {
  type: "email";
  text: string;            // email body
  attachment?: AudioFile;  // shown as clickable button below the text
}

interface ImageFile extends BaseNode {
  type: "image";
  src: string;
  alt?: string;
  caption?: string;
}

interface JanitorControlFile extends BaseNode {
  type: "janitor-control";
}
```

> **Access rules**
>
> - `visibleTo: ["userId"]` → node hidden from everyone except listed users
> - `password: string` → visible to everyone, requires password before interacting
> - `isUserRoot: "userId"` → entering this folder (after password) logs in as that user
> - After 3 failed folder-unlock attempts the input locks for 5 seconds

---

## Users

Users are defined in `src/data/users.ts`. Each has an `id`, optional `displayId` (shown in StatusBlock), `name`, `title`, `password`, and optional `parentId` (hierarchy, structural only).

Folder structure mirrors hierarchy: subordinates are nested inside their superior's folder.

```
Usuários/
├── Big K (Kelvin) — Chefe de Sistemas Cinéticos
│   ├── Filipe — Supervisor de Atuadores e Hidráulica
│   └── Dom J. (Juan) — Auxiliar de Calibração de Precisão
├── Dona L. (Luiza) — Chefe de Processamento de Dados
│   └── Cláudio — Administrador de Redes e Conectividade
├── Dr. T. (Thiago) — Chefe de Capital Humano
├── Ryzé — Procurador de Acordos e Vínculos Inquebráveis
│   └── Arquiteto R. (Ramon) — Arquiteto de Sintaxe Lógica
└── Guardião
```

Each user folder contains: **Emails**, **Whatsapp**, **Setores**.

---

## Adding Campaign Content

The file tree is split into per-section files. Each section is a self-contained `Folder`.

### Add a new area inside a user folder

1. Create `src/data/sections/nova-area.ts`:

```typescript
import type { Folder } from "@/types";

export const novaArea: Folder = {
  type: "folder",
  id: "nova-area",
  name: "Nova Área",
  password: null,
  janitorAccess: false,
  children: [],
};
```

2. Add it to the appropriate user's `children` in `src/data/sections/usuarios.ts`.

### Restrict a node to specific users

```typescript
{
  type: "email",
  id: "email-secreto",
  name: "Assunto Secreto",
  text: "...",
  visibleTo: ["kelvin", "luiza"],
}
```

### Add long text

Add a named export to `src/data/texts.ts` and import it in the section file.

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

---

## Project Structure

```
src/
├── data/
│   ├── fileTree.ts          # Composer — imports sections, exports root Folder
│   ├── users.ts             # User registry (id, displayId, name, title, password)
│   ├── texts.ts             # All long text content (status, email bodies, etc.)
│   └── sections/            # One file per top-level area of the campaign
│       ├── usuarios.ts      # All user folders (makeUserFolder helper)
│       ├── publico.ts       # Public presentation folder
│       ├── emails.ts        # Shared emails content
│       ├── documentos.ts    # Indemnification documents
│       └── setores.ts       # Sector control folders
├── lib/
│   ├── tree.ts              # findFolder + pathToFolder
│   ├── audio.ts             # Howler init and interface sounds
│   ├── theme.ts             # Palette resolver, CSS var + favicon injector
│   └── format.ts            # Text formatting helpers
├── components/
│   ├── core/                # TerminalFrame, Terminal, CRTOverlay, Loading, Shutdown
│   ├── gameplay/            # HomeScreen, FolderView, AudioPlayer, JanitorAmbiance
│   └── ui/                  # MenuList, PasswordInput, StatusBlock, TerminalBrand,
│                            #   ActiveContent, EmailPanel, ImagePanel, FolderPasswordGate
├── context/                 # GameContext, GameReducer, NavigationContext
├── hooks/                   # useFileSystem, useFolderViewState, useProcessing,
│                            #   useJanitor, useKeyboard, useAudio
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

| Key         | Action                                                   |
| ----------- | -------------------------------------------------------- |
| `↑` / `↓`   | Navigate menu items (works even while typing password)   |
| `Enter`     | Select / confirm                                         |
| `Backspace` | Go back one level                                        |
| `Escape`    | Cancel password input                                    |

---

## Code Rules

- Functional components only
- `import type` for type-only imports
- Path alias `@/` → `src/`
- All code, comments, variables, and commits in English
- Run `pnpm lint && pnpm test` before committing
- Commit format: `feat:`, `fix:`, `perf:`, `test:`, `docs:`, `style:`
