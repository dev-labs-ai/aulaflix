// Placeholder visual para as capas de curso. Troque por <Image> quando houver
// capas próprias em /public.
import { Camera, ChartColumn, Code, Globe, Megaphone, PenTool, PiggyBank, type LucideIcon } from "lucide-react";
import type { CourseIcon } from "@/content/courses";

/** Componente React de cada nome de ícone usado no catálogo. */
const courseIcons: Record<CourseIcon, LucideIcon> = {
  code: Code,
  "pen-tool": PenTool,
  "chart-column": ChartColumn,
  globe: Globe,
  megaphone: Megaphone,
  camera: Camera,
  "piggy-bank": PiggyBank,
};

const coverTones = {
  /** Cinza, pensado para ficar sob o degradê escuro das listas de cursos. */
  gray: "bg-[radial-gradient(90%_90%_at_50%_40%,#e9e6df_0%,#c4c0b8_55%,#8e8a83_100%)]",
  /** Creme, para capas exibidas sem degradê (ex.: Meus cursos). */
  light: "bg-[radial-gradient(90%_90%_at_50%_40%,#fbf9f2_0%,#f3efe2_60%,#e7e0cc_100%)]",
};

/** Capa de curso: fundo neutro com o ícone do tema. */
export function CourseCoverPlaceholder({ icon, tone = "gray" }: { icon: CourseIcon; tone?: keyof typeof coverTones }) {
  const Icon = courseIcons[icon];
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${coverTones[tone]}`}>
      <Icon aria-hidden="true" strokeWidth={1.1} className="size-[42%] text-[#2b2e35]" />
    </div>
  );
}
