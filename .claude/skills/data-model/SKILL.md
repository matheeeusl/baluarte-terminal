---
name: data-model
description: Defines all FileNode types (Folder, AudioFile, InteractableFile, StatusFile, EmailFile, ImageFile, JanitorControlFile), the BaseNode interface, and the User interface. Use when adding new node types, modifying file tree data, or working with src/data/sections/.
---

# Data Model

## BaseNode

All file node types extend `BaseNode`:

```typescript
interface BaseNode {
  id: string;
  name: string;
  visibleTo?: string[];     // if non-empty, only listed user IDs can see this node
  password?: string | null; // requires password before entering/activating/reading
}
```

## FileNode

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

## Users

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
