"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, focusRing, ringOffset } from "@/components/ui";
import { accountCopy } from "@/content/account";

/** Abas de /conta. São links (cada aba é uma página), com a atual marcada por `aria-current`. */
export function AccountTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label={accountCopy.tabsLabel} className="mt-6 border-b border-line">
      <ul className="-mb-px flex gap-7">
        {accountCopy.tabs.map((tab) => {
          const current = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex h-12 items-center rounded-t-control border-b-[3px] text-[16px] font-bold transition-colors",
                  current ? "border-lousa-400 text-ink" : "border-transparent text-ink-tertiary hover:text-ink",
                  focusRing,
                  ringOffset.canvas,
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
