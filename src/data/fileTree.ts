import type { Folder } from "@/types";
import {
  TEXT_EMAIL_AUDIO,
  TEXT_EMAIL_VAZADO_1,
  TEXT_EMAIL_VAZADO_2,
  TEXT_EMAIL_VAZADO_3,
  TEXT_EMAIL_VAZADO_4,
  TEXT_PRESENTATION_WELCOME,
} from "@/data/texts";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) {
  return `${BASE}${path}`;
}

function images(path: string) {
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
      password: "asdfasdfasdf",
      janitorAccess: false,
      adminOnly: false,
      children: [
        {
          type: "image",
          id: "map-setores",
          name: "Mapa dos Setores",
          src: images("/assets/imagens/Mapa_1.png"),
          alt: "Mapa ilustrado dos setores da instalação",
          caption: TEXT_EMAIL_VAZADO_2,
        },
        {
          type: "image",
          id: "map-setores-janela",
          name: "Mapa dos Setores (com janela)",
          src: images("/assets/imagens/Mapa_2.png"),
          alt: "Mapa ilustrado dos setores da instalação, visto através de uma janela com grades",
        },
      ],
    },
    {
      type: "folder",
      id: "emails",
      name: "Emails",
      password: null,
      janitorAccess: true,
      adminOnly: false,
      children: [
        {
          type: "email",
          id: "email-vazado1",
          name: "🚀 Resultados reais! Aumente seu tamanho e potência hoje mesmo!",
          text: TEXT_EMAIL_VAZADO_1,
        },
        {
          type: "email",
          id: "email-audio",
          name: "Arquivo de áudio (Cafeteria)",
          text: TEXT_EMAIL_AUDIO,
          attachment: {
            type: "audio",
            id: "audio-rec-fcs2",
            name: "Reproduzir Áudio",
            src: audio("/assets/audio/FCs2.wav"),
            duration: 95,
          },
          adminOnly: false,
        },
        {
          type: "email",
          id: "email-vazado-2",
          name: "CALOTEIRO, ESTÁ DESTRUINDO O NEGÓCIO LOCAL!!! (Pedido #4409)",
          text: TEXT_EMAIL_VAZADO_2,
        },
        {
          type: "email",
          id: "email-vazado-3",
          name: "Caiu um drone no Setor 04, novamente...",
          text: TEXT_EMAIL_VAZADO_3,
        },
        {
          type: "folder",
          id: "pecas-email",
          name: "RE: Relatório de peças danificadas / Revisão de Orçamento Urgente",
          password: "Ks2J",
          janitorAccess: false,
          adminOnly: false,
          children: [
            {
              type: "email",
              id: "email-pecas",
              name: "RE: Relatório de peças danificadas / Revisão de Orçamento Urgente ",
              text: TEXT_EMAIL_VAZADO_4,
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      id: "audio-files",
      name: "Documentos para idenização",
      password: null,
      janitorAccess: true,
      adminOnly: true,
      children: [
        {
          type: "folder",
          id: "messages",
          name: "Mensagens",
          password: null,
          janitorAccess: true,
          adminOnly: true,
          children: [
            {
              type: "folder",
              id: "folder-msg-culpado",
              name: "Acho que sei quem foi o Culpado",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: true,
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
              adminOnly: true,
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
              adminOnly: true,
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
              password: null,
              janitorAccess: false,
              adminOnly: true,
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
              adminOnly: true,
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
              password: null,
              janitorAccess: false,
              adminOnly: true,
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
              password: null,
              janitorAccess: false,
              adminOnly: true,
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
          password: null,
          janitorAccess: true,
          adminOnly: true,
          children: [
            {
              type: "folder",
              id: "folder-rec-h17",
              name: "$h17",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: true,
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
              password: null,
              janitorAccess: false,
              adminOnly: true,
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
              adminOnly: true,
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
              id: "folder-rec-gh0s7",
              name: "Gh0s7",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: true,
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
              password: null,
              janitorAccess: false,
              adminOnly: true,
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
          children: [
            {
              type: "folder",
              id: "setor-1-sala-1",
              name: "Setor 1 - Prisão",
              password: null,
              janitorAccess: false,
              adminOnly: true,
              children: [
                {
                  type: "interactable",
                  id: "lock-gates",
                  name: "Controle das Comportas",
                  label: "Comportas",
                  activeLabel: "Comportas [ABERTAS]",
                  inactiveLabel: "Comportas [FECHADAS]",
                  defaultState: false,
                  oneWay: true,
                  activateAudio: {
                    type: "audio",
                    id: "audio-lock-gates",
                    name: "Reproduzir Áudio",
                    src: audio("/assets/audio/interface/warning_sound.wav"),
                    duration: 12,
                  },
                },
                {
                  type: "janitor-control",
                  id: "janitor-control-prision",
                  name: "Conceder acesso do zelador à prisão",
                },
              ],
            },
          ],
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
