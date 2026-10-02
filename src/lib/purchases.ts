import { getCourse, type Course } from "@/content/courses";
import type { SessionUser } from "@/lib/auth";

// Protótipo: pedidos fixos por conta, coerentes com os cursos de src/lib/enrollments.ts.

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
      courses: ["design-de-interfaces"],
    },
    {
      id: "B4T8N1RE",
      createdAt: "2026-09-15T10:05:00-03:00",
      method: "pix",
      status: "paid",
      amount: 447.3,
      courses: ["programacao-do-zero"],
    },
    {
      id: "H2V6C3PW",
      createdAt: "2026-08-22T21:17:00-03:00",
      method: "card",
      status: "paid",
      amount: 397,
      courses: ["analise-de-dados-com-planilhas"],
    },
  ],
};

/** Pedidos da conta, do mais recente para o mais antigo. */
export function getPurchases(user: SessionUser): Purchase[] {
  return (PURCHASES_BY_ACCOUNT[user.email] ?? [])
    .map((record) => {
      const courses = record.courses.flatMap((slug) => getCourse(slug) ?? []);
      // Cada pedido tem o nome do curso; com mais de um curso, o título resume a quantidade.
      const title = courses.length === 1 ? courses[0].title : `${courses.length} cursos`;
      return { ...record, title, courses };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
