import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Howler globally — tests never play real audio
vi.mock("howler", () => ({
  Howl: vi.fn().mockImplementation(() => ({
    play: vi.fn(),
    stop: vi.fn(),
    pause: vi.fn(),
    seek: vi.fn().mockReturnValue(0),
    unload: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    duration: vi.fn().mockReturnValue(0),
  })),
  Howler: {
    volume: vi.fn(),
    mute: vi.fn(),
  },
}));
