interface CRTOverlayProps {
  janitorFlicker?: boolean;
}

export function CRTOverlay({ janitorFlicker = false }: CRTOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 z-10",
        janitorFlicker ? "crt-janitor-flicker" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="crt-scanlines absolute inset-0" />
      <div className="crt-vignette absolute inset-0" />
      <div className="crt-flicker absolute inset-0" />
    </div>
  );
}
