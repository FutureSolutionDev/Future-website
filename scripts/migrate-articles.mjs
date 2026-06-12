// One-off migration: src/data/articles.json → content/blog/<slug>.<lang>.mdx
// Structured sections become MDX component blocks (Highlights/Steps/Features/Tech/Stats)
// so the rendered article keeps its current design.
// Run: node scripts/migrate-articles.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'content', 'blog');

const data = JSON.parse(await readFile(path.join(ROOT, 'src', 'data', 'articles.json'), 'utf8'));

// Escape MDX-significant characters in plain prose
const mdxText = (text) => String(text).replace(/([<>{}])/g, '\\$1');
const yamlString = (value) => JSON.stringify(String(value));

function buildFrontmatter(article, lang) {
    const content = article.content[lang];
    const lines = [
        '---',
        `title: ${yamlString(article.title[lang])}`,
        `excerpt: ${yamlString(article.excerpt[lang])}`,
        `category: ${yamlString(article.category[lang])}`,
        `readTime: ${yamlString(article.readTime[lang])}`,
        `publishedAt: "${article.publishedAt}"`,
        `icon: ${article.icon}`,
        `author: ${yamlString(article.author?.name ?? 'Future Solutions Team')}`,
    ];
    if (article.relatedSolutions?.length) {
        lines.push('relatedSolutions:');
        for (const slug of article.relatedSolutions) lines.push(`  - ${slug}`);
    }
    if (content.cta) {
        lines.push('cta:');
        lines.push(`  title: ${yamlString(content.cta.title)}`);
        lines.push(`  description: ${yamlString(content.cta.description)}`);
        lines.push(`  buttonText: ${yamlString(content.cta.buttonText)}`);
    }
    lines.push('---');
    return lines.join('\n');
}

function buildBody(content) {
    const parts = [mdxText(content.introduction)];
    for (const section of content.sections ?? []) {
        parts.push(`## ${mdxText(section.title)}`);
        if (section.content) parts.push(mdxText(section.content));
        if (section.highlights) parts.push(`<Highlights items={${JSON.stringify(section.highlights)}} />`);
        if (section.steps) parts.push(`<Steps items={${JSON.stringify(section.steps)}} />`);
        if (section.features) parts.push(`<Features items={${JSON.stringify(section.features)}} />`);
        if (section.technologies) parts.push(`<Tech items={${JSON.stringify(section.technologies)}} />`);
        if (section.stats) parts.push(`<Stats items={${JSON.stringify(section.stats)}} />`);
    }
    return parts.join('\n\n');
}

await mkdir(OUT_DIR, { recursive: true });
for (const article of data.articles) {
    for (const lang of ['en', 'ar']) {
        const file = path.join(OUT_DIR, `${article.slug}.${lang}.mdx`);
        const mdx = `${buildFrontmatter(article, lang)}\n\n${buildBody(article.content[lang])}\n`;
        await writeFile(file, mdx, 'utf8');
        console.log(`wrote ${path.relative(ROOT, file)} (${mdx.length} chars)`);
    }
}
console.log('done');
