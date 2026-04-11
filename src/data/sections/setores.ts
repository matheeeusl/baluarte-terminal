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
  adminOnly: true,
  children: [
    {
      type: "folder",
      id: "setores-setor-1",
      name: "Setor 1",
      password: null,
      janitorAccess: false,
      adminOnly: true,
      children: [
        {
          type: "folder",
          id: "setores-setor-1-prisao",
          name: "Setor 1 - Prisão",
          password: null,
          janitorAccess: false,
          adminOnly: true,
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
              id: "setores-setor-1-prisao-zelador",
              name: "Conceder acesso do zelador à prisão",
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      id: "setores-setor-2",
      name: "Setor 2",
      password: null,
      janitorAccess: false,
      adminOnly: true,
      children: [],
    },
    {
      type: "folder",
      id: "setores-setor-3",
      name: "Setor 3",
      password: null,
      janitorAccess: false,
      adminOnly: true,
      children: [],
    },
    {
      type: "folder",
      id: "setores-setor-4",
      name: "Setor 4",
      password: null,
      janitorAccess: false,
      adminOnly: true,
      children: [],
    },
  ],
};
