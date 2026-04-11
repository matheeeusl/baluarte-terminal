import type { Folder } from "@/types";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) {
  return `${BASE}${path}`;
}

export const documentos: Folder = {
  type: "folder",
  id: "documentos",
  name: "Documentos para idenização",
  password: null,
  janitorAccess: true,
  children: [
    {
      type: "folder",
      id: "documentos-mensagens",
      name: "Mensagens",
      password: null,
      janitorAccess: true,
      children: [
        {
          type: "folder",
          id: "documentos-mensagens-culpado",
          name: "Acho que sei quem foi o Culpado",
          password: "DEFINIR",
          janitorAccess: false,
          children: [
            {
              type: "audio",
              id: "documentos-mensagens-culpado-audio",
              name: "Reproduzir Áudio",
              src: audio("/assets/audio/whatsapp/culpado.wav"),
              duration: 39,
            },
          ],
        },
        {
          type: "folder",
          id: "documentos-mensagens-tarde",
          name: "Chegando Tarde",
          password: "DEFINIR",
          janitorAccess: false,
          children: [
            {
              type: "audio",
              id: "documentos-mensagens-tarde-audio",
              name: "Reproduzir Áudio",
              src: audio("/assets/audio/whatsapp/tarde.wav"),
              duration: 56,
            },
          ],
        },
        {
          type: "folder",
          id: "documentos-mensagens-churras",
          name: "Churras",
          password: "DEFINIR",
          janitorAccess: false,
          children: [
            {
              type: "audio",
              id: "documentos-mensagens-churras-audio",
              name: "Reproduzir Áudio",
              src: audio("/assets/audio/whatsapp/churras.wav"),
              duration: 33,
            },
          ],
        },
        {
          type: "folder",
          id: "documentos-mensagens-filha",
          name: "Minha Filha",
          password: null,
          janitorAccess: false,
          children: [
            {
              type: "audio",
              id: "documentos-mensagens-filha-audio",
              name: "Reproduzir Áudio",
              src: audio("/assets/audio/whatsapp/filha.wav"),
              duration: 13,
            },
          ],
        },
        {
          type: "folder",
          id: "documentos-mensagens-pesames",
          name: "Pêsames",
          password: "DEFINIR",
          janitorAccess: false,
          children: [
            {
              type: "audio",
              id: "documentos-mensagens-pesames-audio",
              name: "Reproduzir Áudio",
              src: audio("/assets/audio/whatsapp/pesames.wav"),
              duration: 26,
            },
          ],
        },
        {
          type: "folder",
          id: "documentos-mensagens-preguicoso",
          name: "Preguiçoso",
          password: null,
          janitorAccess: false,
          children: [
            {
              type: "audio",
              id: "documentos-mensagens-preguicoso-audio",
              name: "Reproduzir Áudio",
              src: audio("/assets/audio/whatsapp/preguicoso.wav"),
              duration: 16,
            },
          ],
        },
        {
          type: "folder",
          id: "documentos-mensagens-review",
          name: "Review",
          password: null,
          janitorAccess: false,
          children: [
            {
              type: "audio",
              id: "documentos-mensagens-review-audio",
              name: "Reproduzir Áudio",
              src: audio("/assets/audio/whatsapp/review.wav"),
              duration: 14,
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      id: "documentos-gravacoes",
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
    },
  ],
};
