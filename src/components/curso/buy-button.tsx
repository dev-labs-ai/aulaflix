"use client";

import { useState } from "react";
import { buttonClass, cn, type ButtonVariant, type ringOffset } from "@/components/ui";

/**
 * Botão de compra do protótipo: ainda não há checkout, então só avisa.
 * O aviso aparece embaixo do botão ou, na barra fixa do celular (`notice="above"`), flutuando acima dela.
 */
export function BuyButton({
  label = "Comprar curso",
  variant = "primary",
  offset = "canvas",
  notice = "below",
  className,
}: {
  label?: string;
  variant?: ButtonVariant;
  offset?: keyof typeof ringOffset;
  notice?: "below" | "above";
  className?: string;
}) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setClicked(true)}
        className={cn(buttonClass(variant, offset), "w-full whitespace-nowrap")}
      >
        {label}
      </button>
      {/* A região fica sempre no DOM, para o aviso ser anunciado quando aparecer. */}
      <div role="status" className={cn(notice === "above" && "absolute bottom-full right-0 mb-3 w-max max-w-[80vw]")}>
        {clicked && (
          <p
            className={cn(
              "rounded-control bg-warning-100 px-3 py-2 text-[14px] text-warning-500",
              // Embaixo, o aviso acompanha a largura do botão em vez de alargá-lo.
              notice === "above" ? "shadow-(--shadow-pop)" : "mt-3 w-0 min-w-full",
            )}
          >
            Protótipo: o checkout ainda não está conectado.
          </p>
        )}
      </div>
    </div>
  );
}
