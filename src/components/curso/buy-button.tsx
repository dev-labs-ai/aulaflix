"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

/** Botão de compra do protótipo: ainda não há checkout, então só avisa. */
export function BuyButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setClicked(true)}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-surface-accent px-6 font-sans text-[16px] font-semibold text-ink-inverse transition-colors duration-150 hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-surface-raised"
      >
        Comprar curso
        <ArrowRight aria-hidden="true" className="size-[18px]" />
      </button>
      {clicked && (
        <p role="status" className="mt-3 rounded-sm bg-warning-100 px-3 py-2 font-sans text-[13px] text-warning-500">
          Protótipo: o checkout ainda não está conectado.
        </p>
      )}
    </>
  );
}
