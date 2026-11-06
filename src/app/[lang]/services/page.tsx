import type { Metadata } from "next";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { Icon } from "@/Components/Common/Icon";
import { JsonLd } from "@/Components/Common/JsonLd";
import { PageHeader } from "@/Components/Common/PageHeader";
import { SectionLabel } from "@/Components/Common/SectionLabel";
import { SERVICES } from "@/Data/Services";
import { KEY_TECHS, TECH_CATEGORIES } from "@/Data/Technologies";
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

      <section id="technologies" data-theme="inverse" className="scroll-mt-20 py-20 md:py-[104px]">
        <div className="container-page">
          <SectionLabel>{Copy.TechLabel}</SectionLabel>
          <h2 className="mt-4 max-w-3xl text-[30px] font-bold md:text-[42px]">{Copy.TechTitle}</h2>
          <p className="mt-3 max-w-3xl text-lg text-ink-muted">{Copy.TechLead}</p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {TECH_CATEGORIES.map((Category) => (
              <div key={Category.Name.en} className="bg-page p-6 md:p-7">
                <h3 className="text-xl font-bold">{Category.Name[Language]}</h3>
                <p className="mt-2 text-[15px] text-ink-muted">{Category.Benefit[Language]}</p>
                <ul className="mt-5 flex flex-wrap gap-2" lang="en">
                  {Category.Items.map((Item) => (
                    <li key={Item} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-muted">
                      {Item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="mt-16 text-2xl font-bold">{Copy.KeyTechTitle}</h3>
          <dl className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {KEY_TECHS.map((Tech) => (
              <div key={Tech.Name} className="border-s-2 border-trace ps-4">
                <dt className="font-latin font-semibold">{Tech.Name}</dt>
                <dd className="mt-1 text-[15px] text-ink-muted">{Tech.Description[Language]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="pt-20 md:pt-[104px]">
        <CtaPanel Language={Language} Common={Common} Title={Copy.CtaTitle} Text={Copy.CtaText} />
      </div>
    </>
  );
}
