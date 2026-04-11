import type { Folder } from "@/types";
import { TEXT_PRESENTATION_WELCOME } from "@/data/texts";

export const apresentacao: Folder = {
  type: "folder",
  id: "apresentacao",
  name: "Apresentação",
  password: null,
  janitorAccess: false,
  adminOnly: false,
  children: [
    {
      type: "status",
      id: "apresentacao-boas-vindas",
      name: "Bem-vindo ao Terminal v3",
      text: TEXT_PRESENTATION_WELCOME,
    },
  ],
};
