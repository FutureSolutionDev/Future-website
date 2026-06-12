import type { MetadataRoute } from 'next';
import { GetAllArticleMetas } from '@/lib/blog';
import { Products } from '@/data/products';
import { LANGS, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const STATIC_PATHS = ['', '/services', '/solutions', '/products', '/portfolio', '/technologies', '/about', '/contact', '/blog'];

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

    const productEntries: MetadataRoute.Sitemap = LANGS.flatMap((lang) =>
        Products.map((product) => ({
            url: `${SITE_URL}/${lang}/products/${product.slug}`,
            lastModified: buildDate,
            alternates: LanguageAlternates(`/products/${product.slug}`),
        }))
    );

    return [...staticEntries, ...productEntries, ...articleEntries];
}
