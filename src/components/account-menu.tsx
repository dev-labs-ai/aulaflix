"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookOpen, ChevronDown, LogOut, Receipt, Settings, type LucideIcon } from "lucide-react";
import { cn, focusRing, ringOffset } from "@/components/ui";
import { accountMenu, initials, type AccountIcon } from "@/content/account";
import type { SessionUser } from "@/lib/auth";
import { signOut } from "@/lib/auth-actions";

const accountIcons: Record<AccountIcon, LucideIcon> = {
  "book-open": BookOpen,
  receipt: Receipt,
  settings: Settings,
};

const itemClass =
  "flex w-full items-center gap-2.5 rounded-control px-3 py-2.5 text-left text-[15px] text-ink-secondary transition-colors hover:bg-section focus-visible:bg-section focus-visible:outline-none";
const itemIconClass = "size-[18px] shrink-0 text-ink-tertiary";

export function UserAvatar({ user }: { user: SessionUser }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-amarelo-300 text-[13px] font-bold text-ink"
    >
      {initials(user.name, user.email)}
    </span>
  );
}

/** Avatar com menu suspenso da conta (desktop). */
export function AccountMenu({ user }: { user: SessionUser }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);
  const SettingsIcon = accountIcons[accountMenu.settings.icon];

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={accountMenu.open}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-11 items-center gap-1.5 rounded-full border border-line bg-surface pl-1.5 pr-2.5 transition-colors hover:bg-section",
          focusRing,
          ringOffset.canvas,
        )}
      >
        <UserAvatar user={user} />
        <ChevronDown aria-hidden="true" className="size-4 text-ink-muted" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={accountMenu.label}
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[272px] rounded-card bg-surface-raised p-2 shadow-(--shadow-pop)"
        >
          <div className="border-b border-line-subtle px-3 pb-3 pt-2.5">
            <p className="truncate text-[15px] font-bold text-ink">{user.name}</p>
            <p className="truncate text-[14px] text-ink-muted">{user.email}</p>
          </div>
          <div className="flex flex-col pt-1.5">
            {accountMenu.links.map((link) => {
              const Icon = accountIcons[link.icon];
              return (
                <Link key={link.href} href={link.href} role="menuitem" onClick={close} className={itemClass}>
                  <Icon aria-hidden="true" className={itemIconClass} />
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-1.5 border-t border-line-subtle pt-1.5">
            <Link href={accountMenu.settings.href} role="menuitem" onClick={close} className={itemClass}>
              <SettingsIcon aria-hidden="true" className={itemIconClass} />
              {accountMenu.settings.label}
            </Link>
            <form action={signOut}>
              <button type="submit" role="menuitem" className={itemClass}>
                <LogOut aria-hidden="true" className={itemIconClass} />
                {accountMenu.signOut}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/** Rodapé do menu mobile com o usuário logado: dados da conta, Configurações e Sair. */
export function MobileAccountPanel({ user, onNavigate }: { user: SessionUser; onNavigate: () => void }) {
  const SettingsIcon = accountIcons[accountMenu.settings.icon];
  const buttonClass =
    "inline-flex h-11 w-full items-center justify-center gap-2 rounded-control border border-line bg-surface px-4 text-[15px] font-bold text-ink transition-colors hover:border-line-strong hover:bg-section";

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2.5">
        <UserAvatar user={user} />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-bold text-ink">{user.name}</p>
          <p className="truncate text-[14px] text-ink-muted">{user.email}</p>
        </div>
      </div>
      <Link href={accountMenu.settings.href} onClick={onNavigate} className={buttonClass}>
        <SettingsIcon aria-hidden="true" className="size-4" />
        {accountMenu.settings.label}
      </Link>
      <form action={signOut}>
        <button type="submit" className={buttonClass}>
          <LogOut aria-hidden="true" className="size-4" />
          {accountMenu.signOut}
        </button>
      </form>
    </div>
  );
}
