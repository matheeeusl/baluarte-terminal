import { useEffect, useState } from "react";
import { SHUTDOWN_STEPS } from "@/data/labels";
import { TerminalBrand } from "@/components/ui/TerminalBrand";

interface ShutdownProps {
  onComplete: () => void;
  stepDuration?: number; // ms between each step
}

export function Shutdown({ onComplete, stepDuration = 600 }: ShutdownProps) {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (visibleCount >= SHUTDOWN_STEPS.length) {
      const timer = setTimeout(onComplete, stepDuration);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVisibleCount((n) => n + 1);
    }, stepDuration);

    return () => clearTimeout(timer);
  }, [visibleCount, stepDuration, onComplete]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 font-terminal">
      <p className="text-lg text-(--color-accent)">
        <TerminalBrand full />
      </p>
      <div className="space-y-1 text-sm text-(--color-fg)">
        {SHUTDOWN_STEPS.slice(0, visibleCount).map((step, i) => (
          <p key={i}>{step}</p>
        ))}
      </div>
    </div>
  );
}
