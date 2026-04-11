import type { Folder } from "@/types";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) {
  return `${BASE}${path}`;
}

export const setores: Folder = {
  type: "folder",
  id: "setores",
  name: "Setores",
  password: "DEFINIR",
  janitorAccess: false,
  children: [
    {
      type: "folder",
      id: "setores-setor-1",
      name: "Setor 1",
      password: null,
      janitorAccess: false,
      children: [
        {
          type: "interactable",
          id: "setores-setor-1-prisao-comportas",
          name: "Controle das Comportas",
          label: "Comportas",
          activeLabel: "Comportas [ABERTAS]",
          inactiveLabel: "Comportas [FECHADAS]",
          defaultState: false,
          oneWay: true,
          activateAudio: audio("/assets/audio/interface/warning_sound.wav"),
        },
        {
          type: "janitor-control",
          id: "setores-setor-1-zelador",
          name: "Conceder acesso do zelador ao setor 1",
          visibleTo: ["luiza"],
          password: "DEFINIR",
        },
        {
          type: "interactable",
          label: "Drones de segurança - Setor 1",
          activeLabel: "Drones de segurança [ATIVOS]",
          inactiveLabel: "Drones de segurança [INATIVOS]",
          defaultState: true,
          id: "setores-setor-1-drones",
          name: "Drones de segurança",
          visibleTo: ["kelvin", "juan"],
        },
      ],
    },
    {
      type: "folder",
      id: "setores-setor-2",
      name: "Setor 2",
      password: null,
      janitorAccess: false,
      children: [
        {
          type: "interactable",
          label: "Drones de segurança - Setor 2",
          activeLabel: "Drones de segurança [ATIVOS]",
          inactiveLabel: "Drones de segurança [INATIVOS]",
          defaultState: true,
          id: "setores-setor-2-drones",
          name: "Drones de segurança",
          visibleTo: ["kelvin", "juan"],
        },
        {
          type: "janitor-control",
          id: "setores-setor-2-zelador",
          name: "Conceder acesso do zelador ao setor 2",
          visibleTo: ["luiza"],
        },
      ],
    },
    {
      type: "folder",
      id: "setores-setor-3",
      name: "Setor 3",
      password: null,
      janitorAccess: false,
      children: [
        {
          type: "interactable",
          label: "Drones de segurança - Setor 3",
          activeLabel: "Drones de segurança [ATIVOS]",
          inactiveLabel: "Drones de segurança [INATIVOS]",
          defaultState: true,
          id: "setores-setor-3-drones",
          name: "Drones de segurança",
          visibleTo: ["kelvin", "juan"],
        },
        {
          type: "janitor-control",
          id: "setores-setor-3-zelador",
          name: "Conceder acesso do zelador ao setor 3",
          visibleTo: ["luiza"],
        },
      ],
    },
    {
      type: "folder",
      id: "setores-setor-4",
      name: "Setor 4",
      password: null,
      janitorAccess: false,
      children: [
        {
          type: "interactable",
          label: "Drones de segurança - Setor 4",
          activeLabel: "Drones de segurança [ATIVOS]",
          inactiveLabel: "Drones de segurança [INATIVOS]",
          defaultState: true,
          id: "setores-setor-4-drones",
          name: "Drones de segurança",
          visibleTo: ["kelvin", "juan"],
        },
        {
          type: "janitor-control",
          id: "setores-setor-4-zelador",
          name: "Conceder acesso do zelador ao setor 4",
          visibleTo: ["luiza"],
        },
      ],
    },
  ],
};
