import type { Folder } from "@/types";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) {
  return `${BASE}${path}`;
}

export const documentos: Folder = {
  type: "folder",
  id: "documentos",
  name: "Gravações",
  password: null,
  janitorAccess: true,
  children: [
    {
      type: "folder",
      id: "documentos-gravacoes-h17",
      name: "$h17",
      password: "DEFINIR",
      janitorAccess: false,
      children: [
        {
          type: "audio",
          id: "documentos-gravacoes-h17-audio",
          name: "Reproduzir Áudio",
          src: audio("/assets/audio/$h17.wav"),
          duration: 204,
        },
      ],
    },
    {
      type: "folder",
      id: "documentos-gravacoes-4dm1n",
      name: "4dm1n",
      password: null,
      janitorAccess: false,
      children: [
        {
          type: "audio",
          id: "documentos-gravacoes-4dm1n-audio",
          name: "Reproduzir Áudio",
          src: audio("/assets/audio/4dm1n.wav"),
          duration: 285,
        },
      ],
    },
    {
      type: "folder",
      id: "documentos-gravacoes-c4m1s4",
      name: "C4m1s4",
      password: "DEFINIR",
      janitorAccess: false,
      children: [
        {
          type: "audio",
          id: "documentos-gravacoes-c4m1s4-audio",
          name: "Reproduzir Áudio",
          src: audio("/assets/audio/C4m1s4.wav"),
          duration: 115,
        },
      ],
    },
    {
      type: "folder",
      id: "documentos-gravacoes-gh0s7",
      name: "Gh0s7",
      password: "DEFINIR",
      janitorAccess: false,
      children: [
        {
          type: "audio",
          id: "documentos-gravacoes-gh0s7-audio",
          name: "Reproduzir Áudio",
          src: audio("/assets/audio/Gh0s7.wav"),
          duration: 146,
        },
      ],
    },
    {
      type: "folder",
      id: "documentos-gravacoes-r0c",
      name: "R0c%",
      password: null,
      janitorAccess: false,
      children: [
        {
          type: "audio",
          id: "documentos-gravacoes-r0c-audio",
          name: "Reproduzir Áudio",
          src: audio("/assets/audio/r0cK.wav"),
          duration: 129,
        },
      ],
    },
  ],
};
