// Central place for all user-facing labels.
// Edit here to update every screen at once.

// --- Terminal identity ---
export const TERMINAL_BRAND_TEXT = "Ouroboros Defense Systems (ODS)";
export const TERMINAL_BRAND_FULL =
  "Ouroboros Defense Systems (ODS) - Unidade Baluarte 02";
export const FACILITY_NAME = "Unidade Baluarte 02";
export const WELCOME_MESSAGE = `Bem-vindo a ${FACILITY_NAME}...`;

// --- Boot screen ---
export const LABEL_LOADING_OS = "CARREGANDO SISTEMA OPERACIONAL...";

// --- Shutdown screen ---
export const SHUTDOWN_STEPS = [
  "Encerrando processos ativos...",
  "Limpando cache...",
  "Resetando configurações...",
  "Sistema desligado.",
];

// --- Home menu ---
export const LABEL_USERS = "Usuários";
export const LABEL_PUBLIC = "Público";
export const LABEL_SETTINGS = "Configurações";
export const LABEL_CHOOSE_OPTION = "Escolha uma opção:";

// --- Settings screen ---
export const LABEL_SETTINGS_TITLE = "Configurações — Exibição";
export const LABEL_SELECT_PALETTE = "Selecione a paleta de cores:";
export const LABEL_BACK = "Voltar";
export const LABEL_THEME_ACTIVE = "[ATIVO]";
export const PALETTE_LABELS = {
  green: "Verde  — Fósforo clássico",
  amber: "Âmbar  — Fósforo quente",
  white: "Branco — Alto contraste",
};

// --- Status block ---
export const LABEL_STATUS_ONLINE = "Status: Online";
export const LABEL_USER_ADMIN = "K♡JAdmin";
export const LABEL_USER_GUEST = "Visitante";
export const LABEL_JANITOR = "Zelador";
export const LABEL_JANITOR_ACTIVE = "Ativo";
export const LABEL_JANITOR_CONTAINED = "Contido";
export const LABEL_CURRENT_PATH = "Local";

// --- Folder view ---
export const LABEL_LOCKED = "[BLOQUEADO]";
export const LABEL_ENERGIZED = "[ENERGIZADO]";
export const LABEL_JANITOR_GRANT = "Conceder Acesso ao Zelador";
export const LABEL_JANITOR_REVOKE = "Revogar Acesso ao Zelador";
export const LABEL_PROCESSING = "[ PROCESSANDO... ]";

// --- Password input ---
export const LABEL_WRONG_PASSWORD = "Senha incorreta.";
export const LABEL_ACCESS_DENIED_FOLDER = (folder: string) =>
  `Acesso negado: ${folder}`;

// --- Password input ---
export const LABEL_ACCESS_DENIED = "ACESSO NEGADO";
export const LABEL_RETRY_IN = (seconds: number) =>
  `${LABEL_ACCESS_DENIED} — Tente novamente em ${seconds}s`;
export const LABEL_ATTEMPTS_LEFT = (n: number) =>
  `${n} tentativa${n !== 1 ? "s" : ""} restante${n !== 1 ? "s" : ""}`;
export const ARIA_ENTER_PASSWORD = "Digite a senha";

// --- Audio player ---
export const ARIA_PLAY_AUDIO = "Reproduzir áudio";
export const ARIA_PAUSE_AUDIO = "Pausar áudio";
export const ARIA_STOP_AUDIO = "Parar áudio";
export const LABEL_TRANSCRIPT = "Transcrição";
export const ARIA_SEEK = "Avançar para posição";
