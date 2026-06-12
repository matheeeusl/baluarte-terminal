---
name: design-system
description: Defines palettes, typography tokens, animation timings, CRT effects, the SVG terminal frame structure, and screen layout wireframes. Use when styling components, adjusting themes, or working with the terminal frame SVG and screen layout.
---

# Design System

## Palettes

The default palette is `green`. Players can switch palettes in the **Configurações** section on the home screen.

```typescript
type ThemePalette = "green" | "amber" | "white";

const PALETTES = {
  green: { bg: "#0a0a0a", fg: "#33ff33", accent: "#66ff66", muted: "#1a3a1a" },
  amber: { bg: "#0a0a0a", fg: "#ffb833", accent: "#ffd580", muted: "#3a2a0a" },
  white: { bg: "#0a0a0a", fg: "#e0e0e0", accent: "#ffffff", muted: "#2a2a2a" },
} as const;
```

## Typography

```css
--font-terminal: "Share Tech Mono", monospace;
--font-size-base: 16px;
--font-size-sm: 14px;
--font-size-lg: 20px;
--line-height: 1.6;
```

## Animation Timings

```css
--timing-typewriter: 40ms; /* Per character */
--timing-scanline: 8s;     /* Full scanline sweep */
--timing-flicker: 0.15s;   /* CRT flicker interval */
--timing-glitch: 100ms;    /* Janitor subtle screen flicker */
--timing-boot: 1500ms;     /* Boot loading screen */
--timing-lockout: 5000ms;  /* Failed password lockout */
```

## CRT Effects

Scanlines, flicker, and vignette are CSS-only. Janitor influence adds subtle screen flicker intensity (CSS animation), never corrupting readable text.

## Terminal Frame (SVG)

The terminal is an **SVG file used as an inline React component**. The SVG contains three key elements identified by ID:

| SVG ID         | Element          | Behavior                                                                    |
| -------------- | ---------------- | --------------------------------------------------------------------------- |
| `#screen-area` | Screen rectangle | Defines the screen bounds. Transparent — content shows through from behind. |
| `#knob1`       | Navigation knob  | Rotates clockwise on every `NAVIGATE` event.                                |
| `#knob2`       | Power knob       | Rotates clockwise on `POWER_ON` / `POWER_OFF`.                              |

The SVG frame renders **on top** (`z-index: 2`) with the screen area transparent. A regular React `div` sits **behind** it (`z-index: 1`), absolutely positioned to match `#screen-area` bounds.

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
