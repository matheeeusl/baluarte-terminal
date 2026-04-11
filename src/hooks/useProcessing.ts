import { useState } from "react";

const PROCESSING_DELAY = 1500;

export function useProcessing() {
  const [processing, setProcessing] = useState<Set<string>>(new Set());

  function withProcessing(id: string, action: () => void) {
    setProcessing((prev) => new Set(prev).add(id));
    setTimeout(() => {
      action();
      setProcessing((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, PROCESSING_DELAY);
  }

  return { processing, withProcessing };
}
