import type { FileNode, Folder } from "@/types";
import { setores } from "./setores";
import { USERS } from "@/data/users";
import { emails } from "./emails";
import { documentos } from "./documentos";
import { NOTES } from "../rh-texts";
import { TEXT_DIRETRIZ_GUARDIAO } from "../texts";
import { RELATORIOS_GUARDIAO } from "../guardiao-texts";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) {
  return `${BASE}${path}`;
}

// Audio messages shared across users who need them
const audiosIndenizacao: Folder = {
  type: "folder",
  id: "audios-indenizacao",
  name: "Áudios para indenização",
  password: null,
  janitorAccess: false,
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
};

function makeUserFolder(
  userId: string,
  extraChildren: FileNode[] = [],
): Folder {
  const user = USERS.find((u) => u.id === userId);
  if (!user) throw new Error(`Unknown user id: ${userId}`);

  return {
    type: "folder",
    icon: "👤",
    id: `user-${userId}`,
    name: user.displayId ?? user.name,
    password: user.password,
    janitorAccess: false,
    isUserRoot: userId,
    children: [
      {
        type: "folder",
        id: `user-${userId}-emails`,
        name: "Emails",
        password: null,
        janitorAccess: false,
        displayEmail: user.email,
        children: [...emails.children],
      },
      setores,
      ...extraChildren,
    ],
  };
}

export const usuarios: Folder = {
  type: "folder",
  id: "usuarios",
  name: "Usuários",
  password: null,
  janitorAccess: false,
  children: [
    makeUserFolder("kelvin", [
      {
        type: "interactable",
        id: "permit-drones",
        name: "Permitir acesso aos drones",
        label: "Acesso aos Drones",
        activeLabel: "Acesso aos Drones [CONCEDIDO]",
        inactiveLabel: "Acesso aos Drones [NEGADO]",
        defaultState: false,
      },
      {
        type: "status",
        id: "kelvin-declaracao-publica",
        name: "Para o Auxiliar de Calibração de Precisão",
        text: "Que a distância entre as nossas paredes\njamais supere a distância entre os nossos corações.\n\nMeu equipamento principal sempre será você,\nDom J., minha calibração mais precisa.\n\n— Big K.",
      },
      audiosIndenizacao,
      documentos,
    ]),
    makeUserFolder("filipe"),
    makeUserFolder("juan", [
      {
        type: "interactable",
        id: "permit-drones",
        name: "Permitir acesso aos drones",
        label: "Acesso aos Drones",
        activeLabel: "Acesso aos Drones [CONCEDIDO]",
        inactiveLabel: "Acesso aos Drones [NEGADO]",
        defaultState: false,
      },
      {
        type: "status",
        id: "juan-declaracao-publica",
        name: "Para o Diretor de Automação",
        text: "Você é o sistema que nunca falha,\no motor que nunca para,\na única variável que eu não quero eliminar.\n\nBig K., minha equação favorita.\n\n— Dom J.",
      },
      {
        type: "status",
        id: "juan-poema-1",
        name: "Poema para o Big K.",
        text: "Ó Big K., meu amor e minha dor, \nEm teus sistemas me perdi, \nMas em teus braços me encontrei, \nMeu chefe, meu guia, meu rei.",
      },
      {
        type: "status",
        id: "juan-poema-2",
        name: "Poema para o Big K.",
        text: "Big K., minha luz e minha escuridão, \nEm teus códigos me enredei, \nMas em teus olhos me libertei, \nMeu chefe, meu mentor, meu rei.",
      },
    ]),
    makeUserFolder("luiza", [
      {
        type: "interactable",
        id: "user-luiza-permit-zelador",
        name: "Permitir acesso ao controle do zelador",
        label: "Acesso ao Controle do Zelador",
        activeLabel: "Acesso ao Controle do Zelador [CONCEDIDO]",
        inactiveLabel: "Acesso ao Controle do Zelador [NEGADO]",
        defaultState: false,
      },
      {
        type: "audio",
        id: "documentos-mensagens-filha-audio",
        name: "Audio do Claudio sobre o day off",
        src: audio("/assets/audio/whatsapp/filha.wav"),
        duration: 13,
      },
    ]),
    makeUserFolder("claudio", [
      {
        type: "status",
        id: "claudio-nota-desenho",
        name: "Nota",
        text: "Guardei o desenho da minha filha na mesa para dar inspiração para o trabalho.",
      },
      {
        type: "interactable",
        id: "claudio-gaveta",
        name: "Gaveta",
        label: "Gaveta",
        activeLabel: "Gaveta Liberada",
        inactiveLabel: "Gaveta",
        defaultState: false,
        oneWay: true,
        password: "2103",
      },
    ]),
    makeUserFolder("thiago", [
      {
        type: "status",
        id: "thiago-status-1",
        name: "Notas sobre o Big K.",
        text: NOTES.bigK,
      },
      {
        type: "status",
        id: "thiago-status-7",
        name: "Notas sobre o Filipe",
        text: NOTES.filipe,
      },
      {
        type: "status",
        id: "thiago-status-8",
        name: "Notas sobre o Juan",
        text: NOTES.juan,
      },
      {
        type: "status",
        id: "thiago-status-3",
        name: "Notas sobre a Dona L.",
        text: NOTES.donaL,
      },
      {
        type: "status",
        id: "thiago-status-9",
        name: "Notas sobre Cláudio",
        text: NOTES.claudio,
      },
      {
        type: "status",
        id: "thiago-status-5",
        name: "Notas sobre o Ryzé",
        text: NOTES.ryze,
      },
      {
        type: "status",
        id: "thiago-status-6",
        name: "Notas sobre o Ramon",
        text: NOTES.ramon,
      },
      {
        type: "status",
        id: "thiago-status-10",
        name: "Notas sobre [DESLIGADO]",
        text: NOTES.helio,
      },
      {
        type: "status",
        id: "thiago-status-2",
        name: "Notas sobre ████████",
        text: NOTES.guardiao,
      },
    ]),
    makeUserFolder("ryze", [
      {
        type: "interactable",
        id: "ryze-cofre",
        name: "Cofre",
        label: "Cofre",
        activeLabel: "Cofre Liberado",
        inactiveLabel: "Cofre",
        defaultState: false,
        oneWay: true,
      },
    ]),
    makeUserFolder("ramon", [
      {
        type: "interactable",
        id: "user-ramon-permit-runas",
        name: "Permitir acesso ao controle das runas",
        label: "Acesso ao Controle das Runas",
        activeLabel: "Acesso ao Controle das Runas [CONCEDIDO]",
        inactiveLabel: "Acesso ao Controle das Runas [NEGADO]",
        defaultState: false,
      },
      {
        type: "interactable",
        id: "ramon-cofre",
        name: "Cofre",
        label: "Cofre",
        activeLabel: "Cofre Liberado",
        inactiveLabel: "Cofre",
        defaultState: false,
        oneWay: true,
        password: "caixinha",
      },
    ]),
    makeUserFolder("guardiao", [
      {
        type: "folder",
        id: "relatorios-guardiao",
        name: "Relatórios",
        janitorAccess: false,
        password: null,
        children: RELATORIOS_GUARDIAO,
      },
      {
        type: "status",
        id: "diretriz-guardiao",
        name: "Diretrizes do Guardião",
        text: TEXT_DIRETRIZ_GUARDIAO,
      },
    ]),
  ],
};
