"use server";

import { redirect } from "next/navigation";
import {
  accountExists,
  checkCredentials,
  createAccount,
  endSession,
  getSessionUser,
  markEmailVerified,
  requireUser,
  safeNextPath,
  setDisplayName,
  startSession,
} from "@/lib/auth";
import { settingsCopy } from "@/content/account";
import { AUTH_PASSWORD_MIN_LENGTH, authErrors, isEmail } from "@/content/auth";

const NAME_MAX_LENGTH = 80;

const text = (formData: FormData, field: string) => String(formData.get(field) ?? "");
const cleanName = (value: string) => value.trim().replace(/\s+/g, " ");

/** Primeiro passo do login: diz se já existe conta com o e-mail, para pedir a senha ou criar a conta. */
export async function lookUpEmail(email: string): Promise<{ exists: boolean } | { error: string }> {
  if (!isEmail(email)) return { error: authErrors.emailInvalid };
  return { exists: await accountExists(email) };
}

export type SignInState = { error: string | null };

export async function signIn(_previous: SignInState, formData: FormData): Promise<SignInState> {
  const user = await checkCredentials(text(formData, "email"), text(formData, "password"));
  if (!user) return { error: authErrors.wrongPassword };

  await startSession(user);
  redirect(safeNextPath(formData.get("next")));
}

export type SignUpState = { error: string | null };

/** Cria a conta e já entra nela; a confirmação do e-mail fica para depois, num aviso no site. */
export async function signUp(_previous: SignUpState, formData: FormData): Promise<SignUpState> {
  const name = cleanName(text(formData, "name"));
  const email = text(formData, "email");
  const password = text(formData, "password");
  if (!name) return { error: authErrors.nameRequired };
  if (name.length > NAME_MAX_LENGTH) return { error: settingsCopy.nameTooLong };
  if (!isEmail(email)) return { error: authErrors.emailInvalid };
  if (password.length < AUTH_PASSWORD_MIN_LENGTH) return { error: authErrors.passwordTooShort };
  if (await accountExists(email)) return { error: authErrors.emailTaken };

  await startSession(await createAccount({ name, email, password }));
  redirect(safeNextPath(formData.get("next")));
}

/** Protótipo: faz o papel do link de confirmação que iria por e-mail. */
export async function confirmEmail() {
  const user = await getSessionUser();
  if (user && !user.verified) await markEmailVerified(user.email);
}

export async function signOut() {
  await endSession();
  redirect("/");
}

export type UpdateNameState = { error: string | null };

export async function updateName(_previous: UpdateNameState, formData: FormData): Promise<UpdateNameState> {
  const user = await requireUser("/conta");
  const name = cleanName(text(formData, "name"));
  if (!name) return { error: authErrors.nameRequired };
  if (name.length > NAME_MAX_LENGTH) return { error: settingsCopy.nameTooLong };

  await setDisplayName(user, name);
  return { error: null };
}
