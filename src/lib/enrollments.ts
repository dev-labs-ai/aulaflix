import { courseLessons, getCourseDetail, type LessonEntry } from "@/content/course-details";
import { courses, type Course } from "@/content/courses";
import type { SessionUser } from "@/lib/auth";
import { isRecord, readJsonCookie, writeJsonCookie } from "@/lib/cookie-store";
import { getOwnedCourseSlugs } from "@/lib/purchases";

// Os cursos do aluno são os que ele comprou (src/lib/purchases.ts).
// Protótipo: progresso inicial fixo por conta, até existir um backend.
// Por e-mail da conta: slug do curso → quantas aulas (as primeiras do curso) o aluno já concluiu.
const SEED_PROGRESS: Record<string, Record<string, number>> = {
  "aulaflix@email.com": {
    "backend-com-node-js": 5,
    "frontend-com-react": 0,
    "sql-e-modelagem-de-dados": 9,
  },
};

// As aulas marcadas e desmarcadas na página de aula ficam num cookie deste navegador:
// por e-mail da conta, slug do curso → slugs das aulas concluídas. No curso em que existe,
// essa lista substitui o progresso inicial.
const PROGRESS_COOKIE = "aulaflix_progress";
// As aulas abertas também, para saber de onde continuar: por e-mail da conta, o curso aberto
// por último e a última aula aberta em cada curso.
const VISITS_COOKIE = "aulaflix_visits";

type ProgressStore = Record<string, Record<string, string[]>>;
type Visits = { course: string; lessons: Record<string, string> };
type VisitsStore = Record<string, Visits>;

async function readProgress(): Promise<ProgressStore> {
  const value = await readJsonCookie(PROGRESS_COOKIE);
  return isRecord(value) ? (value as ProgressStore) : {};
}

async function readVisits(): Promise<VisitsStore> {
  const value = await readJsonCookie(VISITS_COOKIE);
  return isRecord(value) ? (value as VisitsStore) : {};
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
  /**
   * Onde continuar: a última aula aberta, se ainda não foi concluída, ou a próxima por fazer
   * depois dela; sem aula aberta, a primeira por fazer; com tudo feito, a primeira do curso.
   */
  resume: LessonEntry;
};

function buildEnrollments(
  user: SessionUser,
  owned: Set<string>,
  progress: ProgressStore,
  visits: VisitsStore,
): Enrollment[] {
  const seed = SEED_PROGRESS[user.email] ?? {};
  const saved = progress[user.email] ?? {};
  const lastOpened = visits[user.email]?.lessons ?? {};
  return courses.flatMap((course) => {
    const detail = getCourseDetail(course.slug);
    if (!owned.has(course.slug) || detail?.kind !== "on-sale") return [];

    const lessons = courseLessons(detail);
    const savedSlugs = saved[course.slug];
    const completedSlugs = new Set(
      Array.isArray(savedSlugs)
        ? lessons.filter((entry) => savedSlugs.includes(entry.slug)).map((entry) => entry.slug)
        : lessons.slice(0, seed[course.slug] ?? 0).map((entry) => entry.slug),
    );
    const todo = (entry: LessonEntry) => Boolean(entry.lesson.duration) && !completedSlugs.has(entry.slug);
    const lastIndex = lessons.findIndex((entry) => entry.slug === lastOpened[course.slug]);
    const resume = lessons.slice(Math.max(lastIndex, 0)).find(todo) ?? lessons.find(todo) ?? lessons[0];

    return [
      {
        course,
        lessons,
        completedSlugs,
        completed: completedSlugs.size,
        published: lessons.filter((entry) => entry.lesson.duration).length,
        total: lessons.length,
        resume,
      },
    ];
  });
}

/** Cursos do aluno, com o andamento de cada um. */
export async function getEnrollments(user: SessionUser): Promise<Enrollment[]> {
  return buildEnrollments(user, await getOwnedCourseSlugs(user), await readProgress(), await readVisits());
}

/** O curso `slug` do aluno, ou `null` se ele não tem esse curso. */
export async function getEnrollment(user: SessionUser, slug: string): Promise<Enrollment | null> {
  return (await getEnrollments(user)).find((enrollment) => enrollment.course.slug === slug) ?? null;
}

/**
 * O curso para o "Continuar de onde parou" de Meus cursos: o aberto por último, se ainda faltar
 * alguma aula publicada nele, ou o primeiro curso em andamento. `null` quando não há nenhum.
 */
export async function getLastCourse(user: SessionUser): Promise<Enrollment | null> {
  const unfinished = (await getEnrollments(user)).filter((e) => e.completed < e.published);
  const last = (await readVisits())[user.email]?.course;
  return unfinished.find((e) => e.course.slug === last) ?? unfinished.find((e) => e.completed > 0) ?? null;
}

/** A aula `slug` do curso, se o aluno tem o curso e a aula já foi publicada. */
async function publishedLesson(user: SessionUser, courseSlug: string, slug: string) {
  const enrollment = await getEnrollment(user, courseSlug);
  const entry = enrollment?.lessons.find((lesson) => lesson.slug === slug);
  return enrollment && entry?.lesson.duration ? { enrollment, entry } : null;
}

/**
 * Marca (ou desmarca) uma aula publicada como concluída. Ignora cursos que o aluno não tem e
 * aulas que não existem ou ainda não foram publicadas. Só funciona dentro de Server Functions.
 */
export async function setLessonCompleted(user: SessionUser, courseSlug: string, slug: string, done: boolean) {
  const found = await publishedLesson(user, courseSlug, slug);
  if (!found) return;

  const completed = new Set(found.enrollment.completedSlugs);
  if (done) completed.add(slug);
  else completed.delete(slug);

  const progress = await readProgress();
  await writeJsonCookie(PROGRESS_COOKIE, {
    ...progress,
    [user.email]: { ...progress[user.email], [courseSlug]: [...completed] },
  });
}

/**
 * Guarda a aula que o aluno acabou de abrir. Só grava quando algo muda, e ignora cursos que o
 * aluno não tem e aulas não publicadas. Só funciona dentro de Server Functions.
 */
export async function recordLessonVisit(user: SessionUser, courseSlug: string, slug: string) {
  const visits = await readVisits();
  const mine = visits[user.email];
  if (mine?.course === courseSlug && mine.lessons?.[courseSlug] === slug) return;
  if (!(await publishedLesson(user, courseSlug, slug))) return;

  const lessons = { ...(isRecord(mine?.lessons) ? mine.lessons : {}), [courseSlug]: slug };
  await writeJsonCookie(VISITS_COOKIE, { ...visits, [user.email]: { course: courseSlug, lessons } });
}
