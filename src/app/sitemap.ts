import type { MetadataRoute } from "next";
import { GetAllArticleMetas } from "@/Lib/Blog";
import { PRODUCTS } from "@/Data/Products";
import { PROJECTS } from "@/Data/Projects";
import { SERVICES } from "@/Data/Services/Index";
import { DEFAULT_LANG, LANGS, SITE_URL } from "@/Lib/Seo";

export const dynamic = "force-static";

const STATIC_PATHS: { Path: string; Priority: number }[] = [
  { Path: "", Priority: 1 },
  { Path: "/services", Priority: 0.9 },
  { Path: "/portfolio", Priority: 0.9 },
  { Path: "/solutions", Priority: 0.8 },
  { Path: "/faq", Priority: 0.8 },
  { Path: "/blog", Priority: 0.8 },
  { Path: "/about", Priority: 0.7 },
  { Path: "/contact", Priority: 0.7 },
];

function Alternates(Path: string) {
  return {
    languages: {
      ...Object.fromEntries(LANGS.map((Language) => [Language, `${SITE_URL}/${Language}${Path}`])),
      "x-default": `${SITE_URL}/${DEFAULT_LANG}${Path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const BuildDate = new Date().toISOString().split("T")[0];
  const Entry = (Path: string, Priority: number, LastModified = BuildDate) =>
    LANGS.map((Language) => ({
      url: `${SITE_URL}/${Language}${Path}`,
      lastModified: LastModified,
      priority: Priority,
      alternates: Alternates(Path),
    }));

  return [
    ...STATIC_PATHS.flatMap((Item) => Entry(Item.Path, Item.Priority)),
    ...SERVICES.flatMap((Service) => Entry(`/services/${Service.Id}`, 0.85)),
    ...PROJECTS.flatMap((Project) => Entry(`/portfolio/${Project.Slug}`, 0.8)),
    ...PRODUCTS.flatMap((Product) => Entry(`/products/${Product.Slug}`, 0.7)),
    ...GetAllArticleMetas("en").flatMap((Meta) => Entry(`/blog/${Meta.slug}`, 0.7, Meta.publishedAt)),
  ];
}
