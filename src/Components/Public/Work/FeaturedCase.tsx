import { ButtonLink } from "@/Components/Common/Button";
import { Icon } from "@/Components/Common/Icon";
import { GalleryMosaic } from "@/Components/Common/Gallery/GalleryMosaic";
import type { TProject } from "@/Data/Projects";
import { ResolveCaptions } from "@/Lib/Gallery";
import { PathFor, type Lang } from "@/Lib/Seo";
import type { TDictionary } from "@/I18n/Index";

type TFeaturedCaseProps = {
  Project: TProject;
  Images: string[];
  Language: Lang;
  Copy: TDictionary;
};

export function FeaturedCase({ Project, Images, Language, Copy }: TFeaturedCaseProps) {
  return (
    <article className="grid items-center gap-10 md:grid-cols-[1fr_1.25fr] md:gap-14">
      <div>
        <p className="text-[13px] font-medium text-accent-ink">{Project.Category[Language]}</p>
        <h3 className="mt-2 font-latin text-[32px] font-bold md:text-[38px]">{Project.Title}</h3>
        <p className="mt-3 text-ink-muted">{Project.Description[Language]}</p>
        {Project.Result && (
          <p className="my-6 border-s-2 border-accent ps-4 text-lg font-medium">{Project.Result[Language]}</p>
        )}
        <ul className="mb-7 grid gap-2.5">
          {Project.Features.slice(0, 3).map((Feature) => (
            <li key={Feature.en} className="flex gap-2.5 text-ink-muted">
              <Icon Name="Check" Size={18} ClassName="mt-1 text-accent" />
              {Feature[Language]}
            </li>
          ))}
        </ul>
        <ButtonLink Href={PathFor(Language, `/portfolio/${Project.Slug}`)}>{Copy.Common.Cta.CaseStudy}</ButtonLink>
        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-ink-soft" lang="en">
          {Project.Tech.map((Tech) => (
            <span key={Tech}>{Tech}</span>
          ))}
        </p>
      </div>
      <GalleryMosaic
        Title={Project.Title}
        ImagesFolder={Project.ImagesFolder}
        InitialImages={Images}
        Captions={ResolveCaptions(Project.Captions, Language)}
        Copy={Copy.Common.Gallery}
        MoreLabel={Copy.Home.Work.MoreImages}
        IsRtl={Language === "ar"}
      />
    </article>
  );
}
