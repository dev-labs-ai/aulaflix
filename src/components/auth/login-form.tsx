"use client";

import Link from "next/link";
import { startTransition, useActionState, useState, type FormEvent } from "react";
import {
  AuthAlert,
  AuthCard,
  AuthDivider,
  PrototypeNotice,
  inlineLinkClass,
  submitButtonClass,
} from "@/components/auth/auth-ui";
import { useFieldValidation } from "@/components/auth/hooks";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { TextField } from "@/components/auth/text-field";
import { cn } from "@/components/ui";
import { authCopy, authErrors, isEmail } from "@/content/auth";
import { signIn } from "@/lib/auth-actions";

// O e-mail e a senha são conferidos no servidor (Server Action). Google e GitHub
// ainda não têm backend e só mostram um aviso.

export function LoginForm({ next }: { next: string }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [oauthNotice, setOauthNotice] = useState(false);
  const [state, signInAction, pending] = useActionState(signIn, { error: null });

  const errors: Partial<Record<keyof typeof values, string>> = {};
  if (!values.email.trim()) errors.email = authErrors.emailRequired;
  else if (!isEmail(values.email)) errors.email = authErrors.emailInvalid;
  if (!values.password) errors.password = authErrors.passwordRequired;

  const validation = useFieldValidation(values, errors);
  const field = (name: keyof typeof values) => ({
    name,
    value: values[name],
    onChange: (event: { target: { value: string } }) => setValues((v) => ({ ...v, [name]: event.target.value })),
    onBlur: validation.touch(name),
    error: validation.errorFor(name),
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !validation.submit()) return;
    const formData = new FormData(event.currentTarget);
    startTransition(() => signInAction(formData));
  }

  return (
    <AuthCard label={authCopy.signIn.title}>
      <OAuthButtons onSelect={() => setOauthNotice(true)} />
      <AuthDivider />
      <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
        {state.error && <AuthAlert tone="error">{state.error}</AuthAlert>}
        <input type="hidden" name="next" value={next} />
        <TextField
          label={authCopy.fields.email}
          type="email"
          autoComplete="email"
          placeholder={authCopy.fields.emailPlaceholder}
          {...field("email")}
        />
        <TextField
          label={authCopy.fields.password}
          password
          autoComplete="current-password"
          labelAside={
            <Link href="/redefinir-senha" className={cn(inlineLinkClass, "text-[13px] leading-[18px]")}>
              {authCopy.signIn.forgotPassword}
            </Link>
          }
          {...field("password")}
        />
        <button type="submit" disabled={pending} className={cn(submitButtonClass, "mt-2")}>
          {pending ? authCopy.signIn.pending : authCopy.signIn.submit}
        </button>
        {oauthNotice && <PrototypeNotice>{authCopy.prototype.unavailable}</PrototypeNotice>}
      </form>
    </AuthCard>
  );
}
