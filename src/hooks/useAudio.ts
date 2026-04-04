import { useCallback, useRef } from "react";
import { Howl } from "howler";

export function useAudio() {
  const narrativeRef = useRef<Howl | null>(null);

  const playNarrative = useCallback((src: string) => {
    narrativeRef.current?.stop();
    narrativeRef.current = new Howl({ src: [src], html5: true });
    narrativeRef.current.play();
  }, []);

  const pauseNarrative = useCallback(() => {
    narrativeRef.current?.pause();
  }, []);

  const stopNarrative = useCallback(() => {
    narrativeRef.current?.stop();
    narrativeRef.current = null;
  }, []);

  return { playNarrative, pauseNarrative, stopNarrative };
}
