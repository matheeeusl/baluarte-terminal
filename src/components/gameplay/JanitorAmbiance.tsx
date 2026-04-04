import { useEffect } from "react";
import { useJanitor, useJanitorActive } from "@/hooks/useJanitor";
import { playInterface } from "@/lib/audio";

export function JanitorAmbiance() {
  const isFlickering = useJanitor();
  const isActive = useJanitorActive();

  useEffect(() => {
    if (isFlickering) playInterface("crt-hum");
  }, [isFlickering]);

  if (!isActive) return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 z-20",
        isFlickering ? "crt-janitor-flicker" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
