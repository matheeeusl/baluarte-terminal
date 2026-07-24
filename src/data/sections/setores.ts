import type {
  Folder,
  InteractableFile,
  JanitorControlFile,
  StatusFile,
} from "@/types";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) {
  return `${BASE}${path}`;
}

function makeZeladorToggle(sectorId: string): JanitorControlFile {
  return {
    type: "janitor-control",
    id: `${sectorId}-zelador`,
    name: "Conceder acesso ao Zelador",
    requiredPermission: ["user-luiza-permit-zelador"],
  };
}

function makeSobreDocumento(id: string, text: string): StatusFile {
  return {
    type: "status",
    id: `${id}-sobre`,
    name: "Sobre o Departamento",
    text,
  };
}

// ─── Setor 1 ────────────────────────────────────────────────────────────────

const setor1: Folder = {
  type: "folder",
  id: "setores-setor-1",
  name: "Setor 1",
  password: "4rkh4m",
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
      password: "4br1r",
      activateRequiresInactive: [
        "setores-setor-1-runa-2",
        "setores-setor-2-energia-runa-1",
      ],
    } satisfies InteractableFile,
    {
      type: "interactable",
      id: "setores-setor-1-runa-2",
      name: "Runa de Confinamento",
      label: "Runa de Confinamento",
      activeLabel: "Runa de Confinamento [ATIVA]",
      inactiveLabel: "Runa de Confinamento [INATIVA]",
      defaultState: true,
      requiredPermission: ["user-ramon-permit-runas"],
    } satisfies InteractableFile,
  ],
};

// ─── Setor 2 ────────────────────────────────────────────────────────────────

const setor2: Folder = {
  type: "folder",
  id: "setores-setor-2",
  name: "Setor 2",
  password: "r3dbu11",
  janitorAccess: false,
  children: [
    {
      type: "folder",
      id: "setores-setor-2-energia",
      name: "Sala de Energia",
      password: null,
      janitorAccess: false,
      children: [
        {
          type: "interactable",
          id: "setores-setor-2-energia-runa-1",
          name: "Runa de Confinamento",
          label: "Runa de Confinamento",
          activeLabel: "Runa de Confinamento [ATIVA]",
          inactiveLabel: "Runa de Confinamento [INATIVA]",
          defaultState: true,
          requiredPermission: ["user-ramon-permit-runas"],
        } satisfies InteractableFile,
      ],
    },
  ],
};

// ─── Setor 3 ────────────────────────────────────────────────────────────────

const setor3: Folder = {
  type: "folder",
  id: "setores-setor-3",
  name: "Setor 3",
  password: null,
  janitorAccess: false,
  children: [
    {
      type: "folder",
      id: "setores-setor-3-rh",
      name: "Departamento de RH",
      password: null,
      janitorAccess: false,
      children: [makeZeladorToggle("setores-setor-3-rh")],
    },
    {
      type: "folder",
      id: "setores-setor-3-zeladoria",
      name: "Zeladoria",
      password: null,
      janitorAccess: false,
      children: [
        makeZeladorToggle("setores-setor-3-zeladoria"),
        makeSobreDocumento(
          "setores-setor-3-zeladoria",
          "A Zeladoria é responsável pela manutenção geral das instalações da Unidade Baluarte 02. Inclui higiene, reparos estruturais e controle de pragas. Contato interno: Ramal 014.",
        ),
      ],
    },
    {
      type: "folder",
      id: "setores-setor-3-enfermaria",
      name: "Enfermaria",
      password: null,
      janitorAccess: false,
      children: [
        makeZeladorToggle("setores-setor-3-enfermaria"),
        makeSobreDocumento(
          "setores-setor-3-enfermaria",
          "A Enfermaria atende emergências médicas internas e realiza exames de rotina obrigatórios. Em caso de acidente, evacue a área e acione a Enfermaria imediatamente via Ramal 115.",
        ),
      ],
    },
    {
      type: "folder",
      id: "setores-setor-3-financeiro",
      name: "Financeiro",
      password: null,
      janitorAccess: false,
      children: [
        makeZeladorToggle("setores-setor-3-financeiro"),
        makeSobreDocumento(
          "setores-setor-3-financeiro",
          "O Departamento Financeiro gerencia orçamentos, pagamentos e relatórios fiscais da Unidade. Solicitações de reembolso devem ser submetidas até o dia 20 de cada mês.",
        ),
      ],
    },
    {
      type: "folder",
      id: "setores-setor-3-acordos",
      name: "Acordo e Vínculos",
      password: null,
      janitorAccess: false,
      children: [
        makeZeladorToggle("setores-setor-3-acordos"),
        makeSobreDocumento(
          "setores-setor-3-acordos",
          "O Departamento de Acordos e Vínculos Inquebráveis gerencia contratos, termos de confidencialidade e acordos de não-concorrência. Todos os documentos são processados com aprovação do Procurador.",
        ),
      ],
    },
  ],
};

