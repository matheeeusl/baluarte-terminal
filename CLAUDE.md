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

## Skills

Detailed reference docs live under `.claude/skills/`:

| Skill                                                            | When to use                                                        |
| ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| [architecture](.claude/skills/architecture/SKILL.md)            | FSM phases, auth flow, event catalog, GameState shape              |
| [data-model](.claude/skills/data-model/SKILL.md)                | FileNode types, BaseNode, User interface, file tree layout         |
| [design-system](.claude/skills/design-system/SKILL.md)          | Palettes, typography, animation timings, CRT effects, SVG frame    |
| [janitor](.claude/skills/janitor/SKILL.md)                      | Janitor ambient rules, janitorAccess flag, forbidden behaviors     |
| [project-structure](.claude/skills/project-structure/SKILL.md)  | Where every file lives and what it does                            |
| [dev-rules](.claude/skills/dev-rules/SKILL.md)                  | Code conventions, TDD rules, keyboard nav, error handling, git     |
