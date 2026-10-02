"use client";

import { useEffect } from "react";
import { recordVisit } from "@/lib/learning-actions";

/**
 * Avisa o servidor de que a aula foi aberta. Fica num efeito porque cookies só podem ser gravados
 * em Server Functions, não durante a renderização da página.
 */
export function RecordVisit({ course, lesson }: { course: string; lesson: string }) {
  useEffect(() => {
    void recordVisit(course, lesson);
  }, [course, lesson]);
  return null;
}
