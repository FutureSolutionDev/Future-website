import Image from "next/image";
import { ButtonLink } from "@/Components/Common/Button";
import { HeroTraces } from "@/Components/Common/CircuitTraces";
import { ForwardArrow } from "@/Components/Common/Icon";
import { SectionLabel } from "@/Components/Common/SectionLabel";
import { MetricRail } from "./MetricRail";
import { HOME_METRICS } from "@/Data/Company";
import { PathFor, type Lang } from "@/Lib/Seo";
import type { TDictionary } from "@/I18n/Index";

type THeroProps = {
  Language: Lang;
  Copy: TDictionary;
  ShotSrc?: string;
};

export function Hero({ Language, Copy, ShotSrc }: THeroProps) {
  const Hero = Copy.Home.Hero;
  return (
    <section data-theme="inverse" className="relative overflow-hidden">
      <HeroTraces />
      <div className="container-page relative grid items-center gap-10 pt-11 md:grid-cols-2 md:gap-14 md:pt-20">
        <div className="animate-rise">
          <SectionLabel>{Hero.Eyebrow}</SectionLabel>
          <h1 className="mt-5 text-[38px] font-bold md:text-[54px] lg:text-[58px]">
            {Hero.TitleStart} <span className="text-accent">{Hero.TitleAccent}</span> {Hero.TitleEnd}
          </h1>
          <p className="mt-5 max-w-[540px] text-[17px] text-ink-muted md:text-[19px]">{Hero.Lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink Href={PathFor(Language, "/contact")}>
              {Copy.Common.Cta.BookConsultation}
              <ForwardArrow />
            </ButtonLink>
            <ButtonLink Href={PathFor(Language, "/portfolio")} Variant="Line">
              {Copy.Common.Cta.SeeWork}
            </ButtonLink>
          </div>
        </div>
        {ShotSrc && (
          <figure className="relative overflow-hidden rounded-lg border border-line-strong shadow-shot animate-rise [animation-delay:120ms]">
            <Image src={ShotSrc} alt={Hero.ShotCaption} width={1400} height={750} priority sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-brand-950/90 to-transparent px-4 pt-8 pb-3 text-[13px] text-white">
              <span>{Hero.ShotCaption}</span>
              <span className="font-mono text-brand-200">{Hero.Live}</span>
            </figcaption>
          </figure>
        )}
      </div>
      <div className="container-page relative">
        <MetricRail Items={HOME_METRICS} Language={Language} />
      </div>
    </section>
  );
}
