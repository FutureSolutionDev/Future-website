// Server-only blog content loader: reads MDX files from content/blog at build time.
// File naming: content/blog/<slug>.<lang>.mdx  (e.g. e-commerce-solutions.ar.mdx)
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import type { Lang } from '@/lib/seo';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const FrontmatterSchema = z.object({
    title: z.string().min(1),
    excerpt: z.string().min(1),
    category: z.string().min(1),
    readTime: z.string().min(1),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedAt must be YYYY-MM-DD'),
    icon: z.enum(['ShoppingCart', 'BarChart', 'Server', 'Layers']).default('Layers'),
    coverImage: z.string().optional(),
    author: z.string().default('Future Solutions Team'),
    relatedSolutions: z.array(z.string()).default([]),
    cta: z
        .object({
            title: z.string(),
            description: z.string(),
            buttonText: z.string(),
        })
        .optional(),
});

export type TArticleMeta = z.infer<typeof FrontmatterSchema> & {
    slug: string;
    lang: Lang;
};

export type TArticle = {
    meta: TArticleMeta;
    body: string;
};

function ArticleFilePath(slug: string, lang: Lang): string {
    return path.join(BLOG_DIR, `${slug}.${lang}.mdx`);
}

/** All article slugs — a slug exists when its English file exists (en is the source of truth). */
export function GetArticleSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs
        .readdirSync(BLOG_DIR)
        .filter((file) => file.endsWith('.en.mdx'))
        .map((file) => file.replace(/\.en\.mdx$/, ''))
        .sort();
}

/**
 * Loads one article in the requested language, falling back to English when the
 * translation does not exist yet. Returns null for unknown slugs.
 * Throws a descriptive error on invalid frontmatter so a bad file fails the build.
 */
export function GetArticle(slug: string, lang: Lang): TArticle | null {
    const preferredPath = ArticleFilePath(slug, lang);
    const filePath = fs.existsSync(preferredPath) ? preferredPath : ArticleFilePath(slug, 'en');
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    const parsed = FrontmatterSchema.safeParse(data);
    if (!parsed.success) {
        throw new Error(`Invalid frontmatter in ${path.basename(filePath)}: ${parsed.error.message}`);
    }

    return {
        meta: { ...parsed.data, slug, lang },
        body: content,
    };
}

/** Article metadata for listings, newest first. */
export function GetAllArticleMetas(lang: Lang): TArticleMeta[] {
    return GetArticleSlugs()
        .map((slug) => GetArticle(slug, lang)?.meta)
        .filter((meta): meta is TArticleMeta => meta !== undefined && meta !== null)
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
