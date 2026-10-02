"use server";

import { requireUser } from "@/lib/auth";
import { recordLessonVisit, setLessonCompleted } from "@/lib/enrollments";

/** Botão da página de aula: marca ou desmarca a aula como concluída. */
export async function setLessonCompletion(courseSlug: string, lessonSlug: string, done: boolean) {
  if (typeof courseSlug !== "string" || typeof lessonSlug !== "string" || typeof done !== "boolean") return;
  const user = await requireUser(`/aprender/${courseSlug}/${lessonSlug}`);
  await setLessonCompleted(user, courseSlug, lessonSlug, done);
}

/** Página de aula: registra a aula aberta, para Meus cursos saber de onde continuar. */
export async function recordVisit(courseSlug: string, lessonSlug: string) {
  if (typeof courseSlug !== "string" || typeof lessonSlug !== "string") return;
  const user = await requireUser(`/aprender/${courseSlug}/${lessonSlug}`);
  await recordLessonVisit(user, courseSlug, lessonSlug);
}
