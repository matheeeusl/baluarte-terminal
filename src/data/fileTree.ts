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
  id: "root",
  name: "Root",
  password: null,
  janitorAccess: false,
  adminOnly: false,
  children: [
    {
      type: "folder",
      id: "setor1",
      name: "Setor 1",
      password: "SCIENCE",
      janitorAccess: false,
      adminOnly: false,
      children: [
        {
          type: "status",
          id: "set1-status",
          name: "System Status",
          text: "All laboratory systems nominal.\nAir filtration: ONLINE\nContainment: SECURE",
        },
        {
          type: "interactable",
          id: "set1-turrets",
          name: "Turret Control",
          label: "Toggle Setor 1 Turrets",
          activeLabel: "Turrets: ACTIVE",
          inactiveLabel: "Turrets: DISABLED",
          defaultState: true,
        },
        {
          type: "folder",
          id: "monitoring-station",
          name: "Monitoring Station",
          password: "SCIENCE",
          janitorAccess: true,
          adminOnly: true,
          children: [
            {
              type: "interactable",
              id: "monitoring-turrets",
              name: "Turret Control",
              label: "Toggle Monitoring Station Turrets",
              activeLabel: "Turrets: ACTIVE",
              inactiveLabel: "Turrets: DISABLED",
              defaultState: true,
            },
          ],
        },
        {
          type: "audio",
          id: "set1-audio1",
          name: "Audio Log 1",
          src: audio("/assets/audio/cartao_entrada.wav"),
          duration: 95,
        },
      ],
    },
    {
      type: "folder",
      id: "admin-logs",
      name: "Admin Logs",
      password: null,
      janitorAccess: false,
      adminOnly: true,
      children: [
        {
          type: "status",
          id: "admin-logs-status",
          name: "Access Log",
          text: "Last admin login: [REDACTED]\nSecurity level: ALPHA\nClearance: GRANTED",
        },
      ],
    },
    {
      type: "folder",
      id: "override-controls",
      name: "Override Controls",
      password: "OVERRIDE",
      janitorAccess: false,
      adminOnly: true,
      children: [
        {
          type: "interactable",
          id: "facility-lockdown",
          name: "Lockdown Control",
          label: "Toggle Facility Lockdown",
          activeLabel: "Lockdown: ACTIVE",
          inactiveLabel: "Lockdown: INACTIVE",
          defaultState: false,
        },
      ],
    },
  ],
};
