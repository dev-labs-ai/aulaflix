import { randomBytes } from "node:crypto";
import { getCourse, type Course } from "@/content/courses";
import type { SessionUser } from "@/lib/auth";
import { isRecord, readJsonCookie, writeJsonCookie } from "@/lib/cookie-store";

// Protótipo: pedidos iniciais fixos por conta e, depois, os feitos em /cursos/[slug]/comprar,
// guardados num cookie deste navegador (e-mail da conta → pedidos). Ter um pedido de um curso
// é o que dá acesso a ele (src/lib/enrollments.ts).
const PURCHASES_COOKIE = "aulaflix_purchases";

export type PaymentMethod = "pix" | "card";
export type PurchaseStatus = "paid";

type PurchaseRecord = {
  id: string;
  /** Data e hora do pedido, no fuso de Brasília. */
  createdAt: string;
  method: PaymentMethod;
  status: PurchaseStatus;
  /** Valor pago em reais. */
  amount: number;
  /** Parcelas no cartão (1 = à vista). */
  installments?: number;
  courses: string[];
};

export type Purchase = Omit<PurchaseRecord, "courses"> & { title: string; courses: Course[] };

const PURCHASES_BY_ACCOUNT: Record<string, PurchaseRecord[]> = {
  "aulaflix@email.com": [
    {
      id: "K7M2Q9XA",
      createdAt: "2026-09-28T19:42:00-03:00",
      method: "card",
      status: "paid",
      amount: 597,
      courses: ["frontend-com-react"],
    },
    {
      id: "B4T8N1RE",
      createdAt: "2026-09-15T10:05:00-03:00",
      method: "pix",
      status: "paid",
      amount: 447.3,
      courses: ["backend-com-node-js"],
    },
    {
      id: "H2V6C3PW",
      createdAt: "2026-08-22T21:17:00-03:00",
      method: "card",
      status: "paid",
      amount: 397,
      courses: ["sql-e-modelagem-de-dados"],
    },
  ],
};

async function readStore(): Promise<Record<string, PurchaseRecord[]>> {
  const value = await readJsonCookie(PURCHASES_COOKIE);
  return isRecord(value) ? (value as Record<string, PurchaseRecord[]>) : {};
}

async function purchaseRecords(user: SessionUser): Promise<PurchaseRecord[]> {
  const saved = (await readStore())[user.email];
  return [...(PURCHASES_BY_ACCOUNT[user.email] ?? []), ...(Array.isArray(saved) ? saved : [])];
}

/** Pedidos da conta, do mais recente para o mais antigo. */
export async function getPurchases(user: SessionUser): Promise<Purchase[]> {
  return (await purchaseRecords(user))
    .map((record) => {
      const courses = record.courses.flatMap((slug) => getCourse(slug) ?? []);
      // Cada pedido tem o nome do curso; com mais de um curso, o título resume a quantidade.
      const title = courses.length === 1 ? courses[0].title : `${courses.length} cursos`;
      return { ...record, title, courses };
    })
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

/** Slugs dos cursos que a conta comprou. */
export async function getOwnedCourseSlugs(user: SessionUser): Promise<Set<string>> {
  return new Set((await purchaseRecords(user)).flatMap((record) => record.courses));
}

/** Registra um pedido pago e devolve o número dele. Só funciona dentro de Server Functions. */
export async function recordPurchase(
  user: SessionUser,
  order: { course: string; method: PaymentMethod; amount: number; installments?: number },
): Promise<string> {
  const id = randomBytes(6).toString("base64url").toUpperCase().replace(/[^A-Z0-9]/g, "X").slice(0, 8);
  const record: PurchaseRecord = {
    id,
    createdAt: new Date().toISOString(),
    method: order.method,
    status: "paid",
    amount: Math.round(order.amount * 100) / 100,
    installments: order.installments,
    courses: [order.course],
  };
  const store = await readStore();
  const saved = Array.isArray(store[user.email]) ? store[user.email] : [];
  await writeJsonCookie(PURCHASES_COOKIE, { ...store, [user.email]: [...saved, record] });
  return id;
}
