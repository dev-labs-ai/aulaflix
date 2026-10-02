"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AccountMenu, MobileAccountPanel } from "@/components/account-menu";
import { Logo } from "@/components/logo";
import { cn, container, focusRing, ringOffset } from "@/components/ui";
import { accountMenu } from "@/content/account";
import { authCopy } from "@/content/auth";
import { mainNav } from "@/content/site";
import type { SessionUser } from "@/lib/auth";

const navLink = cn("font-sans text-[14px] text-ink-tertiary transition-colors hover:text-ink", focusRing, ringOffset.canvas);

const NavBadge = ({ children }: { children: string }) => (
  <span className="ml-2 inline-flex rounded-full bg-preview-bg px-2 py-0.5 align-middle font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-preview-text">
    {children}
  </span>
);

/** `user` vem do servidor (cookie de sessão); `null` mostra o botão Entrar. */
export function SiteHeader({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  // O menu fecha sozinho ao navegar, porque fica associado à rota em que foi aberto.
  const open = openPath === pathname;
  const closeMenu = () => setOpenPath(null);

  // No celular, quem está logado também vê os atalhos da conta junto do menu principal.
  const mobileLinks = user ? [...mainNav, ...accountMenu.links] : mainNav;

  return (
    <header className="sticky top-0 z-50 border-b border-line-subtle bg-canvas/90 backdrop-blur">
      <div className={cn(container, "flex h-16 items-center justify-between")}>
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className={navLink}>
              {item.label}
              {item.badge && <NavBadge>{item.badge}</NavBadge>}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <AccountMenu user={user} />
          ) : (
            <Link
              href="/entrar"
              className={cn(
                "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-sm bg-surface-accent px-5 py-2 font-sans text-[14px] font-medium text-ink-inverse transition-colors duration-150 hover:bg-accent-600",
                focusRing,
                ringOffset.canvas,
              )}
            >
              {authCopy.signIn.title}
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpenPath(open ? null : pathname)}
          className="inline-flex size-10 items-center justify-center rounded-sm border border-line text-ink md:hidden"
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line-subtle bg-canvas md:hidden">
          <div className={cn(container, "py-4")}>
            <nav aria-label="Principal (mobile)" className="flex flex-col gap-1">
              {mobileLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMenu} className={cn(navLink, "py-2.5 text-[15px]")}>
                  {item.label}
                  {"badge" in item && item.badge && <NavBadge>{item.badge}</NavBadge>}
                </Link>
              ))}
            </nav>
            <div className="mt-3 border-t border-line-subtle pt-4">
              {user ? (
                <MobileAccountPanel user={user} onNavigate={closeMenu} />
              ) : (
                <Link
                  href="/entrar"
                  onClick={closeMenu}
                  className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-surface-accent font-sans text-[15px] font-medium text-ink-inverse"
                >
                  {authCopy.signIn.title}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
