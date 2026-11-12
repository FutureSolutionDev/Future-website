import fs from "node:fs";
import path from "node:path";
import { Versioned } from "@/Lib/AssetVersion";
import { DEFAULT_OG_IMAGE, type Lang } from "@/Lib/Seo";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OG_BLOG_DIR = path.join(PUBLIC_DIR, "og", "blog");
const TEAM_DIR = path.join(PUBLIC_DIR, "Team");
const OG_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];
const PHOTO_EXTENSIONS = ["webp", "png", "jpg", "jpeg", "avif"];

export const IMAGE_PATTERN = /\.(webp|png|jpe?g|avif)$/i;

export function GetProjectImages(ImagesFolder: string): string[] {
  const Dir = path.join(PUBLIC_DIR, ...ImagesFolder.split("/").filter(Boolean));
  if (!fs.existsSync(Dir)) return [];
  return fs
    .readdirSync(Dir)
    .filter((File) => IMAGE_PATTERN.test(File))
    .sort()
    .map((File) => Versioned(`${ImagesFolder}/${File}`));
}

const OG_WORK_DIR = path.join(PUBLIC_DIR, "og", "work");

export function GetWorkOgImage(Slug: string): { url: string; width: number; height: number } | undefined {
  return fs.existsSync(path.join(OG_WORK_DIR, `${Slug}.jpg`)) ? { url: Versioned(`/og/work/${Slug}.jpg`), width: 1200, height: 630 } : undefined;
}

export function GetTeamPhoto(PhotoSlug: string): string | null {
  for (const Extension of PHOTO_EXTENSIONS) {
    if (fs.existsSync(path.join(TEAM_DIR, `${PhotoSlug}.${Extension}`))) {
      return Versioned(`/Team/${PhotoSlug}.${Extension}`);
    }
  }
  return null;
}

function FindImage(Dir: string, Base: string, UrlDir: string): string | null {
  for (const Extension of OG_EXTENSIONS) {
    if (fs.existsSync(path.join(Dir, `${Base}.${Extension}`))) {
      return Versioned(`${UrlDir}/${Base}.${Extension}`);
    }
  }
  return null;
}

export function GetArticleOgImage(Slug: string, Language: Lang, CoverImage?: string): string {
  const SlugDir = path.join(OG_BLOG_DIR, Slug);
  const UrlDir = `/og/blog/${Slug}`;
  const Resolved = FindImage(SlugDir, Language, UrlDir) ?? FindImage(SlugDir, "og", UrlDir);
  if (Resolved) return Resolved;

  if (CoverImage) {
    const OnDisk = path.join(PUBLIC_DIR, ...CoverImage.split("/").filter(Boolean));
    if (fs.existsSync(OnDisk)) return Versioned(CoverImage);
  }

  return DEFAULT_OG_IMAGE;
}

export function FileLabel(Src: string): string {
  return Src.split("/").pop() ?? Src;
}
