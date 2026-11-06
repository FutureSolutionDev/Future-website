import type { TBilingual } from "@/Lib/Seo";
import type { TLinkItem } from "@/Data/Links";

export type TTeamMember = {
  Name: TBilingual;
  Role: TBilingual;
  Bio?: TBilingual;
  PhotoSlug: string;
  Links?: TLinkItem[];
};

export const TEAM: TTeamMember[] = [
  {
    Name: { en: "Ragab Taha", ar: "رجب طه" },
    Role: { en: "Co-Founder & CEO", ar: "شريك مؤسس والمدير العام" },
    Bio: {
      en: "Leads the company and its engineering. A desktop application developer, advanced data analyst and architect of high-performance systems, who drives every project to delivery with Agile practices.",
      ar: "يقود الشركة وهندستها التقنية. مطوّر تطبيقات سطح مكتب، ومحلل بيانات متقدم، ومصمم أنظمة عالية الأداء، ويقود كل مشروع حتى التسليم بمنهجيات Agile.",
    },
    PhotoSlug: "ragab",
    Links: [
      { key: "whatsapp", url: "https://wa.me/201148371185" },
      { key: "phone", url: "tel:201015471713" },
    ],
  },
  {
    Name: { en: "Sabry Dawood", ar: "صبري داود" },
    Role: { en: "Co-Founder & Lead Software Engineer", ar: "شريك مؤسس ومهندس برمجيات رئيسي" },
    Bio: {
      en: "Lead software engineer and backend architect with about 6 years building multi-tenant SaaS, AI-powered platforms and developer tooling across TypeScript, Node.js/Bun, Go, PHP and .NET, with open-source projects to his name.",
      ar: "مهندس برمجيات رئيسي ومعماري للأنظمة الخلفية بخبرة نحو 6 سنوات في بناء أنظمة SaaS متعددة المستأجرين ومنصات مدعومة بالذكاء الاصطناعي وأدوات للمطورين، باستخدام TypeScript وNode.js/Bun وGo وPHP و.NET، وله مشاريع مفتوحة المصدر.",
    },
    PhotoSlug: "sabry",
    Links: [
      { key: "linkedin", url: "https://www.linkedin.com/in/sabrydawood" },
      { key: "reddit", url: "https://www.reddit.com/u/Virgel1995" },
      { key: "github", url: "https://github.com/sabrydawood" },
      { key: "whatsapp", url: "https://wa.me/201069017890" },
    ],
  },
];
