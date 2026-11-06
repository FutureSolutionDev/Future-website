import type { Metadata } from "next";
import { SEO_EN } from "@/I18n/Seo/En";
import { SEO_AR } from "@/I18n/Seo/Ar";

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
};

export function BuildMetadata({
  Language,
  Path,
  Title,
  Description,
  OgType = "website",
  Images,
  PublishedTime,
  Authors,
}: TBuildMetadataOptions): Metadata {
  const Url = PathFor(Language, Path);
  const OgImages = Images ?? [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }];
  const PlainTitle = typeof Title === "string" ? Title : Title.absolute;

  return {
    title: Title,
    description: Description,
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
      description: Description,
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
      description: Description,
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
  });
}
