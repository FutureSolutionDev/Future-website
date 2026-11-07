import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Lang } from "@/Lib/Seo";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const ARTICLE_ICONS = ["ShoppingCart", "BarChart", "Server", "Layers"] as const;

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  seoTitle: z.string().max(60).optional(),
  keywords: z.array(z.string()).default([]),
  category: z.string().min(1),
  readTime: z.string().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "publishedAt must be YYYY-MM-DD"),
  icon: z.enum(ARTICLE_ICONS).default("Layers"),
  coverImage: z.string().optional(),
  author: z.string().default("Future Solutions Team"),
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
  Meta: TArticleMeta;
  Body: string;
};

function ArticleFilePath(Slug: string, Language: Lang): string {
  return path.join(BLOG_DIR, `${Slug}.${Language}.mdx`);
}

export function GetArticleSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((File) => File.endsWith(".en.mdx"))
    .map((File) => File.replace(/\.en\.mdx$/, ""))
    .sort();
}

export function GetArticle(Slug: string, Language: Lang): TArticle | null {
  const PreferredPath = ArticleFilePath(Slug, Language);
  const FilePath = fs.existsSync(PreferredPath) ? PreferredPath : ArticleFilePath(Slug, "en");
  if (!fs.existsSync(FilePath)) return null;

  const Raw = fs.readFileSync(FilePath, "utf8");
  const { data, content } = matter(Raw);
  const Parsed = FrontmatterSchema.safeParse(data);
  if (!Parsed.success) {
    throw new Error(`Invalid frontmatter in ${path.basename(FilePath)}: ${Parsed.error.message}`);
  }

  return {
    Meta: { ...Parsed.data, slug: Slug, lang: Language },
    Body: content,
  };
}

export function GetAllArticleMetas(Language: Lang): TArticleMeta[] {
  return GetArticleSlugs()
    .map((Slug) => GetArticle(Slug, Language)?.Meta)
    .filter((Meta): Meta is TArticleMeta => Boolean(Meta))
    .sort((A, B) => B.publishedAt.localeCompare(A.publishedAt));
}

export function ExtractHeadings(Body: string): { Id: string; Text: string }[] {
  return Body.split("\n")
    .filter((Line) => /^##\s+/.test(Line))
    .map((Line, Index) => {
      const Text = Line.replace(/^##\s+/, "").replace(/[*_`]/g, "").trim();
      return { Id: `section-${Index + 1}`, Text };
    });
}
