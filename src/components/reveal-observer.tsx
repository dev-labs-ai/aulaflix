"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adiciona `is-visible` aos elementos `.reveal` e `.reveal-stagger` quando entram
 * na viewport. As páginas continuam sendo Server Components; basta usar as classes.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible), .reveal-stagger:not(.is-visible)");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Elementos que já ficaram acima da viewport (ex.: ao abrir /#faq) aparecem direto.
          const passed = entry.boundingClientRect.bottom < 0;
          if (!entry.isIntersecting && !passed) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
