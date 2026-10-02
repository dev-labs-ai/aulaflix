import type { Metadata } from "next";
import Link from "next/link";
import { AccountEmptyState, AccountPage } from "@/components/account-page";
import { CourseCover } from "@/components/course-list";
import { cn, focusRing, ringOffset } from "@/components/ui";
import { myCoursesCopy as copy } from "@/content/account";
import { onSaleCourses, waitlistCourses } from "@/content/courses";
import { requireUser } from "@/lib/auth";
import { getEnrollments, type Enrollment } from "@/lib/enrollments";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
};

export default async function MeusCursosPage() {
  const user = await requireUser("/meus-cursos");
  const enrollments = getEnrollments(user);

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
  const { course, completed, total } = enrollment;
  const { meta, cta } = describe(enrollment);
  const percent = Math.round((completed / total) * 100);

  return (
    <li className="flex flex-col gap-5 rounded-card border border-line bg-surface p-5 shadow-(--shadow-raised) sm:flex-row sm:items-center sm:gap-6 sm:p-6">
      <CourseCover course={course} className="shrink-0 rounded-card sm:w-[220px]" />
      <div className="min-w-0 flex-1">
        <h2 className="font-heading text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-ink">{course.title}</h2>
        <p className="mt-1.5 text-[15px] tabular-nums text-ink-muted">{meta}</p>
        {completed > 0 && (
          <div
            role="progressbar"
            aria-label={copy.progressLabel(course.title)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="mt-3 h-2 w-full max-w-[240px] overflow-hidden rounded-full bg-surface-muted"
          >
            <div className="h-full rounded-full bg-lousa-400" style={{ width: `${percent}%` }} />
          </div>
        )}
      </div>
      <Link
        href={`/cursos/${course.slug}`}
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
