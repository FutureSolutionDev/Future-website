"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ToGalleryImages } from "@/Lib/Gallery";
import { UseProjectImages } from "@/Hooks/UseProjectImages";
import { Lightbox } from "./Lightbox";
import type { TGalleryCopy } from "./Types";

type TGalleryMosaicProps = {
  Title: string;
  ImagesFolder: string;
  InitialImages: string[];
  Captions: Record<string, string>;
  Copy: TGalleryCopy;
  MoreLabel: string;
  IsRtl: boolean;
};

export function GalleryMosaic({ Title, ImagesFolder, InitialImages, Captions, Copy, MoreLabel, IsRtl }: TGalleryMosaicProps) {
  const Paths = UseProjectImages(ImagesFolder, InitialImages);
  const Images = useMemo(() => ToGalleryImages(Paths, Captions), [Paths, Captions]);
  const [OpenIndex, SetOpenIndex] = useState<number | null>(null);
  const Visible = Images.slice(0, 3);
  const Hidden = Images.length - Visible.length;

  if (Visible.length === 0) return null;

  return (
    <div className="grid grid-cols-[1.6fr_1fr] grid-rows-2 gap-3">
      {Visible.map((Item, Index) => (
        <button
          key={Item.Src}
          type="button"
          onClick={() => SetOpenIndex(Index)}
          aria-label={`${Copy.Open}: ${Item.Caption}`}
          className={
            "group relative overflow-hidden rounded-md border border-line " +
            (Index === 0 ? "row-span-2" : "") +
            (Visible.length === 1 ? " col-span-2" : "")
          }
        >
          <Image
            src={Item.Src}
            alt={Item.Caption}
            width={Index === 0 ? 900 : 480}
            height={Index === 0 ? 560 : 300}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {Index === Visible.length - 1 && Hidden > 0 && (
            <span className="absolute inset-0 grid place-items-center bg-brand-950/60 font-semibold text-white backdrop-blur-[2px]">
              <span>
                <bdi dir="ltr">+{Hidden}</bdi> {MoreLabel}
              </span>
            </span>
          )}
        </button>
      ))}
      {OpenIndex !== null && (
        <Lightbox Images={Images} StartIndex={OpenIndex} Title={Title} Copy={Copy} IsRtl={IsRtl} OnClose={() => SetOpenIndex(null)} />
      )}
    </div>
  );
}
