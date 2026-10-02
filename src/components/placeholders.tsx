// Placeholder visual para as capas de curso. Troque por <Image> quando houver
// capas próprias em /public.
import type { LucideIcon } from "lucide-react";

/** Capa de curso: gravura em tons de cinza com o ícone do tema. */
export function CourseCoverPlaceholder({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(90%_90%_at_50%_40%,#e9e6df_0%,#c4c0b8_55%,#8e8a83_100%)]">
      <Icon aria-hidden="true" strokeWidth={1.1} className="size-[42%] text-[#2b2e35]" />
    </div>
  );
}
