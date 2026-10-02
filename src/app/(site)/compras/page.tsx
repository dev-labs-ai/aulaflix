import type { Metadata } from "next";
import { AccountEmptyState, AccountPage } from "@/components/account-page";
import { Badge } from "@/components/ui";
import { purchasesCopy as copy } from "@/content/account";
import { requireUser } from "@/lib/auth";
import { getPurchases, type Purchase } from "@/lib/purchases";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
};

const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** "2 out 2026, 00:10", no fuso de Brasília. */
function formatDate(iso: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date(iso))
      .map((part) => [part.type, part.value]),
  );
  return `${parts.day} ${months[Number(parts.month) - 1]} ${parts.year}, ${parts.hour}:${parts.minute}`;
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** "A, B e C." */
function listCourses(titles: string[]) {
  return `${titles.length > 1 ? `${titles.slice(0, -1).join(", ")} e ${titles.at(-1)}` : titles[0]}.`;
}

export default async function ComprasPage() {
  const user = await requireUser("/compras");
  const purchases = getPurchases(user);

  return (
    <AccountPage id="compras-title" title={copy.title}>
      {purchases.length > 0 ? (
        <ul className="mt-8 flex flex-col gap-4">
          {purchases.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </ul>
      ) : (
        <AccountEmptyState {...copy.empty} />
      )}
    </AccountPage>
  );
}

function PurchaseCard({ purchase }: { purchase: Purchase }) {
  const meta = [copy.paymentMethod[purchase.method], formatDate(purchase.createdAt), copy.order(purchase.id)];

  return (
    <li className="rounded-card border border-line bg-surface p-5 shadow-(--shadow-raised) sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h2 className="font-heading text-[20px] font-bold leading-[1.3] tracking-[-0.015em] text-ink">
              {purchase.title}
            </h2>
            <Badge tone="lousa">{copy.status[purchase.status]}</Badge>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[14px] tabular-nums text-ink-muted">
            {meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="font-heading text-[22px] font-bold tabular-nums text-ink">{brl.format(purchase.amount)}</p>
      </div>

      {/* Com cursos avulsos, a lista de cursos só aparece quando o pedido tem mais de um. */}
      {purchase.courses.length > 1 && (
        <div className="mt-5">
          <p className="text-[14px] font-bold text-ink-secondary">{copy.includes}</p>
          <p className="mt-1 text-[15px] leading-[1.6] text-ink-tertiary">
            {listCourses(purchase.courses.map((course) => course.title))}
          </p>
        </div>
      )}
    </li>
  );
}
