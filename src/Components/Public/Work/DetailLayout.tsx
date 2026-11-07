import type { ReactNode } from "react";
import { Icon } from "@/Components/Common/Icon";
import { FilesViewer } from "@/Components/Common/Gallery/FilesViewer";
import type { TScreenCaptions } from "@/Data/Links";
import { ResolveCaptions } from "@/Lib/Gallery";
import type { Lang, TBilingual } from "@/Lib/Seo";
import type { TDictionary } from "@/I18n/Index";

export function FactsGrid({ Facts }: { Facts: { Label: string; Value: ReactNode }[] }) {
  return (
    <dl className="grid grid-cols-2 overflow-hidden rounded-lg border border-line">
      {Facts.map((Fact, Index) => (
        <div
          key={Fact.Label}
          className={
            "px-5 py-4 " + (Index % 2 === 1 ? "border-s border-line " : "") + (Index > 1 ? "border-t border-line" : "")
          }
        >
          <dt className="text-[13px] text-ink-soft">{Fact.Label}</dt>
          <dd className="mt-0.5 font-semibold">{Fact.Value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FeatureList({ Title, Features, Language }: { Title: string; Features: TBilingual[]; Language: Lang }) {
  return (
    <section>
      <h2 className="text-2xl font-bold md:text-[28px]">{Title}</h2>
      <ul className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">
        {Features.map((Feature) => (
          <li key={Feature.en} className="flex gap-3 border-b border-line pb-4 text-ink-muted">
            <Icon Name="Check" Size={20} ClassName="mt-0.5 text-accent" />
            {Feature[Language]}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TechList({ Label, Items }: { Label: string; Items: string[] }) {
  return (
    <p className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
      <span>{Label}:</span>
      {Items.map((Item) => (
        <span key={Item} lang="en" className="rounded-full border border-line px-3 py-0.5 font-mono text-xs">
          {Item}
        </span>
      ))}
    </p>
  );
}

type TScreensProps = {
  Title: string;
  ImagesFolder?: string;
  Images: string[];
  Captions?: TScreenCaptions;
  Language: Lang;
  Copy: TDictionary;
};

export function Screens({ Title, ImagesFolder, Images, Captions, Language, Copy }: TScreensProps) {
  return (
    <section id="files" className="scroll-mt-24">
      <h2 className="mb-6 text-2xl font-bold md:text-[28px]">{Copy.Pages.Project.Screens}</h2>
      <FilesViewer
        Title={Title}
        ImagesFolder={ImagesFolder}
        InitialImages={Images}
        Captions={ResolveCaptions(Captions, Language)}
        FilesCopy={Copy.Common.Files}
        GalleryCopy={Copy.Common.Gallery}
        IsRtl={Language === "ar"}
      />
    </section>
  );
}
