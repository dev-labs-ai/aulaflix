"use client";

import { useActionState, useState, type ReactNode } from "react";
import { Emphasis, FieldError } from "@/components/auth/auth-ui";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import { cn, focusRing, ringOffset } from "@/components/ui";
import { settingsCopy as copy } from "@/content/account";
import type { SessionUser } from "@/lib/auth";
import { updateName } from "@/lib/auth-actions";

const textButton = (tone: "accent" | "muted") =>
  cn(
    "-my-1 rounded-sm px-2 py-1 font-sans text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:opacity-50",
    tone === "accent" ? "font-semibold text-ink-accent hover:text-accent-700" : "font-medium text-ink-tertiary hover:text-ink",
  );

/**
 * Linha do cartão: rótulo, valor e ação. No celular o valor desce para baixo do
 * rótulo; a partir de `sm` os três ficam lado a lado.
 */
function Row({
  label,
  value,
  aside,
  children,
  formAction,
}: {
  label: string;
  value?: ReactNode;
  /** Ação à direita (link ou botão). */
  aside?: ReactNode;
  children?: ReactNode;
  /** Quando presente, a linha inteira vira um <form> com esta action. */
  formAction?: (formData: FormData) => void;
}) {
  const content = (
    <>
      <div className="grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1.5 px-6 py-3 sm:grid-cols-[140px_minmax(0,1fr)_auto]">
        <span className="col-start-1 row-start-1 font-sans text-[14px] font-medium text-ink-secondary">{label}</span>
        {value !== undefined && (
          <div className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-1">{value}</div>
        )}
        {aside && (
          <div className="col-start-2 row-start-1 flex items-center justify-self-end gap-1.5 sm:col-start-3">{aside}</div>
        )}
      </div>
      {children}
    </>
  );
  return formAction ? <form action={formAction}>{content}</form> : <div>{content}</div>;
}

const valueText = "block truncate font-sans text-[14px] text-ink";

export function SettingsCard({ user }: { user: SessionUser }) {
  const [editingName, setEditingName] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  return (
    <div className="mt-8 max-w-[640px] divide-y divide-line-subtle rounded-md border border-line bg-surface">
      {editingName ? (
        <NameEditor current={user.name} onClose={() => setEditingName(false)} />
      ) : (
        <Row
          label={copy.name}
          value={<span className={valueText}>{user.name}</span>}
          aside={
            <button type="button" onClick={() => setEditingName(true)} className={textButton("accent")}>
              {copy.edit}
            </button>
          }
        />
      )}

      <Row label={copy.email} value={<span className={valueText}>{user.email}</span>} />

      <Row
        label={copy.password}
        aside={
          changingPassword ? (
            <button type="button" onClick={() => setChangingPassword(false)} className={textButton("accent")}>
              {copy.cancel}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setChangingPassword(true)}
              className={cn(
                "inline-flex h-9 items-center rounded-sm border border-line bg-surface px-4 font-sans text-[14px] font-semibold text-ink transition-colors hover:border-line-strong hover:bg-section",
                focusRing,
                ringOffset.canvas,
              )}
            >
              {copy.changePassword}
            </button>
          )
        }
      >
        {changingPassword && (
          <div className="px-6 pb-6">
            {/* Protótipo: o "envio" do código é imediato e qualquer código de 6 dígitos é aceito. */}
            <div className="flex max-w-[440px] flex-col gap-5">
              <p className="font-sans text-[15px] leading-[1.6] text-ink-tertiary">
                <Emphasis parts={copy.codeSent(user.email)} />
              </p>
              <NewPasswordForm
                email={user.email}
                submitLabel={copy.savePassword}
                savedNotice={copy.passwordSavedNotice}
              />
            </div>
          </div>
        )}
      </Row>
    </div>
  );
}

/** Edição do nome. Desmonta ao cancelar ou salvar, o que zera o erro anterior. */
function NameEditor({ current, onClose }: { current: string; onClose: () => void }) {
  const [state, saveName, pending] = useActionState(
    async (previous: { error: string | null }, formData: FormData) => {
      const result = await updateName(previous, formData);
      if (!result.error) onClose();
      return result;
    },
    { error: null },
  );

  return (
    <Row
      formAction={saveName}
      label={copy.name}
      value={
        <div className="flex flex-col gap-1.5 sm:-ml-3">
          <input
            name="name"
            defaultValue={current}
            autoFocus
            autoComplete="name"
            aria-label={copy.name}
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "name-error" : undefined}
            className={cn(
              "h-9 w-full max-w-72 rounded-sm border bg-surface px-3 font-sans text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
              state.error ? "border-error-text focus:ring-error-bg" : "border-line focus:border-line-accent focus:ring-focus",
            )}
          />
          {state.error && <FieldError id="name-error">{state.error}</FieldError>}
        </div>
      }
      aside={
        <>
          <button type="button" onClick={onClose} className={textButton("muted")}>
            {copy.cancel}
          </button>
          <button type="submit" disabled={pending} className={textButton("accent")}>
            {copy.save}
          </button>
        </>
      }
    />
  );
}
