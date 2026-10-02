import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToCourses, CourseHero } from "@/components/curso/course-hero";
import {
  AudienceSection,
  CourseFaqSection,
  CoverageSection,
  LearnSection,
  SyllabusSection,
  WhySection,
} from "@/components/curso/course-sections";
import { PricingCard } from "@/components/curso/pricing-card";
import { WaitlistCard, WaitlistProvider } from "@/components/curso/waitlist";
import { courses, getCourse } from "@/content/courses";
import { getCourseDetail } from "@/content/course-details";

// Só os cursos conhecidos existem; qualquer outro slug vira 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata(props: PageProps<"/cursos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const course = getCourse(slug);
  return course ? { title: course.title, description: course.summary } : {};
}

export default async function CoursePage(props: PageProps<"/cursos/[slug]">) {
  const { slug } = await props.params;
  const course = getCourse(slug);
  const detail = getCourseDetail(slug);
  if (!course || !detail) notFound();

  const sideCard =
    detail.kind === "on-sale" ? (
      <PricingCard pricing={detail.pricing} />
    ) : (
      <WaitlistCard courseTitle={course.title} />
    );

  const content = (
    <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
      <article className="lg:col-span-7 lg:col-start-1">
        <CourseHero course={course} />
        <div className="mt-12 lg:hidden">{sideCard}</div>

        <WhySection paragraphs={detail.why} />
        <LearnSection items={detail.learn} />
        <AudienceSection items={detail.audience} />
        {detail.kind === "on-sale" ? (
          <SyllabusSection modules={detail.modules} />
        ) : (
          <CoverageSection items={detail.coverage} />
        )}
        <CourseFaqSection items={detail.faq} />

        {/* Na lista de espera, o formulário se repete ao fim da página no mobile. */}
        {detail.kind === "waitlist" && <div className="mt-12 lg:hidden">{sideCard}</div>}
      </article>

      <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block">
        <div className="sticky top-24">{sideCard}</div>
      </aside>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 sm:pb-32 lg:px-10 lg:pt-20 lg:pb-40">
      <BackToCourses />
      {detail.kind === "waitlist" ? <WaitlistProvider>{content}</WaitlistProvider> : content}
    </div>
  );
}
