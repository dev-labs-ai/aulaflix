"use server";

import { authErrors, isEmail } from "@/content/auth";
import { requireUser } from "@/lib/auth";
import { setWaitlist } from "@/lib/waitlist";

/** Quem entrou na conta: um clique em "Avise-me" usa o e-mail da conta. */
export async function joinWaitlist(courseSlug: string) {
  if (typeof courseSlug !== "string") return;
  const user = await requireUser(`/cursos/${courseSlug}`);
  await setWaitlist(user.email, courseSlug, true);
}

export async function leaveWaitlist(courseSlug: string) {
  if (typeof courseSlug !== "string") return;
  const user = await requireUser(`/cursos/${courseSlug}`);
  await setWaitlist(user.email, courseSlug, false);
}

export type WaitlistEmailState = { error: string | null; email: string | null };

/** Quem não entrou: pede só o e-mail. */
export async function joinWaitlistWithEmail(
  courseSlug: string,
  _previous: WaitlistEmailState,
  formData: FormData,
): Promise<WaitlistEmailState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: authErrors.emailRequired, email: null };
  if (!isEmail(email)) return { error: authErrors.emailInvalid, email: null };
  await setWaitlist(email, courseSlug, true);
  return { error: null, email };
}
