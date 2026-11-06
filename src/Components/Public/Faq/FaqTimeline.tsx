"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FileText, MessageCircle, Search } from "lucide-react";
import { Icon } from "@/Components/Common/Icon";
import { AnswerText, FAQ_CHAPTERS, type TFaqLink } from "@/Data/Faqs";
import { Cn } from "@/Lib/Cn";
import type { Lang } from "@/Lib/Seo";
import type { TDictionary } from "@/I18n/Index";
import { FaqAnswer, LocalHref } from "./FaqAnswer";
import { UseFaqProgress } from "./UseFaqProgress";

type TFaqTimelineProps = {
  Language: Lang;
  Copy: TDictionary["Pages"]["Faq"];
};

function GotoLink({ Item, Language }: { Item: TFaqLink; Language: Lang }) {
  const External = Item.Kind === "whatsapp";
  const Classes =
    "inline-flex min-h-[34px] items-center gap-2 rounded-2xl border border-line bg-subtle px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent-ink";
  const Glyph = External ? <MessageCircle size={15} className="text-accent" aria-hidden="true" /> : <FileText size={15} className="text-accent" aria-hidden="true" />;
  if (External) {
    return (
      <a href={LocalHref(Language, Item.Href)} target="_blank" rel="noopener noreferrer" className={Classes}>
        {Glyph}
        {Item.Label[Language]}
      </a>
    );
  }
  return (
    <Link href={LocalHref(Language, Item.Href)} className={Classes}>
      {Glyph}
      {Item.Label[Language]}
    </Link>
  );
}

