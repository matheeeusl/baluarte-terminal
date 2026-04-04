import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { formatDuration } from "@/lib/format";
import { ARIA_PLAY_AUDIO, ARIA_STOP_AUDIO, LABEL_TRANSCRIPT } from "@/data/labels";
import type { AudioFile } from "@/types";

interface AudioPlayerProps {
  file: AudioFile;
  onStop?: () => void;
}

export function AudioPlayer({ file, onStop }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const howlRef = useRef<Howl | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    howlRef.current = new Howl({
      src: [file.src],
      html5: true,
      onend: () => {
        setPlaying(false);
        setElapsed(0);
        cancelAnimationFrame(rafRef.current);
      },
    });

    return () => {
      howlRef.current?.unload();
      cancelAnimationFrame(rafRef.current);
    };
  }, [file.src]);

  function tick() {
    const seek = howlRef.current?.seek() ?? 0;
    setElapsed(typeof seek === "number" ? seek : 0);
    rafRef.current = requestAnimationFrame(tick);
  }

  function handlePlay() {
    howlRef.current?.play();
    setPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  }

  function handleStop() {
    howlRef.current?.stop();
    setPlaying(false);
    setElapsed(0);
    cancelAnimationFrame(rafRef.current);
    onStop?.();
  }

  const progress = file.duration > 0 ? (elapsed / file.duration) * 100 : 0;

  return (
    <div className="font-terminal text-(--color-fg) space-y-2">
      <p className="text-sm text-(--color-accent)">{file.name}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={playing ? handleStop : handlePlay}
          className="border border-(--color-fg) px-3 py-1 text-xs hover:bg-(--color-muted)"
          aria-label={playing ? ARIA_STOP_AUDIO : ARIA_PLAY_AUDIO}
        >
          {playing ? "■ STOP" : "▶ PLAY"}
        </button>
        <span className="text-xs">
          {formatDuration(elapsed)} / {formatDuration(file.duration)}
        </span>
      </div>
      <div className="w-full border border-(--color-muted) h-1">
        <div
          className="h-full bg-(--color-fg)"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(elapsed)}
          aria-valuemin={0}
          aria-valuemax={file.duration}
        />
      </div>
      {file.transcript && !playing && (
        <details className="text-xs text-(--color-muted)">
          <summary className="cursor-pointer hover:text-(--color-fg)">
            {LABEL_TRANSCRIPT}
          </summary>
          <p className="mt-1 whitespace-pre-wrap">{file.transcript}</p>
        </details>
      )}
    </div>
  );
}
