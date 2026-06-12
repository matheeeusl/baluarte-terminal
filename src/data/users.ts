export interface User {
  id: string;
  displayId?: string;
  name: string;
  title: string;
  password: string;
  email?: string;
  parentId?: string;
}

export const USERS: User[] = [
  {
    id: "kelvin",
    displayId: "Big K",
    name: "Kelvin",
    title: "Chefe de Departamento de Sistemas Cinéticos",
    password: "KS2J",
    email: "kelvinluizcardoso@gmail.com",
  },
  {
    id: "filipe",
    name: "Filipe",
    title: "Supervisor de Atuadores e Hidráulica",
    password: "Filipe13",
    email: "filipe.atuadores@ourobo.ros",
    parentId: "kelvin",
  },
  {
    id: "juan",
    displayId: "Dom J.",
    name: "Juan",
    title: "Auxiliar de Calibração de Precisão",
    password: "JS2K",
    email: "juanpablolopes05@gmail.com",
    parentId: "kelvin",
  },
  {
    id: "luiza",
    displayId: "Dona L.",
    name: "Luiza",
    title: "Chefe de Departamento de Processamento de Dados",
    password: "DEFINIR",
    email: "luizapolidoroaguiar@gmail.com",
  },
  {
    id: "claudio",
    name: "Cláudio",
    title: "Administrador de Redes e Conectividade",
    password: "4dm1n",
    email: "claudio.redes@ourobo.ros",
    parentId: "luiza",
  },
  {
    id: "thiago",
    displayId: "Dr. T.",
    name: "Thiago",
    title: "Chefe de Departamento de Capital Humano",
    password: "DEFINIR",
    email: "barcellospsicologia@gmail.com",
  },
  {
    id: "ryze",
    name: "Ryzé",
    title: "Procurador de Acordos e Vínculos Inquebráveis",
    password: "DEFINIR",
    email: "ryze.acordos@ourobo.ros",
  },
  {
    id: "ramon",
    displayId: "Arquiteto R.",
    name: "Ramon",
    title: "Arquiteto de Sintaxe Lógica",
    password: "DEFINIR",
    email: "ramonspmspm@gmail.com",
    parentId: "ryze",
  },
  {
    id: "guardiao",
    name: "Guardião",
    title: "",
    password: "DEFINIR",
    email: "guardiao@ourobo.ros",
  },
];

export function getUserById(id: string): User | undefined {
  return USERS.find((u) => u.id === id);
}