export function FaqTimeline({ Language, Copy }: TFaqTimelineProps) {
  const [Query, SetQuery] = useState("");
  const AllIds = useMemo(() => FAQ_CHAPTERS.flatMap((Chapter) => Chapter.Faqs.map((Faq) => Faq.Id)), []);
  const Normalized = Query.trim().toLowerCase();

  const Chapters = useMemo(() => {
    let Counter = 0;
    return FAQ_CHAPTERS.map((Chapter) => ({
      ...Chapter,
      Items: Chapter.Faqs.map((Faq) => ({ Faq, Number: ++Counter })).filter(({ Faq }) => {
        if (!Normalized) return true;
        const Haystack = `${Faq.Question[Language]} ${AnswerText(Faq.Answer[Language])}`.toLowerCase();
        return Haystack.includes(Normalized);
      }),
    })).filter((Chapter) => Chapter.Items.length > 0);
  }, [Language, Normalized]);

  const VisibleIds = useMemo(() => Chapters.flatMap((Chapter) => Chapter.Items.map(({ Faq }) => Faq.Id)), [Chapters]);
  const VisibleChapters = new Set(Chapters.map((Chapter) => Chapter.Id));
  const { ReadIds, ActiveChapter, FocusedId } = UseFaqProgress(VisibleIds);

  const Progress = Math.round((ReadIds.size / AllIds.length) * 100);
  let Side = 0;

  return (
    <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-6 pb-20 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 md:pb-[104px]">
      <aside className="sticky top-nav z-20 min-w-0 -mx-4 border-b border-line bg-page/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:top-[104px] lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:p-0">
        <h2 className="mb-3 hidden text-[13px] font-semibold text-ink-soft lg:block">{Copy.Stages}</h2>
        <nav aria-label={Copy.Stages}>
          <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0.5">
            {FAQ_CHAPTERS.filter((Chapter) => VisibleChapters.has(Chapter.Id)).map((Chapter) => (
              <li key={Chapter.Id} className="shrink-0">
                <a
                  href={`#stage-${Chapter.Id}`}
                  aria-current={ActiveChapter === Chapter.Id ? "location" : undefined}
                  className="flex items-center gap-2.5 rounded-full border border-line px-3 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink aria-[current=location]:border-accent aria-[current=location]:bg-accent-soft aria-[current=location]:font-semibold aria-[current=location]:text-accent-ink lg:rounded-sm lg:border-0 lg:px-3 lg:py-2.5 lg:text-[15px]"
                >
                  <Icon Name={Chapter.Icon} Size={17} />
                  {Chapter.Title[Language]}
                  <bdi dir="ltr" className="ms-auto hidden font-mono text-xs text-ink-soft lg:inline">
                    {Chapter.Faqs.length}
                  </bdi>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5 hidden lg:block">
          <div className="h-[3px] overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${Progress}%` }} />
          </div>
          <p className="mt-2 text-[13px] text-ink-soft">
            {Copy.ReadOf} <bdi dir="ltr">{ReadIds.size}</bdi> {Copy.Of} <bdi dir="ltr">{AllIds.length}</bdi>
          </p>
        </div>
      </aside>

      <div>
        <label className="mx-auto mb-10 flex h-[52px] max-w-xl items-center gap-2.5 rounded-md border border-control bg-surface px-4 text-ink-soft focus-within:border-focus focus-within:ring-2 focus-within:ring-focus/30">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">{Copy.SearchLabel}</span>
          <input
            id="faq-search"
            type="search"
            value={Query}
            onChange={(Event) => SetQuery(Event.target.value)}
            placeholder={Copy.Search}
            className="h-full w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-soft"
          />
        </label>

        <p role="status" className="text-center text-ink-muted empty:hidden">
          {Chapters.length === 0 ? Copy.NoResults : ""}
        </p>

        <div className="relative before:absolute before:inset-y-0 before:start-[11px] before:w-0.5 before:bg-line md:before:start-1/2 md:before:-translate-x-1/2 md:rtl:before:translate-x-1/2">
          <div
            aria-hidden="true"
            className="absolute start-[11px] top-0 w-0.5 bg-accent transition-[height] duration-500 md:start-1/2 md:-translate-x-1/2 md:rtl:translate-x-1/2"
            style={{ height: `${Progress}%` }}
          />
          {Chapters.map((Chapter) => (
            <section key={Chapter.Id} id={`stage-${Chapter.Id}`} data-chapter-id={Chapter.Id} className="scroll-mt-40" aria-labelledby={`stage-title-${Chapter.Id}`}>
              <div className="relative mb-7 flex md:justify-center">
                <h2 id={`stage-title-${Chapter.Id}`} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-2.5 ps-3.5 pe-5 font-semibold shadow-card">
                  <span className="grid size-8 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon Name={Chapter.Icon} Size={17} />
                  </span>
                  {Chapter.Title[Language]}
                </h2>
              </div>
              {Chapter.Items.map(({ Faq, Number }) => {
                const IsAlt = Side++ % 2 === 1;
                const IsRead = ReadIds.has(Faq.Id);
                const IsFocused = FocusedId === Faq.Id;
                return (
                  <article
                    key={Faq.Id}
                    id={`q-${Faq.Id}`}
                    data-faq-id={Faq.Id}
                    className={Cn(
                      "relative mb-5 scroll-mt-40 ps-10 md:w-1/2 md:ps-0",
                      IsAlt ? "md:ms-[50%] md:ps-12" : "md:pe-12",
                      "before:absolute before:top-[30px] before:start-[5px] before:z-[1] before:size-[14px] before:rounded-full before:border-[3px] before:bg-page",
                      IsRead ? "before:border-accent before:bg-accent" : "before:border-line-strong",
                      IsAlt ? "md:before:-start-[7px]" : "md:before:start-auto md:before:-end-[7px]",
                      "after:absolute after:top-9 after:start-[19px] after:h-0.5 after:w-[21px] after:bg-line-strong",
                      IsAlt ? "md:after:start-[7px] md:after:w-[41px]" : "md:after:start-auto md:after:end-[7px] md:after:w-[41px]",
                    )}
                  >
                    <div
                      className={Cn(
                        "rounded-lg border bg-surface p-5 shadow-card transition-shadow md:p-6",
                        IsFocused ? "border-accent ring-4 ring-accent-soft" : "border-line",
                      )}
                    >
                      <h3 className="mb-2.5 flex items-baseline gap-2.5 text-[19px] font-bold leading-snug">
                        <span className="shrink-0 rounded-sm bg-accent-soft px-2 font-mono text-xs font-semibold leading-6 text-accent-ink">
                          {Copy.QuestionShort}
                          <bdi dir="ltr">{Number}</bdi>
                        </span>
                        <a href={`#q-${Faq.Id}`} className="hover:text-accent-ink">
                          {Faq.Question[Language]}
                        </a>
                      </h3>
                      <FaqAnswer Parts={Faq.Answer[Language]} Language={Language} />
                      {Faq.Links && Faq.Links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {Faq.Links.map((Item) => (
                            <GotoLink key={Item.Href} Item={Item} Language={Language} />
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
