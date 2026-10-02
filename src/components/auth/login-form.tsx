"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthCard, AuthDivider, PrototypeNotice, inlineLinkClass, submitButtonClass } from "@/components/auth/auth-ui";
import { useFieldValidation } from "@/components/auth/hooks";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { TextField } from "@/components/auth/text-field";
import { cn } from "@/components/ui";
import { authCopy, authErrors, isEmail } from "@/content/auth";

// Protótipo: não há backend de autenticação. O envio só valida os campos e mostra um aviso.

export function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [notice, setNotice] = useState(false);

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
    setNotice(validation.submit());
  }

  return (
    <AuthCard label={authCopy.signIn.title}>
      <OAuthButtons onSelect={() => setNotice(true)} />
      <AuthDivider />
      <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
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
        <button type="submit" className={cn(submitButtonClass, "mt-2")}>
          {authCopy.signIn.submit}
        </button>
        {notice && <PrototypeNotice>{authCopy.prototype.unavailable}</PrototypeNotice>}
      </form>
    </AuthCard>
  );
}
