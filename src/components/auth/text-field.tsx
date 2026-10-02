"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FieldError, fieldLabelClass } from "@/components/auth/auth-ui";
import { cn } from "@/components/ui";
import { authCopy } from "@/content/auth";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: ReactNode;
  hint?: string;
  /** Conteúdo à direita do rótulo, ex.: "Esqueceu a senha?". */
  labelAside?: ReactNode;
  /** Campo de senha com botão de mostrar/ocultar. */
  password?: boolean;
};

export function TextField({ label, error, hint, labelAside, password = false, className, id, type, ...props }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = useState(false);
  const describedBy = [hint && !error ? `${inputId}-hint` : null, error ? `${inputId}-error` : null].filter(Boolean).join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={inputId} className={fieldLabelClass}>
          {label}
        </label>
        {labelAside}
      </div>
      <div className="relative">
        <input
          id={inputId}
          type={password ? (visible ? "text" : "password") : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            "block h-11 w-full rounded-sm border bg-surface px-3.5 font-sans text-[15px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-raised disabled:opacity-60",
            error ? "border-error-text focus:border-error-text focus:ring-error-bg" : "border-line focus:border-line-accent focus:ring-focus",
            password && "pr-12",
            className,
          )}
          {...props}
        />
        {password && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? authCopy.fields.hidePassword : authCopy.fields.showPassword}
            aria-pressed={visible}
            className="absolute right-0 top-0 flex size-11 items-center justify-center rounded-sm text-ink-tertiary hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            {visible ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
          </button>
        )}
      </div>
      {error ? <FieldError id={`${inputId}-error`}>{error}</FieldError> : null}
      {hint && !error ? (
        <p id={`${inputId}-hint`} className="font-sans text-[13px] leading-5 text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
