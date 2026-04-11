import type { Folder } from "@/types";
import { TEXT_EMAIL_VAZADO_2 } from "@/data/texts";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function images(path: string) {
  return `${BASE}${path}`;
}

export const mapa: Folder = {
  type: "folder",
  id: "mapa",
  name: "Mapa",
  password: "DEFINIR",
  janitorAccess: false,
  children: [
    {
      type: "image",
      id: "mapa-setores",
      name: "Mapa dos Setores",
      src: images("/assets/imagens/Mapa_1.png"),
      alt: "Mapa ilustrado dos setores da instalação",
      caption: TEXT_EMAIL_VAZADO_2,
    },
    {
      type: "image",
      id: "mapa-setores-janela",
      name: "Mapa dos Setores (com janela)",
      src: images("/assets/imagens/Mapa_2.png"),
      alt: "Mapa ilustrado dos setores da instalação, visto através de uma janela com grades",
    },
  ],
};
