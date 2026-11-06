"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, FolderOpen, LayoutGrid, List, ZoomIn, ZoomOut } from "lucide-react";
import { Cn } from "@/Lib/Cn";
import { ToGalleryImages } from "@/Lib/Gallery";
import { UseProjectImages } from "@/Hooks/UseProjectImages";
import type { TCommon } from "@/I18n/Index";
import { Lightbox } from "./Lightbox";
import type { TGalleryCopy } from "./Types";
import { CounterText, UseGalleryNavigation } from "./UseGalleryNavigation";

type TFilesCopy = TCommon["Files"];

type TFilesViewerProps = {
  Title: string;
  ImagesFolder?: string;
  InitialImages: string[];
  Captions: Record<string, string>;
  FilesCopy: TFilesCopy;
  GalleryCopy: TGalleryCopy;
  IsRtl: boolean;
};

const ZOOM_STEPS = [75, 100, 125, 150];
const TOOL_CLASS =
  "grid size-9 place-items-center rounded-lg border border-transparent text-ink-muted transition-colors hover:bg-surface hover:text-ink disabled:opacity-40";

export function FilesViewer({ Title, ImagesFolder, InitialImages, Captions, FilesCopy, GalleryCopy, IsRtl }: TFilesViewerProps) {
  const Paths = UseProjectImages(ImagesFolder, InitialImages);
  const Images = useMemo(() => ToGalleryImages(Paths, Captions), [Paths, Captions]);
  const Navigation = UseGalleryNavigation(Images.length, 0, IsRtl);
  const [View, SetView] = useState<"List" | "Grid">("List");
  const [ZoomIndex, SetZoomIndex] = useState(1);
  const [LightboxOpen, SetLightboxOpen] = useState(false);
  const Active = Images[Navigation.Current];

  if (Images.length === 0) {
    return <p className="rounded-lg border border-dashed border-line-strong p-8 text-center text-ink-muted">{FilesCopy.Empty}</p>;
  }

  return (
    <section
      aria-label={`${FilesCopy.Title}: ${Title}`}
      className="overflow-hidden rounded-lg border border-line bg-surface shadow-card"
      onKeyDown={(Event) => {
        if (Navigation.HandleArrowKey(Event.key)) Event.preventDefault();
      }}
    >
      <div className="flex h-14 items-center justify-between gap-4 border-b border-line bg-subtle px-3 sm:px-4">
        <p className="flex min-w-0 items-center gap-2 text-sm text-ink-muted">
          <FolderOpen size={18} className="shrink-0 text-accent" aria-hidden="true" />
          <span className="truncate max-sm:hidden">{FilesCopy.Title} /</span>
          <b className="font-semibold text-ink">{FilesCopy.Screens}</b>
          <span className="whitespace-nowrap text-ink-soft max-sm:hidden">
            · <bdi dir="ltr">{Images.length}</bdi> {FilesCopy.FilesCount}
          </span>
        </p>
        <div className="flex items-center gap-1">
          <button type="button" className={Cn(TOOL_CLASS, "max-sm:hidden", View === "List" && "border-line bg-surface text-ink")} aria-pressed={View === "List"} aria-label={FilesCopy.List} onClick={() => SetView("List")}>
            <List size={18} />
          </button>
          <button type="button" className={Cn(TOOL_CLASS, "max-sm:hidden", View === "Grid" && "border-line bg-surface text-ink")} aria-pressed={View === "Grid"} aria-label={FilesCopy.Grid} onClick={() => SetView("Grid")}>
            <LayoutGrid size={18} />
          </button>
          <span className="mx-1.5 h-5 w-px bg-line max-sm:hidden" aria-hidden="true" />
          <button type="button" className={TOOL_CLASS} aria-label={FilesCopy.ZoomOut} disabled={ZoomIndex === 0} onClick={() => SetZoomIndex((Value) => Math.max(0, Value - 1))}>
            <ZoomOut size={18} />
          </button>
          <bdi dir="ltr" className="min-w-11 text-center font-mono text-xs text-ink-muted">
            {ZOOM_STEPS[ZoomIndex]}%
          </bdi>
          <button type="button" className={TOOL_CLASS} aria-label={FilesCopy.ZoomIn} disabled={ZoomIndex === ZOOM_STEPS.length - 1} onClick={() => SetZoomIndex((Value) => Math.min(ZOOM_STEPS.length - 1, Value + 1))}>
            <ZoomIn size={18} />
          </button>
          <span className="mx-1.5 h-5 w-px bg-line" aria-hidden="true" />
          <button type="button" className={TOOL_CLASS} aria-label={FilesCopy.FullScreen} onClick={() => SetLightboxOpen(true)}>
            <Expand size={18} />
          </button>
        </div>
      </div>

      {View === "Grid" ? (
        <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-3">
          {Images.map((Item, Index) => (
            <button
              key={Item.Src}
              type="button"
              onClick={() => {
                Navigation.GoTo(Index);
                SetView("List");
              }}
              className="group overflow-hidden rounded-md border border-line text-start transition-colors hover:border-accent"
            >
              <Image src={Item.Src} alt={Item.Caption} width={480} height={300} className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
              <span className="block truncate px-3 py-2 text-sm font-semibold">{Item.Caption}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid md:h-[600px] md:grid-cols-[280px_1fr]">
          <div role="listbox" aria-label={FilesCopy.Screens} className="flex gap-2 overflow-auto border-line p-2.5 max-md:order-2 max-md:border-t md:flex-col md:border-e">
            {Images.map((Item, Index) => (
              <button
                key={Item.Src}
                type="button"
                role="option"
                aria-selected={Index === Navigation.Current}
                onClick={() => Navigation.GoTo(Index)}
                className={Cn(
                  "grid shrink-0 items-center gap-3 rounded-[10px] p-2 text-start transition-colors max-md:w-28 max-md:grid-cols-1 md:grid-cols-[64px_1fr]",
                  Index === Navigation.Current ? "bg-accent-soft ring-1 ring-brand-200 ring-inset" : "hover:bg-subtle",
                )}
              >
                <Image src={Item.Src} alt="" width={128} height={84} className="h-[60px] w-full rounded-sm border border-line object-cover object-top md:h-[42px] md:w-16" />
                <span className="min-w-0">
                  <b className="block truncate text-sm font-semibold leading-snug max-md:text-xs">{Item.Caption}</b>
                  <bdi dir="ltr" className="block truncate font-mono text-[11px] text-ink-soft max-md:hidden">
                    {Item.FileName}
                  </bdi>
                </span>
              </button>
            ))}
          </div>
          <div className="checker relative grid min-h-[260px] place-items-center overflow-auto p-4 sm:p-7">
            {Active && (
              <button type="button" onClick={() => SetLightboxOpen(true)} aria-label={`${GalleryCopy.Open}: ${Active.Caption}`} className="cursor-zoom-in">
                <Image
                  key={Active.Src}
                  src={Active.Src}
                  alt={Active.Caption}
                  width={1400}
                  height={900}
                  priority
                  style={{ width: `${ZOOM_STEPS[ZoomIndex]}%` }}
                  className="mx-auto h-auto max-w-none rounded-lg shadow-shot animate-rise md:max-h-[540px] md:w-auto md:object-contain"
                />
              </button>
            )}
            {Images.length > 1 && (
              <>
                <button type="button" onClick={Navigation.Previous} aria-label={GalleryCopy.Previous} className="absolute start-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface shadow-card">
                  {IsRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
                <button type="button" onClick={Navigation.Next} aria-label={GalleryCopy.Next} className="absolute end-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface shadow-card">
                  {IsRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 text-sm text-ink-muted">
        <p>
          <b className="font-semibold text-ink">{Active?.Caption}</b>
        </p>
        <div className="flex shrink-0 items-center gap-4 font-mono text-xs text-ink-soft">
          <bdi dir="ltr">{CounterText(Navigation.Current, Images.length)}</bdi>
          <span className="max-sm:hidden">
            <kbd className="rounded border border-b-2 border-control px-1.5 py-0.5">→</kbd>{" "}
            <kbd className="rounded border border-b-2 border-control px-1.5 py-0.5">←</kbd> {FilesCopy.KeyboardHint}
          </span>
        </div>
      </div>

      {LightboxOpen && (
        <Lightbox Images={Images} StartIndex={Navigation.Current} Title={Title} Copy={GalleryCopy} IsRtl={IsRtl} OnClose={() => SetLightboxOpen(false)} />
      )}
    </section>
  );
}
