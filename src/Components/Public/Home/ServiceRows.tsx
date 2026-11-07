import Link from "next/link";
import { OutArrow } from "@/Components/Common/Icon";
import { SERVICES } from "@/Data/Services";
import { PathFor, type Lang } from "@/Lib/Seo";

export function ServiceRows({ Language }: { Language: Lang }) {
  return (
    <ul className="border-t border-line">
      {SERVICES.map((Service, Index) => (
        <li key={Service.Id}>
          <Link
            href={PathFor(Language, `/services#${Service.Id}`)}
            className="group grid grid-cols-[40px_1fr] items-start gap-4 border-b border-line py-6 transition-colors md:grid-cols-[56px_1fr_28px] md:gap-5"
          >
            <span className="pt-2 font-mono text-sm text-accent-ink">
              <bdi dir="ltr">{String(Index + 1).padStart(2, "0")}</bdi>
            </span>
            <span>
              <span className="block text-[20px] font-bold leading-snug transition-colors group-hover:text-accent-ink md:text-[22px]">
                {Service.Title[Language]}
              </span>
              <span className="mt-1.5 block text-ink-muted">{Service.Description[Language]}</span>
            </span>
            <OutArrow ClassName="mt-2 hidden text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:text-accent md:block" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
