"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal:not([data-visible]), .reveal-stagger:not([data-visible])";

/**
 * Marca com `data-visible` os elementos `.reveal` e `.reveal-stagger` quando entram
 * na viewport. As páginas continuam sendo Server Components; basta usar as classes.
 *
 * Usa um atributo em vez de classe porque o React sobrescreve `className` ao
 * re-renderizar, e observa o DOM para pegar elementos que surgem depois da montagem
 * (navegação entre páginas, Fast Refresh), que de outra forma ficariam invisíveis.
 */
export function RevealObserver() {
  useEffect(() => {
    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Elementos que já ficaram acima da viewport (ex.: ao abrir /#faq) aparecem direto.
          const passed = entry.boundingClientRect.bottom < 0;
          if (!entry.isIntersecting && !passed) continue;
          entry.target.setAttribute("data-visible", "");
          intersection.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observeWithin = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => intersection.observe(el));
    };

    observeWithin(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(SELECTOR)) intersection.observe(node);
          observeWithin(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
