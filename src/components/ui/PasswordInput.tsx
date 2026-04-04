import { useState, useRef, useEffect } from "react";
import { sanitizePassword } from "@/lib/format";
import { playInterface } from "@/lib/audio";
import { LABEL_RETRY_IN, LABEL_ATTEMPTS_LEFT, ARIA_ENTER_PASSWORD } from "@/data/labels";

interface PasswordInputProps {
  onSubmit: (password: string) => void;
  onCancel?: () => void;
  maxAttempts?: number;
  lockoutDuration?: number;
}

export function PasswordInput({
  onSubmit,
  onCancel,
  maxAttempts = 3,
  lockoutDuration = 5,
}: PasswordInputProps) {
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockRemaining, setLockRemaining] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!locked) return;
    setLockRemaining(lockoutDuration);
    const interval = setInterval(() => {
      setLockRemaining((r) => {
        if (r <= 1) {
          clearInterval(interval);
          setLocked(false);
          setAttempts(0);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [locked, lockoutDuration]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (locked || !value) return;

    const sanitized = sanitizePassword(value);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setValue("");

    if (newAttempts >= maxAttempts) {
      setLocked(true);
      return;
    }

    onSubmit(sanitized);
  }

  if (locked) {
    return (
      <p className="font-terminal text-(--color-accent)" role="alert">
        {LABEL_RETRY_IN(lockRemaining)}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <span className="font-terminal text-(--color-fg)">&gt;</span>
      <input
        ref={inputRef}
        type="password"
        value={value}
        onChange={(e) => setValue(sanitizePassword(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Escape") { onCancel?.(); return; }
          playInterface("keystroke");
        }}
        className="bg-transparent font-terminal text-(--color-fg) outline-none caret-(--color-fg) border-b border-(--color-fg) w-40"
        aria-label={ARIA_ENTER_PASSWORD}
        autoComplete="off"
        spellCheck={false}
      />
      {attempts > 0 && (
        <span className="font-terminal text-xs text-(--color-accent)">
          {LABEL_ATTEMPTS_LEFT(maxAttempts - attempts)}
        </span>
      )}
    </form>
  );
}
