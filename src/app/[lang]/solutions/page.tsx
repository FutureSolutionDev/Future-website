import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TextLink } from "@/Components/Common/Button";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { Icon } from "@/Components/Common/Icon";
import { PageHeader } from "@/Components/Common/PageHeader";
import { SectionLabel } from "@/Components/Common/SectionLabel";
import { FEATURED_INDUSTRY, INDUSTRIES } from "@/Data/Industries";
import { ResolveWork, type TResolvedWork } from "@/Lib/Resolve";
import { PageMetadata, PathFor, ToLang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return PageMetadata(ToLang((await params).lang), "solutions", "/solutions");
}

export default async function SolutionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const Language = ToLang((await params).lang);
  const { Common, Pages } = GetDictionary(Language);
  const Copy = Pages.Industries;
  const Featured = FEATURED_INDUSTRY;
  const Proofs = (Featured.Proofs ?? [])
    .map((Proof) => ResolveWork(Proof.Kind, Proof.Slug, Language))
    .filter((Proof): Proof is TResolvedWork => Proof !== null);

  return (
    <>
      <PageHeader
        Label={Common.Nav.Industries}
        Title={Copy.Title}
        Lead={Copy.Lead}
        Language={Language}
        Common={Common}
        Trail={[{ Name: Common.Nav.Industries, Path: PathFor(Language, "/solutions") }]}
      />

      <section className="pt-20 md:pt-[104px]">
        <div className="container-page">
          <article id={Featured.Slug} className="scroll-mt-28 grid gap-10 rounded-xl border border-line bg-surface p-7 shadow-card md:p-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionLabel>{Copy.FeaturedLabel}</SectionLabel>
              <h2 className="mt-5 flex items-center gap-3 text-[28px] font-bold md:text-[36px]">
                <span className="grid size-12 place-items-center rounded-md bg-accent-soft text-accent">
                  <Icon Name={Featured.Icon} Size={26} />
                </span>
                {Featured.Title[Language]}
              </h2>
              <p className="mt-4 text-lg text-ink-muted">{Featured.Content[Language]}</p>
              <ul className="mt-6 grid gap-2.5">
                {Featured.Points.map((Point) => (
                  <li key={Point.en} className="flex gap-2.5">
                    <Icon Name="Check" Size={18} ClassName="mt-1 shrink-0 text-accent" />
                    {Point[Language]}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-soft">{Copy.ProofsLabel}</p>
              <ul className="mt-3 grid grid-cols-2 gap-3">
                {Proofs.map((Proof) => (
                  <li key={Proof.Path}>
                    <Link href={Proof.Path} className="group block overflow-hidden rounded-lg border border-line bg-page transition-colors hover:border-accent">
                      {Proof.Cover ? (
                        <Image
                          src={Proof.Cover}
                          alt={Proof.Name}
                          width={600}
                          height={375}
                          sizes="(min-width: 1024px) 22vw, 45vw"
                          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <span aria-hidden="true" className="checker grid aspect-[16/10] w-full place-items-center bg-accent-soft text-accent">
                          <Icon Name={Featured.Icon} Size={32} />
                        </span>
                      )}
                      <span className="block px-3 py-2.5 text-sm font-semibold group-hover:text-accent-ink">{Proof.Name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((Industry) => {
            const Target = Industry.Link ? ResolveWork(Industry.Link.Kind, Industry.Link.Slug, Language) : null;
            const LinkLabel = Industry.Link?.Kind === "service" ? Pages.Services.Explore : Copy.LearnMore;
            return (
              <article key={Industry.Slug} id={Industry.Slug} className="flex scroll-mt-28 flex-col rounded-lg border border-line bg-surface p-6 transition-shadow hover:shadow-card">
                <span className="grid size-11 place-items-center rounded-md bg-accent-soft text-accent">
                  <Icon Name={Industry.Icon} Size={22} />
                </span>
                <h2 className="mt-4 text-xl font-bold">{Industry.Title[Language]}</h2>
                <p className="mt-2 text-[15px] text-ink-muted">{Industry.Content[Language]}</p>
                <ul className="mt-4 grid gap-2">
                  {Industry.Points.map((Point) => (
                    <li key={Point.en} className="flex gap-2 text-sm">
                      <Icon Name="Check" Size={16} ClassName="mt-0.5 shrink-0 text-accent" />
                      {Point[Language]}
                    </li>
                  ))}
                </ul>
                {Target && (
                  <p className="mt-auto pt-5">
                    <TextLink Href={Target.Path}>{LinkLabel}</TextLink>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <CtaPanel Language={Language} Common={Common} Title={Copy.CtaTitle} Text={Copy.CtaText} />
    </>
  );
}
