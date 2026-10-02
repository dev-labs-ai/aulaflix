"use client";

import { useState } from "react";

/** Botão de compra do protótipo: ainda não há checkout, então só avisa. */
export function BuyButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setClicked(true)}
        className="mt-6 inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-control bg-surface-accent px-6 text-[17px] font-bold text-ink-inverse transition-colors duration-150 hover:bg-surface-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-surface-raised"
      >
        Comprar curso
      </button>
      {clicked && (
        <p role="status" className="mt-3 rounded-control bg-warning-100 px-3 py-2 text-[14px] text-warning-500">
          Protótipo: o checkout ainda não está conectado.
        </p>
      )}
    </>
  );
}
