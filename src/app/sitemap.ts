import type { MetadataRoute } from 'next';
import { GetAllArticleMetas } from '@/lib/blog';
import { LANGS, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

// NOTE: '/portfolio' is intentionally excluded until it has real projects.
const STATIC_PATHS = ['', '/services', '/solutions', '/technologies', '/about', '/contact', '/blog'];

export default function sitemap(): MetadataRoute.Sitemap {
    const buildDate = new Date().toISOString().split('T')[0];

    const LanguageAlternates = (path: string) => ({
        languages: Object.fromEntries(LANGS.map((lang) => [lang, `${SITE_URL}/${lang}${path}`])),
    });

    const staticEntries: MetadataRoute.Sitemap = LANGS.flatMap((lang) =>
        STATIC_PATHS.map((path) => ({
            url: `${SITE_URL}/${lang}${path}`,
            lastModified: buildDate,
            alternates: LanguageAlternates(path),
        }))
    );

    const articleEntries: MetadataRoute.Sitemap = LANGS.flatMap((lang) =>
        GetAllArticleMetas(lang).map((meta) => ({
            url: `${SITE_URL}/${lang}/blog/${meta.slug}`,
            lastModified: meta.publishedAt,
            alternates: LanguageAlternates(`/blog/${meta.slug}`),
        }))
    );

    return [...staticEntries, ...articleEntries];
}
