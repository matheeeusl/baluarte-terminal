import type { Folder, InteractableFile, JanitorControlFile } from "@/types";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) {
  return `${BASE}${path}`;
}

function makeSetor(num: number): Folder {
  const id = `setores-setor-${num}`;
  const drones: InteractableFile = {
    type: "interactable",
    id: `${id}-drones`,
    name: "Drones de segurança",
    label: `Drones de segurança - Setor ${num}`,
    activeLabel: "Drones de segurança [ATIVOS]",
    inactiveLabel: "Drones de segurança [INATIVOS]",
    defaultState: true,
    visibleTo: ["kelvin", "juan"],
  };
  const zelador: JanitorControlFile = {
    type: "janitor-control",
    id: `${id}-zelador`,
    name: `Conceder acesso do zelador ao setor ${num}`,
    visibleTo: ["luiza"],
  };
  const runaX: InteractableFile = {
    type: "interactable",
    id: `${id}-runa-x`,
    name: "Runa X",
    label: `Runa X - Setor ${num}`,
    activeLabel: "Runa X [ATIVA]",
    inactiveLabel: "Runa X [INATIVA]",
    defaultState: true,
    visibleTo: ["ramon"],
  };

  return {
    type: "folder",
    id,
    name: `Setor ${num}`,
    password: null,
    janitorAccess: false,
    children: [drones, zelador, runaX],
  };
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
          id: "setores-setor-1-drones",
          name: "Drones de segurança",
          label: "Drones de segurança - Setor 1",
          activeLabel: "Drones de segurança [ATIVOS]",
          inactiveLabel: "Drones de segurança [INATIVOS]",
          defaultState: true,
          visibleTo: ["kelvin", "juan"],
        },
        {
          type: "interactable",
          id: "setores-setor-1-runa-x",
          name: "Runa X",
          label: "Runa X - Setor 1",
          activeLabel: "Runa X [ATIVA]",
          inactiveLabel: "Runa X [INATIVA]",
          defaultState: true,
          visibleTo: ["ramon"],
        },
      ],
    },
    ...([2, 3, 4].map(makeSetor)),
  ],
};
