"use client";

import { useEffect, useState } from "react";
import { ButtonLink, cn, container } from "@/components/ui";

/**
 * Barra de compra presa ao pé da tela no celular. Só aparece depois que o elemento `watchId`
 * (os botões de compra da lousa) sai da tela por cima.
 * É `sticky`, e não `fixed`: no fim da página ela para no lugar dela, acima do rodapé, sem cobri-lo.
 */
export function MobileBuyBar({
  watchId,
  buyHref,
  price,
  installments,
}: {
  watchId: string;
  buyHref: string;
  price: string;
  installments: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  return (
    <div
      inert={!visible}
      className={cn(
        "sticky bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur transition-transform duration-200 motion-reduce:transition-none lg:hidden",
        !visible && "translate-y-full",
      )}
    >
      <div className={cn(container, "flex items-center justify-between gap-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]")}>
        <div className="min-w-0">
          <p className="font-heading text-[22px] font-extrabold leading-tight tracking-[-0.02em] tabular-nums text-ink">
            {price}
          </p>
          <p className="truncate text-[14px] tabular-nums text-ink-muted">{installments}</p>
        </div>
        <ButtonLink href={buyHref} className="shrink-0">
          Comprar
        </ButtonLink>
      </div>
    </div>
  );
}
