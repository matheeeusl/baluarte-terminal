import type { Folder } from "@/types";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
function audio(path: string) {
  return `${BASE}${path}`;
}

// Root file tree — populate as the campaign is designed.
// Each folder can contain subfolders, audio files, interactables, and status files.
// adminOnly: true → invisible to guests, visible only after admin login.
export const fileTree: Folder = {
  type: "folder",
  id: "guest",
  name: "Guest",
  password: null,
  janitorAccess: false,
  adminOnly: false,
  children: [
    {
      type: "folder",
      id: "presentation",
      name: "Apresentação",
      password: null,
      janitorAccess: false,
      adminOnly: false,
      children: [
        {
          type: "status",
          id: "presentation-welcome",
          name: "Bem-vindo ao Terminal v3",
          text: `A OUROBOROS DEFENSE SYSTEMS (ODS) agradece você por comprar e instalar nosso novo terminal v3 de ultima geração de segurança!

Com nosso novo terminal, não só podemos providenciar os nossos Usuários com uma qualidade superior aos nossos competidores nos quesitos de segurança, mas também em conforto de uso. Melhoramos muito desde nosso antigo terminal, reconhecemos que tivemos alguns pequenos problemas com algumas máquinas, mas fiquem feliz em saber que reduzimos o uso de componentes perigosos, com sua saúde e conforto em mente!

Agora usamos:

  - 15% a menos de amianto no gerenciamento de calor do terminal
  - 12% decréscimo no vazamento de radiação gama, em troca a bateria dura 23% menos.
  - A pedidos especiais todos os terminais v3 agora não produzem raios ultravioletas em nenhuma capacidade.
  - Nosso único desenvolvedor agora conseguiu arrumar o bug em que senhas não ficavam salvas após desligar o terminal, ele ganhou até um bis de presente.

─────────────────────────────────────────────

[1] A ODS não recomenda o uso contínuo dos terminais em caso ou suspeita de dengue, gestação, gripe, resfriado, cálculo renal ou doenças similares.

[2] O USUÁRIO, ao utilizar o terminal, declara plena ciência de que a unidade de processamento opera em ambiente de RISCO BIOLÓGICO E RADIOLÓGICO SEVERO, aceitando os seguintes termos:

  §1º - EXCLUSÃO DE RESPONSABILIDADE: A ODS fica integralmente isenta de qualquer responsabilidade civil ou criminal por patologias, mutações, ou falência sistêmica decorrentes da exposição prolongada a este terminal, incluindo, mas não se limitando a: mesotelioma por amianto, necrose por radiação ionizante, ou decomposição molecular espontânea.

  §2º - INEXISTÊNCIA DE GARANTIA DE SAÚDE: O uso desta interface não constitui recomendação médica. Eventuais sangramentos oculares, perda de pigmentação cutânea ou o crescimento de tecidos não identificados são considerados RISCOS INERENTES À OPERAÇÃO e não configuram vício do produto ou defeito de fabricação.

  §3º - RENÚNCIA AO DIREITO DE AÇÃO: O USUÁRIO renuncia, de forma irrevogável e irretratável, ao direito de pleitear indenizações por danos morais, estéticos ou existenciais causados pela inalação de fibras de amianto desprendidas pelo sistema de ventilação ou pelo vazamento de isótopos do núcleo de energia.

  §4º - PRESUNÇÃO DE CULPA EXCLUSIVA: Qualquer sintoma de envenenamento radioativo agudo (Síndrome de Radiação Aguda - SRA) será juridicamente interpretado como CULPA EXCLUSIVA DA VÍTIMA, por falha em manter a distância de segurança de 5 metros.`,
        },
      ],
    },
    {
      type: "folder",
      id: "map",
      name: "Map",
      password: null,
      janitorAccess: false,
      adminOnly: false,
      children: [],
    },
    {
      type: "folder",
      id: "audio-files",
      name: "Audio Files",
      password: null,
      janitorAccess: false,
      adminOnly: false,
      children: [
        // --- SUBPASTA: MESSAGES ---
        {
          type: "folder",
          id: "messages",
          name: "Messages",
          password: null, // Sem senha
          janitorAccess: false,
          adminOnly: false,
          children: [
            {
              type: "folder",
              id: "folder-msg-culpado",
              name: "Acho que sei quem foi o Culpado",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-culpado",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/culpado.wav"),
                  duration: 39,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-tarde",
              name: "Chegando Tarde",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-tarde",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/tarde.wav"),
                  duration: 56,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-churras",
              name: "Churras",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-churras",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/churras.wav"),
                  duration: 33,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-filha",
              name: "Minha Filha",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-filha",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/filha.wav"),
                  duration: 13,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-pesames",
              name: "Pêsames",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-pesames",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/pesames.wav"),
                  duration: 26,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-preguicoso",
              name: "Preguiçoso",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-preguicoso",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/preguicoso.wav"),
                  duration: 16,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-msg-review",
              name: "Review",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-msg-review",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/whatsapp/review.wav"),
                  duration: 14,
                },
              ],
            },
          ],
        },
        // --- SUBPASTA: RECORDED ---
        {
          type: "folder",
          id: "recorded",
          name: "Recorded",
          password: null, // Sem senha
          janitorAccess: false,
          adminOnly: false,
          children: [
            {
              type: "folder",
              id: "folder-rec-h17",
              name: "$h17",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-h17",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/$h17.wav"),
                  duration: 204,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-rec-4dm1n",
              name: "4dm1n",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-4dm1n",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/4dm1n.wav"),
                  duration: 285,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-rec-c4m1s4",
              name: "C4m1s4",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-c4m1s4",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/C4m1s4.wav"),
                  duration: 115,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-rec-fcs2",
              name: "FCs2",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-fcs2",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/FCs2.wav"),
                  duration: 95,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-rec-gh0s7",
              name: "Gh0s7",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-gh0s7",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/Gh0s7.wav"),
                  duration: 146,
                },
              ],
            },
            {
              type: "folder",
              id: "folder-rec-r0c",
              name: "R0c%",
              password: "DEFINIR",
              janitorAccess: false,
              adminOnly: false,
              children: [
                {
                  type: "audio",
                  id: "audio-rec-r0c",
                  name: "Reproduzir Áudio",
                  src: audio("/assets/audio/r0cK.wav"),
                  duration: 129,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
