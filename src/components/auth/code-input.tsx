"use client";

import { useState } from "react";
import { cn } from "@/components/ui";
import { AUTH_CODE_LENGTH, authCopy } from "@/content/auth";

/**
 * Código numérico em caixas separadas. Um único <input> invisível cobre as caixas,
 * então colar o código inteiro e o preenchimento automático do celular funcionam.
 */
export function CodeInput({
  id,
  value,
  onChange,
  onComplete,
  invalid = false,
  disabled = false,
  autoFocus = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  invalid?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const activeIndex = Math.min(value.length, AUTH_CODE_LENGTH - 1);

  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        onChange={(event) => {
          const next = event.target.value.replace(/\D/g, "").slice(0, AUTH_CODE_LENGTH);
          onChange(next);
          if (next.length === AUTH_CODE_LENGTH) onComplete?.(next);
        }}
        onFocus={(event) => {
          setFocused(true);
          event.currentTarget.select();
        }}
        onBlur={() => setFocused(false)}
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]*"
        maxLength={AUTH_CODE_LENGTH}
        aria-label={authCopy.fields.codeGroup}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        autoFocus={autoFocus}
        className="absolute inset-0 z-10 size-full cursor-text opacity-0 disabled:cursor-default"
      />
      <div aria-hidden="true" className="grid grid-cols-6 gap-2 sm:gap-2.5">
        {Array.from({ length: AUTH_CODE_LENGTH }, (_, i) => (
          <div
            key={i}
            className={cn(
              "flex h-[52px] items-center justify-center rounded-sm border bg-surface font-mono text-[24px] font-semibold text-ink sm:h-[60px]",
              invalid ? "border-error-text" : "border-line",
              focused && !invalid && i === activeIndex && "border-line-accent ring-2 ring-focus ring-offset-2 ring-offset-surface-raised",
              disabled && "opacity-60",
            )}
          >
            {value[i] ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
