import { courseLessons, getCourseDetail, type LessonEntry } from "@/content/course-details";
import { courses, type Course } from "@/content/courses";
import type { SessionUser } from "@/lib/auth";
import { isRecord, readJsonCookie, writeJsonCookie } from "@/lib/cookie-store";

// Protótipo: cursos e progresso iniciais fixos por conta, até existir um backend.
// Por e-mail da conta: slug do curso → quantas aulas (as primeiras do curso) o aluno já concluiu.
const SEED_PROGRESS: Record<string, Record<string, number>> = {
  "aulaflix@email.com": {
    "programacao-do-zero": 5,
    "design-de-interfaces": 0,
    "analise-de-dados-com-planilhas": 9,
  },
};

// As aulas marcadas e desmarcadas na página de aula ficam num cookie deste navegador:
// por e-mail da conta, slug do curso → slugs das aulas concluídas. No curso em que existe,
// essa lista substitui o progresso inicial.
const PROGRESS_COOKIE = "aulaflix_progress";

type ProgressStore = Record<string, Record<string, string[]>>;

async function readStore(): Promise<ProgressStore> {
  const value = await readJsonCookie(PROGRESS_COOKIE);
  return isRecord(value) ? (value as ProgressStore) : {};
}

async function writeStore(store: ProgressStore) {
  await writeJsonCookie(PROGRESS_COOKIE, store);
}

export type Enrollment = {
  course: Course;
  /** Aulas do curso em ordem. */
  lessons: LessonEntry[];
  /** Slugs das aulas concluídas. */
  completedSlugs: Set<string>;
  /** Aulas concluídas pelo aluno. */
  completed: number;
  /** Aulas já publicadas (com duração). */
  published: number;
  /** Total de aulas previstas no curso. */
  total: number;
  /** Onde continuar: a primeira aula publicada ainda não concluída, ou a primeira do curso. */
  resume: LessonEntry;
};

function buildEnrollments(user: SessionUser, store: ProgressStore): Enrollment[] {
  const seed = SEED_PROGRESS[user.email] ?? {};
  const saved = store[user.email] ?? {};
  return courses.flatMap((course) => {
    const detail = getCourseDetail(course.slug);
    if (seed[course.slug] === undefined || detail?.kind !== "on-sale") return [];

    const lessons = courseLessons(detail);
    const savedSlugs = saved[course.slug];
    const completedSlugs = new Set(
      Array.isArray(savedSlugs)
        ? lessons.filter((entry) => savedSlugs.includes(entry.slug)).map((entry) => entry.slug)
        : lessons.slice(0, seed[course.slug]).map((entry) => entry.slug),
    );
    const published = lessons.filter((entry) => entry.lesson.duration);
    const resume = published.find((entry) => !completedSlugs.has(entry.slug)) ?? lessons[0];

    return [
      {
        course,
        lessons,
        completedSlugs,
        completed: completedSlugs.size,
        published: published.length,
        total: lessons.length,
        resume,
      },
    ];
  });
}

/** Cursos do aluno, com o andamento de cada um. */
export async function getEnrollments(user: SessionUser): Promise<Enrollment[]> {
  return buildEnrollments(user, await readStore());
}

/** O curso `slug` do aluno, ou `null` se ele não tem esse curso. */
export async function getEnrollment(user: SessionUser, slug: string): Promise<Enrollment | null> {
  return (await getEnrollments(user)).find((enrollment) => enrollment.course.slug === slug) ?? null;
}

/**
 * Marca (ou desmarca) uma aula publicada como concluída. Ignora cursos que o aluno não tem e
 * aulas que não existem ou ainda não foram publicadas. Só funciona dentro de Server Functions.
 */
export async function setLessonCompleted(user: SessionUser, courseSlug: string, slug: string, done: boolean) {
  const store = await readStore();
  const enrollment = buildEnrollments(user, store).find((e) => e.course.slug === courseSlug);
  const entry = enrollment?.lessons.find((lesson) => lesson.slug === slug);
  if (!enrollment || !entry?.lesson.duration) return;

  const completed = new Set(enrollment.completedSlugs);
  if (done) completed.add(slug);
  else completed.delete(slug);

  store[user.email] = { ...store[user.email], [courseSlug]: [...completed] };
  await writeStore(store);
}
