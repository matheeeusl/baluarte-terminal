import { Howl } from "howler";

export type InterfaceSound = "startup" | "off" | "keystroke" | "crt-hum";

const SRCS: Record<InterfaceSound, string> = {
  startup: "/assets/audio/interface/beep_startup.wav",
  off: "/assets/audio/interface/beep_off.wav",
  keystroke: "/assets/audio/interface/mechanical-switch.wav",
  "crt-hum": "/assets/audio/interface/CRT_hum.wav",
};

const cache = new Map<InterfaceSound, Howl>();

function getHowl(sound: InterfaceSound): Howl {
  if (!cache.has(sound)) {
    cache.set(sound, new Howl({ src: [SRCS[sound]], html5: true }));
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
