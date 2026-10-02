// Placeholder visual para as capas de curso. Troque por <Image> quando houver
// capas próprias em /public.
import { Camera, ChartColumn, Code, Globe, Megaphone, PenTool, PiggyBank, type LucideIcon } from "lucide-react";
import { cn } from "@/components/ui";
import type { Course, CourseIcon, CourseTone } from "@/content/courses";

/** Componente React de cada nome de ícone usado no catálogo. */
export const courseIcons: Record<CourseIcon, LucideIcon> = {
  code: Code,
  "pen-tool": PenTool,
  "chart-column": ChartColumn,
  globe: Globe,
  megaphone: Megaphone,
  camera: Camera,
  "piggy-bank": PiggyBank,
};

/**
 * Classes de cada cor de curso: faixa da ficha (cheia ou, com `tracejado`, em traços),
 * fundo claro e ícone sobre esse fundo.
 */
export const toneClasses: Record<CourseTone, { stripe: string; dash: string; soft: string; ink: string }> = {
  coral: { stripe: "bg-coral-400", dash: "text-coral-400", soft: "bg-coral-100", ink: "text-coral-700" },
  amarelo: { stripe: "bg-amarelo-300", dash: "text-amarelo-300", soft: "bg-amarelo-100", ink: "text-amarelo-700" },
  salvia: { stripe: "bg-salvia-400", dash: "text-salvia-400", soft: "bg-salvia-100", ink: "text-salvia-700" },
};

/** Capa de curso: fundo claro na cor do curso com o ícone do tema. */
export function CourseCoverPlaceholder({ course, className }: { course: Pick<Course, "icon" | "tone">; className?: string }) {
  const Icon = courseIcons[course.icon];
  const tone = toneClasses[course.tone];
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center", tone.soft, className)}>
      <Icon aria-hidden="true" strokeWidth={1.25} className={cn("size-[38%]", tone.ink)} />
    </div>
  );
}
