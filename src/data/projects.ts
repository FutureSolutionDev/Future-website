// Portfolio projects — marketing-first: client-facing features and outcomes
// lead the card; the tech stack is a secondary detail.
// Images live under public/Projects/ (WebP, compressed — nothing over ~300KB).
import type { Lang } from "@/lib/seo";

export type TProject = {
  title: string;
  /**
   * Gallery folder under public/, e.g. '/Projects/Imtithal'.
   * Drop WebP/PNG screenshots in it (named 01-x.webp, 02-y.webp for order) and
   * they appear in the gallery automatically — in production WITHOUT a rebuild
   * (nginx serves the folder listing as JSON; see deploy/nginx.conf).
   */
  imagesFolder: string;
  category: Record<Lang, string>;
  description: Record<Lang, string>;
  /** One concrete, measurable outcome — results sell better than tech lists */
  result?: Record<Lang, string>;
  /** Client-facing capabilities, shown prominently on the card */
  features: { en: string; ar: string }[];
  /** Secondary detail — rendered small and muted */
  tech: string[];
  /** Tailwind gradient classes for the card accent */
  color: string;
  links: { Github?: string; Live?: string };
};

export const Projects: TProject[] = [
  {
    title: "Imtithal — امتثال",
    imagesFolder: "/Projects/Imtithal",
    category: {
      en: "E-Commerce Platform",
      ar: "منصة تجارة إلكترونية",
    },
    description: {
      en: "A complete bilingual digital-products store selling ready-to-use ISO compliance documentation packs. Customers browse by ISO standard, preview documents right in the browser, pay, and download instantly — while the owner runs the entire business from one dashboard.",
      ar: "متجر رقمي متكامل ثنائي اللغة لبيع حزم وثائق امتثال ISO الجاهزة. العميل يتصفح حسب المعيار، يعاين المستندات داخل المتصفح، يدفع ويحمّل فوراً — وصاحب المتجر يدير أعماله بالكامل من لوحة تحكم واحدة.",
    },
    result: {
      en: "500+ digital files sold and 50+ B2B teams served — store, admin panel, and marketing automation shipped as one platform.",
      ar: "أكثر من 500 ملف رقمي مُباع وأكثر من 50 فريق أعمال — متجر ولوحة تحكم وأتمتة تسويق في منصة واحدة.",
    },
    features: [
      {
        en: "Secure payments: Stripe cards + bank transfer with proof review",
        ar: "دفع آمن: بطاقات عبر Stripe + تحويل بنكي بمراجعة إثبات الدفع",
      },
      {
        en: "Instant delivery: time-limited secure download links + automatic PDF invoices",
        ar: "تسليم فوري: روابط تحميل آمنة مؤقتة + فواتير PDF تلقائية",
      },
      {
        en: "In-browser document preview and free samples before purchase",
        ar: "معاينة المستندات داخل المتصفح وعينات مجانية قبل الشراء",
      },
      {
        en: "Smart cart that suggests upgrading to the full bundle when it saves money",
        ar: "سلة ذكية تقترح الترقية للباقة الكاملة عندما توفّر على العميل",
      },
      {
        en: "Email marketing campaigns with a drag-and-drop builder + automatic abandoned-cart recovery",
        ar: "حملات بريدية بمحرر سحب-وإفلات + استرجاع تلقائي للسلات المتروكة",
      },
      {
        en: "Built-in live chat and support inbox — guests included, no third-party widget",
        ar: "شات مباشر وصندوق دعم مدمجان — حتى للزوار، بدون أدوات خارجية",
      },
      {
        en: "Admin dashboard: daily sales analytics, reviews moderation, coupons, and granular team permissions",
        ar: "لوحة تحكم شاملة: تحليلات مبيعات يومية، إدارة التقييمات، كوبونات، وصلاحيات دقيقة لفريق العمل",
      },
      {
        en: "Full Arabic/English storefront and admin with RTL + admin-managed SEO",
        ar: "واجهة ولوحة تحكم بالعربية والإنجليزية بالكامل مع RTL وSEO مُدار من اللوحة",
      },
    ],
    tech: ["Next.js", "React", "TypeScript", "GraphQL", "Hono", "PostgreSQL", "Redis", "Stripe"],
    color: "from-blue-500 to-indigo-600",
    links: { Live: "https://imtithal.store" },
  },
];
