// Server-side resolver for per-article Open Graph images.
//
// Each article gets its own folder: public/og/blog/<slug>/
//   en.png   — English-specific OG card
//   ar.png   — Arabic-specific OG card
//   og.png   — language-neutral, used for both if no per-lang file
// (.png / .jpg / .jpeg / .webp all accepted)
//
// Resolution order, most specific first; falls back to the site's default OG:
//   1. /og/blog/<slug>/<lang>.<ext>
//   2. /og/blog/<slug>/og.<ext>       (language-neutral)
//   3. the article's own coverImage   (only if the file actually exists)
//   4. /og/default.png                (site default)
import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_OG_IMAGE, type Lang } from '@/lib/seo';

const PUBLIC = path.join(process.cwd(), 'public');
const OG_BLOG_DIR = path.join(PUBLIC, 'og', 'blog');
const EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'];

/** Returns the public URL for <dir>/<base>.<ext> if any extension exists. */
function findImage(dir: string, base: string, urlDir: string): string | null {
    for (const ext of EXTENSIONS) {
        if (fs.existsSync(path.join(dir, `${base}.${ext}`))) {
            return `${urlDir}/${base}.${ext}`;
        }
    }
    return null;
}

/** Resolves the OG image URL for an article slug in a given language. */
export function GetArticleOgImage(slug: string, lang: Lang, coverImage?: string): string {
    const slugDir = path.join(OG_BLOG_DIR, slug);
    const urlDir = `/og/blog/${slug}`;

    // 1 + 2: per-language, then language-neutral, inside the article's folder
    const resolved = findImage(slugDir, lang, urlDir) ?? findImage(slugDir, 'og', urlDir);
    if (resolved) return resolved;

    // 3: the article's declared coverImage, but only if it really exists on disk
    if (coverImage) {
        const onDisk = path.join(PUBLIC, ...coverImage.split('/').filter(Boolean));
        if (fs.existsSync(onDisk)) return coverImage;
    }

    // 4: site default
    return DEFAULT_OG_IMAGE;
}
