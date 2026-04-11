export interface User {
  id: string;
  displayId?: string;
  name: string;
  title: string;
  password: string;
  parentId?: string;
}

export const USERS: User[] = [
  {
    id: "kelvin",
    displayId: "Big K",
    name: "Kelvin",
    title: "Chefe de Departamento de Sistemas Cinéticos",
    password: "DEFINIR",
  },
  {
    id: "filipe",
    name: "Filipe",
    title: "Supervisor de Atuadores e Hidráulica",
    password: "DEFINIR",
    parentId: "kelvin",
  },
  {
    id: "juan",
    displayId: "Dom J.",
    name: "Juan",
    title: "Auxiliar de Calibração de Precisão",
    password: "DEFINIR",
    parentId: "kelvin",
  },
  {
    id: "luiza",
    displayId: "Dona L.",
    name: "Luiza",
    title: "Chefe de Departamento de Processamento de Dados",
    password: "DEFINIR",
  },
  {
    id: "claudio",
    name: "Cláudio",
    title: "Administrador de Redes e Conectividade",
    password: "DEFINIR",
    parentId: "luiza",
  },
  {
    id: "thiago",
    displayId: "Dr. T.",
    name: "Thiago",
    title: "Chefe de Departamento de Capital Humano",
    password: "DEFINIR",
  },
  {
    id: "ryze",
    name: "Ryzé",
    title: "Procurador de Acordos e Vínculos Inquebráveis",
    password: "DEFINIR",
  },
  {
    id: "ramon",
    displayId: "Arquiteto R.",
    name: "Ramon",
    title: "Arquiteto de Sintaxe Lógica",
    password: "DEFINIR",
    parentId: "ryze",
  },
  {
    id: "guardiao",
    name: "Guardião",
    title: "",
    password: "DEFINIR",
  },
];

export function getUserById(id: string): User | undefined {
  return USERS.find((u) => u.id === id);
}
