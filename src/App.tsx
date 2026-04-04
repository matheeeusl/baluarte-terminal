import { GameProvider, useGame } from "@/context/GameContext";
import { TerminalFrame } from "@/components/core/TerminalFrame";
import { Terminal } from "@/components/core/Terminal";
import { CRTOverlay } from "@/components/core/CRTOverlay";
import { JanitorAmbiance } from "@/components/gameplay/JanitorAmbiance";

function AppContent() {
  const { state, dispatch } = useGame();
  const handlePowerToggle = () =>
    dispatch({ type: state.power ? "POWER_OFF" : "POWER_ON" });

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: "259.34158 / 172" }}
    >
      <TerminalFrame onKnob2Click={handlePowerToggle}>
        <Terminal />
        <CRTOverlay />
        <JanitorAmbiance />
      </TerminalFrame>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <div className="relative min-h-screen bg-(--color-bg) flex items-center justify-center p-4">
        <AppContent />
      </div>
    </GameProvider>
  );
}
