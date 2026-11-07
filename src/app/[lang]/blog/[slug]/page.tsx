import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import * as MdxRuntime from "react/jsx-runtime";
import { CalendarDays, Clock, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/Components/Common/Button";
import { PanelTraces } from "@/Components/Common/CircuitTraces";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { JsonLd } from "@/Components/Common/JsonLd";
import { PageHeader } from "@/Components/Common/PageHeader";
import { ArticleMdxComponents } from "@/Components/Public/Blog/MdxComponents";
import { ExtractHeadings, GetAllArticleMetas, GetArticle, GetArticleSlugs } from "@/Lib/Blog";
import { GetArticleOgImage } from "@/Lib/Images";
import { ArticleSchema } from "@/Lib/Schema";
import { BuildMetadata, LANGS, PathFor, ToLang } from "@/Lib/Seo";
import { WhatsAppLink } from "@/Lib/Site";
import { GetDictionary } from "@/I18n/Index";

type TParams = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => GetArticleSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const { lang, slug } = await params;
  const Language = ToLang(lang);
  const Article = GetArticle(slug, Language);
  if (!Article) return {};
  const Image = GetArticleOgImage(slug, Language, Article.Meta.coverImage);
  return BuildMetadata({
    Language,
    Path: `/blog/${slug}`,
    Title: Article.Meta.title,
    Description: Article.Meta.excerpt,
    OgType: "article",
    Images: [{ url: Image, width: 1200, height: 630, alt: Article.Meta.title }],
    PublishedTime: Article.Meta.publishedAt,
    Authors: [Article.Meta.author],
  });
}

export default async function ArticlePage({ params }: TParams) {
  const { lang, slug } = await params;
  const Language = ToLang(lang);
  const Article = GetArticle(slug, Language);
  if (!Article) notFound();
  const { Common, Pages } = GetDictionary(Language);
  const { Meta, Body } = Article;
  const Headings = ExtractHeadings(Body);
  const Related = GetAllArticleMetas(Language).filter((Item) => Meta.relatedSolutions.includes(Item.slug));
  const { default: MdxContent } = await evaluate(Body, MdxRuntime);
  const DateLabel = new Intl.DateTimeFormat(Language === "ar" ? "ar-EG-u-nu-latn" : "en-US", { dateStyle: "long" }).format(new Date(Meta.publishedAt));

  return (
    <article>
      <JsonLd Data={ArticleSchema(Meta, GetArticleOgImage(slug, Language, Meta.coverImage))} />
      <PageHeader
        Language={Language}
        Common={Common}
        Trail={[
          { Name: Common.Nav.Blog, Path: PathFor(Language, "/blog") },
          { Name: Meta.title, Path: PathFor(Language, `/blog/${slug}`) },
        ]}
        Label={Meta.category}
        Title={Meta.title}
        Lead={Meta.excerpt}
      >
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <Clock size={15} aria-hidden="true" />
            {Meta.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays size={15} aria-hidden="true" />
            {Pages.Blog.Published} <time dateTime={Meta.publishedAt}>{DateLabel}</time>
          </span>
        </p>
      </PageHeader>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_260px] lg:gap-16 md:py-20">
        <div className="prose-article min-w-0 max-w-measure text-[17px] leading-[1.9]">
          <MdxContent components={ArticleMdxComponents(Headings.map((Heading) => Heading.Id))} />
        </div>
        {Headings.length > 0 && (
          <aside className="max-lg:order-first lg:sticky lg:top-[104px] lg:self-start">
            <nav aria-label={Pages.Blog.OnThisPage} className="rounded-lg border border-line p-5">
              <h2 className="text-sm font-semibold text-ink-soft">{Pages.Blog.OnThisPage}</h2>
              <ol className="mt-3 grid gap-2 border-s border-line ps-4">
                {Headings.map((Heading) => (
                  <li key={Heading.Id}>
                    <a href={`#${Heading.Id}`} className="text-[15px] text-ink-muted transition-colors hover:text-accent-ink">
                      {Heading.Text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
      </div>

      {Meta.cta && (
        <div className="container-page pb-16">
          <div data-theme="inverse" className="relative overflow-hidden rounded-xl p-8 md:p-12">
            <PanelTraces />
            <div className="relative max-w-2xl">
              <h2 className="text-[26px] font-bold md:text-[32px]">{Meta.cta.title}</h2>
              <p className="mt-3 text-ink-muted">{Meta.cta.description}</p>
              <ButtonLink Href={WhatsAppLink(Meta.title)} External ClassName="mt-7">
                <MessageCircle size={18} aria-hidden="true" />
                {Meta.cta.buttonText}
              </ButtonLink>
            </div>
          </div>
        </div>
      )}

      {Related.length > 0 && (
        <section className="container-page pb-20">
          <h2 className="text-2xl font-bold">{Pages.Blog.Related}</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {Related.map((Item) => (
              <li key={Item.slug}>
                <Link href={PathFor(Language, `/blog/${Item.slug}`)} className="group block rounded-lg border border-line p-6 transition-colors hover:border-accent">
                  <span className="text-[13px] font-semibold text-accent-ink">{Item.category}</span>
                  <h3 className="mt-2 text-lg font-bold group-hover:text-accent-ink">{Item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[15px] text-ink-muted">{Item.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!Meta.cta && <CtaPanel Language={Language} Common={Common} />}
    </article>
  );
}
