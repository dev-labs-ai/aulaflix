import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AccountEmptyState, AccountPage } from "@/components/account-page";
import { CourseCoverPlaceholder } from "@/components/placeholders";
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
            <p className="mt-8 font-sans text-[14px] leading-[1.6] text-ink-muted">
              {more.join(" ")}{" "}
              <Link
                href="/cursos"
                className={cn(
                  "text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink",
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
    <li className="flex flex-col gap-5 rounded-md border border-line bg-surface p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-sm sm:w-[240px]">
        <CourseCoverPlaceholder icon={course.icon} tone="light" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="font-heading text-[20px] font-semibold leading-[1.3] tracking-[-0.012em] text-ink">{course.title}</h2>
        <p className="mt-2 font-mono text-[12px] text-ink-muted">{meta}</p>
        {completed > 0 && (
          <div
            role="progressbar"
            aria-label={copy.progressLabel(course.title)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="mt-3 h-1.5 w-full max-w-[240px] overflow-hidden rounded-full bg-line-subtle"
          >
            <div className="h-full rounded-full bg-surface-accent" style={{ width: `${percent}%` }} />
          </div>
        )}
      </div>
      <Link
        href={`/cursos/${course.slug}`}
        className={cn(
          "inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-sm border border-line bg-surface px-5 font-sans text-[15px] font-semibold text-ink transition-colors hover:border-line-strong hover:bg-section sm:self-center",
          focusRing,
          ringOffset.canvas,
        )}
      >
        {cta}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </li>
  );
}
