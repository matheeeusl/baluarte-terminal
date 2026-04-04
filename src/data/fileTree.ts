import type { Folder } from "@/types";
import { TEXT_PRESENTATION_WELCOME } from "@/data/texts";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) {
  return `${BASE}${path}`;
}

// Root file tree — populate as the campaign is designed.
// Each folder can contain subfolders, audio files, interactables, and status files.
// adminOnly: true → invisible to guests, visible only after admin login.
export const fileTree: Folder = {
  type: "folder",
  id: "guest",
  name: "Guest",
  password: null,
  janitorAccess: false,
  adminOnly: false,
  children: [
    {
      type: "folder",
      id: "presentation",
      name: "Apresentação",
      password: null,
      janitorAccess: false,
      adminOnly: false,
      children: [
        {
          type: "status",
          id: "presentation-welcome",
          name: "Bem-vindo ao Terminal v3",
          text: TEXT_PRESENTATION_WELCOME,
        },
      ],
    },
    {
      type: "folder",
      id: "map",
      name: "Mapa",
      password: null,
      janitorAccess: false,
      adminOnly: false,
      children: [],
    },
    {
      type: "folder",
      id: "audio-files",
      name: "Arquivos de Áudio",
      password: null,
      janitorAccess: false,
      adminOnly: false,
      children: [
        // --- SUBPASTA: MESSAGES ---
        {
          type: "folder",
          id: "messages",
          name: "Mensagens",
          password: null, // Sem senha
          janitorAccess: false,
          adminOnly: false,
          children: [
            {
              type: "folder",
              id: "folder-msg-culpado",
              name: "Acho que sei quem foi o Culpado",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-culpado",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/culpado.wav"),
                  duration: 39,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-tarde",
              name: "Chegando Tarde",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-tarde",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/tarde.wav"),
                  duration: 56,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-churras",
              name: "Churras",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-churras",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/churras.wav"),
                  duration: 33,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-filha",
              name: "Minha Filha",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-filha",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/filha.wav"),
                  duration: 13,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-pesames",
              name: "Pêsames",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-pesames",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/pesames.wav"),
                  duration: 26,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-preguicoso",
              name: "Preguiçoso",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-preguicoso",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/preguicoso.wav"),
                  duration: 16,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-review",
              name: "Review",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-review",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/review.wav"),
                  duration: 14,
                },
              ],
            },
          ],
        },
        // --- SUBPASTA: RECORDED ---
        {
          type: "folder",
          id: "recorded",
          name: "Gravações",
          password: null, // Sem senha
          janitorAccess: false,
          adminOnly: false,
          children: [
            {
              type: "folder",
              id: "folder-rec-h17",
              name: "$h17",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-h17",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/$h17.wav"),
                  duration: 204,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-rec-4dm1n",
              name: "4dm1n",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-4dm1n",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/4dm1n.wav"),
                  duration: 285,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-rec-c4m1s4",
              name: "C4m1s4",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-c4m1s4",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/C4m1s4.wav"),
                  duration: 115,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-rec-fcs2",
              name: "FCs2",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-fcs2",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/FCs2.wav"),
                  duration: 95,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-rec-gh0s7",
              name: "Gh0s7",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-gh0s7",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/Gh0s7.wav"),
                  duration: 146,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-rec-r0c",
              name: "R0c%",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-r0c",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/r0cK.wav"),
                  duration: 129,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      id: "setores",
      name: "Setores",
      password: "DEFINIR",
      janitorAccess: false,
      adminOnly: true,
      children: [
        {
          type: "folder",
          id: "setor-1",
          name: "Setor 1",
          password: null,
          janitorAccess: false,
          adminOnly: true,
          children: [],
        },
        {
          type: "folder",
          id: "setor-2",
          name: "Setor 2",
          password: null,
          janitorAccess: false,
          adminOnly: true,
          children: [],
        },
        {
          type: "folder",
          id: "setor-3",
          name: "Setor 3",
          password: null,
          janitorAccess: false,
          adminOnly: true,
          children: [],
        },
        {
          type: "folder",
          id: "setor-4",
          name: "Setor 4",
          password: null,
          janitorAccess: false,
          adminOnly: true,
          children: [],
        },
      ],
    },
    {
      type: "status",
      id: "admin_log",
      name: "Admin Log",
      adminOnly: true,
      text: "All laboratory systems nominal.\nAir filtration: ONLINE\nContainment: SECURE",
    },
  ],
};
