import type { ImageFile } from "@/types";

interface Props {
  image: ImageFile;
}

export function ImagePanel({ image }: Props) {
  return (
    <div className="mt-auto border-t border-(--color-muted) pt-3 text-sm text-(--color-fg) font-terminal space-y-3">
      <p className="text-(--color-accent)">{image.name}</p>
      <img
        src={image.src}
        alt={image.alt ?? image.name}
        className="w-full object-contain border border-(--color-muted)"
      />
      {image.caption && (
        <p className="whitespace-pre-wrap">{image.caption}</p>
      )}
    </div>
  );
}
