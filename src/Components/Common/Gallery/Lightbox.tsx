"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Cn } from "@/Lib/Cn";
import type { TGalleryCopy, TGalleryImage } from "./Types";
import { CounterText, UseGalleryNavigation } from "./UseGalleryNavigation";

const AUTOPLAY_MS = 3500;

type TLightboxProps = {
  Images: TGalleryImage[];
  StartIndex: number;
  Title: string;
  Copy: TGalleryCopy;
  IsRtl: boolean;
  OnClose: (LastIndex: number) => void;
};

const TOOL_CLASS =
  "grid size-10 place-items-center rounded-lg border border-white/15 text-brand-100 transition-colors hover:bg-white/10";
const ARROW_CLASS =
  "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20";

export function Lightbox({
  Images,
  StartIndex,
  Title,
  Copy,
  IsRtl,
  OnClose,
}: TLightboxProps) {
  const Navigation = UseGalleryNavigation(Images.length, StartIndex, IsRtl);
  const [Playing, SetPlaying] = useState(false);
  const [Zoomed, SetZoomed] = useState(false);
  const DialogRef = useRef<HTMLDivElement>(null);
  const CloseRef = useRef<HTMLButtonElement>(null);
  const Active = Images[Navigation.Current];

  useEffect(() => {
    const PreviousFocus = document.activeElement as HTMLElement | null;
    const PreviousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    CloseRef.current?.focus();
    return () => {
      document.body.style.overflow = PreviousOverflow;
      PreviousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    SetZoomed(false);
  }, [Navigation.Current]);

  useEffect(() => {
    if (!Playing || Images.length < 2) return;
    const Timer = window.setInterval(Navigation.Next, AUTOPLAY_MS);
    return () => window.clearInterval(Timer);
  }, [Playing, Images.length, Navigation.Next]);

  const Close = () => OnClose(Navigation.Current);

  const HandleKey = (Event: KeyboardEvent) => {
    if (Event.key === "Escape") {
      Event.preventDefault();
      Close();
      return;
    }
    if (Navigation.HandleArrowKey(Event)) {
      Event.preventDefault();
      return;
    }
    if (Event.key !== "Tab" || !DialogRef.current) return;
    const Focusable = Array.from(
      DialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])"),
    );
    const First = Focusable[0];
    const Last = Focusable[Focusable.length - 1];
    const Inside = DialogRef.current.contains(document.activeElement);
    if (!Inside) {
      Event.preventDefault();
      First?.focus();
    } else if (Event.shiftKey && document.activeElement === First) {
      Event.preventDefault();
      Last?.focus();
    } else if (!Event.shiftKey && document.activeElement === Last) {
      Event.preventDefault();
      First?.focus();
    }
  };
  const KeyRef = useRef(HandleKey);

  useEffect(() => {
    KeyRef.current = HandleKey;
  });

  useEffect(() => {
    const OnKey = (Event: KeyboardEvent) => {
      if (DialogRef.current?.contains(Event.target as Node)) return;
      KeyRef.current(Event);
    };
    document.addEventListener("keydown", OnKey);
    return () => document.removeEventListener("keydown", OnKey);
  }, []);

  if (!Active) return null;

  return createPortal(
    <div
      ref={DialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={Copy.Dialog}
      dir={IsRtl ? "rtl" : "ltr"}
      tabIndex={-1}
      onKeyDown={(Event) => {
        Event.stopPropagation();
        HandleKey(Event.nativeEvent);
      }}
      className="fixed inset-0 z-[100] grid grid-rows-[auto_1fr_auto] bg-lightbox/95 text-brand-50 backdrop-blur-xl animate-rise"
    >
      <div className="flex items-center justify-between gap-4 px-4 pt-[max(16px,env(safe-area-inset-top))] pb-3 sm:px-7">
        <div className="flex min-w-0 items-baseline gap-4">
          <p className="truncate text-base font-semibold">
            {Title} · {Active.Caption}
          </p>
          <bdi
            dir="ltr"
            className="shrink-0 font-mono text-[13px] text-brand-300"
            aria-live={Playing ? "off" : "polite"}
          >
            {CounterText(Navigation.Current, Images.length)}
          </bdi>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            className={Cn(TOOL_CLASS, "max-sm:hidden")}
            onClick={() => SetZoomed((Value) => !Value)}
            aria-label={Copy.Zoom}
            aria-pressed={Zoomed}
          >
            {Zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>
          {Images.length > 1 && (
            <button
              type="button"
              className={TOOL_CLASS}
              onClick={() => SetPlaying((Value) => !Value)}
              aria-label={Playing ? Copy.Pause : Copy.Play}
              aria-pressed={Playing}
            >
              {Playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
          )}
          <button
            ref={CloseRef}
            type="button"
            className={TOOL_CLASS}
            onClick={Close}
            aria-label={Copy.Close}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div
        className={Cn(
          "relative min-h-0 px-3 sm:px-24",
          Zoomed ? "overflow-auto" : "grid place-items-center",
        )}
        onTouchStart={Zoomed ? undefined : Navigation.OnTouchStart}
        onTouchEnd={Zoomed ? undefined : Navigation.OnTouchEnd}
        onClick={(Event) => {
          if (Event.target === Event.currentTarget) Close();
        }}
      >
        <Image
          key={Active.Src}
          src={Active.Src}
          alt={Active.Caption}
          width={1600}
          height={1000}
          sizes="100vw"
          className={Cn(
            "rounded-[10px] shadow-[0_40px_90px_rgba(0,0,0,0.6)] animate-rise",
            Zoomed
              ? "mx-auto h-auto w-[160%] max-w-none cursor-zoom-out"
              : "max-h-full w-auto object-contain cursor-zoom-in",
          )}
          onClick={() => SetZoomed((Value) => !Value)}
        />
        {Images.length > 1 && (
          <>
            <button
              type="button"
              onClick={Navigation.Previous}
              aria-label={Copy.Previous}
              className={Cn(ARROW_CLASS, "start-3 sm:start-6")}
            >
              {IsRtl ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
            </button>
            <button
              type="button"
              onClick={Navigation.Next}
              aria-label={Copy.Next}
              className={Cn(ARROW_CLASS, "end-3 sm:end-6")}
            >
              {IsRtl ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
            </button>
          </>
        )}
      </div>

      <div className="pb-[max(16px,env(safe-area-inset-bottom))]">
        <p className="px-4 pt-3 pb-2 text-center text-sm text-brand-200">
          {Active.Caption}
        </p>
        {Images.length > 1 && (
          <div className="flex justify-center gap-2 overflow-x-auto px-4 pt-1 pb-2">
            {Images.map((Item, Index) => (
              <button
                key={Item.Src}
                type="button"
                onClick={() => Navigation.GoTo(Index)}
                aria-label={`${Copy.Open}: ${Item.Caption}`}
                aria-current={Index === Navigation.Current}
                className={Cn(
                  "shrink-0 overflow-hidden rounded-md border-2 transition-all",
                  Index === Navigation.Current
                    ? "-translate-y-[3px] border-brand-300 opacity-100"
                    : "border-transparent opacity-45 hover:opacity-80",
                )}
              >
                <Image
                  src={Item.Src}
                  alt=""
                  width={96}
                  height={60}
                  className="h-[44px] w-[72px] object-cover object-top sm:h-[60px] sm:w-[96px]"
                />
              </button>
            ))}
          </div>
        )}
        <div className="h-0.5 bg-white/10" aria-hidden="true">
          <div
            className="h-full bg-brand-300 transition-[width] duration-300"
            style={{
              width: `${((Navigation.Current + 1) / Images.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
