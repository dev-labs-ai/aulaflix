import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { CompleteLesson } from "@/components/aula/complete-lesson";
import { LessonList } from "@/components/aula/lesson-list";
import { RecordVisit } from "@/components/aula/record-visit";
import { LessonPlayer } from "@/components/curso/lesson-player";
import { cn, container, focusRing, ringOffset } from "@/components/ui";
import { courseLessons, getCourseDetail, type LessonEntry } from "@/content/course-details";
import { getCourse } from "@/content/courses";
import { requireUser } from "@/lib/auth";
import { getEnrollment } from "@/lib/enrollments";
import { setLessonCompletion } from "@/lib/learning-actions";

export async function generateMetadata(props: PageProps<"/aprender/[curso]/[aula]">): Promise<Metadata> {
  const { curso, aula } = await props.params;
  const course = getCourse(curso);
  const detail = getCourseDetail(curso);
  const entry = detail?.kind === "on-sale" ? courseLessons(detail).find((e) => e.slug === aula) : undefined;
  return course && entry ? { title: `${entry.lesson.title} · ${course.title}` } : {};
}

const textLink = cn(
  "rounded-control font-bold text-ink-accent underline decoration-2 underline-offset-4 transition-colors hover:text-ink-accent-hover",
  focusRing,
  ringOffset.canvas,
);

/** Página de aula: o vídeo, o botão de concluir, a navegação entre aulas e a lista do curso. */
export default async function LessonPage(props: PageProps<"/aprender/[curso]/[aula]">) {
  const { curso, aula } = await props.params;
  const course = getCourse(curso);
  if (!course) notFound();
  const user = await requireUser(`/aprender/${curso}/${aula}`);
  const enrollment = await getEnrollment(user, curso);
  // Quem não tem o curso vai para a página de venda, onde pode ver a aula grátis.
  if (!enrollment) redirect(`/cursos/${curso}`);

  const entry = enrollment.lessons.find((e) => e.slug === aula);
  // Aulas sem duração ainda não foram publicadas.
  if (!entry?.lesson.duration) notFound();

  const done = enrollment.completedSlugs.has(entry.slug);
  const published = enrollment.lessons.filter((e) => e.lesson.duration);
  const position = published.indexOf(entry);
  const previous = published[position - 1];
  const next = published[position + 1];

  return (
    <div className={cn(container, "pb-24 pt-6 sm:pb-32 sm:pt-8")}>
      <RecordVisit course={curso} lesson={entry.slug} />
      <nav aria-label="Você está em" className="text-[15px] text-ink-tertiary">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <li>
            <Link href="/meus-cursos" className={cn("font-bold text-ink-secondary hover:text-ink", focusRing, ringOffset.canvas, "rounded-control")}>
              Meus cursos
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-4 text-ink-muted" />
          </li>
          <li>{course.title}</li>
        </ol>
      </nav>

      <div className="mt-5 lg:grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-8">
          <LessonPlayer key={entry.slug} title={entry.lesson.title} duration={entry.lesson.duration} />

          <p className="mt-7 text-[15px] font-bold tabular-nums text-ink-muted">
            Aula {entry.number} de {enrollment.total} · Módulo {entry.moduleNumber}: {entry.module.title}
          </p>
          <h1 className="mt-2 font-heading text-[30px] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[38px]">
            {entry.lesson.title}
          </h1>

          <div className="mt-7">
            <CompleteLesson action={setLessonCompletion.bind(null, curso, entry.slug, !done)} done={done} />
          </div>

          <div className="mt-10 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
            {previous ? <LessonStep entry={previous} course={curso} direction="previous" /> : <span className="hidden sm:block" />}
            {next ? (
              <LessonStep entry={next} course={curso} direction="next" />
            ) : (
              <p className="text-[15px] leading-[1.6] text-ink-tertiary sm:text-right">
                Esta é a última aula publicada.{" "}
                <Link href="/meus-cursos" className={textLink}>
                  Voltar para Meus cursos
                </Link>
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 lg:col-span-4 lg:mt-0">
          <LessonList enrollment={enrollment} current={entry.slug} />
        </div>
      </div>
    </div>
  );
}

/** Link para a aula anterior ou a próxima, com o título dela. */
function LessonStep({ entry, course, direction }: { entry: LessonEntry; course: string; direction: "previous" | "next" }) {
  const isNext = direction === "next";
  const Arrow = isNext ? ArrowRight : ArrowLeft;
  return (
    <Link
      href={`/aprender/${course}/${entry.slug}`}
      className={cn(
        "group flex items-center gap-3 rounded-card border border-line bg-surface px-4 py-3.5 transition-colors hover:border-line-strong",
        isNext && "flex-row-reverse text-right sm:col-start-2",
        focusRing,
        ringOffset.canvas,
      )}
    >
      <Arrow aria-hidden="true" className="size-5 shrink-0 text-ink-tertiary transition-colors group-hover:text-ink" />
      <span className="min-w-0">
        <span className="block text-[13px] font-bold text-ink-muted">{isNext ? "Próxima aula" : "Aula anterior"}</span>
        <span className="block truncate text-[15px] font-bold text-ink">{entry.lesson.title}</span>
      </span>
    </Link>
  );
}
