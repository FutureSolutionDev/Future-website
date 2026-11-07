import { GetProductBySlug, ProductName } from "@/Data/Products";
import { GetProjectBySlug } from "@/Data/Projects";
import { GetServiceById } from "@/Data/Services/Index";
import { GetProjectImages } from "@/Lib/Images";
import { PathFor, type Lang } from "@/Lib/Seo";

export type TWorkKind = "project" | "product" | "article" | "service";

export type TResolvedWork = { Name: string; Path: string; Cover?: string };

export function ResolveWork(Kind: TWorkKind, Slug: string, Language: Lang): TResolvedWork | null {
  if (Kind === "project") {
    const Project = GetProjectBySlug(Slug);
    if (!Project) return null;
    return { Name: Project.Title, Path: PathFor(Language, `/portfolio/${Slug}`), Cover: GetProjectImages(Project.ImagesFolder)[0] };
  }
  if (Kind === "product") {
    const Product = GetProductBySlug(Slug);
    if (!Product) return null;
    const Cover = Product.ImagesFolder ? GetProjectImages(Product.ImagesFolder)[0] : undefined;
    return { Name: ProductName(Product, Language), Path: PathFor(Language, `/products/${Slug}`), Cover };
  }
  if (Kind === "service") {
    const Service = GetServiceById(Slug);
    if (!Service) return null;
    return { Name: Service.Title[Language], Path: PathFor(Language, `/services/${Slug}`) };
  }
  return { Name: Slug, Path: PathFor(Language, `/blog/${Slug}`) };
}
