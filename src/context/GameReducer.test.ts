import { describe, it, expect } from "vitest";
import { gameReducer, getInitialState, ADMIN_PASSWORD } from "./GameReducer";
import type { GameState } from "@/types";

function state(overrides?: Partial<GameState>): GameState {
  return { ...getInitialState(), ...overrides };
}

describe("GameReducer", () => {
  describe("POWER_ON", () => {
    it("sets power to true and phase to BOOT", () => {
      const next = gameReducer(state({ power: false }), { type: "POWER_ON" });
      expect(next.power).toBe(true);
      expect(next.phase).toBe("BOOT");
    });

    it("increments knob2Rotation by 90", () => {
      const next = gameReducer(state({ knob2Rotation: 0 }), { type: "POWER_ON" });
      expect(next.knob2Rotation).toBe(90);
    });
  });

  describe("POWER_OFF", () => {
    it("sets power to false and resets to initial state", () => {
      const next = gameReducer(
        state({ power: true, phase: "AUTHENTICATED" }),
        { type: "POWER_OFF" }
      );
      expect(next.power).toBe(false);
      expect(next.phase).toBe("BOOT");
    });

    it("preserves theme on power off", () => {
      const next = gameReducer(
        state({ power: true, theme: "amber" }),
        { type: "POWER_OFF" }
      );
      expect(next.theme).toBe("amber");
    });

    it("increments knob2Rotation by 90", () => {
      const next = gameReducer(state({ knob2Rotation: 90 }), { type: "POWER_OFF" });
      expect(next.knob2Rotation).toBe(180);
    });
  });

  describe("LOGIN_ADMIN", () => {
    it("transitions to AUTHENTICATED with correct password", () => {
      const next = gameReducer(state({ phase: "GUEST" }), {
        type: "LOGIN_ADMIN",
        password: ADMIN_PASSWORD,
      });
      expect(next.phase).toBe("AUTHENTICATED");
    });

    it("stays in GUEST with wrong password", () => {
      const next = gameReducer(state({ phase: "GUEST" }), {
        type: "LOGIN_ADMIN",
        password: "WRONG",
      });
      expect(next.phase).toBe("GUEST");
    });
  });

  describe("UNLOCK_FOLDER", () => {
    it("adds folder to unlockedFolders", () => {
      const next = gameReducer(state(), {
        type: "UNLOCK_FOLDER",
        folderId: "laboratory",
        password: "SCIENCE",
      });
      expect(next.unlockedFolders.has("laboratory")).toBe(true);
    });
  });

  describe("NAVIGATE", () => {
    it("increments knob1Rotation by 15", () => {
      const next = gameReducer(state({ knob1Rotation: 0 }), {
        type: "NAVIGATE",
        nodeId: "laboratory",
      });
      expect(next.knob1Rotation).toBe(15);
    });

    it("accumulates rotation on multiple navigations", () => {
      let s = state({ knob1Rotation: 0 });
      s = gameReducer(s, { type: "NAVIGATE", nodeId: "a" });
      s = gameReducer(s, { type: "NAVIGATE", nodeId: "b" });
      s = gameReducer(s, { type: "NAVIGATE", nodeId: "c" });
      expect(s.knob1Rotation).toBe(45);
    });
  });

  describe("TOGGLE_INTERACTABLE", () => {
    it("toggles the state from true to false", () => {
      const s = state();
      s.interactableStates.set("lab-turrets", true);
      const next = gameReducer(s, {
        type: "TOGGLE_INTERACTABLE",
        fileId: "lab-turrets",
      });
      expect(next.interactableStates.get("lab-turrets")).toBe(false);
    });

    it("toggles the state from false to true", () => {
      const s = state();
      s.interactableStates.set("lab-turrets", false);
      const next = gameReducer(s, {
        type: "TOGGLE_INTERACTABLE",
        fileId: "lab-turrets",
      });
      expect(next.interactableStates.get("lab-turrets")).toBe(true);
    });
  });

  describe("GRANT_JANITOR_ACCESS", () => {
    it("sets janitorOverrides entry to true", () => {
      const next = gameReducer(state(), {
        type: "GRANT_JANITOR_ACCESS",
        folderId: "laboratory",
      });
      expect(next.janitorOverrides.get("laboratory")).toBe(true);
    });
  });

  describe("REVOKE_JANITOR_ACCESS", () => {
    it("sets janitorOverrides entry to false", () => {
      const s = state();
      s.janitorOverrides.set("laboratory", true);
      const next = gameReducer(s, {
        type: "REVOKE_JANITOR_ACCESS",
        folderId: "laboratory",
      });
      expect(next.janitorOverrides.get("laboratory")).toBe(false);
    });
  });

  describe("TOGGLE_ROLEPLAY", () => {
    it("toggles roleplayMode from false to true", () => {
      const next = gameReducer(state({ roleplayMode: false }), {
        type: "TOGGLE_ROLEPLAY",
      });
      expect(next.roleplayMode).toBe(true);
    });

    it("toggles roleplayMode from true to false", () => {
      const next = gameReducer(state({ roleplayMode: true }), {
        type: "TOGGLE_ROLEPLAY",
      });
      expect(next.roleplayMode).toBe(false);
    });
  });

  describe("CHANGE_THEME", () => {
    it("updates theme palette", () => {
      const next = gameReducer(state({ theme: "green" }), {
        type: "CHANGE_THEME",
        palette: "amber",
      });
      expect(next.theme).toBe("amber");
    });
  });
});
