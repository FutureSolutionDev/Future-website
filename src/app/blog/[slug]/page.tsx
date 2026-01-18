import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import articlesData from '@/data/articles.json';
import ArticleContent from './ArticleContent';

// Generate static paths for all articles (SSG)
export async function generateStaticParams() {
    return articlesData.articles.map((article) => ({
        slug: article.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const article = articlesData.articles.find((a) => a.slug === slug);

    if (!article) {
        return { title: 'Article Not Found | Future Solutions' };
    }

    return {
        title: `${article.title.en} | Future Solutions`,
        description: article.excerpt.en,
        keywords: [article.category.en, 'Future Solutions', 'Software Development'],
        openGraph: {
            title: article.title.en,
            description: article.excerpt.en,
            type: 'article',
            publishedTime: article.publishedAt,
            authors: [article.author.name],
            siteName: 'Future Solutions Dev',
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title.en,
            description: article.excerpt.en,
        },
        alternates: {
            canonical: `https://futuresolutionsdev.com/blog/${slug}`,
        },
    };
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = articlesData.articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    // Get related articles
    const relatedArticles = articlesData.articles.filter((a) =>
        article.relatedSolutions?.includes(a.slug)
    );

    return <ArticleContent article={article} relatedArticles={relatedArticles} />;
}
