import type { Folder } from "@/types";
import { usuarios } from "./sections/usuarios";
import { publico } from "./sections/publico";

// Root file tree — add new top-level sections in src/data/sections/.
// Each section file is self-contained: defines its folder tree and imports its own texts.
export const fileTree: Folder = {
  type: "folder",
  id: "guest",
  name: "Guest",
  password: null,
  janitorAccess: false,
  children: [usuarios, publico],
};
