import type { FileNode, Folder } from "@/types";
import { setores } from "./setores";
import { USERS } from "@/data/users";
import { emails } from "./emails";

function makeUserFolder(
  userId: string,
  extraChildren: FileNode[] = [],
): Folder {
  const user = USERS.find((u) => u.id === userId);
  if (!user) throw new Error(`Unknown user id: ${userId}`);

  return {
    type: "folder",
    id: `user-${userId}`,
    name: user.displayId ?? user.name,
    password: user.password,
    janitorAccess: false,
    isUserRoot: userId,
    children: [
      {
        type: "folder",
        id: `user-${userId}-emails`,
        name: "Emails",
        password: null,
        janitorAccess: false,
        children: [...emails.children],
      },
      {
        type: "folder",
        id: `user-${userId}-whatsapp`,
        name: "Whatsapp",
        password: null,
        janitorAccess: false,
        children: [],
      },
      setores,
      ...extraChildren,
    ],
  };
}

export const usuarios: Folder = {
  type: "folder",
  id: "usuarios",
  name: "Usuários",
  password: null,
  janitorAccess: false,
  children: [
    makeUserFolder("kelvin", [
      makeUserFolder("filipe"),
      makeUserFolder("juan"),
    ]),
    makeUserFolder("luiza", [makeUserFolder("claudio")]),
    makeUserFolder("thiago"),
    makeUserFolder("ryze", [makeUserFolder("ramon")]),
    makeUserFolder("guardiao"),
  ],
};
