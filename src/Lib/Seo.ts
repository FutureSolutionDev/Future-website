import type { Metadata } from "next";
import { SEO_EN } from "@/I18n/Seo/En";
import { SEO_AR } from "@/I18n/Seo/Ar";
import { SITE_TITLE } from "@/Lib/Site";

export type Lang = "en" | "ar";
export type TBilingual = Record<Lang, string>;

export const LANGS: Lang[] = ["en", "ar"];
export const DEFAULT_LANG: Lang = "en";

export const SITE_URL = "https://futuresolutionsdev.com";
export const SITE_NAME = "Future Solutions Dev";
export const DEFAULT_OG_IMAGE = "/og/default.png";

export type TPageKey = keyof typeof SEO_EN.Pages;

export function IsLang(Value: string): Value is Lang {
  return Value === "en" || Value === "ar";
}

export function ToLang(Value: string): Lang {
  return IsLang(Value) ? Value : DEFAULT_LANG;
}

export function Pick<T>(Language: Lang, Value: Record<Lang, T>): T {
  return Value[Language];
}

export function SeoCopy(Language: Lang) {
  return Language === "ar" ? SEO_AR : SEO_EN;
}

export function PathFor(Language: Lang, Path = ""): string {
  return `/${Language}${Path}`;
}

type TBuildMetadataOptions = {
  Language: Lang;
  Path: string;
  Title: string | { absolute: string };
  Description: string;
  OgType?: "website" | "article";
  Images?: { url: string; width?: number; height?: number; alt?: string }[];
  PublishedTime?: string;
  Authors?: string[];
  Keywords?: string[];
};

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 158;
const KEYWORD_LIMIT = 14;

export function ClampDescription(Text: string): string {
  const Clean = Text.replace(/\s+/g, " ").trim();
  if (Clean.length <= DESCRIPTION_LIMIT) return Clean;
  const Head = Clean.slice(0, DESCRIPTION_LIMIT);
  const SentenceEnd = Math.max(Head.lastIndexOf(". "), Head.lastIndexOf("؟ "), Head.lastIndexOf("? "), Head.lastIndexOf("! "));
  if (SentenceEnd >= 90) return Head.slice(0, SentenceEnd + 1);
  return `${Head.slice(0, Head.lastIndexOf(" ")).replace(/[\s,،:;]+$/, "")}…`;
}

function ResolveTitle(Title: string | { absolute: string }): string | { absolute: string } {
  if (typeof Title !== "string") return Title;
  return `${Title} | ${SITE_TITLE}`.length > TITLE_LIMIT ? { absolute: Title } : Title;
}

export function BuildMetadata({
  Language,
  Path,
  Title,
  Description,
  OgType = "website",
  Images,
  PublishedTime,
  Authors,
  Keywords = [],
}: TBuildMetadataOptions): Metadata {
  const Url = PathFor(Language, Path);
  const OgImages = Images ?? [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }];
  const PlainTitle = typeof Title === "string" ? Title : Title.absolute;
  const Summary = ClampDescription(Description);
  const AllKeywords = Array.from(new Set([...Keywords, ...SeoCopy(Language).SiteKeywords])).slice(0, KEYWORD_LIMIT);

  return {
    title: ResolveTitle(Title),
    description: Summary,
    keywords: AllKeywords,
    alternates: {
      canonical: Url,
      languages: {
        en: PathFor("en", Path),
        ar: PathFor("ar", Path),
        "x-default": PathFor(DEFAULT_LANG, Path),
      },
    },
    openGraph: {
      title: PlainTitle,
      description: Summary,
      url: Url,
      siteName: SITE_NAME,
      type: OgType,
      locale: Language === "ar" ? "ar_EG" : "en_US",
      alternateLocale: Language === "ar" ? "en_US" : "ar_EG",
      images: OgImages,
      ...(PublishedTime ? { publishedTime: PublishedTime } : {}),
      ...(Authors ? { authors: Authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: PlainTitle,
      description: Summary,
      images: OgImages.map((Image) => Image.url),
    },
  };
}

export function PageMetadata(Language: Lang, PageKey: TPageKey, Path: string): Metadata {
  const Copy = SeoCopy(Language).Pages[PageKey];
  return BuildMetadata({
    Language,
    Path,
    Title: PageKey === "home" ? { absolute: Copy.title } : Copy.title,
    Description: Copy.description,
    Keywords: Copy.keywords,
  });
}
