import type { Metadata } from "next";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { Icon } from "@/Components/Common/Icon";
import { JsonLd } from "@/Components/Common/JsonLd";
import { PageHeader } from "@/Components/Common/PageHeader";
import { SectionLabel } from "@/Components/Common/SectionLabel";
import { MetricRail } from "@/Components/Public/Home/MetricRail";
import { TeamGrid } from "@/Components/Public/About/TeamGrid";
import { COMPANY_PRINCIPLES, COMPANY_STATS, COMPANY_VALUES } from "@/Data/Company";
import { TeamSchema } from "@/Lib/Schema";
import { PageMetadata, PathFor, ToLang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return PageMetadata(ToLang((await params).lang), "about", "/about");
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const Language = ToLang((await params).lang);
  const { Common, Pages } = GetDictionary(Language);
  const Copy = Pages.About;

  return (
    <>
      <JsonLd Data={TeamSchema(Language)} />
      <PageHeader
        Language={Language}
        Common={Common}
        Trail={[{ Name: Common.Nav.About, Path: PathFor(Language, "/about") }]}
        Label={Common.Nav.About}
        Title={
          <>
            {Copy.TitleStart} <span className="text-accent">{Copy.TitleAccent}</span>
          </>
        }
        Lead={Copy.Lead}
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-10 md:grid-cols-2 md:gap-14">
          <p className="text-lg leading-[1.9] text-ink-muted">{Copy.StoryOne}</p>
          <p className="text-lg leading-[1.9] text-ink-muted">{Copy.StoryTwo}</p>
        </div>
        <div className="container-page">
          <MetricRail Items={COMPANY_STATS} Language={Language} />
        </div>
      </section>

      <section data-theme="inverse" className="py-20 md:py-[104px]">
        <div className="container-page">
          <SectionLabel>{Copy.ValuesLabel}</SectionLabel>
          <h2 className="mt-4 text-[30px] font-bold md:text-[42px]">{Copy.ValuesTitle}</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
            {COMPANY_VALUES.map((Value) => (
              <li key={Value.Title.en} className="bg-page p-7 md:p-8">
                <Icon Name={Value.Icon} Size={26} ClassName="text-accent" />
                <h3 className="mt-4 text-xl font-bold">{Value.Title[Language]}</h3>
                <p className="mt-2 text-ink-muted">{Value.Text[Language]}</p>
              </li>
            ))}
          </ul>
          <h3 className="mt-16 text-2xl font-bold">{Copy.PrinciplesTitle}</h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_PRINCIPLES.map((Principle) => (
              <li key={Principle.Title.en} className="flex gap-3">
                <Icon Name={Principle.Icon} Size={22} ClassName="mt-1 text-accent" />
                <span>
                  <b className="block font-semibold">{Principle.Title[Language]}</b>
                  <span className="text-[15px] text-ink-muted">{Principle.Text[Language]}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-[104px]">
        <div className="container-page">
          <SectionLabel>{Copy.TeamLabel}</SectionLabel>
          <h2 className="mt-4 text-[30px] font-bold md:text-[42px]">{Copy.TeamTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-muted">{Copy.TeamLead}</p>
          <TeamGrid Language={Language} Labels={Common.Links} />
          <p className="mt-8 text-sm text-ink-soft">{Copy.TeamNote}</p>
        </div>
      </section>

      <CtaPanel Language={Language} Common={Common} Title={Copy.CtaTitle} Text={Copy.CtaText} />
    </>
  );
}
