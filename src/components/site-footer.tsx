import { cn, container } from "@/components/ui";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-section">
      <div
        className={cn(
          container,
          "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 text-[14px] text-ink-muted",
        )}
      >
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.legalName}</span>
      </div>
    </footer>
  );
}
