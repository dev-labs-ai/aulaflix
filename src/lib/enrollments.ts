import { getCourseDetail } from "@/content/course-details";
import { courses, type Course } from "@/content/courses";
import type { SessionUser } from "@/lib/auth";

// Protótipo: cursos e progresso fixos por conta, até existir um backend.
// Por e-mail da conta: slug do curso → quantas aulas o aluno já concluiu.
const PROGRESS_BY_ACCOUNT: Record<string, Record<string, number>> = {
  "aulaflix@email.com": {
    "programacao-do-zero": 5,
    "design-de-interfaces": 0,
    "analise-de-dados-com-planilhas": 9,
  },
};

export type Enrollment = {
  course: Course;
  /** Aulas concluídas pelo aluno. */
  completed: number;
  /** Aulas já publicadas (com duração). */
  published: number;
  /** Total de aulas previstas no curso. */
  total: number;
};

export function getEnrollments(user: SessionUser): Enrollment[] {
  const progress = PROGRESS_BY_ACCOUNT[user.email] ?? {};
  return courses.flatMap((course) => {
    const detail = getCourseDetail(course.slug);
    const completed = progress[course.slug];
    if (completed === undefined || detail?.kind !== "on-sale") return [];
    const lessons = detail.modules.flatMap((module) => module.lessons);
    return [
      {
        course,
        completed,
        published: lessons.filter((lesson) => lesson.duration).length,
        total: lessons.length,
      },
    ];
  });
}
