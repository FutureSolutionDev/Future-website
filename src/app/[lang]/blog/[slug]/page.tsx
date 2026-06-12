import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { evaluate } from '@mdx-js/mdx';
import * as MdxRuntime from 'react/jsx-runtime';
import { ArrowLeft, ArrowRight, BarChart, Clock, Layers, Server, ShoppingCart, Target } from 'lucide-react';
import { GetAllArticleMetas, GetArticle, GetArticleSlugs } from '@/lib/blog';
import { ArticleMdxComponents } from '@/components/blog/MdxComponents';
import { BuildMetadata, DEFAULT_OG_IMAGE, IsLang, LANGS, SITE_URL, type Lang } from '@/lib/seo';
import { Contact } from '@/lib/constants';

const IconMap = { ShoppingCart, BarChart, Server, Layers };

export function generateStaticParams() {
    return LANGS.flatMap((lang) => GetArticleSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang: langParam, slug } = await params;
    const lang: Lang = IsLang(langParam) ? langParam : 'en';
    const article = GetArticle(slug, lang);
    if (!article) return { title: 'Article Not Found' };

    const { meta } = article;
    const image = meta.coverImage ?? DEFAULT_OG_IMAGE;

    return {
        ...BuildMetadata({
            lang,
            path: `/blog/${slug}`,
            title: meta.title,
            description: meta.excerpt,
            ogType: 'article',
            images: [{ url: image, width: 1200, height: 630, alt: meta.title }],
        }),
        openGraph: {
            title: meta.title,
            description: meta.excerpt,
            type: 'article',
            publishedTime: meta.publishedAt,
            authors: [meta.author],
            url: `/${lang}/blog/${slug}`,
            images: [{ url: image, width: 1200, height: 630, alt: meta.title }],
        },
    };
}

function ArticleSchema(lang: Lang, slug: string, meta: NonNullable<ReturnType<typeof GetArticle>>['meta']) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: meta.title,
        description: meta.excerpt,
        datePublished: meta.publishedAt,
        inLanguage: lang,
        image: `${SITE_URL}${meta.coverImage ?? DEFAULT_OG_IMAGE}`,
        author: { '@type': 'Organization', name: meta.author, url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'Future Solutions Dev', url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/${lang}/blog/${slug}`,
    };
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang: langParam, slug } = await params;
    const lang: Lang = IsLang(langParam) ? langParam : 'en';
    const article = GetArticle(slug, lang);
    if (!article) notFound();

    const { meta, body } = article;
    const IconComponent = IconMap[meta.icon];
    const relatedArticles = GetAllArticleMetas(lang).filter((m) => meta.relatedSolutions.includes(m.slug));
    const BackArrow = lang === 'ar' ? ArrowRight : ArrowLeft;

    // Compile the MDX body at build time (static export prerenders every page)
    const { default: MdxContent } = await evaluate(body, MdxRuntime);

    return (
        <article className="py-12 bg-bg-dark min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ArticleSchema(lang, slug, meta)) }}
            />
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href={`/${lang}/blog`}
                        className="inline-flex items-center gap-2 text-text-muted hover:text-cyan-glow transition-colors"
                    >
                        <BackArrow size={20} />
                        <span>{lang === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}</span>
                    </Link>
                </div>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 text-sm rounded-full bg-primary-blue/20 text-primary-blue font-medium">
                            {meta.category}
                        </span>
                        <span className="flex items-center gap-2 text-text-muted text-sm">
                            <Clock size={16} />
                            {meta.readTime}
                        </span>
                        <time className="text-text-muted text-sm" dateTime={meta.publishedAt}>
                            {meta.publishedAt}
                        </time>
                    </div>

                    <div className="flex items-start gap-6 mb-6">
                        <div className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-blue/20 to-cyan-glow/20 flex items-center justify-center text-cyan-glow">
                            <IconComponent size={40} />
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{meta.title}</h1>
                    </div>

                    <p className="text-xl text-text-muted leading-relaxed">{meta.excerpt}</p>
                </header>

                {/* Body */}
                <div className="article-body">
                    <MdxContent components={ArticleMdxComponents} />
                </div>

                {/* CTA */}
                {meta.cta && (
                    <section className="my-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary-blue/10 to-cyan-glow/10 border border-cyan-glow/20 text-center">
                        <Target className="mx-auto text-cyan-glow mb-6" size={48} />
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{meta.cta.title}</h2>
                        <p className="text-text-muted mb-8 max-w-2xl mx-auto">{meta.cta.description}</p>
                        <a
                            href={Contact.WhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 active:scale-95 bg-primary-blue text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(29,161,242,0.5)] px-8 py-4 text-lg"
                        >
                            {meta.cta.buttonText}
                        </a>
                    </section>
                )}

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-bold mb-8">
                            {lang === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {relatedArticles.map((related) => {
                                const RelatedIcon = IconMap[related.icon];
                                return (
                                    <Link key={`related-${related.slug}`} href={`/${lang}/blog/${related.slug}`}>
                                        <div className="flex items-start gap-4 p-6 bg-surface-dark rounded-xl border border-white/5 hover:border-cyan-glow/30 transition-all duration-300">
                                            <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-blue/20 to-cyan-glow/20 flex items-center justify-center text-primary-blue">
                                                <RelatedIcon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold mb-2 hover:text-cyan-glow transition-colors">{related.title}</h3>
                                                <p className="text-text-muted text-sm line-clamp-2">{related.excerpt}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
}
