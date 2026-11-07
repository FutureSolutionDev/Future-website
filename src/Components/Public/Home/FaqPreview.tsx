import { ButtonLink } from "@/Components/Common/Button";
import { SectionLabel } from "@/Components/Common/SectionLabel";
import { FaqAnswer } from "@/Components/Public/Faq/FaqAnswer";
import { ALL_FAQS, HOME_FAQ_IDS } from "@/Data/Faqs";
import { PathFor, type Lang } from "@/Lib/Seo";
import type { TDictionary } from "@/I18n/Index";

export function FaqPreview({ Language, Copy }: { Language: Lang; Copy: TDictionary }) {
  const Items = ALL_FAQS.filter((Faq) => HOME_FAQ_IDS.includes(Faq.Id));
  return (
    <section className="py-20 md:py-[104px]">
      <div className="container-page grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-[72px]">
        <div className="md:sticky md:top-[120px] md:self-start">
          <SectionLabel Index="05">{Copy.Common.Nav.Faq}</SectionLabel>
          <h2 className="mt-4 text-[30px] font-bold md:text-[42px]">{Copy.Home.Faq.Title}</h2>
          <p className="mt-3 text-lg text-ink-muted">{Copy.Home.Faq.Lead}</p>
          <ButtonLink Href={PathFor(Language, "/faq")} Variant="Line" ClassName="mt-7">
            {Copy.Home.Faq.All}
          </ButtonLink>
        </div>
        <ol className="relative ps-9 before:absolute before:inset-y-2 before:start-1.5 before:w-px before:bg-line-strong">
          {Items.map((Faq, Index) => (
            <li
              key={Faq.Id}
              className="relative pb-7 before:absolute before:-start-[35px] before:top-[13px] before:size-[11px] before:rounded-full before:border-2 before:border-accent before:bg-page"
            >
              <h3 className="flex items-baseline gap-2.5 text-[19px] font-semibold">
                <span className="rounded-sm bg-accent-soft px-2 font-mono text-xs leading-6 text-accent-ink">
                  {Copy.Pages.Faq.QuestionShort}
                  <bdi dir="ltr">{Index + 1}</bdi>
                </span>
                {Faq.Question[Language]}
              </h3>
              <div className="mt-1.5">
                <FaqAnswer Parts={Faq.Answer[Language]} Language={Language} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
