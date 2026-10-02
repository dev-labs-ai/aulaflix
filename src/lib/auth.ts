import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Autenticação do protótipo: uma única conta de demonstração, sem banco de dados.
// O cookie guarda só o e-mail da conta, então não é seguro contra falsificação;
// serve para simular a sessão até existir um backend de autenticação de verdade.

const DEMO_ACCOUNT = {
  name: "Aluno Aulaflix",
  email: "aulaflix@email.com",
  password: "aulaflix",
};

const SESSION_COOKIE = "aulaflix_session";
/** Nome alterado em Configurações; sem ele, vale o nome da conta. */
const NAME_COOKIE = "aulaflix_name";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 dias
} as const;

export type SessionUser = { name: string; email: string };

/** Usuário da sessão atual, ou `null` se ninguém entrou. Só no servidor. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  if (store.get(SESSION_COOKIE)?.value !== DEMO_ACCOUNT.email) return null;
  return { name: store.get(NAME_COOKIE)?.value || DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email };
}

export function checkCredentials(email: string, password: string): SessionUser | null {
  const matches = email.trim().toLowerCase() === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password;
  return matches ? { name: DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email } : null;
}

/** Grava o cookie de sessão. Só funciona dentro de Server Functions. */
export async function startSession(user: SessionUser) {
  (await cookies()).set(SESSION_COOKIE, user.email, cookieOptions);
}

/** Troca o nome exibido da conta. Só funciona dentro de Server Functions. */
export async function setDisplayName(name: string) {
  (await cookies()).set(NAME_COOKIE, name, cookieOptions);
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Aceita só caminhos internos (ex.: "/cursos"), para o `?next=` não virar redirecionamento aberto. */
export function safeNextPath(value: unknown): string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

/** Nas telas de entrar/cadastrar, quem já está logado segue direto para o destino. */
export async function redirectIfSignedIn(next: unknown = "/") {
  if (await getSessionUser()) redirect(safeNextPath(next));
}

/** Páginas da conta: sem sessão, manda para o login e volta para `path` depois de entrar. */
export async function requireUser(path: string): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect(`/entrar?next=${encodeURIComponent(path)}`);
  return user;
}
