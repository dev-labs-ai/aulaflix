import { AccountPage } from "@/components/account-page";
import { AccountTabs } from "@/components/account-tabs";
import { accountCopy } from "@/content/account";

/** /conta e suas abas: dados da conta e compras. Cada página confere a sessão com `requireUser`. */
export default function ContaLayout({ children }: LayoutProps<"/conta">) {
  return (
    <AccountPage id="conta-title" title={accountCopy.title}>
      <AccountTabs />
      {children}
    </AccountPage>
  );
}
