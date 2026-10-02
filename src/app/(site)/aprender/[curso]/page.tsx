import { notFound, redirect } from "next/navigation";
import { getCourse } from "@/content/courses";
import { requireUser } from "@/lib/auth";
import { getEnrollment } from "@/lib/enrollments";

/** Entrada do curso para quem já tem: leva à aula onde o aluno parou. */
export default async function CourseEntryPage(props: PageProps<"/aprender/[curso]">) {
  const { curso } = await props.params;
  if (!getCourse(curso)) notFound();
  const user = await requireUser(`/aprender/${curso}`);
  const enrollment = await getEnrollment(user, curso);
  // Quem não tem o curso vai para a página de venda.
  if (!enrollment) redirect(`/cursos/${curso}`);
  redirect(`/aprender/${curso}/${enrollment.resume.slug}`);
}
