import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { BreadcrumbSchema, type TCrumb } from "@/Lib/Schema";

export function Breadcrumbs({ Items, Label }: { Items: TCrumb[]; Label: string }) {
  return (
    <nav aria-label={Label} className="text-sm text-ink-soft">
      <JsonLd Data={BreadcrumbSchema(Items)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {Items.map((Item, Index) => {
          const IsLast = Index === Items.length - 1;
          return (
            <li key={Item.Path} className="flex items-center gap-1.5">
              {IsLast ? (
                <span aria-current="page" className="font-medium text-ink">
                  {Item.Name}
                </span>
              ) : (
                <>
                  <Link href={Item.Path} className="transition-colors hover:text-ink">
                    {Item.Name}
                  </Link>
                  <ChevronRight size={14} aria-hidden="true" className="rtl:-scale-x-100" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
