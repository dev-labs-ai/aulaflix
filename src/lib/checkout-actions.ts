"use server";

import { redirect } from "next/navigation";
import { getCourseDetail } from "@/content/course-details";
import { requireUser } from "@/lib/auth";
import { getOwnedCourseSlugs, recordPurchase, type PaymentMethod } from "@/lib/purchases";

export type CheckoutState = { error: string | null };

/**
 * Fecha o pedido do curso e leva à confirmação. Protótipo: nenhum pagamento é cobrado e os dados
 * do cartão nem chegam ao servidor; só a forma de pagamento e as parcelas.
 */
export async function purchaseCourse(courseSlug: string, _previous: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const path = `/cursos/${courseSlug}/comprar`;
  const user = await requireUser(path);
  const detail = getCourseDetail(courseSlug);
  if (detail?.kind !== "on-sale") return { error: "Este curso não está à venda." };
  if ((await getOwnedCourseSlugs(user)).has(courseSlug)) redirect(`/aprender/${courseSlug}`);

  const method = formData.get("method");
  if (method !== "pix" && method !== "card") return { error: "Escolha Pix ou cartão." };
  const { price, installments: maxInstallments, pixDiscount } = detail.pricing;
  const installments = method === "card" ? Number(formData.get("installments")) : undefined;
  if (installments !== undefined && !(Number.isInteger(installments) && installments >= 1 && installments <= maxInstallments)) {
    return { error: "Escolha o número de parcelas." };
  }

  const id = await recordPurchase(user, {
    course: courseSlug,
    method: method satisfies PaymentMethod,
    amount: method === "pix" ? price * (1 - pixDiscount) : price,
    installments,
  });
  redirect(`${path}?pedido=${id}`);
}
