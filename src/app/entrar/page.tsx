import type { Metadata } from "next";
import { AuthPageShell } from "@/components/auth/auth-ui";
import { EntryFlow } from "@/components/auth/entry-flow";
import { authCopy } from "@/content/auth";
import { redirectIfSignedIn, safeNextPath } from "@/lib/auth";

export const metadata: Metadata = {
  title: authCopy.signIn.title,
};

/**
 * Entrar e criar conta, numa tela só que começa pelo e-mail. Página isolada, sem header/rodapé
 * do site (fica fora do grupo `(site)`). `?next=/caminho` define para onde o usuário vai depois.
 */
export default async function EntrarPage(props: PageProps<"/entrar">) {
  const next = safeNextPath((await props.searchParams).next);
  await redirectIfSignedIn(next);

  return (
    <AuthPageShell>
      <EntryFlow next={next} />
    </AuthPageShell>
  );
}
