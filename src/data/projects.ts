// Portfolio projects — marketing-first: client-facing features and outcomes
// lead the card; the tech stack is a secondary detail.
// Images live under public/Projects/ (WebP, compressed — nothing over ~300KB).
import type { Lang } from "@/lib/seo";
import type { TLinkItem } from "@/data/links";

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
  /** Any number of channels: {key, url, label?} — key resolves to icon+label (see data/links.ts) */
  links: TLinkItem[];
};

export const Projects: TProject[] = [
  {
    title: "Master V",
    imagesFolder: "/Projects/master-v",
    category: {
      en: "Real Estate Intelligence Platform",
      ar: "منصة بيانات عقارية ذكية",
    },
    description: {
      en: "A real estate data platform for brokers in Egypt's new cities. It gives agents a daily-updated database of compounds, units, prices, and full payment plans — with one-tap WhatsApp sending, an investment ROI calculator, and commission tracking with tax breakdowns. Mobile apps are on the way to the stores.",
      ar: "منصة بيانات عقارية للبروكرز في المدن الجديدة بمصر. بتدي الوكيل قاعدة بيانات محدثة يومياً للكمبوندات والوحدات والأسعار وخطط السداد الكاملة — مع إرسال واتساب بضغطة، حاسبة عائد استثماري، وتتبع عمولات بحساب الضرائب. وتطبيقات الموبايل في الطريق للمتاجر.",
    },
    result: {
      en: "10,000+ brokers active on the platform across 1,000+ compounds and 15,000+ live-priced units — data refreshed every day.",
      ar: "أكثر من 10,000 بروكر نشط على المنصة عبر أكثر من 1,000 كمبوند و15,000 وحدة بأسعار حية — بتحديث يومي للبيانات.",
    },
    features: [
      {
        en: "Daily-updated database of compounds, phases, units, and prices",
        ar: "قاعدة بيانات محدثة يومياً للكمبوندات والمراحل والوحدات والأسعار",
      },
      {
        en: "Complete payment plans: down payment, installments, delivery, fees",
        ar: "خطط سداد كاملة: المقدم والأقساط والاستلام والمصاريف",
      },
      {
        en: "Send brochures, prices, and plans to clients on WhatsApp in one tap",
        ar: "إرسال البروشورات والأسعار والخطط لعملائك على واتساب بضغطة واحدة",
      },
      {
        en: "Investment ROI calculator: CAP rate, IRR, NPV, and payback period",
        ar: "حاسبة استثمارية للوحدات التجارية: العائد والـ IRR وفترة الاسترداد",
      },
      {
        en: "Commission tracker from claim to collection — taxes auto-calculated",
        ar: "تتبع العمولات من المطالبة للتحصيل — بحساب الضرائب تلقائياً",
      },
      {
        en: "Team accounts: sub-users scoped by city and section",
        ar: "حسابات فريق: مستخدمون فرعيون بصلاحيات حسب المدينة والقسم",
      },
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "Socket.IO",
      "MariaDB",
      "Flutter",
      "Next.js",
    ],
    color: "from-sky-500 to-cyan-600",
    links: [{ key: "website", url: "https://masterv.net" }],
  },
  {
    title: "Adham Fathallah",
    imagesFolder: "/Projects/adham-fathallah",
    category: {
      en: "Consumer Real Estate Platform",
      ar: "منصة عقارية للمشترين",
    },
    description: {
      en: "The consumer-facing edition of the Master V engine, launched under the brand of a leading Egyptian property marketer. Home buyers browse compounds and projects with up-to-date prices and payment plans, compare options, and reach a consultant directly — proof the same platform can ship white-labeled under any partner's brand.",
      ar: "النسخة الموجهة للمستهلك من محرك Master V، مُطلقة بهوية واحد من أبرز المسوقين العقاريين في مصر. المشتري يتصفح الكمبوندات والمشاريع بأسعار وخطط سداد محدثة، يقارن بنفسه، ويوصل لمستشار مباشرة — ودليل إن نفس المنصة تتطلق White-label بهوية أي شريك.",
    },
    result: {
      en: "20,000+ buyers browsing 1,000+ compounds — the same engine relaunched white-labeled for a top property brand.",
      ar: "أكثر من 20,000 عميل يتصفحون أكثر من 1,000 كمبوند — نفس المحرك مُعاد إطلاقه White-label لعلامة عقارية رائدة.",
    },
    features: [
      {
        en: "Browse compounds and projects with daily-updated prices",
        ar: "تصفح الكمبوندات والمشاريع بأسعار محدثة يومياً",
      },
      {
        en: "Clear payment plans: down payment, installments, delivery dates",
        ar: "خطط سداد واضحة: المقدم والأقساط ومواعيد الاستلام",
      },
      {
        en: "Ask and consult an expert directly from the platform",
        ar: "اسأل واستشير خبير مباشرة من داخل المنصة",
      },
      {
        en: "Compare projects side by side before deciding",
        ar: "قارن المشاريع ببعضها قبل ما تقرر",
      },
      {
        en: "Arabic-first experience built for the Egyptian buyer",
        ar: "تجربة عربية أولاً مبنية للمشتري المصري",
      },
      {
        en: "Powered by the Master V engine — white-label ready for any partner",
        ar: "مبنية على محرك Master V — جاهزة للإطلاق بهوية أي شريك",
      },
    ],
    tech: ["React", "Node.js", "Express", "MariaDB", "Flutter", "Next.js"],
    color: "from-amber-500 to-orange-600",
    links: [{ key: "website", url: "https://adhamfathallah.com" }],
  },
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
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "GraphQL",
      "Hono",
      "PostgreSQL",
      "Redis",
      "Stripe",
    ],
    color: "from-blue-500 to-indigo-600",
    links: [{ key: "website", url: "https://imtithal.store" }],
  },
];
