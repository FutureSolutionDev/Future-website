// Team members shown in the About page Team section.
// Photos: put a WebP/PNG/JPG in public/Team/ named after `photoSlug`
// (e.g. public/Team/sabry.webp). If the file is missing, the UI falls back to
// an initial-letter avatar — so the section works with or without photos.
import type { Lang } from "@/lib/seo";
import type { TLinkItem } from "@/data/links";

export type TTeamMember = {
  name: Record<Lang, string>;
  role: Record<Lang, string>;
  /** Short one-to-two line bio */
  bio?: Record<Lang, string>;
  /** Base filename (no extension) under public/Team/ — resolved at build time */
  photoSlug: string;
  /** Social/contact links — same dynamic {key,url,label?} system as everywhere */
  links?: TLinkItem[];
};

export const Team: TTeamMember[] = [
  {
    name: { en: "Ragab Taha", ar: "رجب طه" },
    role: { en: "Co-Founder & CEO", ar: "شريك مؤسس والمدير العام" },
    bio: {
      en: "Leads the company and its engineering. A desktop application developer, advanced data analyst, and architect of high-performance systems — who drives every project to delivery with Agile practices.",
      ar: "يقود الشركة وهندستها التقنية. مطوّر تطبيقات سطح مكتب، ومحلل بيانات متقدم، ومصمم أنظمة عالية الأداء — ويقود كل مشروع حتى التسليم بمنهجيات Agile.",
    },
    photoSlug: "ragab",
    links: [
      { key: "whatsapp", url: "https://wa.me/201148371185" },
      { key: "phone", url: "tel:201015471713" },
    ],
  },
  {
    name: { en: "Sabry Dawood", ar: "صبري داود" },
    role: { en: "Co-Founder & Lead software engineer", ar: "شريك مؤسس ومهندس برمجيات رئيسي" },
    bio: {
      en: "Lead software engineer and backend architect with ~6 years building multi-tenant SaaS, AI-powered platforms, and developer tooling — across TypeScript, Node.js/Bun, Go , Php And .Net, with open-source projects to his name.",
      ar: "مهندس برمجيات رئيسي ومهندس backend بخبرة نحو 6 سنوات في بناء أنظمة SaaS متعددة المستأجرين ومنصات مدعومة بالذكاء الاصطناعي وأدوات للمطورين — عبر TypeScript , Node.js/Bun , Go , Php , .Net ، وله مشاريع مفتوحة المصدر.",
    },
    photoSlug: "sabry",
    links: [
      { key: "linkedin", url: "https://www.linkedin.com/in/sabrydawood" },
      { key: "reddit", url: "https://www.reddit.com/u/Virgel1995" },
      { key: "github", url: "https://github.com/sabrydawood" },
      { key: "whatsapp", url: "https://wa.me/201069017890" },
    ],
  },
  // Add more members here — each photo goes in public/Team/<photoSlug>.webp
];
