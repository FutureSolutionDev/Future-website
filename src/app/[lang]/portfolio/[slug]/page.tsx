import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { JsonLd } from "@/Components/Common/JsonLd";
import { LinkButtons } from "@/Components/Common/LinkButtons";
import { PageHeader } from "@/Components/Common/PageHeader";
import { MetricRail } from "@/Components/Public/Home/MetricRail";
import { ProjectCard } from "@/Components/Public/Work/ProjectCard";
import { FactsGrid, FeatureList, Screens, TechList } from "@/Components/Public/Work/DetailLayout";
import { GetProjectBySlug, PROJECTS } from "@/Data/Projects";
import { GetProjectImages } from "@/Lib/Images";
import { ProjectSchema } from "@/Lib/Schema";
import { BuildMetadata, LANGS, PathFor, ToLang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

type TParams = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => PROJECTS.map((Project) => ({ lang, slug: Project.Slug })));
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const { lang, slug } = await params;
  const Language = ToLang(lang);
  const Project = GetProjectBySlug(slug);
  if (!Project) return {};
  const Cover = GetProjectImages(Project.ImagesFolder)[0];
  return BuildMetadata({
    Language,
    Path: `/portfolio/${slug}`,
    Title: `${Project.Title}: ${Project.Category[Language]}`,
    Description: Project.Summary[Language] + " " + (Project.Result?.[Language] ?? ""),
    Images: Cover ? [{ url: Cover, width: 1200, height: 750, alt: Project.Title }] : undefined,
  });
}

export default async function ProjectPage({ params }: TParams) {
  const { lang, slug } = await params;
  const Language = ToLang(lang);
  const Project = GetProjectBySlug(slug);
  if (!Project) notFound();
  const Copy = GetDictionary(Language);
  const { Common, Pages } = Copy;
  const Images = GetProjectImages(Project.ImagesFolder);
  const Others = PROJECTS.filter((Item) => Item.Slug !== Project.Slug);

  return (
    <>
      <JsonLd Data={ProjectSchema(Project, Language, Images)} />
      <PageHeader
        Language={Language}
        Common={Common}
        Trail={[
          { Name: Common.Nav.Work, Path: PathFor(Language, "/portfolio") },
          { Name: Project.Title, Path: PathFor(Language, `/portfolio/${Project.Slug}`) },
        ]}
        Label={Project.Category[Language]}
        Title={<span className="font-latin">{Project.Title}</span>}
        Lead={Project.Summary[Language]}
      >
        <div className="mt-7">
          <LinkButtons Links={Project.Links} Language={Language} Labels={Common.Links} />
        </div>
      </PageHeader>

      <div className="container-page grid gap-16 py-16 md:gap-20 md:py-20">
        <section className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
          <div>
            <h2 className="text-2xl font-bold md:text-[28px]">{Pages.Project.Overview}</h2>
            <p className="mt-4 text-lg text-ink-muted">{Project.Description[Language]}</p>
            {Project.Result && (
              <div className="mt-6 rounded-md border-s-2 border-accent bg-accent-soft p-5">
                <p className="text-sm font-semibold text-accent-ink">{Pages.Project.Result}</p>
                <p className="mt-1 text-lg font-medium">{Project.Result[Language]}</p>
              </div>
            )}
          </div>
          <FactsGrid
            Facts={[
              { Label: Pages.Project.Sector, Value: Project.Category[Language] },
              { Label: Pages.Project.Status, Value: Pages.Project.LiveNow },
              { Label: Pages.Project.Screens, Value: <bdi dir="ltr">{Images.length}</bdi> },
              { Label: Common.BuiltWith, Value: <span lang="en">{Project.Tech.slice(0, 2).join(" · ")}</span> },
            ]}
          />
        </section>

        {Project.Metrics && (
          <div className="-mb-12">
            <MetricRail Items={Project.Metrics} Language={Language} />
          </div>
        )}

        <Screens Title={Project.Title} ImagesFolder={Project.ImagesFolder} Images={Images} Captions={Project.Captions} Language={Language} Copy={Copy} />
        <FeatureList Title={Pages.Project.Delivers} Features={Project.Features} Language={Language} />
        <TechList Label={Common.BuiltWith} Items={Project.Tech} />

        <section>
          <h2 className="mb-8 text-2xl font-bold md:text-[28px]">{Pages.Project.OtherProjects}</h2>
          <div className="grid gap-10 md:grid-cols-2 md:gap-6">
            {Others.map((Item) => (
              <ProjectCard
                key={Item.Slug}
                Href={PathFor(Language, `/portfolio/${Item.Slug}`)}
                ImageSrc={GetProjectImages(Item.ImagesFolder)[0]}
                ImageAlt={Item.Title}
                Kicker={Item.Category[Language]}
                Title={Item.Title}
                Text={Item.Summary[Language]}
              />
            ))}
          </div>
        </section>
      </div>

      <CtaPanel Language={Language} Common={Common} Title={Pages.Work.CtaTitle} />
    </>
  );
}
