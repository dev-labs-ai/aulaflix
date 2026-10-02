import type { Metadata } from "next";
import { AuthPageShell } from "@/components/auth/auth-ui";
import { PasswordResetFlow } from "@/components/auth/password-reset-flow";
import { redirectIfSignedIn } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Redefinir senha",
};

/** Redefinição de senha por código enviado ao e-mail. Fica fora do grupo `(site)`. */
export default async function RedefinirSenhaPage() {
  await redirectIfSignedIn();

  return (
    <AuthPageShell>
      <PasswordResetFlow />
    </AuthPageShell>
  );
}
