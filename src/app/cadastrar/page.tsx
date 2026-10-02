import type { Metadata } from "next";
import { AuthPageShell } from "@/components/auth/auth-ui";
import { SignUpFlow } from "@/components/auth/signup-flow";
import { authCopy } from "@/content/auth";

export const metadata: Metadata = {
  title: authCopy.signUp.title,
};

/** Cadastro com confirmação de e-mail. Como /entrar, fica fora do grupo `(site)`. */
export default function CadastrarPage() {
  return (
    <AuthPageShell>
      <SignUpFlow />
    </AuthPageShell>
  );
}
