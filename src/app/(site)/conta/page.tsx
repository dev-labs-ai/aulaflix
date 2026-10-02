import type { Metadata } from "next";
import { SettingsCard } from "@/components/settings-card";
import { settingsCopy as copy } from "@/content/account";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
};

/** Aba "Dados da conta" de /conta: nome, e-mail e senha. */
export default async function ContaPage() {
  const user = await requireUser("/conta");
  return <SettingsCard user={user} />;
}