// ─── Setor 4 ────────────────────────────────────────────────────────────────

const setor4: Folder = {
  type: "folder",
  id: "setores-setor-4",
  name: "Setor 4",
  password: null,
  janitorAccess: false,
  children: [
    {
      type: "folder",
      id: "setores-setor-4-ti",
      name: "Departamento de TI",
      password: null,
      janitorAccess: false,
      children: [
        makeZeladorToggle("setores-setor-4-ti"),
        makeSobreDocumento(
          "setores-setor-4-ti",
          "O Departamento de Tecnologia da Informação gerencia redes internas, terminais e segurança digital da Unidade. Qualquer falha de sistema deve ser reportada ao Administrador de Redes.",
        ),
      ],
    },
    {
      type: "folder",
      id: "setores-setor-4-copa",
      name: "Copa",
      password: null,
      janitorAccess: false,
      children: [
        {
          type: "status",
          id: "setores-setor-4-copa-regras",
          name: "Regulamento da Copa",
          text: "REGULAMENTO DA COPA\n\n1. Limpar o espaço após o uso.\n2. Não deixar alimentos perecíveis na geladeira por mais de 48 horas.\n3. Respeitar o silêncio entre 13h00 e 14h00.\n4. Qualquer dano ao equipamento deve ser reportado à Zeladoria.\n5. O uso da máquina de café é restrito a funcionários credenciados.",
        },
      ],
    },
    {
      type: "folder",
      id: "setores-setor-4-praca",
      name: "Praça de Alimentação",
      password: null,
      janitorAccess: false,
      children: [
        {
          type: "status",
          id: "setores-setor-4-praca-regras",
          name: "Regulamento da Praça de Alimentação",
          text: "REGULAMENTO DA PRAÇA DE ALIMENTAÇÃO\n\n1. Uso exclusivo durante horários designados.\n2. Descarte correto de resíduos nos postos indicados.\n3. Proibido o consumo de alimentos de fornecedores externos não credenciados.\n4. Qualquer intercorrência deve ser reportada ao Departamento de Capital Humano.",
        },
      ],
    },
    {
      type: "folder",
      id: "setores-setor-4-acomodacoes",
      name: "Acomodações",
      password: null,
      janitorAccess: false,
      children: [
        {
          type: "status",
          id: "setores-setor-4-acomodacoes-regras",
          name: "Regulamento das Acomodações",
          text: "REGULAMENTO DAS ACOMODAÇÕES\n\n1. Silêncio obrigatório após as 22h00.\n2. Visitas externas não são permitidas nas acomodações.\n3. Cada colaborador é responsável pela manutenção do próprio espaço.\n4. Solicitações de manutenção devem ser encaminhadas à Zeladoria.",
        },
      ],
    },
    {
      type: "folder",
      id: "setores-setor-4-automacao",
      name: "Departamento de Automação",
      password: null,
      janitorAccess: false,
      children: [
        makeZeladorToggle("setores-setor-4-automacao"),
        makeSobreDocumento(
          "setores-setor-4-automacao",
          "O Departamento de Automação e Sistemas Cinéticos é responsável pela operação e calibração de sistemas automatizados, incluindo drones de segurança, comportas e runas de contenção.",
        ),
        {
          type: "status",
          id: "setores-setor-4-automacao-banheiro",
          name: "Regras do Banheiro do Setor",
          text: "REGRAS DO BANHEIRO — SETOR 04\n\n1. Uso restrito a colaboradores do Setor.\n2. Manter limpeza e organização a todo momento.\n3. Proibido descartar objetos sólidos nos vasos sanitários.\n4. Solicitações de manutenção ao Ramal 014.",
        },
      ],
    },
  ],
};

// ─── Root ────────────────────────────────────────────────────────────────────

export const setores: Folder = {
  type: "folder",
  id: "setores",
  name: "Setores",
  password: null,
  janitorAccess: false,
  children: [setor1, setor2, setor3, setor4],
};
