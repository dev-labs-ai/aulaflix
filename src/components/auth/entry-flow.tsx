"use client";

import Link from "next/link";
import { startTransition, useActionState, useState, type FormEvent } from "react";
import {
  AuthAlert,
  AuthCard,
  AuthDivider,
  AuthHeading,
  BackLink,
  Emphasis,
  PrototypeNotice,
  inlineLinkClass,
  submitButtonClass,
} from "@/components/auth/auth-ui";
import { useFieldValidation } from "@/components/auth/hooks";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { TextField } from "@/components/auth/text-field";
import { cn } from "@/components/ui";
import { AUTH_PASSWORD_MIN_LENGTH, authCopy, authErrors, isEmail } from "@/content/auth";
import { lookUpEmail, signIn, signUp } from "@/lib/auth-actions";

// Entrar e criar conta numa tela só: o e-mail vem primeiro e o servidor diz se já existe conta.
// Com conta, pede a senha; sem conta, pede nome e senha e cria a conta na hora.
// Google e GitHub ainda não têm backend e só mostram um aviso.

type Step = "email" | "password" | "create";
type HeadingLevel = "h1" | "h2";

/** `heading="h2"` quando o fluxo fica dentro de outra página (a de compra), que já tem o h1. */
export function EntryFlow({ next, heading = "h1" }: { next: string; heading?: HeadingLevel }) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  const back = () => setStep("email");

  if (step === "password") return <PasswordStep email={email.trim()} next={next} heading={heading} onBack={back} />;
  if (step === "create") return <CreateAccountStep email={email.trim()} next={next} heading={heading} onBack={back} />;
  return (
    <EmailStep
      email={email}
      heading={heading}
      onEmailChange={setEmail}
      onFound={(exists) => setStep(exists ? "password" : "create")}
    />
  );
}

function EmailStep({
  email,
  heading,
  onEmailChange,
  onFound,
}: {
  email: string;
  heading: HeadingLevel;
  onEmailChange: (email: string) => void;
  onFound: (exists: boolean) => void;
}) {
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [oauthNotice, setOauthNotice] = useState(false);

  const validation = useFieldValidation(
    { email },
    { email: !email.trim() ? authErrors.emailRequired : isEmail(email) ? undefined : authErrors.emailInvalid },
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !validation.submit()) return;
    setPending(true);
    setServerError(null);
    try {
      const result = await lookUpEmail(email.trim());
      if ("error" in result) setServerError(result.error);
      else onFound(result.exists);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <AuthHeading as={heading} title={authCopy.entry.title} body={authCopy.entry.body} />
      <AuthCard label={authCopy.entry.title}>
        <OAuthButtons onSelect={() => setOauthNotice(true)} />
        {oauthNotice && <PrototypeNotice>{authCopy.prototype.unavailable}</PrototypeNotice>}
        <AuthDivider />
        <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
          {serverError && <AuthAlert tone="error">{serverError}</AuthAlert>}
          <TextField
            label={authCopy.fields.email}
            type="email"
            name="email"
            autoComplete="email"
            placeholder={authCopy.fields.emailPlaceholder}
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            onBlur={validation.touch("email")}
            error={validation.errorFor("email")}
          />
          <button type="submit" disabled={pending} className={cn(submitButtonClass, "mt-2")}>
            {pending ? authCopy.entry.pending : authCopy.entry.submit}
          </button>
        </form>
      </AuthCard>
    </>
  );
}

/** Cabeçalho dos passos depois do e-mail: voltar, título e o e-mail escolhido. */
function StepHeading({
  title,
  body,
  heading,
  onBack,
}: {
  title: string;
  body: readonly [string, string, string];
  heading: HeadingLevel;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <BackLink onClick={onBack} />
      <AuthHeading as={heading} title={title} body={<Emphasis parts={body} />} />
    </div>
  );
}

/** O e-mail já escolhido vai junto no envio, e também ajuda o gerenciador de senhas a salvar o par. */
function EmailCarry({ email }: { email: string }) {
  return <input type="email" name="email" autoComplete="username" value={email} readOnly hidden />;
}

type FollowUpProps = { email: string; next: string; heading: HeadingLevel; onBack: () => void };

function PasswordStep({ email, next, heading, onBack }: FollowUpProps) {
  const [password, setPassword] = useState("");
  const [state, signInAction, pending] = useActionState(signIn, { error: null });
  const validation = useFieldValidation({ password }, { password: password ? undefined : authErrors.passwordRequired });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !validation.submit()) return;
    const formData = new FormData(event.currentTarget);
    startTransition(() => signInAction(formData));
  }

  return (
    <>
      <StepHeading title={authCopy.signIn.heading} body={authCopy.signIn.body(email)} heading={heading} onBack={onBack} />
      <AuthCard label={authCopy.signIn.title}>
        <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
          {state.error && <AuthAlert tone="error">{state.error}</AuthAlert>}
          <input type="hidden" name="next" value={next} />
          <EmailCarry email={email} />
          <TextField
            label={authCopy.fields.password}
            name="password"
            password
            autoComplete="current-password"
            autoFocus
            labelAside={
              <Link href="/redefinir-senha" className={cn(inlineLinkClass, "text-[13px] leading-[18px]")}>
                {authCopy.signIn.forgotPassword}
              </Link>
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={validation.touch("password")}
            error={validation.errorFor("password")}
          />
          <button type="submit" disabled={pending} className={cn(submitButtonClass, "mt-2")}>
            {pending ? authCopy.signIn.pending : authCopy.signIn.submit}
          </button>
        </form>
      </AuthCard>
    </>
  );
}

function CreateAccountStep({ email, next, heading, onBack }: FollowUpProps) {
  const [values, setValues] = useState({ name: "", password: "" });
  const [state, signUpAction, pending] = useActionState(signUp, { error: null });

  const validation = useFieldValidation(values, {
    name: values.name.trim() ? undefined : authErrors.nameRequired,
    password: values.password.length < AUTH_PASSWORD_MIN_LENGTH ? authErrors.passwordTooShort : undefined,
  });
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
    startTransition(() => signUpAction(formData));
  }

  return (
    <>
      <StepHeading title={authCopy.signUp.heading} body={authCopy.signUp.body(email)} heading={heading} onBack={onBack} />
      <AuthCard label={authCopy.signUp.heading}>
        <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
          {state.error && <AuthAlert tone="error">{state.error}</AuthAlert>}
          <input type="hidden" name="next" value={next} />
          <EmailCarry email={email} />
          <TextField
            label={authCopy.fields.name}
            autoComplete="name"
            placeholder={authCopy.fields.namePlaceholder}
            autoFocus
            {...field("name")}
          />
          <TextField
            label={authCopy.fields.password}
            password
            autoComplete="new-password"
            hint={authCopy.fields.passwordHint}
            {...field("password")}
          />
          <button type="submit" disabled={pending} className={cn(submitButtonClass, "mt-2")}>
            {pending ? authCopy.signUp.pending : authCopy.signUp.submit}
          </button>
          <p className="text-[14px] leading-5 text-ink-muted">{authCopy.signUp.confirmLater}</p>
        </form>
      </AuthCard>
    </>
  );
}
