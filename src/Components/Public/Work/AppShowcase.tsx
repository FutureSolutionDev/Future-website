"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/Components/Common/Gallery/Lightbox";
import type { TGalleryCopy, TGalleryImage } from "@/Components/Common/Gallery/Types";
import { SectionLabel } from "@/Components/Common/SectionLabel";
import { StoreBadge, type TStoreCopy } from "@/Components/Common/StoreBadge";
import type { TProjectApp } from "@/Data/Projects";
import type { Lang } from "@/Lib/Seo";

type TAppShowcaseProps = {
  App: TProjectApp;
  Language: Lang;
  Label: string;
  Title: string;
  StoreCopy: TStoreCopy;
  GalleryCopy: TGalleryCopy;
};

export function AppShowcase({ App, Language, Label, Title, StoreCopy, GalleryCopy }: TAppShowcaseProps) {
  const [OpenIndex, SetOpenIndex] = useState<number | null>(null);
  const Images: TGalleryImage[] = App.Screens.map((Screen) => ({
    Src: `${App.Folder}/${Screen.File}`,
    Caption: Screen.Caption[Language],
    FileName: Screen.File,
  }));

  return (
    <section id="app" className="scroll-mt-24 overflow-hidden rounded-xl border border-line bg-[radial-gradient(90%_70%_at_100%_0%,var(--accent-soft),transparent_70%)] p-6 md:p-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:items-center">
        <div>
          <SectionLabel>{Label}</SectionLabel>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src={`${App.Folder}/icon.webp`}
              alt={App.Name}
              width={128}
              height={128}
              className="size-16 rounded-[18px] shadow-[0_12px_30px_-12px_rgba(11,40,64,0.6)] ring-1 ring-line"
            />
            <p lang="en" className="font-latin text-xl font-bold">{App.Name}</p>
          </div>
          <h2 className="mt-6 text-[26px] font-bold md:text-[32px]">{Title}</h2>
          <p className="mt-3 text-ink-muted">{App.Summary[Language]}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {App.Stores.map((Item) => (
              <StoreBadge key={Item.Store} Store={Item.Store} Url={Item.Url} Copy={StoreCopy} />
            ))}
          </div>
        </div>

        <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 md:-mx-10 md:px-10 lg:mx-0 lg:px-0 [scrollbar-width:thin] ltr:[mask-image:linear-gradient(to_right,black_82%,transparent)] rtl:[mask-image:linear-gradient(to_left,black_82%,transparent)]">
          {Images.map((Item, Index) => (
            <li key={Item.Src} className="w-[200px] shrink-0 snap-start sm:w-[230px]">
              <button
                type="button"
                onClick={() => SetOpenIndex(Index)}
                aria-label={`${GalleryCopy.Open}: ${Item.Caption}`}
                className="group block w-full overflow-hidden rounded-[22px] border border-line bg-surface shadow-card transition-transform duration-300 hover:-translate-y-1"
              >
                <Image
                  src={Item.Src}
                  alt={Item.Caption}
                  width={900}
                  height={1600}
                  sizes="230px"
                  className="aspect-[941/1672] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
              <p className="mt-2.5 px-1 text-sm text-ink-muted">{Item.Caption}</p>
            </li>
          ))}
        </ul>
      </div>

      {OpenIndex !== null && (
        <Lightbox
          Images={Images}
          StartIndex={OpenIndex}
          Title={App.Name}
          Copy={GalleryCopy}
          IsRtl={Language === "ar"}
          OnClose={() => SetOpenIndex(null)}
        />
      )}
    </section>
  );
}
