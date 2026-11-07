"use client";

import { useId, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/Lib/Seo";
import { Cn } from "@/Lib/Cn";

const NATIVE_NAMES: Record<Lang, string> = { ar: "العربية", en: "English" };

const SWITCH_STATE = { Pending: false };

function HashTarget(): HTMLElement | null {
  const Raw = window.location.hash.slice(1);
  if (!Raw) return null;
  try {
    return document.getElementById(decodeURIComponent(Raw));
  } catch {
    return document.getElementById(Raw);
  }
}

function UseLandingScroll() {
  const Pathname = usePathname();
  useLayoutEffect(() => {
    if (!SWITCH_STATE.Pending) return;
    SWITCH_STATE.Pending = false;
    const Target = HashTarget();
    if (Target) Target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [Pathname]);
}

function MarkSwitch(Event: React.MouseEvent<HTMLAnchorElement>) {
  if (Event.button !== 0 || Event.metaKey || Event.ctrlKey || Event.shiftKey || Event.altKey) return;
  SWITCH_STATE.Pending = true;
}

function EgyptFlag() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true" className="size-full">
      <rect width="30" height="10" fill="#CE1126" />
      <rect y="10" width="30" height="10" fill="#FFFFFF" />
      <rect y="20" width="30" height="10" fill="#000000" />
      <path
        d="M15 11.2c.6 0 1 .4 1 1v.6l2.6-.9-.6 1.6-2 .8v1.9l1 1.3h-4l1-1.3v-1.9l-2-.8-.6-1.6 2.6.9v-.6c0-.6.4-1 1-1Z"
        fill="#C09300"
      />
    </svg>
  );
}

function UkFlag() {
  const Id = useId().replace(/:/g, "");
  return (
    <svg viewBox="15 0 30 30" aria-hidden="true" className="size-full">
      <defs>
        <clipPath id={`${Id}-s`}>
          <path d="M0 0v30h60V0z" />
        </clipPath>
        <clipPath id={`${Id}-t`}>
          <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${Id}-s)`}>
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#${Id}-t)`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v30M0 15h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

type TLanguageSwitchProps = {
  Target: Lang;
  Href: string;
  Label: string;
  ClassName?: string;
};

export function LanguageSwitch({ Target, Href, Label, ClassName }: TLanguageSwitchProps) {
  UseLandingScroll();
  return (
    <Link
      href={Href}
      hrefLang={Target}
      aria-label={Label}
      title={Label}
      scroll={false}
      onClick={MarkSwitch}
      className={Cn(
        "group inline-flex h-[42px] items-center gap-2 rounded-full sm:pe-3.5 border border-line bg-surface/60 p-1 text-[13px] font-semibold text-ink-muted transition-all hover:border-accent hover:text-ink",
        ClassName,
      )}
    >
      <span className="relative block size-8 shrink-0 overflow-hidden rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.25)] ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[8deg] rtl:group-hover:-rotate-[8deg]">
        {Target === "ar" ? <EgyptFlag /> : <UkFlag />}
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gradient-to-br from-white/35 via-transparent to-black/20" />
      </span>
      <span lang={Target} className={Cn("hidden sm:inline", Target === "en" && "font-latin")}>
        {NATIVE_NAMES[Target]}
      </span>
    </Link>
  );
}
