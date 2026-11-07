"use client";

import { useId } from "react";
import { Cn } from "@/Lib/Cn";

export type TStore = "googleplay" | "appstore";

export type TStoreCopy = { GetItOn: string; DownloadOn: string; SoonOn: string; Soon: string };

const STORE_NAMES: Record<TStore, string> = { googleplay: "Google Play", appstore: "App Store" };

const GOOGLE_PLAY_PATH = "M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z";

const APPLE_PATH = "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701";

function StoreLogo({ Store }: { Store: TStore }) {
  const Id = useId().replace(/:/g, "");
  if (Store === "appstore") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 shrink-0 fill-white">
        <path d={APPLE_PATH} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 shrink-0">
      <defs>
        <linearGradient id={Id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00D7FE" />
          <stop offset="0.38" stopColor="#00F076" />
          <stop offset="0.68" stopColor="#FFD500" />
          <stop offset="1" stopColor="#FF3A44" />
        </linearGradient>
      </defs>
      <path d={GOOGLE_PLAY_PATH} fill={`url(#${Id})`} />
    </svg>
  );
}

type TStoreBadgeProps = { Store: TStore; Url?: string; Copy: TStoreCopy; ClassName?: string };

export function StoreBadge({ Store, Url, Copy, ClassName }: TStoreBadgeProps) {
  const Kicker = !Url ? Copy.SoonOn : Store === "googleplay" ? Copy.GetItOn : Copy.DownloadOn;
  const Body = (
    <>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[18px] bg-[radial-gradient(120%_80%_at_0%_0%,rgba(66,171,226,0.28),transparent_60%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -start-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:start-[120%] group-hover:opacity-100" />
      <StoreLogo Store={Store} />
      <span className="relative grid leading-tight">
        <span className="text-[11px] font-medium text-white/70">{Kicker}</span>
        <span lang="en" className="font-latin text-[19px] font-semibold tracking-tight text-white">
          {STORE_NAMES[Store]}
        </span>
      </span>
      {!Url && (
        <span className="relative ms-1 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/80">{Copy.Soon}</span>
      )}
    </>
  );
  const Shell = Cn(
    "group relative inline-flex h-[60px] min-w-[220px] items-center gap-3 overflow-hidden rounded-[18px] border border-white/15 bg-[linear-gradient(145deg,#0b1724,#132c44)] ps-4 pe-5 shadow-[0_10px_30px_-10px_rgba(11,40,64,0.65),inset_0_1px_0_rgba(255,255,255,0.12)]",
    Url ? "transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/30" : "cursor-default opacity-75",
    ClassName,
  );
  if (!Url) {
    return (
      <span className={Shell} aria-label={`${Copy.SoonOn} ${STORE_NAMES[Store]}`}>
        {Body}
      </span>
    );
  }
  return (
    <a href={Url} target="_blank" rel="noopener noreferrer" className={Shell} aria-label={`${Kicker} ${STORE_NAMES[Store]}`}>
      {Body}
    </a>
  );
}
