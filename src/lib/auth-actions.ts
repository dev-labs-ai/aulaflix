"use server";

import { redirect } from "next/navigation";
import { checkCredentials, endSession, safeNextPath, startSession } from "@/lib/auth";
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
