import { FileNode } from "@/types";
import { getUserById } from "./users";

const getUserIncome = (id: string) => getUserById(id)?.income ?? 0;
const getUserCompanyTime = (id: string) => {
  const companyTime = getUserById(id)?.companyTime ?? 0;
  if (companyTime > 0) {
    return `${companyTime} anos`;
  }
  return "menos de 1 ano";
};
const getUserTitle = (id: string) => getUserById(id)?.title ?? "";

export const NOTES = {
  bigK: `\
Salário | $${getUserIncome("kelvin")}
Cargo | ${getUserTitle("kelvin")}
Tempo Empresa | ${getUserCompanyTime("kelvin")}

- O "Big K." (Kelvin) tem comportamentos estranhos, vive gastando dinheiro da empresa em projetos que ele não sabe explicar bem.
- Só sabe falar de IA, confia demais nelas.
- Fui comprar cacetinho e os funcionários estavam falando mal dele, chamando de caloteiro.
- Parece conversar bastante com o Juan.
- Teve um dia que esqueceram a chave e ficaram presos na sala dele.
- Teve um período que pareciam estar fazendo manutenção na sala dele custou caro, durou 6 meses, tudo pra colocar uma prateleira de livros. ELE NÃO LÊ.
`,
  filipe: `\
Salário | $${getUserIncome("filipe")}
Cargo | ${getUserTitle("filipe")}
Tempo Empresa | ${getUserCompanyTime("filipe")}

- O Filipe é o supervisor de atuadores e hidráulica. Ele tem muita história pra contar.
- Bem político, já tive conversas com ele pra falar menos de política no horário de serviço.
- Ele é muito próximo do Cláudio, vive de fofoquinha com ele, sempre vejo eles na copa conversando.
- Tem algumas reclamações do Juan, parece que faz todo o serviço.
- Toda vez me pergunta o que o Ramon faz, porque nunca aparece na empresa.
`,
  juan: `\
Salário | $${getUserIncome("juan")}
Cargo | ${getUserTitle("juan")}
Tempo Empresa | ${getUserCompanyTime("juan")}

- O Juan é o auxiliar de calibração de precisão. Apesar de estranho, o Kelvin gosta dele.
- A comida preferida do Juan é pão de queijo com atum no alho, cebola, milho e ervilha.
- Ele vive usando o cartão de acesso do Kelvin não sei porquê, preciso investigar, vou escrever sobre.
  `,
  donaL: `\
Salário | $${getUserIncome("luiza")}
Cargo | ${getUserTitle("luiza")}
Tempo Empresa | ${getUserCompanyTime("luiza")}

- A Dona L. é a chefe de processamento de dados, mas não sei muito sobre ela.
- Pede para todo mundo chamar ela de "Dona" Luíza, ela é dona do quê? Filha do chefe por acaso?!
- Cheio de reclamação dos funcionários sobre ela, parece que ela não dá valor ao trabalho dos outros.
- Esquecida, vive esquecendo senha, chaves, cartões de acesso, etc.
- Cláudio vive reclamando dela, sempre tem que resolver essas situações, até fora do trabalho.
- A única reclamação dela é sobre o Ramon, ela sabe que ele ganha bem mas não sabe o que ele faz para trabalhar remoto e ganhar isso tudo.
`,
  claudio: `\
Salário | $${getUserIncome("claudio")}
Cargo | ${getUserTitle("claudio")}
Tempo Empresa | ${getUserCompanyTime("claudio")}

- Cláudio é o subordinado da Dona L., sinto pena.
- Vive de fofoquinha com o Filipe, sempre vejo eles na copa conversando.
- Ele sempre trás a filha para o trabalho, vive desenhando coisas na mesa dele, deixando os desenhos espalhados pela empresa inteira.
- Ele é muito dedicado ao trabalho, mas vive reclamando da Luíza e do Kelvin, parece que eles não dão valor ao trabalho dele.
- Ele quem criou e gerencia as senhas dos setores mais internos.
- Reclama do Ramon, porque ele nunca aparece na empresa, mas ganha muito bem.
  `,
  ryze: `\
Salário | $${getUserIncome("ryze")}
Cargo | ${getUserTitle("ryze")}
Tempo Empresa | ${getUserCompanyTime("ryze")}

- O Chefe Ryzé é o procurador de acordos e vínculos inquebráveis, então ele é quem cuida dos contratos da empresa.
- Ele é muito reservado, não sei quase nada sobre ele.
- O mais próximo dele é o Ramon, o seu subordinado, que trabalha remoto aparentemente.
- É um senhor de idade, bem tranquilo, ninguém tem nada a reclamar dele, até porque ele é um dos chefões.
- Tive que assinar a entrega de um item bem peculiar para ele, um caixão.
`,
  ramon: `\
Salário | $${getUserIncome("ramon")}
Cargo | ${getUserTitle("ramon")}
Tempo Empresa | ${getUserCompanyTime("ramon")}

- O Ramon é subordinado do Ryzé.
- Raramente aparece no escritório, deve trabalhar remotamente.
- Sei que ganha muito bem, o dobro da Luíza, mas não sei o que ele faz para trabalhar remoto e ganhar isso tudo.
- Ele é bem reservado, não sei quase nada sobre ele, mas parece ser bem próximo do Ryzé.
- Mesmo trabalhando remoto, ele tem uma sala de trabalho na empresa, mas nunca vi ele lá, nem os robôs de limpeza chegam perto.
`,
  helio: `\
Salário | $3900
Cargo | Zelador
Tempo Empresa | 16 anos

- Hélio é o zelador da empresa, ele é responsável pela manutenção e limpeza do prédio.
- Tem acesso a todas as áreas da empresa, inclusive a sala do Ramon.
- Tem preocupações sobre a substituição do seu trabalho por robôs.
- Foi o responsável pelo entupimento dos banheiros.
- Quando li que a quantidade de pelos era clinicamente pertubadora, achei por bem desligar ele da empresa.
- Kelvin me falou de um boato que ele estava trazendo pelos de fora da empresa para entupir os banheiros propositalmente.

[DESLIGADO DA FAMÍLIA OUROBOROS] 
`,
  guardiao: `\
Salário | $${getUserIncome("guardiao")}
Cargo | ${getUserTitle("guardiao")}
Tempo Empresa | ${getUserCompanyTime("guardiao")}

- O ████████ é o primeiro guardião.
- Esse trabalho tem algo a ver com a segurança da empresa, mas não sei exatamente o que ele faz.
- Parece que é um emprego vitalício e pelos boatos até hereditário.
- A empresa vai pagar o salário para a família do ████████ durante muito tempo.
- Todos ficaram felizes com a escolha do ████████ para o cargo, menos o Ramon.
- O ████████ reclama do Ramon, porque parece que tem a vida mais fácil.
`,
};

