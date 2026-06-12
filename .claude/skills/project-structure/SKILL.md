---
name: project-structure
description: Maps every directory and file in the src/ tree with one-line descriptions of purpose. Use when locating where to place new files, understanding component responsibilities, or navigating the codebase.
---

# Project Structure

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
