---
name: janitor
description: Defines the Janitor AI behavior rules — binary ambient effect per folder, janitorAccess flag, useJanitor hook logic, status line strings, and what the Janitor is strictly forbidden from doing. Use when implementing or modifying Janitor-related features, the JanitorAmbiance component, or janitorAccess data.
---

# Janitor Behavior

The Janitor is a **binary ambient effect** per folder. Each `Folder` has a `janitorAccess: boolean` flag. The `useJanitor` hook traverses the file tree — if **any** folder has `janitorAccess: true`, the ambient effects activate.

| Any folder with `janitorAccess`? | Status line        | Ambient Effects                                            |
| -------------------------------- | ------------------ | ---------------------------------------------------------- |
| No                               | "Zelador: Contido" | None. Clean terminal.                                      |
| Yes                              | "Zelador: Ativo"   | Screen flicker every 1–2 min (randomized). Low static hum. |

The Janitor **never** corrupts readable text, blocks navigation, changes the palette, or distorts audio.
