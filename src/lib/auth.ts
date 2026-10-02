import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Autenticação do protótipo, sem banco de dados: a conta de demonstração e, no máximo,
// uma conta criada no cadastro, guardada num cookie deste navegador.
// O cookie de sessão guarda só o e-mail da conta, então não é seguro contra falsificação;
// serve para simular a sessão até existir um backend de autenticação de verdade.

const DEMO_ACCOUNT = {
  name: "Aluno Aulaflix",
  email: "aulaflix@email.com",
  password: "aulaflix",
};

const SESSION_COOKIE = "aulaflix_session";
/** Nome da conta de demonstração alterado em Configurações; sem ele, vale o nome original. */
const NAME_COOKIE = "aulaflix_name";
/** Conta criada no cadastro. Um novo cadastro substitui a anterior. */
const ACCOUNT_COOKIE = "aulaflix_account";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 dias
} as const;

const accountCookieOptions = { ...cookieOptions, maxAge: 60 * 60 * 24 * 365 }; // 1 ano

export type SessionUser = {
  name: string;
  email: string;
  /** E-mail confirmado pelo link enviado no cadastro. A conta funciona antes disso. */
  verified: boolean;
};

type Account = SessionUser & { passwordHash: string };

const hashPassword = (password: string) => createHash("sha256").update(password).digest("hex");
const normalizeEmail = (email: string) => email.trim().toLowerCase();

/** Conta criada neste navegador, guardada como JSON em base64url. */
async function readCreatedAccount(): Promise<Account | null> {
  const raw = (await cookies()).get(ACCOUNT_COOKIE)?.value;
  if (!raw) return null;
  try {
    const value = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
    if (typeof value?.name !== "string" || typeof value?.email !== "string" || typeof value?.passwordHash !== "string") {
      return null;
    }
    return { name: value.name, email: value.email, passwordHash: value.passwordHash, verified: value.verified === true };
  } catch {
    return null;
  }
}

async function writeCreatedAccount(account: Account) {
  const raw = Buffer.from(JSON.stringify(account), "utf8").toString("base64url");
  (await cookies()).set(ACCOUNT_COOKIE, raw, accountCookieOptions);
}

/** A conta com esse e-mail: a de demonstração ou a criada neste navegador. */
async function findAccount(email: string): Promise<Account | null> {
  const normalized = normalizeEmail(email);
  if (normalized === DEMO_ACCOUNT.email) {
    const name = (await cookies()).get(NAME_COOKIE)?.value || DEMO_ACCOUNT.name;
    return { name, email: DEMO_ACCOUNT.email, passwordHash: hashPassword(DEMO_ACCOUNT.password), verified: true };
  }
  const created = await readCreatedAccount();
  return created?.email === normalized ? created : null;
}

const toSessionUser = ({ name, email, verified }: Account): SessionUser => ({ name, email, verified });

/** Usuário da sessão atual, ou `null` se ninguém entrou. Só no servidor. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const email = (await cookies()).get(SESSION_COOKIE)?.value;
  const account = email ? await findAccount(email) : null;
  return account && toSessionUser(account);
}

export async function accountExists(email: string) {
  return Boolean(await findAccount(email));
}

export async function checkCredentials(email: string, password: string): Promise<SessionUser | null> {
  const account = await findAccount(email);
  return account && account.passwordHash === hashPassword(password) ? toSessionUser(account) : null;
}

/** Cria a conta, com o e-mail ainda por confirmar. Só funciona dentro de Server Functions. */
export async function createAccount(input: { name: string; email: string; password: string }): Promise<SessionUser> {
  const account: Account = {
    name: input.name,
    email: normalizeEmail(input.email),
    passwordHash: hashPassword(input.password),
    verified: false,
  };
  await writeCreatedAccount(account);
  return toSessionUser(account);
}

/** Marca o e-mail da conta criada como confirmado. Só funciona dentro de Server Functions. */
export async function markEmailVerified(email: string) {
  const created = await readCreatedAccount();
  if (created?.email === email) await writeCreatedAccount({ ...created, verified: true });
}

/** Grava o cookie de sessão. Só funciona dentro de Server Functions. */
export async function startSession(user: SessionUser) {
  (await cookies()).set(SESSION_COOKIE, user.email, cookieOptions);
}

/** Troca o nome exibido da conta. Só funciona dentro de Server Functions. */
export async function setDisplayName(user: SessionUser, name: string) {
  if (user.email === DEMO_ACCOUNT.email) {
    (await cookies()).set(NAME_COOKIE, name, cookieOptions);
    return;
  }
  const created = await readCreatedAccount();
  if (created?.email === user.email) await writeCreatedAccount({ ...created, name });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/**
 * Aceita só caminhos internos (ex.: "/cursos"), para o `?next=` não virar redirecionamento aberto.
 * Recusa "//site" e também "/\site", que o navegador lê como "//site".
 */
export function safeNextPath(value: unknown): string {
  return typeof value === "string" && /^\/(?![/\\])/.test(value) ? value : "/";
}

/** Na tela de entrar, quem já está logado segue direto para o destino. */
export async function redirectIfSignedIn(next: unknown = "/") {
  if (await getSessionUser()) redirect(safeNextPath(next));
}

/** Páginas da conta: sem sessão, manda para o login e volta para `path` depois de entrar. */
export async function requireUser(path: string): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect(`/entrar?next=${encodeURIComponent(path)}`);
  return user;
}
