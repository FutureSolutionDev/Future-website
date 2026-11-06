import { SITE_NAME, SITE_URL, SeoCopy, PathFor, type Lang } from "@/Lib/Seo";
import { CONTACT } from "@/Lib/Site";
import { SERVICES, TECH_EXPERTISE } from "@/Data/Services";
import { TEAM } from "@/Data/Team";
import { AnswerText, type TFaq } from "@/Data/Faqs";
import type { TProject } from "@/Data/Projects";
import type { TProduct } from "@/Data/Products";
import type { TArticleMeta } from "@/Lib/Blog";

export type TCrumb = { Name: string; Path: string };

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function Absolute(Path: string): string {
  return Path.startsWith("http") ? Path : `${SITE_URL}${Path}`;
}

export function OrganizationSchema(Language: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: "Future Solutions",
    url: SITE_URL,
    logo: Absolute("/favico/logo.webp"),
    description: SeoCopy(Language).SiteDescription,
    foundingDate: "2024",
    email: CONTACT.Email,
    telephone: `+${CONTACT.Phone}`,
    address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    areaServed: ["EG", "SA", "AE", "KW", "QA", "BH", "OM", "JO", "Worldwide"],
    knowsLanguage: ["ar", "en"],
    knowsAbout: [...SERVICES.map((Service) => Service.Title.en), ...TECH_EXPERTISE],
    sameAs: [CONTACT.Facebook, CONTACT.LinkedIn],
    founder: TEAM.map((Member) => ({ "@type": "Person", name: Member.Name.en, jobTitle: Member.Role.en })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT.Email,
      telephone: `+${CONTACT.Phone}`,
      availableLanguage: ["Arabic", "English"],
    },
  };
}

export function WebSiteSchema(Language: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: Language,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function BreadcrumbSchema(Items: TCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: Items.map((Item, Index) => ({
      "@type": "ListItem",
      position: Index + 1,
      name: Item.Name,
      item: Absolute(Item.Path),
    })),
  };
}

export function ServicesSchema(Language: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((Service, Index) => ({
      "@type": "ListItem",
      position: Index + 1,
      item: {
        "@type": "Service",
        name: Service.Title[Language],
        description: Service.Description[Language],
        serviceType: Service.Title.en,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: "Worldwide",
        url: Absolute(PathFor(Language, `/services#${Service.Id}`)),
      },
    })),
  };
}

export function FaqSchema(Faqs: TFaq[], Language: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Faqs.map((Faq) => ({
      "@type": "Question",
      name: Faq.Question[Language],
      acceptedAnswer: { "@type": "Answer", text: AnswerText(Faq.Answer[Language]) },
    })),
  };
}

export function ArticleSchema(Meta: TArticleMeta, Image: string) {
  const Url = Absolute(PathFor(Meta.lang, `/blog/${Meta.slug}`));
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: Meta.title,
    description: Meta.excerpt,
    datePublished: Meta.publishedAt,
    dateModified: Meta.publishedAt,
    inLanguage: Meta.lang,
    articleSection: Meta.category,
    image: Absolute(Image),
    author: { "@type": "Organization", name: Meta.author, url: SITE_URL },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: Url,
    url: Url,
  };
}

export function ProjectSchema(Project: TProject, Language: Lang, Images: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: Project.Title,
    genre: Project.Category[Language],
    description: Project.Description[Language],
    inLanguage: Language,
    url: Absolute(PathFor(Language, `/portfolio/${Project.Slug}`)),
    image: Images.map(Absolute),
    creator: { "@id": ORGANIZATION_ID },
    keywords: Project.Tech.join(", "),
    ...(Project.Links[0] ? { sameAs: Project.Links[0].url } : {}),
  };
}

export function ProductSchema(Product: TProduct, Language: Lang, Images: string[]) {
  const LiveUrl = Product.Links?.find((Link) => Link.key === "website")?.url;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: Product.Name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: Product.Description[Language],
    url: Absolute(PathFor(Language, `/products/${Product.Slug}`)),
    image: Images.map(Absolute),
    author: { "@id": ORGANIZATION_ID },
    ...(LiveUrl ? { installUrl: LiveUrl } : {}),
  };
}

export function TeamSchema(Language: Lang) {
  return TEAM.map((Member) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: Member.Name[Language],
    jobTitle: Member.Role[Language],
    description: Member.Bio?.[Language],
    worksFor: { "@id": ORGANIZATION_ID },
    sameAs: (Member.Links ?? []).filter((Link) => Link.url.startsWith("http")).map((Link) => Link.url),
  }));
}
