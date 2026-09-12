import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Howl } from "howler";
import { useFileSystem } from "./useFileSystem";
import { GameProvider } from "@/context/GameContext";
import type { Folder } from "@/types";

const mockTree: Folder = {
  id: "home",
  name: "Home",
  type: "folder",
  password: null,
  janitorAccess: false,
  children: [
    {
      id: "haunted-room",
      name: "Haunted Room",
      type: "folder",
      password: null,
      janitorAccess: false,
      activateAudio: "/audio/ambient.mp3",
      children: [
        {
          id: "inner-room",
          name: "Inner Room",
          type: "folder",
          password: null,
          janitorAccess: false,
          children: [],
        },
      ],
    },
    {
      id: "quiet-room",
      name: "Quiet Room",
      type: "folder",
      password: null,
      janitorAccess: false,
      children: [],
    },
  ],
};

vi.mock("@/data/fileTree", () => ({
  get fileTree() {
    return mockTree;
  },
}));

function wrapper({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}

describe("useFileSystem — folder activateAudio", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("plays the folder's activateAudio once when navigating into it", () => {
    const { result } = renderHook(() => useFileSystem(), { wrapper });

    act(() => {
      result.current.navigate("haunted-room");
    });

    expect(Howl).toHaveBeenCalledWith(
      expect.objectContaining({ src: ["/audio/ambient.mp3"] })
    );
    const instance = vi.mocked(Howl).mock.results[0].value;
    expect(instance.play).toHaveBeenCalledTimes(1);
  });

  it("stops the audio when navigating into a subfolder without activateAudio", () => {
    const { result } = renderHook(() => useFileSystem(), { wrapper });

    act(() => {
      result.current.navigate("haunted-room");
    });
    const instance = vi.mocked(Howl).mock.results[0].value;

    act(() => {
      result.current.navigate("inner-room");
    });

    expect(instance.stop).toHaveBeenCalled();
  });

  it("stops the audio when going back out of the folder", () => {
    const { result } = renderHook(() => useFileSystem(), { wrapper });

    act(() => {
      result.current.navigate("haunted-room");
    });
    const instance = vi.mocked(Howl).mock.results[0].value;

    act(() => {
      result.current.goBack();
    });

    expect(instance.stop).toHaveBeenCalled();
  });

  it("does not play any audio when entering a folder without activateAudio", () => {
    const { result } = renderHook(() => useFileSystem(), { wrapper });

    act(() => {
      result.current.navigate("quiet-room");
    });

    expect(Howl).not.toHaveBeenCalled();
  });
});
