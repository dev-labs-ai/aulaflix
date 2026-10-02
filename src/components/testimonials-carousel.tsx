"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { InitialAvatar } from "@/components/placeholders";
import { cn } from "@/components/ui";
import type { Testimonial } from "@/content/home";

const controlClass =
  "group/control -m-2 inline-flex items-center gap-1.5 p-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-tertiary transition-colors duration-200 ease-out hover:text-ink focus-visible:rounded-sm focus-visible:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-section disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-ink-tertiary";

/** Carrossel com scroll nativo + snap; botões e indicadores apenas movem o scroll. */
export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ index: 0, atStart: true, atEnd: false });

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const update = () => {
      const slides = scroller.querySelectorAll<HTMLElement>("[data-slide]");
      const padding = parseFloat(getComputedStyle(scroller).scrollPaddingLeft) || 0;
      const origin = scroller.getBoundingClientRect().left + padding;
      let index = 0;
      let best = Infinity;
      slides.forEach((slide, i) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - origin);
        if (distance < best) {
          best = distance;
          index = i;
        }
      });
      const max = scroller.scrollWidth - scroller.clientWidth;
      setPosition({ index, atStart: scroller.scrollLeft <= 2, atEnd: scroller.scrollLeft >= max - 2 });
    };

    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goTo = (index: number) => {
    const slides = scrollerRef.current?.querySelectorAll<HTMLElement>("[data-slide]");
    const target = slides?.[Math.max(0, Math.min(index, slides.length - 1))];
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <div className="relative mt-10 sm:mt-12">
      <div className="mb-6 hidden items-center justify-end gap-4 sm:flex">
        <button
          type="button"
          aria-label="Comentário anterior"
          disabled={position.atStart}
          onClick={() => goTo(position.index - 1)}
          className={controlClass}
        >
          <ChevronLeft
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 ease-out group-hover/control:-translate-x-0.5 group-disabled/control:transform-none"
          />
          <span>Anterior</span>
        </button>
        <button
          type="button"
          aria-label="Próximo comentário"
          disabled={position.atEnd}
          onClick={() => goTo(position.index + 1)}
          className={controlClass}
        >
          <span>Próximo</span>
          <ChevronRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 ease-out group-hover/control:translate-x-0.5 group-disabled/control:transform-none"
          />
        </button>
      </div>

      <div className="relative -mx-4 sm:-mx-6 lg:-mx-10">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-linear-to-r from-section to-transparent transition-opacity duration-300 ease-out lg:w-10",
            position.atStart ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-linear-to-l from-section to-transparent transition-opacity duration-300 ease-out lg:w-10",
            position.atEnd ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          ref={scrollerRef}
          aria-roledescription="carousel"
          aria-label="Comentários de leitores no YouTube"
          className="snap-x snap-mandatory scroll-px-6 overflow-x-auto [scrollbar-width:none] lg:scroll-px-10 [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max items-stretch gap-5 px-6 sm:gap-6 lg:px-10">
            {items.map((item, i) => (
              <div
                key={item.href}
                data-slide
                role="group"
                aria-roledescription="slide"
                aria-label={`Comentário ${i + 1} de ${items.length}`}
                className="w-[72vw] shrink-0 grow-0 snap-start sm:w-[360px] lg:w-[380px]"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Comentário de ${item.author} no YouTube`}
                  className="group flex h-full w-full min-w-0 flex-col focus-visible:outline-none"
                >
                  <figure className="relative flex h-full flex-col justify-between gap-6 rounded-md border border-line-subtle bg-surface p-7 transition-colors duration-200 ease-out group-hover:border-line group-focus-visible:ring-2 group-focus-visible:ring-focus group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-section sm:p-8">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="absolute right-5 top-5 size-4 text-ink-muted transition-colors duration-200 ease-out group-hover:text-ink-accent"
                    />
                    <blockquote>
                      <p className="line-clamp-7 pr-8 font-sans text-[15px] leading-[1.65] text-ink-secondary sm:text-[16px]">
                        <span aria-hidden="true" className="mr-1 text-ink-muted">
                          “
                        </span>
                        {item.quote}
                        <span aria-hidden="true" className="ml-1 text-ink-muted">
                          ”
                        </span>
                      </p>
                    </blockquote>
                    <figcaption className="flex items-start gap-3 border-t border-line-subtle pt-5">
                      <InitialAvatar name={item.author} />
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-[15px] font-semibold tracking-[-0.005em] text-ink">{item.author}</p>
                        <p className="mt-1 font-mono text-[11px] leading-[1.4] text-ink-muted">{item.video}</p>
                      </div>
                    </figcaption>
                  </figure>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 flex justify-center gap-2 sm:hidden">
        {items.map((item, i) => (
          <button
            key={item.href}
            type="button"
            aria-label={`Ir para o comentário ${i + 1} de ${items.length}`}
            aria-current={position.index === i}
            onClick={() => goTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-section",
              position.index === i ? "w-6 bg-ink-accent" : "w-1.5 bg-line-strong hover:bg-ink-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}
