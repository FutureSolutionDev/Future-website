"use client";

import { useEffect, useState } from "react";
import { FileNameOf } from "@/Lib/Gallery";

const IMAGE_PATTERN = /\.(webp|png|jpe?g|avif)$/i;

type TDirectoryEntry = { name: string; type: string; mtime?: string; size?: number };

function SameFiles(Left: string[], Right: string[]): boolean {
  if (Left.length !== Right.length) return false;
  const Names = new Set(Left.map(FileNameOf));
  return Right.every((Src) => Names.has(FileNameOf(Src)));
}

function ListingVersion(Entry: TDirectoryEntry): string {
  const Stamp = `${Entry.mtime ?? ""}${Entry.size ?? ""}`;
  let Hash = 0;
  for (const Char of Stamp) Hash = (Hash * 31 + Char.charCodeAt(0)) | 0;
  return (Hash >>> 0).toString(36);
}

export function UseProjectImages(ImagesFolder: string | undefined, InitialImages: string[]): string[] {
  const [Images, SetImages] = useState(InitialImages);

  useEffect(() => {
    SetImages(InitialImages);
    if (!ImagesFolder || process.env.NODE_ENV === "development") return;
    let Cancelled = false;

    fetch(`${ImagesFolder}/`, { headers: { Accept: "application/json" }, cache: "no-store" })
      .then((Response) => {
        const ContentType = Response.headers.get("content-type") ?? "";
        if (!Response.ok || !ContentType.includes("json")) throw new Error("listing unavailable");
        return Response.json() as Promise<TDirectoryEntry[]>;
      })
      .then((Entries) => {
        if (Cancelled || !Array.isArray(Entries)) return;
        const Files = Entries.filter((Entry) => Entry.type === "file" && IMAGE_PATTERN.test(Entry.name))
          .sort((A, B) => (A.name < B.name ? -1 : A.name > B.name ? 1 : 0))
          .map((Entry) => `${ImagesFolder}/${Entry.name}?v=${ListingVersion(Entry)}`);
        if (Files.length > 0 && !SameFiles(InitialImages, Files)) SetImages(Files);
      })
      .catch(() => undefined);

    return () => {
      Cancelled = true;
    };
  }, [ImagesFolder, InitialImages]);

  return Images;
}
