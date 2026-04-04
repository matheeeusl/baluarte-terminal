import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import { gameReducer, getInitialState } from "./GameReducer";
import { applyTheme } from "@/lib/theme";
import type { GameState, GameEvent } from "@/types";

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameEvent>;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, getInitialState);

  useEffect(() => {
    applyTheme(state.theme);
  }, [state.theme]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--knob1-rotation",
      `${state.knob1Rotation}deg`
    );
  }, [state.knob1Rotation]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--knob2-rotation",
      `${state.knob2Rotation}deg`
    );
  }, [state.knob2Rotation]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
