import type { Metadata } from "next";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { PageHeader } from "@/Components/Common/PageHeader";
import { BlogList, type TArticleListItem } from "@/Components/Public/Blog/BlogList";
import { GetAllArticleMetas } from "@/Lib/Blog";
import { PageMetadata, PathFor, ToLang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return PageMetadata(ToLang((await params).lang), "blog", "/blog");
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const Language = ToLang((await params).lang);
  const { Common, Pages } = GetDictionary(Language);
  const Copy = Pages.Blog;
  const Articles: TArticleListItem[] = GetAllArticleMetas(Language).map((Meta) => ({
    Slug: Meta.slug,
    Title: Meta.title,
    Excerpt: Meta.excerpt,
    Category: Meta.category,
    ReadTime: Meta.readTime,
    PublishedAt: Meta.publishedAt,
  }));

  return (
    <>
      <PageHeader
        Language={Language}
        Common={Common}
        Trail={[{ Name: Common.Nav.Blog, Path: PathFor(Language, "/blog") }]}
        Label={Common.Nav.Blog}
        Title={Copy.Title}
        Lead={Copy.Lead}
      />
      <section className="container-page py-16 md:py-20">
        <BlogList Language={Language} Articles={Articles} AllLabel={Copy.All} FilterLabel={Copy.Filter} ReadLabel={Common.Cta.ReadMore} />
      </section>
      <CtaPanel Language={Language} Common={Common} />
    </>
  );
}
