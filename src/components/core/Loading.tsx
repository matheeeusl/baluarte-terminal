import { useEffect, useState } from "react";
import { TERMINAL_BRAND_FULL, LABEL_LOADING_OS } from "@/data/labels";

interface LoadingProps {
  onComplete: () => void;
  duration?: number;
}

export function Loading({ onComplete, duration = 1500 }: LoadingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let rafId: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 100);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [duration, onComplete]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 font-terminal">
      <p className="text-lg text-(--color-accent)">
        {TERMINAL_BRAND_FULL}
      </p>
      <p className="text-(--color-fg)">{LABEL_LOADING_OS}</p>
      <div className="w-full max-w-xs border border-(--color-fg) p-1">
        <div
          className="h-3 bg-(--color-fg) transition-none"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <p className="text-sm text-(--color-muted)">{Math.round(progress)}%</p>
    </div>
  );
}
