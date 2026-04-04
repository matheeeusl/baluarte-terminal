import { useState, useRef, useEffect } from "react";
import { sanitizePassword } from "@/lib/format";
import { playInterface, stopInterface } from "@/lib/audio";
import {
  LABEL_WRONG_PASSWORD,
  LABEL_RETRY_IN,
  LABEL_ATTEMPTS_LEFT,
  ARIA_ENTER_PASSWORD,
} from "@/data/labels";

interface PasswordInputProps {
  validate: (password: string) => boolean;
  onSubmit: (password: string) => void;
  onCancel?: () => void;
  maxAttempts?: number;
  lockoutDuration?: number;
}

export function PasswordInput({
  validate,
  onSubmit,
  onCancel,
  maxAttempts = 3,
  lockoutDuration = 5,
}: PasswordInputProps) {
  const [value, setValue] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockRemaining, setLockRemaining] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Stop geiger on unmount (cancel or navigate away)
  useEffect(() => {
    return () => stopInterface("geiger-counter");
  }, []);

  // Lockout countdown
  useEffect(() => {
    if (!locked) return;
    setLockRemaining(lockoutDuration);
    const interval = setInterval(() => {
      setLockRemaining((r) => {
        if (r <= 1) {
          clearInterval(interval);
          setLocked(false);
          setWrongAttempts(0);
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
    setValue("");

    if (validate(sanitized)) {
      stopInterface("geiger-counter");
      onSubmit(sanitized);
      return;
    }

    const newWrong = wrongAttempts + 1;
    setWrongAttempts(newWrong);

    // Start geiger on first wrong attempt; it keeps looping until correct
    if (newWrong === 1) {
      playInterface("geiger-counter");
    }

    if (newWrong >= maxAttempts) {
      setLocked(true);
    }
  }

  const attemptsLeft = maxAttempts - wrongAttempts;

  if (locked) {
    return (
      <div className="font-terminal space-y-1">
        <p className="text-(--color-accent)" role="alert">
          {LABEL_RETRY_IN(lockRemaining)}
        </p>
      </div>
    );
  }

  return (
    <div className="font-terminal space-y-1">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-(--color-fg)">&gt;</span>
        <input
          ref={inputRef}
          type="password"
          value={value}
          onChange={(e) => setValue(sanitizePassword(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Escape") { onCancel?.(); return; }
            playInterface("keystroke");
          }}
          className="bg-transparent text-(--color-fg) outline-none caret-(--color-fg) border-b border-(--color-fg) w-40"
          aria-label={ARIA_ENTER_PASSWORD}
          autoComplete="off"
          spellCheck={false}
        />
        {wrongAttempts > 0 && attemptsLeft > 0 && (
          <span className="text-xs text-(--color-accent)">
            {LABEL_ATTEMPTS_LEFT(attemptsLeft)}
          </span>
        )}
      </form>
      {wrongAttempts > 0 && (
        <p className="text-xs text-(--color-accent)">{LABEL_WRONG_PASSWORD}</p>
      )}
    </div>
  );
}
