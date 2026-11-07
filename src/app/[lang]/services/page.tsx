import type { Metadata } from "next";
import Link from "next/link";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { Icon, OutArrow } from "@/Components/Common/Icon";
import { JsonLd } from "@/Components/Common/JsonLd";
import { PageHeader } from "@/Components/Common/PageHeader";
import { ToolChips } from "@/Components/Public/Services/ToolChips";
import { SERVICES, ServiceStack } from "@/Data/Services/Index";
import { ServicesSchema } from "@/Lib/Schema";
import { PageMetadata, PathFor, ToLang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

const PREVIEW_TOOLS = 8;

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
            {SERVICES.map((Service, Index) => {
              const Href = PathFor(Language, `/services/${Service.Id}`);
              const Stack = ServiceStack(Service);
              return (
                <li key={Service.Id} id={Service.Id} className="scroll-mt-28 grid gap-6 border-b border-line py-10 md:grid-cols-[56px_1fr_1fr] md:gap-8">
                  <span className="font-mono text-sm text-accent-ink">
                    <bdi dir="ltr">{String(Index + 1).padStart(2, "0")}</bdi>
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold md:text-[28px]">
                      <Link href={Href} className="flex items-center gap-3 hover:text-accent-ink">
                        <Icon Name={Service.Icon} Size={24} ClassName="text-accent" />
                        {Service.Title[Language]}
                      </Link>
                    </h2>
                    <p className="mt-3 text-lg text-ink-muted">{Service.Description[Language]}</p>
                    <p className="mt-5 text-sm text-ink-soft">{Copy.StackLabel}</p>
                    <ToolChips Tools={Stack.slice(0, PREVIEW_TOOLS)} Language={Language} ClassName="mt-2" />
                    {Stack.length > PREVIEW_TOOLS && (
                      <p className="mt-2 text-xs text-ink-soft">
                        <bdi dir="ltr">+{Stack.length - PREVIEW_TOOLS}</bdi>
                      </p>
                    )}
                  </div>
                  <div>
                    <ul className="grid content-start gap-3 sm:grid-cols-2">
                      {Service.SubServices.map((Sub) => (
                        <li key={Sub.Title.en} className="flex gap-2.5 text-ink-muted">
                          <Icon Name="Check" Size={18} ClassName="mt-1 shrink-0 text-accent" />
                          {Sub.Title[Language]}
                        </li>
                      ))}
                    </ul>
                    <Link href={Href} className="mt-6 inline-flex items-center gap-2 font-semibold text-accent-ink hover:text-ink">
                      {Copy.Explore}
                      <OutArrow Size={18} />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <CtaPanel Language={Language} Common={Common} Title={Copy.CtaTitle} Text={Copy.CtaText} />
    </>
  );
}
