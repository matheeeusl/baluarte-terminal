export function sanitizePassword(input: string): string {
  return input.replace(/[^a-zA-Z0-9]/g, "").slice(0, 20);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatPath(folderIds: string[]): string {
  return "/" + folderIds.join("/");
}
