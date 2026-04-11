import { useState } from "react";
import { AudioPlayer } from "@/components/gameplay/AudioPlayer";
import type { EmailFile } from "@/types";

interface Props {
  email: EmailFile;
}

export function EmailPanel({ email }: Props) {
  const [audioPlaying, setAudioPlaying] = useState(false);

  return (
    <div className="mt-auto border-t border-(--color-muted) pt-3 text-sm text-(--color-fg) font-terminal space-y-3">
      <p className="text-(--color-accent)">{email.name}</p>
      <p className="whitespace-pre-wrap">{email.text}</p>
      {email.attachment && (
        <div className="border-t border-(--color-muted) pt-2">
          {audioPlaying ? (
            <AudioPlayer
              file={email.attachment}
              onStop={() => setAudioPlaying(false)}
            />
          ) : (
            <button
              className="flex items-center gap-2 cursor-pointer hover:text-(--color-accent) transition-colors"
              onClick={() => setAudioPlaying(true)}
            >
              <span>🔊</span>
              <span>{email.attachment.name}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
