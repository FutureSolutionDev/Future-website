import type { Metadata } from 'next';
import { IsLang, PageMetadata, type Lang } from '@/lib/seo';
import { GetAllArticleMetas } from '@/lib/blog';
import BlogContent, { type TArticleListItem } from './BlogContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return PageMetadata(IsLang(lang) ? lang : 'en', 'blog', '/blog');
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: langParam } = await params;
    const lang: Lang = IsLang(langParam) ? langParam : 'en';

    // Only listing fields cross the server/client boundary — not whole articles
    const articles: TArticleListItem[] = GetAllArticleMetas(lang).map((meta) => ({
        slug: meta.slug,
        title: meta.title,
        excerpt: meta.excerpt,
        category: meta.category,
        readTime: meta.readTime,
        icon: meta.icon,
    }));

    return <BlogContent articles={articles} />;
}
