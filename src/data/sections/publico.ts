import type { Folder } from "@/types";
import { TEXT_PRESENTATION_WELCOME } from "@/data/texts";

export const publico: Folder = {
  type: "folder",
  id: "publico",
  name: "Público",
  password: null,
  janitorAccess: false,
  children: [
    {
      type: "status",
      id: "publico-apresentacao",
      name: "Apresentação",
      text: TEXT_PRESENTATION_WELCOME,
    },
  ],
};
