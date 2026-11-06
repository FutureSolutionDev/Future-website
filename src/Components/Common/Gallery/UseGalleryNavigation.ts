"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 50;

export function Wrap(Index: number, Count: number): number {
  return ((Index % Count) + Count) % Count;
}

export function UseGalleryNavigation(Count: number, StartIndex: number, IsRtl: boolean) {
  const [Current, SetCurrent] = useState(StartIndex);
  const TouchStartX = useRef<number | null>(null);

  useEffect(() => {
    SetCurrent(Wrap(StartIndex, Math.max(Count, 1)));
  }, [StartIndex, Count]);

  const GoTo = useCallback((Index: number) => SetCurrent(Wrap(Index, Math.max(Count, 1))), [Count]);
  const Next = useCallback(() => SetCurrent((Value) => Wrap(Value + 1, Math.max(Count, 1))), [Count]);
  const Previous = useCallback(() => SetCurrent((Value) => Wrap(Value - 1, Math.max(Count, 1))), [Count]);

  const HandleArrowKey = useCallback(
    (Key: string): boolean => {
      if (Key === "ArrowLeft") {
        if (IsRtl) Next();
        else Previous();
        return true;
      }
      if (Key === "ArrowRight") {
        if (IsRtl) Previous();
        else Next();
        return true;
      }
      return false;
    },
    [IsRtl, Next, Previous],
  );

  const OnTouchStart = useCallback((Event: React.TouchEvent) => {
    TouchStartX.current = Event.touches[0]?.clientX ?? null;
  }, []);

  const OnTouchEnd = useCallback(
    (Event: React.TouchEvent) => {
      if (TouchStartX.current === null) return;
      const Delta = (Event.changedTouches[0]?.clientX ?? 0) - TouchStartX.current;
      TouchStartX.current = null;
      if (Math.abs(Delta) < SWIPE_THRESHOLD) return;
      const SwipedTowardStart = IsRtl ? Delta > 0 : Delta < 0;
      if (SwipedTowardStart) Next();
      else Previous();
    },
    [IsRtl, Next, Previous],
  );

  return { Current, GoTo, Next, Previous, HandleArrowKey, OnTouchStart, OnTouchEnd };
}

export function CounterText(Index: number, Count: number): string {
  return `${String(Index + 1).padStart(2, "0")} / ${String(Count).padStart(2, "0")}`;
}
