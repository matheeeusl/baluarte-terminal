import type { Folder } from "@/types";
import {
  TEXT_EMAIL_AUDIO,
  TEXT_EMAIL_BANHEIRO,
  TEXT_EMAIL_CAMERA_COPA,
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
      visibleTo: ["kelvin", "juan"],
      attachment: {
        type: "audio",
        id: "emails-cafeteria-audio",
        name: "Reproduzir Áudio",
        src: audio("/assets/audio/FCs2.wav"),
        duration: 95,
      },
    },
    {
      type: "email",
      id: "emails-vazado-2",
      name: "CALOTEIRO, ESTÁ DESTRUINDO O NEGÓCIO LOCAL!!! (Pedido #4409)",
      text: TEXT_EMAIL_VAZADO_2,
      visibleTo: ["kelvin", "juan"],
    },
    {
      type: "email",
      id: "emails-vazado-3",
      name: "Caiu um drone no Setor 04, novamente...",
      text: TEXT_EMAIL_VAZADO_3,
      visibleTo: ["kelvin", "juan"],
    },
    {
      type: "folder",
      id: "emails-pecas",
      name: "RE: Relatório de peças danificadas / Revisão de Orçamento Urgente",
      password: "DEFINIR",
      janitorAccess: false,
      visibleTo: ["kelvin", "juan"],
      children: [
        {
          type: "email",
          id: "emails-pecas-relatorio",
          name: "RE: Relatório de peças danificadas / Revisão de Orçamento Urgente ",
          text: TEXT_EMAIL_VAZADO_4,
        },
      ],
    },
    {
      type: "email",
      id: "emails-banheiro",
      name: "Comunicado: Incidente nos Banheiros da Unidade",
      text: TEXT_EMAIL_BANHEIRO,
    },
    {
      type: "email",
      id: "emails-camera-copa",
      name: "Aviso anônimo",
      text: TEXT_EMAIL_CAMERA_COPA,
      visibleTo: ["thiago"],
    },
  ],
};
