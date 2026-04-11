import { useGame } from "@/context/GameContext";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { fileTree } from "@/data/fileTree";
import { findFolder } from "@/lib/tree";

interface Props {
  folderId: string;
  onSuccess: (folderId: string) => void;
  onCancel: () => void;
}

export function FolderPasswordGate({ folderId, onSuccess, onCancel }: Props) {
  const { state, dispatch } = useGame();
  const folder = findFolder(folderId, fileTree);

  return (
    <PasswordInput
      key={folderId}
      folderName={folder?.name}
      initialAttempts={state.failedAttempts.get(folderId) ?? 0}
      validate={(pw) => folder?.password?.toUpperCase() === pw.toUpperCase()}
      onFailure={() => dispatch({ type: "RECORD_FAILED_ATTEMPT", folderId })}
      onSubmit={(pw) => {
        dispatch({ type: "UNLOCK_FOLDER", folderId, password: pw });
        if (folder?.isUserRoot) {
          dispatch({ type: "SET_CURRENT_USER", userId: folder.isUserRoot });
        }
        onSuccess(folderId);
      }}
      onCancel={onCancel}
    />
  );
}
