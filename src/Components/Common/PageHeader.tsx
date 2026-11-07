import type { ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";
import { HeroTraces } from "./CircuitTraces";
import { Breadcrumbs } from "./Breadcrumbs";
import type { TCrumb } from "@/Lib/Schema";
import { PathFor, type Lang } from "@/Lib/Seo";
import type { TCommon } from "@/I18n/Index";

type TPageHeaderProps = {
  Language: Lang;
  Common: TCommon;
  Trail: TCrumb[];
  Label: string;
  Title: ReactNode;
  Lead?: ReactNode;
  children?: ReactNode;
};

export function PageHeader({ Language, Common, Trail, Label, Title, Lead, children }: TPageHeaderProps) {
  const Items = [{ Name: Common.Nav.Home, Path: PathFor(Language) }, ...Trail];
  return (
    <header data-theme="inverse" className="relative overflow-hidden">
      <HeroTraces ClassName="opacity-70" />
      <div className="container-page relative pt-10 pb-16 md:pt-14 md:pb-20">
        <Breadcrumbs Items={Items} Label={Common.Breadcrumb} />
        <div className="mt-8 max-w-3xl">
          <SectionLabel>{Label}</SectionLabel>
          <h1 className="mt-5 text-[34px] font-bold md:text-5xl">{Title}</h1>
          {Lead && <p className="mt-5 max-w-2xl text-[17px] text-ink-muted md:text-lg">{Lead}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}
