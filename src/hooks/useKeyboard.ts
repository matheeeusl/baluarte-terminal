import { useEffect } from "react";

interface KeyboardNavOptions {
  itemCount: number;
  activeIndex: number;
  onMove: (index: number) => void;
  onSelect: () => void;
  onBack?: () => void;
  onCancel?: () => void;
}

export function useKeyboard({
  itemCount,
  activeIndex,
  onMove,
  onSelect,
  onBack,
  onCancel,
}: KeyboardNavOptions) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          onMove((activeIndex - 1 + itemCount) % itemCount);
          break;
        case "ArrowDown":
          e.preventDefault();
          onMove((activeIndex + 1) % itemCount);
          break;
        case "Enter":
          e.preventDefault();
          onSelect();
          break;
        case "Backspace":
          e.preventDefault();
          onBack?.();
          break;
        case "Escape":
          e.preventDefault();
          onCancel?.();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [itemCount, activeIndex, onMove, onSelect, onBack, onCancel]);
}
