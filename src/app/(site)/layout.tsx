import { SiteShell } from "@/components/site-shell";

/** Páginas públicas com header e rodapé do site. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