export const NOTES_RH: FileNode[] = [
  {
    type: "status",
    id: "thiago-status-1",
    name: "Notas sobre o Big K.",
    text: NOTES.bigK,
  },
  {
    type: "status",
    id: "thiago-status-2",
    name: "Notas sobre o Filipe",
    text: NOTES.filipe,
  },
  {
    type: "status",
    id: "thiago-status-3",
    name: "Notas sobre o Juan",
    text: NOTES.juan,
  },
  {
    type: "status",
    id: "thiago-status-4",
    name: "Notas sobre a Dona L.",
    text: NOTES.donaL,
  },
  {
    type: "status",
    id: "thiago-status-5",
    name: "Notas sobre Cláudio",
    text: NOTES.claudio,
  },
  {
    type: "status",
    id: "thiago-status-6",
    name: "Notas sobre o Ryzé",
    text: NOTES.ryze,
  },
  {
    type: "status",
    id: "thiago-status-7",
    name: "Notas sobre o Ramon",
    text: NOTES.ramon,
  },
  {
    type: "status",
    id: "thiago-status-8",
    name: "Notas sobre [DESLIGADO]",
    text: NOTES.helio,
  },
  {
    type: "status",
    id: "thiago-status-9",
    name: "Notas sobre ████████",
    text: NOTES.guardiao,
  },
];
