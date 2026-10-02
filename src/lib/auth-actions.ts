"use server";

import { redirect } from "next/navigation";
import { checkCredentials, endSession, requireUser, safeNextPath, setDisplayName, startSession } from "@/lib/auth";
import { settingsCopy } from "@/content/account";
import { authErrors } from "@/content/auth";

export type SignInState = { error: string | null };

export async function signIn(_previous: SignInState, formData: FormData): Promise<SignInState> {
  const user = checkCredentials(String(formData.get("email") ?? ""), String(formData.get("password") ?? ""));
  if (!user) return { error: authErrors.wrongCredentials };

  await startSession(user);
  redirect(safeNextPath(formData.get("next")));
}

export async function signOut() {
  await endSession();
  redirect("/");
}

export type UpdateNameState = { error: string | null };

export async function updateName(_previous: UpdateNameState, formData: FormData): Promise<UpdateNameState> {
  await requireUser("/configuracoes");
  const name = String(formData.get("name") ?? "")
    .trim()
    .replace(/\s+/g, " ");
  if (!name) return { error: authErrors.nameRequired };
  if (name.length > 80) return { error: settingsCopy.nameTooLong };

  await setDisplayName(name);
  return { error: null };
}
