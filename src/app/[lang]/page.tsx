import type { Metadata } from "next";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { SectionLabel } from "@/Components/Common/SectionLabel";
import { TextLink } from "@/Components/Common/Button";
import { Hero } from "@/Components/Public/Home/Hero";
import { ServiceRows } from "@/Components/Public/Home/ServiceRows";
import { ProcessSteps } from "@/Components/Public/Home/ProcessSteps";
import { Testimonial } from "@/Components/Public/Home/Testimonial";
import { FaqPreview } from "@/Components/Public/Home/FaqPreview";
import { FeaturedCase } from "@/Components/Public/Work/FeaturedCase";
import { ProjectCard } from "@/Components/Public/Work/ProjectCard";
import { PROJECTS } from "@/Data/Projects";
import { PRODUCTS, ProductName } from "@/Data/Products";
import { GetProjectImages } from "@/Lib/Images";
import { PageMetadata, PathFor, ToLang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return PageMetadata(ToLang((await params).lang), "home", "");
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const Language = ToLang((await params).lang);
  const Copy = GetDictionary(Language);
  const [Featured, ...Others] = PROJECTS;
  const FeaturedImages = GetProjectImages(Featured.ImagesFolder);
  const LiveProduct = PRODUCTS.find((Product) => Product.Status === "live");

  return (
    <>
      <Hero Language={Language} Copy={Copy} ShotSrc={FeaturedImages[0]} />

      <section className="py-20 md:py-[104px]">
        <div className="container-page grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-[72px]">
          <div className="md:sticky md:top-[120px] md:self-start">
            <SectionLabel Index="01">{Copy.Home.Services.Label}</SectionLabel>
            <h2 className="mt-4 text-[30px] font-bold md:text-[42px]">{Copy.Home.Services.Title}</h2>
            <p className="mt-3 text-lg text-ink-muted">{Copy.Home.Services.Lead}</p>
            <p className="mt-7">
              <TextLink Href={PathFor(Language, "/services")}>{Copy.Home.Services.AllServices}</TextLink>
            </p>
          </div>
          <ServiceRows Language={Language} />
        </div>
      </section>

      <section data-theme="inverse" className="py-20 md:py-[104px]">
        <div className="container-page">
          <div className="mb-11 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel Index="02">{Copy.Common.Nav.Work}</SectionLabel>
              <h2 className="mt-4 text-[30px] font-bold md:text-[42px]">{Copy.Home.Work.Title}</h2>
              <p className="mt-3 text-lg text-ink-muted">{Copy.Home.Work.Lead}</p>
            </div>
            <TextLink Href={PathFor(Language, "/portfolio")}>{Copy.Common.Cta.AllWork}</TextLink>
          </div>
          <FeaturedCase Project={Featured} Images={FeaturedImages} Language={Language} Copy={Copy} />
          <div className="mt-16 grid gap-10 md:mt-[72px] md:grid-cols-3 md:gap-6">
            {Others.map((Project) => (
              <ProjectCard
                key={Project.Slug}
                Href={PathFor(Language, `/portfolio/${Project.Slug}`)}
                ImageSrc={GetProjectImages(Project.ImagesFolder)[0]}
                ImageAlt={Project.Title}
                Kicker={Project.Category[Language]}
                Title={Project.Title}
                Text={Project.Summary[Language]}
              />
            ))}
            {LiveProduct?.ImagesFolder && (
              <ProjectCard
                Href={PathFor(Language, `/products/${LiveProduct.Slug}`)}
                ImageSrc={GetProjectImages(LiveProduct.ImagesFolder)[0]}
                ImageAlt={ProductName(LiveProduct, Language)}
                Kicker={LiveProduct.Category[Language]}
                Title={ProductName(LiveProduct, Language)}
                Text={LiveProduct.Tagline[Language]}
                Badge={Copy.Pages.Work.Live}
              />
            )}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 py-20 md:py-[104px]">
        <div className="container-page">
          <SectionLabel Index="03">{Copy.Home.Process.Label}</SectionLabel>
          <h2 className="mt-4 max-w-3xl text-[30px] font-bold md:text-[42px]">{Copy.Home.Process.Title}</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-muted">{Copy.Home.Process.Lead}</p>
          <ProcessSteps Language={Language} />
        </div>
      </section>

      <Testimonial Language={Language} Label={Copy.Home.Testimonials.Label} LinkLabel={Copy.Home.Testimonials.SeePlatform} />
      <FaqPreview Language={Language} Copy={Copy} />
      <CtaPanel Language={Language} Common={Copy.Common} />
    </>
  );
}
