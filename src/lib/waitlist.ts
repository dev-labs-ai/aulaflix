import { getCourse } from "@/content/courses";
import { isRecord, readJsonCookie, writeJsonCookie } from "@/lib/cookie-store";

// Protótipo: as inscrições na lista de espera ficam num cookie deste navegador, por e-mail
// (o da conta, para quem entrou, ou o digitado no formulário): e-mail → slugs dos cursos.
// Nenhum aviso é enviado de verdade.
const WAITLIST_COOKIE = "aulaflix_waitlist";

type WaitlistStore = Record<string, string[]>;

async function readWaitlist(): Promise<WaitlistStore> {
  const value = await readJsonCookie(WAITLIST_COOKIE);
  return isRecord(value) ? (value as WaitlistStore) : {};
}

const normalize = (email: string) => email.trim().toLowerCase();

export async function isOnWaitlist(email: string, courseSlug: string) {
  const courses = (await readWaitlist())[normalize(email)];
  return Array.isArray(courses) && courses.includes(courseSlug);
}

/** Inscreve (ou, com `join = false`, desinscreve) o e-mail. Só para cursos em lista de espera. */
export async function setWaitlist(email: string, courseSlug: string, join: boolean) {
  if (getCourse(courseSlug)?.status !== "waitlist") return;
  const store = await readWaitlist();
  const key = normalize(email);
  const current = new Set(Array.isArray(store[key]) ? store[key] : []);
  if (join) current.add(courseSlug);
  else current.delete(courseSlug);
  await writeJsonCookie(WAITLIST_COOKIE, { ...store, [key]: [...current] });
}
