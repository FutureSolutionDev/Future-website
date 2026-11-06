import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { Icon, OutArrow } from "@/Components/Common/Icon";
import { PageHeader } from "@/Components/Common/PageHeader";
import { SectionLabel } from "@/Components/Common/SectionLabel";
import { ProjectCard } from "@/Components/Public/Work/ProjectCard";
import { PROJECTS } from "@/Data/Projects";
import { PRODUCTS } from "@/Data/Products";
import { GetProjectImages } from "@/Lib/Images";
import { PageMetadata, PathFor, ToLang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return PageMetadata(ToLang((await params).lang), "portfolio", "/portfolio");
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const Language = ToLang((await params).lang);
  const { Common, Pages } = GetDictionary(Language);
  const Copy = Pages.Work;

  return (
    <>
      <PageHeader
        Language={Language}
        Common={Common}
        Trail={[{ Name: Common.Nav.Work, Path: PathFor(Language, "/portfolio") }]}
        Label={Common.Nav.Work}
        Title={Copy.Title}
        Lead={Copy.Lead}
      />

      <section className="py-20 md:py-[104px]">
        <div className="container-page">
          <h2 className="sr-only">{Copy.ProjectsTitle}</h2>
          <ol className="grid gap-16 md:gap-24">
            {PROJECTS.map((Project, Index) => {
              const Cover = GetProjectImages(Project.ImagesFolder)[0];
              return (
                <li key={Project.Slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                  <Link href={PathFor(Language, `/portfolio/${Project.Slug}`)} className={Index % 2 === 1 ? "group md:order-2" : "group"}>
                    <figure className="overflow-hidden rounded-lg border border-line shadow-card">
                      {Cover && (
                        <Image
                          src={Cover}
                          alt={`${Project.Title}: ${Project.Category[Language]}`}
                          width={1200}
                          height={750}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                    </figure>
                  </Link>
                  <div>
                    <SectionLabel Index={String(Index + 1).padStart(2, "0")}>{Project.Category[Language]}</SectionLabel>
                    <h3 className="mt-4 font-latin text-[32px] font-bold">{Project.Title}</h3>
                    <p className="mt-3 text-ink-muted">{Project.Description[Language]}</p>
                    {Project.Result && (
                      <p className="mt-5 border-s-2 border-accent ps-4 font-medium">{Project.Result[Language]}</p>
                    )}
                    <ul className="mt-5 grid gap-2">
                      {Project.Features.slice(0, 3).map((Feature) => (
                        <li key={Feature.en} className="flex gap-2.5 text-[15px] text-ink-muted">
                          <Icon Name="Check" Size={18} ClassName="mt-0.5 text-accent" />
                          {Feature[Language]}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={PathFor(Language, `/portfolio/${Project.Slug}`)}
                      className="mt-7 inline-flex items-center gap-2 font-semibold text-accent-ink hover:text-ink"
                    >
                      {Common.Cta.CaseStudy}
                      <OutArrow Size={18} />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="products" data-theme="inverse" className="scroll-mt-20 py-20 md:py-[104px]">
        <div className="container-page">
          <SectionLabel>{Copy.ProductsLabel}</SectionLabel>
          <h2 className="mt-4 text-[30px] font-bold md:text-[42px]">{Copy.ProductsTitle}</h2>
          <p className="mt-3 max-w-3xl text-lg text-ink-muted">{Copy.ProductsLead}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-6 md:gap-y-12">
            {PRODUCTS.map((Product) => (
              <ProjectCard
                key={Product.Slug}
                Href={PathFor(Language, `/products/${Product.Slug}`)}
                ImageSrc={Product.ImagesFolder ? GetProjectImages(Product.ImagesFolder)[0] : undefined}
                ImageAlt={Product.Name}
                Kicker={Product.Category[Language]}
                Title={Product.Name}
                Text={Product.Tagline[Language]}
                Badge={Product.Status === "live" ? Copy.Live : Copy.ComingSoon}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20 md:pt-[104px]">
        <CtaPanel Language={Language} Common={Common} Title={Copy.CtaTitle} />
      </div>
    </>
  );
}
