import { Howl } from "howler";

export type InterfaceSound = "startup" | "off" | "keystroke" | "crt-hum" | "geiger-counter";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const SRCS: Record<InterfaceSound, string> = {
  startup: `${BASE}/assets/audio/interface/beep_startup.wav`,
  off: `${BASE}/assets/audio/interface/beep_off.wav`,
  keystroke: `${BASE}/assets/audio/interface/mechanical-switch.wav`,
  "crt-hum": `${BASE}/assets/audio/interface/CRT_hum.wav`,
  "geiger-counter": `${BASE}/assets/audio/interface/geiger_counter.wav`,
};

const LOOP_SOUNDS = new Set<InterfaceSound>(["geiger-counter"]);

const cache = new Map<InterfaceSound, Howl>();

function getHowl(sound: InterfaceSound): Howl {
  if (!cache.has(sound)) {
    cache.set(
      sound,
      new Howl({ src: [SRCS[sound]], html5: true, loop: LOOP_SOUNDS.has(sound) }),
    );
  }
  // cache.set guarantees the key exists
  return cache.get(sound) as Howl;
}

export function playInterface(sound: InterfaceSound): void {
  getHowl(sound).play();
}

export function stopInterface(sound: InterfaceSound): void {
  cache.get(sound)?.stop();
}
