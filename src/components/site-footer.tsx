import Link from "next/link";
import { brandIcons } from "@/components/brand-icons";
import { Logo } from "@/components/logo";
import { cn, container } from "@/components/ui";
import { footerNav, instructor, site, socialLinks } from "@/content/site";

const smallRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-section";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-subtle bg-section">
      <div className={cn(container, "grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr_1.2fr]")}>
        <div className="space-y-4">
          <Logo size={18} offset="section" />
          <p className="max-w-[42ch] font-sans text-[14px] leading-[1.6] text-ink-tertiary">
            {site.description}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">Plataforma</h3>
          <ul className="space-y-2.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-sans text-[14px] text-ink-tertiary transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-subtle">
        <div
          className={cn(
            container,
            "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 font-mono text-[11px] text-ink-muted",
          )}
        >
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <div className="flex items-center gap-4">
            <ul className="flex items-center gap-3" aria-label={`${instructor.name} nas redes`}>
              {socialLinks.map((item) => {
                const Icon = brandIcons[item.icon];
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={cn("inline-flex text-ink-muted transition-colors hover:text-ink", smallRing)}
                    >
                      <Icon className="size-[15px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <span className="uppercase tracking-[0.08em]">{site.legalName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
