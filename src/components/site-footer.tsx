import { cn, container } from "@/components/ui";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-subtle bg-section">
      <div
        className={cn(
          container,
          "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 font-mono text-[11px] text-ink-muted",
        )}
      >
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className="uppercase tracking-[0.08em]">{site.legalName}</span>
      </div>
    </footer>
  );
}
