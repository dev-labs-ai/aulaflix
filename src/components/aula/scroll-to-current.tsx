"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Área da lista de aulas que rola por dentro no desktop. Ao abrir a aula, centraliza a aula atual
 * (`aria-current="page"`) mexendo só na rolagem da lista, nunca na da página.
 */
export function ScrollToCurrent({ current, className, children }: { current: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = ref.current;
    const row = list?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!list || !row || list.scrollHeight <= list.clientHeight) return;
    const offset = row.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop;
    list.scrollTop = offset - (list.clientHeight - row.offsetHeight) / 2;
    // Só quando a aula muda: marcar como concluída não deve mexer na rolagem da lista.
  }, [current]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
