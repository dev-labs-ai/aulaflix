import type { Metadata } from "next";
import { AccountPage } from "@/components/account-page";
import { SettingsCard } from "@/components/settings-card";
import { settingsCopy as copy } from "@/content/account";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
};

export default async function ConfiguracoesPage() {
  const user = await requireUser("/configuracoes");

  return (
    <AccountPage id="configuracoes-title" title={copy.title}>
      <SettingsCard user={user} />
    </AccountPage>
  );
}
