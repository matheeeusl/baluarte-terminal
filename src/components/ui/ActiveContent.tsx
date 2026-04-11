import { AudioPlayer } from "@/components/gameplay/AudioPlayer";
import { EmailPanel } from "@/components/ui/EmailPanel";
import { ImagePanel } from "@/components/ui/ImagePanel";
import type { AudioFile, EmailFile, ImageFile, StatusFile } from "@/types";

interface Props {
  activeStatus: StatusFile | null;
  activeEmail: EmailFile | null;
  activeImage: ImageFile | null;
  activeAudio: AudioFile | null;
  onAudioStop: () => void;
}

export function ActiveContent({ activeStatus, activeEmail, activeImage, activeAudio, onAudioStop }: Props) {
  return (
    <>
      {activeStatus && (
        <div className="mt-auto border-t border-(--color-muted) pt-3 text-sm text-(--color-fg) font-terminal whitespace-pre-wrap">
          <p className="text-(--color-accent) mb-1">{activeStatus.name}</p>
          {activeStatus.text}
        </div>
      )}
      {activeEmail && <EmailPanel key={activeEmail.id} email={activeEmail} />}
      {activeImage && <ImagePanel image={activeImage} />}
      {activeAudio && (
        <div className="mt-auto border-t border-(--color-muted) pt-3">
          <AudioPlayer file={activeAudio} onStop={onAudioStop} />
        </div>
      )}
    </>
  );
}
