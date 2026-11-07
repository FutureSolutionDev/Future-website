import Image from "next/image";
import { LinkButtons } from "@/Components/Common/LinkButtons";
import { TEAM } from "@/Data/Team";
import { GetTeamPhoto } from "@/Lib/Images";
import type { Lang } from "@/Lib/Seo";
import type { TCommon } from "@/I18n/Index";

export function TeamGrid({ Language, Labels }: { Language: Lang; Labels: TCommon["Links"] }) {
  return (
    <ul className="mt-12 grid gap-6 md:grid-cols-2">
      {TEAM.map((Member) => {
        const Photo = GetTeamPhoto(Member.PhotoSlug);
        return (
          <li key={Member.PhotoSlug} className="flex flex-col rounded-lg border border-line bg-surface p-7 shadow-card">
            <div className="flex items-center gap-5">
              {Photo ? (
                <Image src={Photo} alt={Member.Name[Language]} width={88} height={88} className="size-[88px] rounded-full border-2 border-line object-cover" />
              ) : (
                <span aria-hidden="true" className="grid size-[88px] place-items-center rounded-full border-2 border-line bg-accent-soft text-3xl font-bold text-accent-ink">
                  {Member.Name[Language].charAt(0)}
                </span>
              )}
              <div>
                <h3 className="text-xl font-bold">{Member.Name[Language]}</h3>
                <p className="text-sm font-semibold text-accent-ink">{Member.Role[Language]}</p>
              </div>
            </div>
            {Member.Bio && <p className="mt-5 text-[15px] text-ink-muted">{Member.Bio[Language]}</p>}
            {Member.Links && (
              <div className="mt-auto pt-6">
                <LinkButtons Links={Member.Links} Language={Language} Labels={Labels} Compact />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
