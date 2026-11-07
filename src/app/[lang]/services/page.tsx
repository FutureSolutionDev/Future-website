import type { Metadata } from "next";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { Icon } from "@/Components/Common/Icon";
import { JsonLd } from "@/Components/Common/JsonLd";
import { PageHeader } from "@/Components/Common/PageHeader";
import { PRODUCTS, ProductName } from "@/Data/Products";
import { SERVICES } from "@/Data/Services";
import { ServicesSchema } from "@/Lib/Schema";
import { PageMetadata, PathFor, ToLang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return PageMetadata(ToLang((await params).lang), "services", "/services");
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const Language = ToLang((await params).lang);
  const { Common, Pages } = GetDictionary(Language);
  const Copy = Pages.Services;

  return (
    <>
      <JsonLd Data={ServicesSchema(Language)} />
      <PageHeader
        Label={Common.Nav.Services}
        Title={Copy.Title}
        Lead={Copy.Lead}
        Language={Language}
        Common={Common}
        Trail={[{ Name: Common.Nav.Services, Path: PathFor(Language, "/services") }]}
      />

      <section className="py-20 md:py-[104px]">
        <div className="container-page">
          <ol className="border-t border-line">
            {SERVICES.map((Service, Index) => (
              <li key={Service.Id} id={Service.Id} className="scroll-mt-28 grid gap-6 border-b border-line py-10 md:grid-cols-[56px_1fr_1fr] md:gap-8">
                <span className="font-mono text-sm text-accent-ink">
                  <bdi dir="ltr">{String(Index + 1).padStart(2, "0")}</bdi>
                </span>
                <div>
                  <h2 className="flex items-center gap-3 text-2xl font-bold md:text-[28px]">
                    <Icon Name={Service.Icon} Size={24} ClassName="text-accent" />
                    {Service.Title[Language]}
                  </h2>
                  <p className="mt-3 text-lg text-ink-muted">{Service.Description[Language]}</p>
                  {Service.Stack && (
                    <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                      <span>{Copy.StackLabel}:</span>
                      {Service.Stack.map((Tool) => {
                        const Own = PRODUCTS.find((Product) => Product.Name === Tool);
                        const Label = Own ? ProductName(Own, Language) : Tool;
                        const IsLatin = Label === Tool;
                        return (
                          <span
                            key={Tool}
                            lang={IsLatin ? "en" : undefined}
                            className={IsLatin ? "rounded-full border border-line px-3 py-0.5 font-mono text-xs" : "rounded-full border border-line px-3 py-0.5 text-xs font-semibold"}
                          >
                            {Label}
                          </span>
                        );
                      })}
                    </p>
                  )}
                </div>
                <ul className="grid content-start gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  {Service.Features.map((Feature) => (
                    <li key={Feature.en} className="flex gap-2.5 text-ink-muted">
                      <Icon Name="Check" Size={18} ClassName="mt-1 text-accent" />
                      {Feature[Language]}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>


      <CtaPanel Language={Language} Common={Common} Title={Copy.CtaTitle} Text={Copy.CtaText} />
    </>
  );
}
