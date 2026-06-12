import type { Folder } from "@/types";
import { TEXT_PRESENTATION_WELCOME } from "@/data/texts";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function images(path: string) {
  return `${BASE}${path}`;
}

export const publico: Folder = {
  type: "folder",
  id: "publico",
  name: "Público",
  password: null,
  janitorAccess: true,
  children: [
    {
      type: "status",
      id: "publico-apresentacao",
      name: "Apresentação",
      text: TEXT_PRESENTATION_WELCOME,
    },
    {
      type: "image",
      id: "publico-mapa",
      name: "Mapa do Complexo",
      src: images("/assets/imagens/Mapa.png"),
      alt: "Mapa ilustrado dos setores da instalação",
    },
  ],
};
