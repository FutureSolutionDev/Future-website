import type { Lang } from "@/Lib/Seo";
import type { TScreenCaptions } from "@/Data/Links";
import type { TGalleryImage } from "@/Components/Common/Gallery/Types";

export function FileNameOf(Src: string): string {
  return Src.split("?")[0].split("/").pop() ?? Src;
}

function HumanizeFileName(FileName: string): string {
  const Base = FileName.replace(/\.[a-z0-9]+$/i, "").replace(/^\d+[-_]?/, "");
  const Words = Base.replace(/[-_]+/g, " ").trim();
  return Words ? Words.charAt(0).toUpperCase() + Words.slice(1) : FileName;
}

export function ResolveCaptions(Captions: TScreenCaptions | undefined, Language: Lang): Record<string, string> {
  if (!Captions) return {};
  return Object.fromEntries(Object.entries(Captions).map(([FileName, Text]) => [FileName, Text[Language]]));
}

export function ToGalleryImages(Paths: string[], Captions: Record<string, string>): TGalleryImage[] {
  return Paths.map((Src) => {
    const FileName = FileNameOf(Src);
    return { Src, FileName, Caption: Captions[FileName] ?? HumanizeFileName(FileName) };
  });
}
