import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToCourses, boardBuyId, CourseBoard, PriceAndBuy, priceTerms } from "@/components/curso/course-hero";
import {
  AudienceSection,
  CourseFaqSection,
  CoverageSection,
  FreeLessonSection,
  LearnSection,
  SyllabusSection,
  WhySection,
} from "@/components/curso/course-sections";
import { MobileBuyBar } from "@/components/curso/mobile-buy-bar";
import { WaitlistEmail, WaitlistOneClick } from "@/components/curso/waitlist";
import { cn, container } from "@/components/ui";
import { courses, getCourse } from "@/content/courses";
import { getCourseDetail, getFreeLesson } from "@/content/course-details";
import { getSessionUser } from "@/lib/auth";
import { brl } from "@/lib/format";
import { isOnWaitlist } from "@/lib/waitlist";

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

const freeLessonId = "aula-gratis";

/**
 * Página de curso: a lousa com título e compra (ou a lista de espera); a ementa logo depois, ao lado
 * da aula grátis; e o resto do conteúdo embaixo.
 */
export default async function CoursePage(props: PageProps<"/cursos/[slug]">) {
  const { slug } = await props.params;
  const course = getCourse(slug);
  const detail = getCourseDetail(slug);
  if (!course || !detail) notFound();

  const onSale = detail.kind === "on-sale";
  const freeLesson = onSale ? getFreeLesson(detail) : undefined;
  const freeLessonHref = freeLesson && `#${freeLessonId}`;
  const user = await getSessionUser();

  return (
    // A barra de compra do celular é `sticky` dentro deste bloco: acompanha a página e para antes do rodapé.
    <div>
      <div className={cn(container, "pb-24 pt-6 sm:pb-32 sm:pt-10 lg:pb-40")}>
        <BackToCourses />
        <div className="mt-3">
          <CourseBoard course={course}>
            {onSale ? (
              <PriceAndBuy pricing={detail.pricing} freeLessonHref={freeLessonHref} />
            ) : user ? (
              <WaitlistOneClick courseSlug={slug} email={user.email} joined={await isOnWaitlist(user.email, slug)} />
            ) : (
              <WaitlistEmail courseSlug={slug} />
            )}
          </CourseBoard>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            {onSale ? (
              <SyllabusSection modules={detail.modules} freeLessonHref={freeLessonHref} />
            ) : (
              <CoverageSection items={detail.coverage} />
            )}
          </div>
          <div className="lg:col-span-5">
            {freeLesson && (
              <FreeLessonSection
                id={freeLessonId}
                lesson={freeLesson.lesson}
                number={freeLesson.number}
                moduleTitle={freeLesson.module.title}
              />
            )}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <WhySection paragraphs={detail.why} />
            <LearnSection items={detail.learn} />
            <AudienceSection items={detail.audience} />
            <CourseFaqSection items={detail.faq} />
          </div>
        </div>
      </div>

      {onSale && (
        <MobileBuyBar
          watchId={boardBuyId}
          price={brl(detail.pricing.price)}
          installments={priceTerms(detail.pricing).installments}
        />
      )}
    </div>
  );
}
