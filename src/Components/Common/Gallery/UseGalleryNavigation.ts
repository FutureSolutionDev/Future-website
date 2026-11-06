"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 50;

type TKeyLike = { key: string; altKey: boolean; ctrlKey: boolean; metaKey: boolean; shiftKey: boolean };

export function Wrap(Index: number, Count: number): number {
  return ((Index % Count) + Count) % Count;
}

export function UseGalleryNavigation(Count: number, StartIndex: number, IsRtl: boolean) {
  const [Current, SetCurrent] = useState(StartIndex);
  const TouchStart = useRef<{ X: number; Y: number } | null>(null);
  const Safe = Math.max(Count, 1);

  useEffect(() => {
    SetCurrent(Wrap(StartIndex, Math.max(Count, 1)));
  }, [StartIndex, Count]);

  const GoTo = useCallback((Index: number) => SetCurrent(Wrap(Index, Safe)), [Safe]);
  const Next = useCallback(() => SetCurrent((Value) => Wrap(Value + 1, Safe)), [Safe]);
  const Previous = useCallback(() => SetCurrent((Value) => Wrap(Value - 1, Safe)), [Safe]);

  const HandleArrowKey = useCallback(
    (Event: TKeyLike): boolean => {
      if (Event.altKey || Event.ctrlKey || Event.metaKey || Event.shiftKey) return false;
      const Forward = IsRtl ? "ArrowLeft" : "ArrowRight";
      const Backward = IsRtl ? "ArrowRight" : "ArrowLeft";
      if (Event.key === Forward) {
        Next();
        return true;
      }
      if (Event.key === Backward) {
        Previous();
        return true;
      }
      return false;
    },
    [IsRtl, Next, Previous],
  );

  const OnTouchStart = useCallback((Event: React.TouchEvent) => {
    const Touch = Event.touches[0];
    TouchStart.current = Touch ? { X: Touch.clientX, Y: Touch.clientY } : null;
  }, []);

  const OnTouchEnd = useCallback(
    (Event: React.TouchEvent) => {
      const Start = TouchStart.current;
      const Touch = Event.changedTouches[0];
      TouchStart.current = null;
      if (!Start || !Touch) return;
      const DeltaX = Touch.clientX - Start.X;
      const DeltaY = Touch.clientY - Start.Y;
      if (Math.abs(DeltaX) < SWIPE_THRESHOLD || Math.abs(DeltaX) <= Math.abs(DeltaY)) return;
      const TowardNext = IsRtl ? DeltaX > 0 : DeltaX < 0;
      if (TowardNext) Next();
      else Previous();
    },
    [IsRtl, Next, Previous],
  );

  return { Current, GoTo, Next, Previous, HandleArrowKey, OnTouchStart, OnTouchEnd };
}

export function CounterText(Index: number, Count: number): string {
  return `${String(Index + 1).padStart(2, "0")} / ${String(Count).padStart(2, "0")}`;
}
