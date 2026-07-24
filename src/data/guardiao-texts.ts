import { FileNode } from "@/types";

const relatorioHeader = (nome: string, idade: number) => {
  return `Último Relatório - ${nome} - ${idade} anos de serviço.`;
};
// ultima mensagem de cada guardiao.
// informações da idade e nome de cada guardiao
const relatorios = {
  1: `\
${relatorioHeader("Cláudio", 77)}

Agora que todos os funcionários partiram e apenas eu permaneci, deixo registrado o que realmente aconteceu e qual é o meu verdadeiro papel.

O Baluarte é uma ████████ de segurança máxima.
E quem é o ████████?
É uma entidade que nem mesmo eu ████████. Aparentemente, ela possui poderes capazes de desafiar as próprias leis da realidade, superando em muito os de qualquer mago acordado, até mesmo os dos arquimagos.
Essa entidade surgiu em nossa realidade sem qualquer explicação. Em resposta, diversas organizações sobrenaturais e tecnológicas uniram forças para construir o Baluarte e ████████.
Nossa esperança é que, um dia, encontremos uma forma de ████████. Até lá, ela deve permanecer ████████.
Eu sou o Guardião do Baluarte. Minha única missão é garantir que essa entidade jamais escape.

Conhecemos duas profecias.
- A primeira anuncia que dez ████████ sacrificarão suas vidas para que todo o seu poder seja reunido em um único corpo. Esse ████████, acompanhado de outros quatro ████████, virá ao Baluarte.
- A segunda profecia foi pronunciada pela própria entidade. Segundo ela, um desses quatro será ████████ e ████████ que a primeira profecia se cumpra.

O dever do Guardião é simples de descrever, mas talvez impossível de suportar: esperar. Esperar o ████████ da primeira profecia e ████████ que nada a ████████.
Se você está lendo isto, então o fardo passou para suas mãos. Peço perdão por condenar meus descendentes a uma vida de isolamento e vigilância. Gostaria que houvesse outro caminho, mas, até onde sei, não há.
Que Deus tenha misericórdia de nós.
`,
  2: `\
${relatorioHeader("Elias A. Claudiano", 80)}

A armadura projetada pelo Primeiro Guardião é ████████, até certo ponto. Ela prolonga a vida de quem a veste, mas apenas estende este tormento chamado solidão.
Nunca conheci de fato o antigo guardião. Sei apenas que era meu ████████. Pelos vestígios que deixou, percebo que tentou tornar este lugar um pouco mais humano.
Tenho conversado diariamente com os robôs e dedicado meu tempo a aprimorar suas inteligências. Às vezes consigo esquecer, por alguns minutos, que estou ████████.
A comida continua tediosa. Já explorei cada corredor, cada sala e cada canto desta prisão inúmeras vezes. Hoje me peguei pensando no meu ████████ novamente. Sinto falta dele.
`,
  3: `\
${relatorioHeader("Letícia Claudiano", 112)}

Nunca recebi qualquer aviso. Sempre achei que a história do Guardião fosse apenas uma tradição absurda da família, uma brincadeira em que escolhiam um descendente aleatório para carregar um título sem significado.
Na minha vez, descobri que era tudo verdade.
Acordei com uma ████████ desconhecida ocupando o lugar do meu ████████. Ao lado da cama estava a armadura. Não havia explicações, nem despedidas. Apenas as acomodações do Baluarte e uma missão que jamais escolhi.
Desde então, meus dias são todos iguais.
A mesma comida sem gosto.
Os mesmos corredores.
Os mesmos robôs lentos, incapazes de compreender o que é estar vivo.
Cento e doze anos.
Primeiro Guardião... você pediu desculpas aos seus descendentes.
Pois saiba que ainda não está perdoado.
  `,
  4: `\
${relatorioHeader("Miguel Claudiano", 40)}

Quarenta anos se passaram.
Passei tanto tempo nesta prisão que comecei a questionar se a entidade realmente existe. Talvez ela tenha morrido há muito tempo, assim como todos os meus antecessores.
Às vezes me pergunto se nós, os Guardiões, não somos os verdadeiros ████████. Vítimas de um genocídio hereditário, lento e silencioso.
Li todos os livros.
Assisti a todos os filmes.
Contei os dias até perder a conta.
Na enfermaria, os ████████ continuam pulsando.
Às vezes tenho a impressão de que me chamam. Como se implorassem para que eu acabasse com o sofrimento deles.
Talvez um daqueles ████████ seja o meu.
Não importa.
Preciso silenciá-los.
Eles querem que eu acabe com o sofrimento.
...
Eu também quero.
`,
  5: `\
${relatorioHeader("Daniela Claudiano", 137)}

Nunca conheci o mundo lá fora.
Desde as minhas primeiras lembranças, este lugar sempre foi o meu lar.
A armadura me ensinou a ler. A escrever. A sobreviver.
Quando criança, eu destruía os robôs e fazia deles meus brinquedos.
Quando adolescente, bloqueei o ████████. Ele nunca parava de falar e me irritava profundamente.
Quando me tornei adulto, passei a reconstruir tudo o que havia quebrado. Criei novos robôs, aperfeiçoei os antigos e transformei este lugar em algo melhor do que encontrei.
Hoje percebo que eles são a minha família.
Nunca conheci meu ███, o antigo Guardião.
Tudo o que sei sobre ele está registrado neste diário.
Espero que, um dia, alguém possa dizer o mesmo sobre mim.
`,
  6: `\
${relatorioHeader("Lucas Claudiano", 100)}

Dois robôs apresentaram defeito hoje. Fiz os reparos e limpei a bagunça que deixei na oficina ontem à noite.
Inspecionei todos os setores, lubrifiquei a armadura, eliminei alguns invasores (ratos imundos) e consegui melhorar um pouco a comida deste lugar.
Às vezes me pergunto se as profecias não passam de histórias para dar sentido ao nosso ████████.
Depois de cem anos...
Ainda me parece impossível imaginar cinco ████████ reunidas no Baluarte.
`,
  7: `\
${relatorioHeader("████████ Claudiano", 12)}

É hoje.
Depois de todos esses anos, a primeira profecia finalmente pode se cumprir.
Se tudo acontecer como foi previsto, hoje será o último dia em que existirá um ████████ do Baluarte.
Que esta ████████ termine comigo.
Se alguém encontrar este diário...
Espero que seja porque conseguimos.
`,
};

export const RELATORIOS_GUARDIAO: FileNode[] = Object.entries(relatorios).map(
  ([numero, text]) => ({
    type: "status",
    id: `guardiao-relatorio-${numero}`,
    name: `Relatório do ${numero}º Guardião`,
    text,
  }),
);
