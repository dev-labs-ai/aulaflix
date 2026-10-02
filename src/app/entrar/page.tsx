import type { Metadata } from "next";
import Link from "next/link";
import { AuthHeading, AuthPageShell, AuthSwitch, inlineLinkClass } from "@/components/auth/auth-ui";
import { LoginForm } from "@/components/auth/login-form";
import { authCopy } from "@/content/auth";

export const metadata: Metadata = {
  title: authCopy.signIn.title,
};

/** Página isolada, sem header/rodapé do site (fica fora do grupo `(site)`). */
export default function EntrarPage() {
  return (
    <AuthPageShell>
      <AuthHeading title={authCopy.signIn.title} />
      <LoginForm />
      <AuthSwitch prompt={authCopy.signIn.switchPrompt}>
        <Link href="/cadastrar" className={inlineLinkClass}>
          {authCopy.signIn.switchLink}
        </Link>
      </AuthSwitch>
    </AuthPageShell>
  );
}
