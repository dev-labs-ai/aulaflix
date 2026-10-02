// Placeholders visuais para as imagens da referência. Troque por <Image> quando
// houver fotos e capas próprias em /public.
import { Newspaper, Play, UserRound, type LucideIcon } from "lucide-react";
import { cn } from "@/components/ui";

/** Retrato do instrutor: estúdio escuro com luz azul. */
export function PortraitPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "absolute inset-0 flex items-end bg-[#0c0e14] bg-[radial-gradient(120%_80%_at_85%_10%,#2f3fff_0%,#1a1f6b_35%,transparent_70%),radial-gradient(90%_60%_at_10%_100%,#3b2a1f_0%,transparent_70%)]",
        className,
      )}
    >
      <UserRound
        aria-hidden="true"
        strokeWidth={1}
        className="absolute left-1/2 top-[55%] size-[58%] -translate-x-1/2 -translate-y-1/2 text-white/25"
      />
      <span className="relative m-4 rounded-xs bg-black/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">
        {label}
      </span>
    </div>
  );
}

/** Capa de curso: gravura em tons de cinza com o ícone do tema. */
export function CourseCoverPlaceholder({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(90%_90%_at_50%_40%,#e9e6df_0%,#c4c0b8_55%,#8e8a83_100%)]">
      <Icon aria-hidden="true" strokeWidth={1.1} className="size-[42%] text-[#2b2e35]" />
    </div>
  );
}

/** Miniatura de vídeo do YouTube. */
export function VideoThumbPlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex items-center bg-[radial-gradient(80%_120%_at_85%_50%,#2f3fff_0%,#141a5c_45%,#0c0e14_80%)] p-5">
      <p className="line-clamp-3 max-w-[60%] font-heading text-[18px] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-white/90">
        {title}
      </p>
      <span className="absolute bottom-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-white/15">
        <Play aria-hidden="true" className="size-4 fill-white text-white" />
      </span>
    </div>
  );
}

/** Ilustração de artigo do Substack: fundo creme quente. */
export function ArticleThumbPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(70%_90%_at_50%_50%,#fdf3e3_0%,#f8e4c6_100%)]">
      <Newspaper aria-hidden="true" strokeWidth={1.2} className="size-[30%] text-[#3f6b63]" />
    </div>
  );
}

const avatarColors = ["#0f7f6f", "#8b6a5c", "#3f51b5", "#c2185b", "#5d4037", "#00897b", "#7b1fa2", "#ef6c00"];

/** Avatar circular com a inicial do nome (como os avatares padrão do YouTube). */
export function InitialAvatar({ name, className }: { name: string; className?: string }) {
  const color = avatarColors[[...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % avatarColors.length];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-subtle font-sans text-[20px] text-white",
        className,
      )}
      style={{ backgroundColor: color }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
