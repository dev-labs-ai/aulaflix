import type { Metadata } from "next";
import Link from "next/link";
import { AccountEmptyState, AccountPage } from "@/components/account-page";
import { CourseCover } from "@/components/course-list";
import { Play } from "lucide-react";
import { Board, ButtonLink, cn, focusRing, ProgressBar, ringOffset } from "@/components/ui";
import { myCoursesCopy as copy } from "@/content/account";
import { onSaleCourses, waitlistCourses } from "@/content/courses";
import { requireUser } from "@/lib/auth";
import { getEnrollments, getLastCourse, type Enrollment } from "@/lib/enrollments";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
};

export default async function MeusCursosPage() {
  const user = await requireUser("/meus-cursos");
  const enrollments = await getEnrollments(user);
  const lastCourse = await getLastCourse(user);

  const owned = new Set(enrollments.map((e) => e.course.slug));
  const notOwnedOnSale = onSaleCourses.filter((c) => !owned.has(c.slug)).length;
  const more = [
    notOwnedOnSale > 0 && copy.onSale(notOwnedOnSale),
    waitlistCourses.length > 0 && copy.waitlist(waitlistCourses.length),
  ].filter(Boolean);

  return (
    <AccountPage id="meus-cursos-title" title={copy.title}>
      {enrollments.length > 0 ? (
        <>
          {lastCourse && <ResumeHighlight enrollment={lastCourse} />}
          <ul className="mt-8 flex flex-col gap-4">
            {enrollments.map((enrollment) => (
              <EnrollmentCard key={enrollment.course.slug} enrollment={enrollment} />
            ))}
          </ul>
          {more.length > 0 && (
            <p className="mt-8 text-[16px] leading-[1.6] text-ink-muted">
              {more.join(" ")}{" "}
              <Link
                href="/cursos"
                className={cn(
                  "rounded-control font-bold text-ink-accent underline decoration-2 underline-offset-4 transition-colors hover:text-ink-accent-hover",
                  focusRing,
                  ringOffset.canvas,
                )}
              >
                {copy.catalog}
              </Link>
            </p>
          )}
        </>
      ) : (
        <AccountEmptyState {...copy.empty} />
      )}
    </AccountPage>
  );
}

/** A aula onde o aluno parou, escrita na lousa, com o botão para voltar a ela. */
function ResumeHighlight({ enrollment }: { enrollment: Enrollment }) {
  const { course, total, resume: entry } = enrollment;
  return (
    <section aria-labelledby="continuar-title" className="mt-8">
      <Board className="flex flex-col gap-6 px-6 py-7 sm:px-9 sm:py-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0">
          <h2 id="continuar-title" className="text-[15px] font-bold text-giz-apagado">
            {copy.resume.title}
          </h2>
          <p className="mt-3 text-balance font-heading text-[26px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[32px]">
            {entry.lesson.title}
          </p>
          <p className="mt-2 text-[16px] tabular-nums text-giz-apagado">
            {course.title} · {copy.resume.position(entry.number, total)}
          </p>
        </div>
        <ButtonLink
          href={`/aprender/${course.slug}/${entry.slug}`}
          variant="chalk"
          offset="board"
          className="shrink-0 self-start lg:self-center"
        >
          <Play aria-hidden="true" fill="currentColor" strokeWidth={0} className="size-4" />
          {copy.resume.cta}
        </ButtonLink>
      </Board>
    </section>
  );
}

/** Texto de progresso e rótulo do botão conforme o andamento do aluno no curso. */
function describe({ completed, published, total }: Enrollment) {
  if (completed === 0) return { meta: copy.notStarted(total), cta: copy.start };
  const percent = Math.round((completed / total) * 100);
  if (completed >= total) return { meta: copy.progress(completed, total, percent, copy.completed), cta: copy.openCourse };
  // Viu todas as aulas publicadas, mas o curso ainda vai ganhar aulas novas.
  if (completed >= published) return { meta: copy.progress(completed, total, percent, copy.caughtUp), cta: copy.openCourse };
  return { meta: copy.progress(completed, total, percent), cta: copy.continue };
}

function EnrollmentCard({ enrollment }: { enrollment: Enrollment }) {
  const { course, completed, total, resume } = enrollment;
  const { meta, cta } = describe(enrollment);
  const percent = Math.round((completed / total) * 100);

  return (
    <li className="flex flex-col gap-5 rounded-card border border-line bg-surface p-5 shadow-(--shadow-raised) sm:flex-row sm:items-center sm:gap-6 sm:p-6">
      <CourseCover course={course} className="shrink-0 rounded-card sm:w-[220px]" />
      <div className="min-w-0 flex-1">
        <h2 className="font-heading text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-ink">{course.title}</h2>
        <p className="mt-1.5 text-[15px] tabular-nums text-ink-muted">{meta}</p>
        {completed > 0 && (
          <ProgressBar value={percent} label={copy.progressLabel(course.title)} className="mt-3 max-w-[240px]" />
        )}
      </div>
      <Link
        href={`/aprender/${course.slug}/${resume.slug}`}
        className={cn(
          "inline-flex h-12 shrink-0 items-center justify-center self-start rounded-control border border-line bg-surface px-5 text-[16px] font-bold text-ink transition-colors hover:border-line-strong hover:bg-section sm:self-center",
          focusRing,
          ringOffset.canvas,
        )}
      >
        {cta}
      </Link>
    </li>
  );
}
