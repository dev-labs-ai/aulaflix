import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/entrar/login-form";
import { textLinkClass } from "@/components/entrar/styles";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Entrar",
};

/** Página isolada, sem header/rodapé do site (fica fora do grupo `(site)`). */
export default function EntrarPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <main className="flex justify-center px-4 pb-24 pt-6 sm:pt-16">
        <div className="flex w-full max-w-[440px] flex-col gap-6 sm:gap-7">
          <div className="self-start pb-3">
            <Logo />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-heading text-[28px] font-semibold leading-9 tracking-[-0.02em] text-ink sm:text-[32px] sm:leading-10">
              Entrar
            </h1>
          </div>
          <LoginForm />
          <p className="font-sans text-[14px] leading-[22px] text-ink-tertiary">
            Ainda não tem conta?{" "}
            <Link href="/cadastrar" className={textLinkClass}>
              Criar conta
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
