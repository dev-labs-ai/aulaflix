import type { ReactNode } from "react";
import { ArticleThumbPlaceholder, VideoThumbPlaceholder } from "@/components/placeholders";
import { Eyebrow, UnderlineLink, cn, focusRing, ringOffset } from "@/components/ui";

type MediaItem = { title: string; date: string; href: string };

/** Bloco "YouTube / QuantBrasil" ou "Substack / Code Capital" com três cartões. */
export function MediaFeed({
  source,
  name,
  linkLabel,
  href,
  items,
  kind,
  className,
}: {
  source: string;
  name: string;
  linkLabel: string;
  href: string;
  items: MediaItem[];
  kind: "video" | "article";
  className?: string;
}) {
  return (
    <div className={cn("reveal", className)}>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line-subtle pb-5 sm:gap-6">
        <div>
          <Eyebrow>{source}</Eyebrow>
          <h3 className="mt-3 font-heading text-[24px] font-semibold leading-[1.15] tracking-[-0.015em] text-ink sm:text-[28px]">
            {name}
          </h3>
        </div>
        <UnderlineLink href={href}>{linkLabel}</UnderlineLink>
      </header>
      <ul className="mt-10 grid gap-6 sm:gap-8 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href}>
            <MediaCard item={item} badge={kind === "video" ? "▶ YouTube" : "Substack"}>
              {kind === "video" ? <VideoThumbPlaceholder title={item.title} /> : <ArticleThumbPlaceholder />}
            </MediaCard>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MediaCard({ item, badge, children }: { item: MediaItem; badge: string; children: ReactNode }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-md border border-line-subtle bg-surface transition-colors hover:border-line",
        focusRing,
        ringOffset.canvas,
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#0c0e14]">
        {children}
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-sm bg-[#0c0e14]/85 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fafafa]"
        >
          {badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="font-heading text-[16px] font-semibold leading-[1.3] tracking-[-0.008em] text-ink transition-colors group-hover:text-ink-accent sm:text-[17px]">
          {item.title}
        </p>
        <p className="mt-auto font-mono text-[11px] tabular-nums text-ink-muted">{item.date}</p>
      </div>
    </a>
  );
}
