import type { Folder } from "@/types";
import { apresentacao } from "./sections/apresentacao";
import { mapa } from "./sections/mapa";
import { emails } from "./sections/emails";
import { documentos } from "./sections/documentos";
import { setores } from "./sections/setores";

// Root file tree — add new top-level sections in src/data/sections/.
// Each section file is self-contained: defines its folder tree and imports its own texts.
export const fileTree: Folder = {
  type: "folder",
  id: "guest",
  name: "Guest",
  password: null,
  janitorAccess: false,
  adminOnly: false,
  children: [
    apresentacao,
    mapa,
    emails,
    documentos,
    setores,
    {
      type: "status",
      id: "admin-log",
      name: "Admin Log",
      adminOnly: true,
      text: "All laboratory systems nominal.\nAir filtration: ONLINE\nContainment: SECURE",
    },
  ],
};
