"use client";

import { useEffect, useState } from "react";

const IMAGE_PATTERN = /\.(webp|png|jpe?g|avif)$/i;

type TDirectoryEntry = { name: string; type: string };

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
          .map((Entry) => `${ImagesFolder}/${Entry.name}`)
          .sort();
        if (Files.length > 0) SetImages(Files);
      })
      .catch(() => undefined);

    return () => {
      Cancelled = true;
    };
  }, [ImagesFolder, InitialImages]);

  return Images;
}
