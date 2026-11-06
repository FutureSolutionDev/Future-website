import type { TBilingual } from "@/Lib/Seo";
import type { TLinkItem, TScreenCaptions } from "@/Data/Links";

export type TProject = {
  Slug: string;
  Title: string;
  ImagesFolder: string;
  Category: TBilingual;
  Summary: TBilingual;
  Description: TBilingual;
  Result?: TBilingual;
  Metrics?: { Value: string; Label: TBilingual }[];
  Features: TBilingual[];
  Tech: string[];
  Links: TLinkItem[];
  Captions?: TScreenCaptions;
};

export const PROJECTS: TProject[] = [
  {
    Slug: "master-v",
    Title: "Master V",
    ImagesFolder: "/Projects/master-v",
    Category: { en: "Real Estate Intelligence Platform", ar: "منصة بيانات عقارية ذكية" },
    Summary: {
      en: "A daily-updated real estate database for brokers in Egypt's new cities.",
      ar: "قاعدة بيانات عقارية محدّثة يوميًا للوسطاء في المدن الجديدة بمصر.",
    },
    Description: {
      en: "A real estate data platform for brokers in Egypt's new cities. It gives agents a daily-updated database of compounds, units, prices and full payment plans, with one-tap WhatsApp sending, an investment ROI calculator and commission tracking with tax breakdowns. Mobile apps are on their way to the stores.",
      ar: "منصة بيانات عقارية للوسطاء في المدن الجديدة بمصر. تمنح الوسيط قاعدة بيانات محدّثة يوميًا للكمبوندات والوحدات والأسعار وخطط السداد الكاملة، مع إرسال عبر واتساب بضغطة واحدة، وحاسبة للعائد الاستثماري، وتتبع للعمولات مع احتساب الضرائب. وتطبيقات الجوال في طريقها إلى المتاجر.",
    },
    Result: {
      en: "10K+ brokers active on the platform across 1K+ compounds and 15K+ live-priced units, with data refreshed every day.",
      ar: "أكثر من 10 آلاف وسيط نشط على المنصة عبر أكثر من ألف كمبوند و15 ألف وحدة بأسعار محدّثة، مع تحديث يومي للبيانات.",
    },
    Metrics: [
      { Value: "10K+", Label: { en: "Active brokers", ar: "وسيط عقاري نشط" } },
      { Value: "1K+", Label: { en: "Compounds in the database", ar: "كمبوند في قاعدة البيانات" } },
      { Value: "15K+", Label: { en: "Units with live prices", ar: "وحدة بأسعار محدّثة يوميًا" } },
    ],
    Features: [
      {
        en: "Daily-updated database of compounds, phases, units and prices",
        ar: "قاعدة بيانات محدّثة يوميًا للكمبوندات والمراحل والوحدات والأسعار",
      },
      {
        en: "Complete payment plans: down payment, installments, delivery and fees",
        ar: "خطط سداد كاملة: المقدم والأقساط والاستلام والمصاريف",
      },
      {
        en: "Send brochures, prices and plans to clients on WhatsApp in one tap",
        ar: "إرسال البروشورات والأسعار والخطط للعملاء عبر واتساب بضغطة واحدة",
      },
      {
        en: "Investment ROI calculator: CAP rate, IRR, NPV and payback period",
        ar: "حاسبة استثمارية للوحدات التجارية: العائد وIRR وفترة الاسترداد",
      },
      {
        en: "Commission tracker from claim to collection, with taxes calculated automatically",
        ar: "تتبع العمولات من المطالبة حتى التحصيل مع احتساب الضرائب تلقائيًا",
      },
      {
        en: "Team accounts: sub-users scoped by city and section",
        ar: "حسابات للفريق: مستخدمون فرعيون بصلاحيات حسب المدينة والقسم",
      },
    ],
    Tech: ["React", "Node.js", "Express", "Socket.IO", "MariaDB", "Flutter", "Next.js"],
    Links: [{ key: "website", url: "https://masterv.net" }],
    Captions: {
      "01-platform-data.webp": { en: "Compounds, units and live prices", ar: "الكمبوندات والوحدات والأسعار المحدّثة" },
      "03-paymentplan.webp": { en: "Full payment plan for every unit", ar: "خطة السداد الكاملة لكل وحدة" },
      "04-ROI-Calc.webp": { en: "Investment ROI calculator", ar: "حاسبة العائد الاستثماري" },
      "05-whatsapp-connection.webp": { en: "One-tap sending on WhatsApp", ar: "الإرسال عبر واتساب بضغطة واحدة" },
    },
  },
  {
    Slug: "adham-fathallah",
    Title: "Adham Fathallah",
    ImagesFolder: "/Projects/adham-fathallah",
    Category: { en: "Consumer Real Estate Platform", ar: "منصة عقارية للمشترين" },
    Summary: {
      en: "The Master V engine relaunched for home buyers under a leading property brand.",
      ar: "محرك Master V بعد إطلاقه للمشترين تحت علامة عقارية رائدة.",
    },
    Description: {
      en: "The consumer-facing edition of the Master V engine, launched under the brand of a leading Egyptian property marketer. Home buyers browse compounds and projects with up-to-date prices and payment plans, compare options and reach a consultant directly. It proves the same platform can ship white-labeled under any partner's brand.",
      ar: "النسخة الموجهة للمستهلك من محرك Master V، أُطلقت بهوية أحد أبرز المسوقين العقاريين في مصر. يتصفح المشتري الكمبوندات والمشاريع بأسعار وخطط سداد محدّثة، ويقارن بنفسه، ويصل إلى مستشار مباشرة. وهي دليل على أن المنصة نفسها يمكن إطلاقها بهوية أي شريك (White-label).",
    },
    Result: {
      en: "20K+ buyers browsing 1K+ compounds, on the same engine relaunched white-labeled for a top property brand.",
      ar: "أكثر من 20 ألف عميل يتصفحون أكثر من ألف كمبوند، على المحرك نفسه بعد إطلاقه بهوية علامة عقارية رائدة.",
    },
    Metrics: [
      { Value: "20K+", Label: { en: "Buyers browsing", ar: "عميل يتصفحون المنصة" } },
      { Value: "1K+", Label: { en: "Compounds listed", ar: "كمبوند معروض" } },
    ],
    Features: [
      { en: "Browse compounds and projects with daily-updated prices", ar: "تصفح الكمبوندات والمشاريع بأسعار محدّثة يوميًا" },
      {
        en: "Clear payment plans: down payment, installments and delivery dates",
        ar: "خطط سداد واضحة: المقدم والأقساط ومواعيد الاستلام",
      },
      { en: "Ask and consult an expert directly from the platform", ar: "اسأل خبيرًا واستشره مباشرة من داخل المنصة" },
      { en: "Compare projects side by side before deciding", ar: "قارن المشاريع ببعضها قبل أن تقرر" },
      { en: "Arabic-first experience built for the Egyptian buyer", ar: "تجربة عربية أولًا مصممة للمشتري المصري" },
      {
        en: "Powered by the Master V engine, white-label ready for any partner",
        ar: "مبنية على محرك Master V وجاهزة للإطلاق بهوية أي شريك",
      },
    ],
    Tech: ["React", "Node.js", "Express", "MariaDB", "Flutter", "Next.js"],
    Links: [{ key: "website", url: "https://adhamfathallah.com" }],
    Captions: {
      "01-home.webp": { en: "Home page with live developer prices", ar: "الصفحة الرئيسية وأسعار المطورين المحدّثة" },
      "02-projects.webp": { en: "Projects directory by city and type", ar: "دليل المشروعات حسب المدينة والنوع" },
      "03-about.webp": { en: "About the brand", ar: "التعريف بالعلامة" },
      "04-contact.webp": { en: "Every way to reach the team", ar: "كل طرق التواصل مع الفريق" },
      "05-faq.webp": { en: "Frequently asked questions", ar: "الأسئلة الشائعة" },
    },
  },
  {
    Slug: "imtithal",
    Title: "Imtithal",
    ImagesFolder: "/Projects/Imtithal",
    Category: { en: "E-Commerce Platform", ar: "منصة تجارة إلكترونية" },
    Summary: {
      en: "A bilingual store selling ready-to-use ISO compliance documentation.",
      ar: "متجر ثنائي اللغة لبيع حزم وثائق امتثال ISO الجاهزة.",
    },
    Description: {
      en: "A complete bilingual digital-products store selling ready-to-use ISO compliance documentation packs. Customers browse by ISO standard, preview documents right in the browser, pay and download instantly, while the owner runs the entire business from one dashboard.",
      ar: "متجر رقمي متكامل ثنائي اللغة لبيع حزم وثائق امتثال ISO الجاهزة. يتصفح العميل حسب المعيار، ويعاين المستندات داخل المتصفح، ويدفع ويحمّل فورًا، بينما يدير صاحب المتجر أعماله بالكامل من لوحة تحكم واحدة.",
    },
    Result: {
      en: "500+ digital files sold and 50+ B2B teams served, with the store, admin panel and marketing automation shipped as one platform.",
      ar: "أكثر من 500 ملف رقمي مُباع وأكثر من 50 فريق أعمال، مع متجر ولوحة تحكم وأتمتة تسويق في منصة واحدة.",
    },
    Metrics: [
      { Value: "500+", Label: { en: "Digital files sold", ar: "ملف رقمي مُباع" } },
      { Value: "50+", Label: { en: "B2B teams served", ar: "فريق أعمال" } },
    ],
    Features: [
      {
        en: "Secure payments: Stripe cards and bank transfer with proof review",
        ar: "دفع آمن: بطاقات عبر Stripe وتحويل بنكي بمراجعة إثبات الدفع",
      },
      {
        en: "Instant delivery: time-limited secure download links and automatic PDF invoices",
        ar: "تسليم فوري: روابط تحميل آمنة مؤقتة وفواتير PDF تلقائية",
      },
      {
        en: "In-browser document preview and free samples before purchase",
        ar: "معاينة المستندات داخل المتصفح وعينات مجانية قبل الشراء",
      },
      {
        en: "Smart cart that suggests upgrading to the full bundle when it saves money",
        ar: "سلة ذكية تقترح الترقية إلى الباقة الكاملة عندما توفّر على العميل",
      },
      {
        en: "Email campaigns with a drag-and-drop builder and automatic abandoned-cart recovery",
        ar: "حملات بريدية بمحرر سحب وإفلات واسترجاع تلقائي للسلات المتروكة",
      },
      {
        en: "Built-in live chat and support inbox for guests too, with no third-party widget",
        ar: "محادثة مباشرة وصندوق دعم مدمجان حتى للزوار، دون أدوات خارجية",
      },
      {
        en: "Admin dashboard: daily sales analytics, review moderation, coupons and granular team permissions",
        ar: "لوحة تحكم شاملة: تحليلات مبيعات يومية وإدارة التقييمات والكوبونات وصلاحيات دقيقة لفريق العمل",
      },
      {
        en: "Full Arabic and English storefront and admin with RTL and admin-managed SEO",
        ar: "واجهة ولوحة تحكم بالعربية والإنجليزية بالكامل مع دعم RTL وتحسين محركات البحث من اللوحة",
      },
    ],
    Tech: ["Next.js", "React", "TypeScript", "GraphQL", "Hono", "PostgreSQL", "Redis", "Stripe"],
    Links: [{ key: "website", url: "https://imtithal.store" }],
    Captions: {
      "01-home.webp": { en: "Home page", ar: "الصفحة الرئيسية" },
      "02-products.webp": { en: "Product catalog filtered by ISO standard", ar: "كتالوج المنتجات حسب معيار ISO" },
      "03-arabic-home.webp": { en: "Arabic home page, fully right to left", ar: "الواجهة العربية كاملة من اليمين إلى اليسار" },
      "04-product-page.webp": { en: "Product page with document preview", ar: "صفحة المنتج مع معاينة المستند" },
      "05-how-it-works.webp": { en: "How the store works", ar: "كيف يعمل المتجر" },
      "06-arabic-products.webp": { en: "Arabic product catalog", ar: "كتالوج المنتجات بالعربية" },
      "07-faq.webp": { en: "Frequently asked questions", ar: "الأسئلة الشائعة" },
    },
  },
];

export function GetProjectBySlug(Slug: string): TProject | undefined {
  return PROJECTS.find((Project) => Project.Slug === Slug);
}
