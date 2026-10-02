"use client";

import { useFormStatus } from "react-dom";
import { Check } from "lucide-react";
import { buttonClass, cn, focusRing, ringOffset } from "@/components/ui";

/**
 * Marcar a aula como concluída (ou desfazer). `action` já vem com o curso, a aula e o novo estado;
 * o servidor grava o progresso e a página volta atualizada.
 */
export function CompleteLesson({ action, done }: { action: () => Promise<void>; done: boolean }) {
  return (
    <form action={action} className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {done && (
        <p className="inline-flex h-12 items-center gap-2 rounded-control bg-lousa-100 px-4 text-[16px] font-bold text-lousa-500">
          <Check aria-hidden="true" strokeWidth={3} className="size-4" />
          Aula concluída
        </p>
      )}
      <SubmitButton done={done} />
    </form>
  );
}

function SubmitButton({ done }: { done: boolean }) {
  const { pending } = useFormStatus();
  if (done) {
    return (
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "rounded-control text-[15px] font-bold text-ink-tertiary underline decoration-2 underline-offset-4 transition-colors hover:text-ink disabled:opacity-60",
          focusRing,
          ringOffset.canvas,
        )}
      >
        {pending ? "Salvando…" : "Desmarcar"}
      </button>
    );
  }
  return (
    <button type="submit" disabled={pending} className={cn(buttonClass("primary"), "disabled:opacity-60")}>
      <Check aria-hidden="true" strokeWidth={2.5} className="size-4" />
      {pending ? "Salvando…" : "Marcar como concluída"}
    </button>
  );
}
