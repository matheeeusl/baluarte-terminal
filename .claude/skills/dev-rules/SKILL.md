---
name: dev-rules
description: Coding conventions, mandatory TDD rules, keyboard navigation spec, responsiveness constraints, error handling table, and git workflow for the Fallout Terminal UI. Use when writing any new code, tests, or commits.
---

# Dev Rules

## Code Rules

- Functional components only, no class components.
- `import type` for type-only imports.
- Path alias `@/` → `src/`.
- PascalCase for components (`Terminal.tsx`), camelCase for utilities (`useAudio.ts`, `format.ts`).
- All code, comments, variables, commits, and filenames in English.

## TDD Rules (Mandatory)

1. **Test first.** Write the failing test, then implement. No exceptions.
2. **Co-located.** `Component.test.tsx` lives next to `Component.tsx`.
3. **Behavior over state.** Assert what the user sees or hears, not internal variables.
4. **Reducer tests are pure.** `GameReducer.test.ts` imports the reducer directly — no React, no providers, just `(state, event) → newState`.
5. **Mock Howler globally.** Tests never play real audio. Assert `play()` calls with correct sprite IDs.
6. **Timers are fake.** Use `vi.useFakeTimers()` for boot screens, lockouts, and Janitor scheduling.

## Keyboard & Navigation

| Key         | Action                |
| ----------- | --------------------- |
| `↑` / `↓`   | Navigate menu items   |
| `Enter`     | Select / confirm      |
| `Backspace` | Go back one level     |
| `Escape`    | Cancel password input |

Focus management: when a folder opens, focus moves to the first menu item. When going back, focus returns to the previously selected item.

## Responsiveness

Desktop-first. The monitor frame scales proportionally on smaller screens. Minimum supported width: `768px`.

## Error Handling

| Scenario                 | Behavior                                                      |
| ------------------------ | ------------------------------------------------------------- |
| Audio file fails to load | Silent fallback. Log warning to console. Game continues.      |
| Invalid password format  | Input is sanitized (alphanumeric only, max 20 chars).         |
| Unknown route / room ID  | Redirect to root folder with "FILE NOT FOUND" typewriter msg. |
| Howler not supported     | Show text-only mode. Audio controls hidden.                   |

## Git

- Commit messages in English, semantic format: `feat:`, `fix:`, `perf:`, `test:`, `docs:`, `style:`.
- One commit per logical change.
- Always run `pnpm lint && pnpm test` before committing.
- Branch strategy: `main` ← `feat/*`, `fix/*`.
