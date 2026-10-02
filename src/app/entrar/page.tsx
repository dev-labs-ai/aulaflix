import type { Metadata } from "next";
import Link from "next/link";
import { AuthHeading, AuthPageShell, AuthSwitch, inlineLinkClass } from "@/components/auth/auth-ui";
import { LoginForm } from "@/components/auth/login-form";
import { authCopy } from "@/content/auth";
import { redirectIfSignedIn, safeNextPath } from "@/lib/auth";

export const metadata: Metadata = {
  title: authCopy.signIn.title,
};

/**
 * Página isolada, sem header/rodapé do site (fica fora do grupo `(site)`).
 * `?next=/caminho` define para onde o usuário vai depois de entrar.
 */
export default async function EntrarPage(props: PageProps<"/entrar">) {
  const next = safeNextPath((await props.searchParams).next);
  await redirectIfSignedIn(next);

  return (
    <AuthPageShell>
      <AuthHeading title={authCopy.signIn.title} />
      <LoginForm next={next} />
      <AuthSwitch prompt={authCopy.signIn.switchPrompt}>
        <Link href="/cadastrar" className={inlineLinkClass}>
          {authCopy.signIn.switchLink}
        </Link>
      </AuthSwitch>
    </AuthPageShell>
  );
}
