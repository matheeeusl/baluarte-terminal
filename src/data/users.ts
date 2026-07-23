export interface User {
  id: string;
  displayId?: string;
  name: string;
  title: string;
  password: string;
  income: number;
  companyTime: number;
  email?: string;
  parentId?: string;
}

export const USERS: User[] = [
  {
    id: "kelvin",
    displayId: "Big K",
    name: "Kelvin",
    title: "Diretor de Automação",
    password: "KS2J",
    income: 24500,
    companyTime: 9,
    email: "kelvinluizcardoso@gmail.com",
  },
  {
    id: "filipe",
    name: "Filipe",
    title: "Supervisor de Atuadores e Hidráulica",
    password: "Filipe13",
    income: 9800,
    companyTime: 15,
    email: "filipe.automacao@ourobo.ros",
    parentId: "kelvin",
  },
  {
    id: "juan",
    displayId: "Dom J.",
    name: "Juan",
    title: "Auxiliar de Calibração de Precisão",
    password: "JS2K",
    income: 4200,
    companyTime: 3,
    email: "juanpablolopes05@gmail.com",
    parentId: "kelvin",
  },
  {
    id: "luiza",
    displayId: "Dona L.",
    name: "Luiza",
    title: "Chefe de Departamento de Processamento de Dados",
    password: "DEFINIR",
    income: 18700,
    companyTime: 11,
    email: "luizapolidoroaguiar@gmail.com",
  },
  {
    id: "claudio",
    name: "Cláudio",
    title: "Administrador de Redes e Conectividade",
    password: "4dm1n",
    income: 8600,
    companyTime: 8,
    email: "claudio.redes@ourobo.ros",
    parentId: "luiza",
  },
  {
    id: "thiago",
    displayId: "Dr. T.",
    name: "Thiago",
    title: "Chefe de Departamento de Capital Humano",
    password: "morgana",
    email: "barcellospsicologia@gmail.com",
    income: 19800,
    companyTime: 10,
  },
  {
    id: "ryze",
    name: "Ryzé",
    title: "Procurador de Acordos e Vínculos Inquebráveis",
    password: "DEFINIR",
    email: "ryze.acordos@ourobo.ros",
    income: 41000,
    companyTime: 22,
  },
  {
    id: "ramon",
    displayId: "Arquiteto R.",
    name: "Ramon",
    title: "Arquiteto de Sintaxe Lógica",
    password: "DEFINIR",
    email: "ramonspmspm@gmail.com",
    parentId: "ryze",
    income: 37400,
    companyTime: 7,
  },
  {
    id: "guardiao",
    name: "Guardião",
    title: "Guardião",
    password: "DEFINIR",
    email: "guardiao@ourobo.ros",
    income: 14500,
    companyTime: 0,
  },
];

export function getUserById(id: string): User | undefined {
  return USERS.find((u) => u.id === id);
}
