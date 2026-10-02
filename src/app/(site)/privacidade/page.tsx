import type { Metadata } from "next";
import { Eyebrow, cn, container } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacidade",
};

// Placeholder: a referência não foi capturada; o texto definitivo ainda precisa ser escrito.
const sections = [
  {
    title: "Quais dados coletamos",
    body: "Esta seção vai descrever quais informações pessoais são coletadas quando você cria uma conta, entra em uma lista de espera ou compra um curso.",
  },
  {
    title: "Como usamos os seus dados",
    body: "Aqui vamos explicar como os dados são usados para dar acesso aos cursos, enviar comunicações sobre as listas de espera e melhorar a plataforma.",
  },
  {
    title: "Seus direitos",
    body: "Também vamos detalhar como solicitar acesso, correção ou exclusão dos seus dados, de acordo com a LGPD.",
  },
];

export default function PrivacidadePage() {
  return (
    <section aria-labelledby="privacidade-title" className={cn(container, "pb-24 pt-16 sm:pb-32 sm:pt-24 lg:pt-32")}>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="reveal lg:col-span-8 lg:col-start-2">
          <header>
            <Eyebrow>Privacidade</Eyebrow>
            <h1
              id="privacidade-title"
              className="mt-5 font-heading text-[40px] font-semibold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[56px] sm:leading-[1.02]"
            >
              Política de privacidade.
            </h1>
            <p className="mt-6 max-w-[60ch] font-sans text-[17px] leading-[1.6] text-ink-tertiary sm:text-[18px]">
              A política de privacidade do {site.name} ainda está sendo escrita. Enquanto isso, esta página resume o que
              ela vai cobrir.
            </p>
          </header>

          <div className="mt-12 border-t border-line-strong sm:mt-16">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-line py-8 sm:py-9">
                <h2 className="font-heading text-[20px] font-semibold tracking-[-0.012em] text-ink sm:text-[22px]">
                  {section.title}
                </h2>
                <p className="mt-3 max-w-[62ch] font-sans text-[16px] leading-[1.6] text-ink-secondary sm:text-[17px]">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">Documento em elaboração</p>
        </div>
      </div>
    </section>
  );
}
