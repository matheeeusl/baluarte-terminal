import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { formatDuration } from "@/lib/format";
import {
  ARIA_PLAY_AUDIO,
  ARIA_PAUSE_AUDIO,
  ARIA_STOP_AUDIO,
  ARIA_SEEK,
  LABEL_TRANSCRIPT,
} from "@/data/labels";
import type { AudioFile } from "@/types";

interface AudioPlayerProps {
  file: AudioFile;
  onStop?: () => void;
  autoPlay?: boolean;
}

export function AudioPlayer({ file, onStop, autoPlay = false }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const howlRef = useRef<Howl | null>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(false);
    const howl = new Howl({
      src: [file.src],
      html5: true,
      onload: () => {
        setLoaded(true);
        if (autoPlay) {
          howl.play();
          setPlaying(true);
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      onloaderror: () => setLoaded(false),
      onend: () => {
        setPlaying(false);
        setElapsed(0);
        cancelAnimationFrame(rafRef.current);
      },
    });
    howlRef.current = howl;

    return () => {
      howl.unload();
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handlePause() {
    howlRef.current?.pause();
    setPlaying(false);
    cancelAnimationFrame(rafRef.current);
  }

  function handleStop() {
    howlRef.current?.stop();
    setPlaying(false);
    setElapsed(0);
    cancelAnimationFrame(rafRef.current);
    onStop?.();
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const bar = progressRef.current;
    if (!bar || file.duration <= 0) return;
    const { left, width } = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - left) / width));
    const seekTo = ratio * file.duration;
    howlRef.current?.seek(seekTo);
    setElapsed(seekTo);
  }

  const progress = file.duration > 0 ? (elapsed / file.duration) * 100 : 0;

  return (
    <div className="font-terminal text-(--color-fg) space-y-2">
      <p className="text-sm text-(--color-accent)">{file.name}</p>
      <div className="flex items-center gap-2">
        {/* Play / Pause */}
        <button
          onClick={playing ? handlePause : handlePlay}
          disabled={!loaded}
          className="border border-(--color-fg) px-3 py-1 text-xs hover:bg-(--color-muted) disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label={playing ? ARIA_PAUSE_AUDIO : ARIA_PLAY_AUDIO}
        >
          {!loaded ? "AGUARDE..." : playing ? "⏸ PAUSA" : "▶ PLAY"}
        </button>
        {/* Stop */}
        <button
          onClick={handleStop}
          className="border border-(--color-fg) px-3 py-1 text-xs hover:bg-(--color-muted)"
          aria-label={ARIA_STOP_AUDIO}
        >
          ■ STOP
        </button>
        <span className="text-xs">
          {formatDuration(elapsed)} / {formatDuration(file.duration)}
        </span>
      </div>

      {/* Seekable progress bar */}
      <div
        ref={progressRef}
        role="progressbar"
        aria-label={ARIA_SEEK}
        aria-valuenow={Math.round(elapsed)}
        aria-valuemin={0}
        aria-valuemax={file.duration}
        onClick={handleSeek}
        className="w-full border border-(--color-muted) h-2 cursor-pointer relative"
      >
        <div
          className="h-full bg-(--color-fg) pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {file.transcript && (
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
