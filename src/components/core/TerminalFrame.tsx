import { useEffect, useRef, useState } from "react";
import TerminalSVG from "@/assets/images/terminal-frame.svg?react";

// Cropped viewBox: removes the keyboard section (starts at ~y=174 in SVG units).
// Full viewBox is "0 0 259.34158 235.97205"; crop height to 172 keeps monitor + knobs.
const CROPPED_VIEWBOX = "0 0 259.34158 172";
const CROPPED_HEIGHT = 172;
const VIEWBOX_WIDTH = 259.34158;

// Fallback percentages computed from screen-area rect + layer14 transform
// translate(-112.84433, -33.815439):
//   effective x = 185.208 − 112.844 = 72.364
//   effective y = 72.760  − 33.815  = 38.945
//   width = 120.385, height = 92.604
const FALLBACK = {
  left: `${(72.364 / VIEWBOX_WIDTH) * 100}%`,   // 27.9%
  top: `${(38.945 / CROPPED_HEIGHT) * 100}%`,   // 22.6%
  width: `${(120.385 / VIEWBOX_WIDTH) * 100}%`, // 46.4%
  height: `${(92.604 / CROPPED_HEIGHT) * 100}%`, // 53.8%
} as const;

// Border radius proportional to screen-area's rx=11.405 / ry=12.347 in SVG units
// rx / screen-width  = 11.405 / 120.385 ≈ 9.5%
// ry / screen-height = 12.347 / 92.604  ≈ 13.3%
const SCREEN_BORDER_RADIUS = "9.5% / 13.3%";

interface ScreenBounds {
  left: string;
  top: string;
  width: string;
  height: string;
}

interface Props {
  children: React.ReactNode;
  onKnob2Click?: () => void;
}

export function TerminalFrame({ children, onKnob2Click }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<ScreenBounds>(FALLBACK);

  useEffect(() => {
    const knob2 = containerRef.current?.querySelector<Element>("#knob2");
    if (knob2 && onKnob2Click) {
      knob2.addEventListener("click", onKnob2Click);
      return () => knob2.removeEventListener("click", onKnob2Click);
    }
  }, [onKnob2Click]);

  useEffect(() => {
    function computeBounds() {
      const container = containerRef.current;
      if (!container) return;
      const screenEl = container.querySelector<Element>("#screen-area");
      if (!screenEl) return;

      const containerRect = container.getBoundingClientRect();
      const screenRect = screenEl.getBoundingClientRect();

      if (screenRect.width === 0 || containerRect.width === 0) return;

      setBounds({
        left: `${((screenRect.left - containerRect.left) / containerRect.width) * 100}%`,
        top: `${((screenRect.top - containerRect.top) / containerRect.height) * 100}%`,
        width: `${(screenRect.width / containerRect.width) * 100}%`,
        height: `${(screenRect.height / containerRect.height) * 100}%`,
      });
    }

    const id = requestAnimationFrame(() => computeBounds());
    window.addEventListener("resize", computeBounds);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", computeBounds);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* SVG frame behind content */}
      <TerminalSVG
        width="100%"
        height="100%"
        viewBox={CROPPED_VIEWBOX}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      {/* Screen content on top — rounded to match screen-area rx/ry */}
      <div
        className="absolute z-10 overflow-hidden bg-(--color-bg)"
        style={{
          left: bounds.left,
          top: bounds.top,
          width: bounds.width,
          height: bounds.height,
          borderRadius: SCREEN_BORDER_RADIUS,
        }}
      >
        {children}
      </div>
    </div>
  );
}
