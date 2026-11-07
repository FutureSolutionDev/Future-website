"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Clock } from "lucide-react";
import { OutArrow } from "@/Components/Common/Icon";
import { Cn } from "@/Lib/Cn";
import type { Lang } from "@/Lib/Seo";

export type TArticleListItem = {
  Slug: string;
  Title: string;
  Excerpt: string;
  Category: string;
  ReadTime: string;
  PublishedAt: string;
};

type TBlogListProps = {
  Language: Lang;
  Articles: TArticleListItem[];
  AllLabel: string;
  FilterLabel: string;
  ReadLabel: string;
};

export function BlogList({ Language, Articles, AllLabel, FilterLabel, ReadLabel }: TBlogListProps) {
  const [Active, SetActive] = useState<string | null>(null);
  const Categories = useMemo(() => Array.from(new Set(Articles.map((Article) => Article.Category))), [Articles]);
  const Visible = Active ? Articles.filter((Article) => Article.Category === Active) : Articles;
  const Chip = "h-10 rounded-full border px-4 text-sm font-semibold transition-colors";

  return (
    <>
      <div role="group" aria-label={FilterLabel} className="flex flex-wrap gap-2">
        {[null, ...Categories].map((Category) => (
          <button
            key={Category ?? "all"}
            type="button"
            aria-pressed={Active === Category}
            onClick={() => SetActive(Category)}
            className={Cn(Chip, Active === Category ? "border-accent bg-accent-soft text-accent-ink" : "border-line text-ink-muted hover:text-ink")}
          >
            {Category ?? AllLabel}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Visible.map((Article) => (
          <li key={Article.Slug}>
            <Link
              href={`/${Language}/blog/${Article.Slug}`}
              className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-card transition-colors hover:border-accent"
            >
              <span className="text-[13px] font-semibold text-accent-ink">{Article.Category}</span>
              <h2 className="mt-3 text-[20px] font-bold leading-snug transition-colors group-hover:text-accent-ink">{Article.Title}</h2>
              <p className="mt-3 line-clamp-3 text-[15px] text-ink-muted">{Article.Excerpt}</p>
              <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <Clock size={15} aria-hidden="true" />
                  {Article.ReadTime}
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-accent-ink">
                  {ReadLabel}
                  <OutArrow Size={16} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
