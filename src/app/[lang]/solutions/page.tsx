import type { Metadata } from "next";
import { TextLink } from "@/Components/Common/Button";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { Icon } from "@/Components/Common/Icon";
import { PageHeader } from "@/Components/Common/PageHeader";
import { INDUSTRIES } from "@/Data/Industries";
import { PageMetadata, PathFor, ToLang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return PageMetadata(ToLang((await params).lang), "solutions", "/solutions");
}

export default async function SolutionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const Language = ToLang((await params).lang);
  const { Common, Pages } = GetDictionary(Language);
  const Copy = Pages.Industries;

  return (
    <>
      <PageHeader
        Label={Common.Nav.Industries}
        Title={Copy.Title}
        Lead={Copy.Lead}
        Language={Language}
        Common={Common}
        Trail={[{ Name: Common.Nav.Industries, Path: PathFor(Language, "/solutions") }]}
      />

      <section className="py-20 md:py-[104px]">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {INDUSTRIES.map((Industry) => (
            <article key={Industry.Slug} id={Industry.Slug} className="flex scroll-mt-28 flex-col rounded-lg border border-line bg-surface p-7 shadow-card md:p-8">
              <span className="grid size-12 place-items-center rounded-md bg-accent-soft text-accent">
                <Icon Name={Industry.Icon} Size={24} />
              </span>
              <h2 className="mt-5 text-2xl font-bold">{Industry.Title[Language]}</h2>
              <p className="mt-3 text-ink-muted">{Industry.Content[Language]}</p>
              <ul className="mt-5 mb-7 grid gap-2.5">
                {Industry.Points.map((Point) => (
                  <li key={Point.en} className="flex gap-2.5 text-[15px]">
                    <Icon Name="Check" Size={18} ClassName="mt-1 text-accent" />
                    {Point[Language]}
                  </li>
                ))}
              </ul>
              <p className="mt-auto">
                <TextLink Href={PathFor(Language, `/blog/${Industry.Slug}`)}>{Copy.LearnMore}</TextLink>
              </p>
            </article>
          ))}
        </div>
      </section>

      <CtaPanel Language={Language} Common={Common} Title={Copy.CtaTitle} Text={Copy.CtaText} />
    </>
  );
}
