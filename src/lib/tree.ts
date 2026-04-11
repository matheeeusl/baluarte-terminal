import type { Folder } from "@/types";

/** Returns the folder matching `id`, or null if not found. */
export function findFolder(id: string, node: Folder): Folder | null {
  if (node.id === id) return node;
  for (const child of node.children) {
    if (child.type === "folder") {
      const found = findFolder(id, child);
      if (found) return found;
    }
  }
  return null;
}

/** Returns the path from root to the folder matching `targetId`, or null if not found. */
export function pathToFolder(targetId: string, node: Folder): Folder[] | null {
  if (node.id === targetId) return [node];
  for (const child of node.children) {
    if (child.type !== "folder") continue;
    const sub = pathToFolder(targetId, child);
    if (sub) return [node, ...sub];
  }
  return null;
}
