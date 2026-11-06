"use client";

import { useEffect, useState } from "react";

export function UseFaqProgress(ItemIds: string[]) {
  const [ReadIds, SetReadIds] = useState<Set<string>>(() => new Set());
  const [ActiveChapter, SetActiveChapter] = useState<string | null>(null);
  const [FocusedId, SetFocusedId] = useState<string | null>(null);

  useEffect(() => {
    const Hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (Hash.startsWith("q-")) SetFocusedId(Hash.slice(2));

    const Observer = new IntersectionObserver(
      (Entries) => {
        for (const Entry of Entries) {
          const Target = Entry.target as HTMLElement;
          if (!Entry.isIntersecting && Entry.boundingClientRect.top >= 0) continue;
          if (Target.dataset.faqId) {
            const Id = Target.dataset.faqId;
            SetReadIds((Previous) => (Previous.has(Id) ? Previous : new Set(Previous).add(Id)));
          }
          if (Target.dataset.chapterId && Entry.isIntersecting) SetActiveChapter(Target.dataset.chapterId);
        }
      },
      { rootMargin: "0px 0px -45% 0px" },
    );

    document.querySelectorAll<HTMLElement>("[data-faq-id],[data-chapter-id]").forEach((Node) => Observer.observe(Node));

    const OnScroll = () => {
      const AtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400;
      if (AtBottom) SetReadIds(new Set(ItemIds));
    };
    window.addEventListener("scroll", OnScroll, { passive: true });

    return () => {
      Observer.disconnect();
      window.removeEventListener("scroll", OnScroll);
    };
  }, [ItemIds]);

  return { ReadIds, ActiveChapter, FocusedId };
}
