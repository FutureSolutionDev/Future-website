import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { Icon, OutArrow } from "@/Components/Common/Icon";
import { JsonLd } from "@/Components/Common/JsonLd";
import { PageHeader } from "@/Components/Common/PageHeader";
import { SectionLabel } from "@/Components/Common/SectionLabel";
import { ToolChips } from "@/Components/Public/Services/ToolChips";
import { GetProductBySlug, ProductName } from "@/Data/Products";
import { GetProjectBySlug } from "@/Data/Projects";
import { GetServiceById, SERVICES, SHARED_DELIVERABLES, type TService } from "@/Data/Services/Index";
import { GetProjectImages } from "@/Lib/Images";
import { QuestionsSchema, ServiceSchema } from "@/Lib/Schema";
import { BuildMetadata, LANGS, PathFor, ToLang, type Lang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

type TParams = { params: Promise<{ lang: string; id: string }> };

const SECTION_TITLE = "text-[26px] font-bold md:text-[34px]";

export function generateStaticParams() {
  return LANGS.flatMap((lang) => SERVICES.map((Service) => ({ lang, id: Service.Id })));
}

function ResolveProof(Service: TService, Language: Lang) {
  if (Service.Proof.Kind === "project") {
    const Project = GetProjectBySlug(Service.Proof.Slug);
    if (!Project) return null;
    return {
      Name: Project.Title,
      Path: PathFor(Language, `/portfolio/${Project.Slug}`),
      Cover: GetProjectImages(Project.ImagesFolder)[0],
    };
  }
  const Product = GetProductBySlug(Service.Proof.Slug);
  if (!Product) return null;
  return {
    Name: ProductName(Product, Language),
    Path: PathFor(Language, `/products/${Product.Slug}`),
    Cover: Product.ImagesFolder ? GetProjectImages(Product.ImagesFolder)[0] : undefined,
  };
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const { lang, id } = await params;
  const Language = ToLang(lang);
  const Service = GetServiceById(id);
  if (!Service) return {};
  return BuildMetadata({
    Language,
    Path: `/services/${Service.Id}`,
    Title: Service.Title[Language],
    Description: Service.MetaDescription[Language],
  });
}

export default async function ServicePage({ params }: TParams) {
  const { lang, id } = await params;
  const Language = ToLang(lang);
  const Service = GetServiceById(id);
  if (!Service) notFound();
  const { Common, Pages } = GetDictionary(Language);
  const Copy = Pages.Services;
  const Proof = ResolveProof(Service, Language);
  const Faqs = Service.Faqs.map((Faq) => ({ Question: Faq.Question[Language], Answer: Faq.Answer[Language] }));

  return (
    <>
      <JsonLd Data={[ServiceSchema(Service, Language), QuestionsSchema(Faqs)]} />
      <PageHeader
        Language={Language}
        Common={Common}
        Trail={[
          { Name: Common.Nav.Services, Path: PathFor(Language, "/services") },
          { Name: Service.Title[Language], Path: PathFor(Language, `/services/${Service.Id}`) },
        ]}
        Label={Common.Nav.Services}
        Title={Service.Title[Language]}
        Lead={Service.Intro[Language]}
      />

      <section className="py-20 md:py-[104px]">
        <div className="container-page">
          <SectionLabel Index="01">{Copy.WhatWeBuild}</SectionLabel>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {Service.SubServices.map((Sub, Index) => (
              <li key={Sub.Title.en} className="bg-page p-7">
                <span className="font-mono text-xs text-accent-ink">
                  <bdi dir="ltr">{String(Index + 1).padStart(2, "0")}</bdi>
                </span>
                <h2 className="mt-3 text-lg font-bold">{Sub.Title[Language]}</h2>
                <p className="mt-2 text-[15px] text-ink-muted">{Sub.Text[Language]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-subtle py-20 md:py-[104px]">
        <div className="container-page">
          <SectionLabel Index="02">{Copy.StackTitle}</SectionLabel>
          <dl className="mt-10 grid gap-8 md:grid-cols-2">
            {Service.StackGroups.map((Group) => (
              <div key={Group.Label.en}>
                <dt className="text-sm font-semibold text-ink">{Group.Label[Language]}</dt>
                <dd className="mt-3">
                  <ToolChips Tools={Group.Tools} Language={Language} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-20 md:py-[104px]">
        <div className="container-page grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionLabel Index="03">{Copy.DeliverablesTitle}</SectionLabel>
            <ul className="mt-8 grid gap-3.5">
              {[...Service.Deliverables, ...SHARED_DELIVERABLES].map((Item) => (
                <li key={Item.en} className="flex gap-3 text-ink-muted">
                  <Icon Name="Check" Size={18} ClassName="mt-1 shrink-0 text-accent" />
                  {Item[Language]}
                </li>
              ))}
            </ul>
          </div>
          {Proof && (
            <div>
              <SectionLabel Index="04">{Copy.ProofTitle}</SectionLabel>
              <Link href={Proof.Path} className="group mt-8 block overflow-hidden rounded-lg border border-line bg-surface shadow-card">
                {Proof.Cover && (
                  <Image
                    src={Proof.Cover}
                    alt={Proof.Name}
                    width={1200}
                    height={750}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                )}
                <div className="p-6">
                  <p className="text-lg font-bold">{Proof.Name}</p>
                  <p className="mt-1.5 text-[15px] text-ink-muted">{Service.Proof.Note[Language]}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-accent-ink">
                    {Copy.ProofCta}
                    <OutArrow Size={18} />
                  </span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-subtle py-20 md:py-[104px]">
        <div className="container-page max-w-4xl">
          <SectionLabel Index="05">{Copy.FaqTitle}</SectionLabel>
          <div className="mt-8 grid gap-3">
            {Faqs.map((Faq, Index) => (
              <details key={Faq.Question} open={Index === 0} className="group rounded-lg border border-line bg-surface p-5 open:shadow-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {Faq.Question}
                  <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink-muted">{Faq.Answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <h2 className={SECTION_TITLE}>{Copy.OtherServices}</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES.filter((Other) => Other.Id !== Service.Id).map((Other) => (
              <li key={Other.Id}>
                <Link
                  href={PathFor(Language, `/services/${Other.Id}`)}
                  className="flex h-full items-center gap-3 rounded-lg border border-line p-4 font-semibold transition-colors hover:border-accent hover:text-accent-ink"
                >
                  <Icon Name={Other.Icon} Size={20} ClassName="shrink-0 text-accent" />
                  {Other.Title[Language]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel Language={Language} Common={Common} Title={Copy.CtaTitle} Text={Copy.CtaText} />
    </>
  );
}
