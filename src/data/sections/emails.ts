import type { Folder } from "@/types";
import {
  TEXT_EMAIL_AUDIO,
  TEXT_EMAIL_VAZADO_1,
  TEXT_EMAIL_VAZADO_2,
  TEXT_EMAIL_VAZADO_3,
  TEXT_EMAIL_VAZADO_4,
} from "@/data/texts";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) {
  return `${BASE}${path}`;
}

export const emails: Folder = {
  type: "folder",
  id: "emails",
  name: "Emails",
  password: null,
  janitorAccess: true,
  adminOnly: false,
  children: [
    {
      type: "email",
      id: "emails-vazado-1",
      name: "🚀 Resultados reais! Aumente seu tamanho e potência hoje mesmo!",
      text: TEXT_EMAIL_VAZADO_1,
    },
    {
      type: "email",
      id: "emails-cafeteria",
      name: "Arquivo de áudio (Cafeteria)",
      text: TEXT_EMAIL_AUDIO,
      attachment: {
        type: "audio",
        id: "emails-cafeteria-audio",
        name: "Reproduzir Áudio",
        src: audio("/assets/audio/FCs2.wav"),
        duration: 95,
      },
      adminOnly: false,
    },
    {
      type: "email",
      id: "emails-vazado-2",
      name: "CALOTEIRO, ESTÁ DESTRUINDO O NEGÓCIO LOCAL!!! (Pedido #4409)",
      text: TEXT_EMAIL_VAZADO_2,
    },
    {
      type: "email",
      id: "emails-vazado-3",
      name: "Caiu um drone no Setor 04, novamente...",
      text: TEXT_EMAIL_VAZADO_3,
    },
    {
      type: "folder",
      id: "emails-pecas",
      name: "RE: Relatório de peças danificadas / Revisão de Orçamento Urgente",
      password: "Ks2J",
      janitorAccess: false,
      adminOnly: false,
      children: [
        {
          type: "email",
          id: "emails-pecas-relatorio",
          name: "RE: Relatório de peças danificadas / Revisão de Orçamento Urgente ",
          text: TEXT_EMAIL_VAZADO_4,
        },
      ],
    },
  ],
};
