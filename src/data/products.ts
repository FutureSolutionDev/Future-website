// Company products showcased at /products — both live systems and upcoming launches.
// Marketing-first: client-facing value leads, tech stays muted.
// Coming-soon products collect waitlist emails + investor interest.
// Screenshots: drop WebP files in public/Products/<slug>/ (same dynamic-folder
// system as the portfolio — new images appear without a rebuild).
import type { Lang } from "@/lib/seo";
import type { TLinkItem } from "@/data/links";

export type TProductStatus = "live" | "coming-soon";

export type TProduct = {
  slug: string;
  name: string;
  status: TProductStatus;
  /** Descriptive stage shown on coming-soon cards (no hard dates by decision) */
  stage?: Record<Lang, string>;
  category: Record<Lang, string>;
  tagline: Record<Lang, string>;
  description: Record<Lang, string>;
  audience: Record<Lang, string>;
  features: { en: string; ar: string }[];
  /** Honest, owner-confirmed numbers only */
  stats?: { value: string; label: Record<Lang, string> }[];
  imagesFolder?: string;
  /** Any number of channels: {key, url, label?} — key resolves to icon+label (see data/links.ts) */
  links?: TLinkItem[];
  /** Mobile apps exist but not on stores yet */
  appsComingSoon?: boolean;
  /** Show the investor-interest CTA */
  investorCta?: boolean;
  /** Live products without a public signup — demo on request via WhatsApp */
  demoOnRequest?: boolean;
};

export const Products: TProduct[] = [
  // ── LIVE ────────────────────────────────────────────────────────────────
  {
    slug: "nova-crm",
    name: "Nova CRM",
    status: "live",
    category: {
      en: "White-Label Enterprise CRM",
      ar: "منصة CRM مؤسسية White-Label",
    },
    tagline: {
      en: "The full revenue cycle — from first call to renewal — in one branded system.",
      ar: "دورة الإيرادات كاملة — من أول مكالمة للتجديد — في نظام واحد بهويتك.",
    },
    description: {
      en: "Nova is a multi-tenant CRM platform serving service businesses in Egypt and Saudi Arabia. It runs the complete revenue pipeline — telesales, sales, contracts, accounts, and technical delivery — with role-isolated reports for every department. Each end-customer gets a branded self-service portal with live financial reports, documents, and real-time support chat.",
      ar: "Nova منصة CRM متعددة المستأجرين بتخدم شركات خدمات في مصر والسعودية. بتدير خط الإيرادات الكامل — تيلي سيلز، مبيعات، عقود، حسابات، وتسليم تقني — بتقارير معزولة لكل قسم حسب الدور. وكل عميل نهائي له بوابة ذاتية بهوية الشركة فيها تقارير مالية حية ومستندات وشات دعم لحظي.",
    },
    audience: {
      en: "B2B service companies running recurring contracts — agencies, accounting-software vendors, managed services.",
      ar: "شركات الخدمات B2B اللي بتدير عقود دورية — وكالات، شركات برمجيات محاسبية، خدمات مُدارة.",
    },
    features: [
      {
        en: "Full pipeline: telesales → sales → contracts → accounts → delivery",
        ar: "خط كامل: تيلي سيلز ← مبيعات ← عقود ← حسابات ← تسليم",
      },
      {
        en: "Branded customer portal: subscriptions, documents, and live chat",
        ar: "بوابة عملاء بهوية شركتك: الاشتراكات والمستندات وشات مباشر",
      },
      {
        en: "Live financial reports inside the portal (accounting integration)",
        ar: "تقارير مالية حية داخل البوابة (تكامل مع نظام المحاسبة)",
      },
      {
        en: "Role-isolated analytics: each department sees its own numbers",
        ar: "تحليلات معزولة بالدور: كل قسم يشوف أرقامه هو",
      },
      {
        en: "Real-time internal team chat with file sharing and read receipts",
        ar: "شات داخلي لحظي للفريق بمشاركة ملفات وإيصالات قراءة",
      },
      {
        en: "Multi-branch, multi-tenant: one platform, many brands",
        ar: "متعدد الفروع والمستأجرين: منصة واحدة بهويات متعددة",
      },
      {
        en: "Local payments: Paymob, bank transfer, and card gateways",
        ar: "مدفوعات محلية: Paymob وتحويل بنكي وبوابات بطاقات",
      },
    ],
    stats: [
      { value: "2", label: { en: "Markets served: Egypt & KSA", ar: "سوقان: مصر والسعودية" } },
      { value: "5", label: { en: "Departments in one pipeline", ar: "أقسام في خط واحد" } },
      { value: "271", label: { en: "Automated endpoint tests passing", ar: "اختبار آلي ناجح للنظام" } },
    ],
    imagesFolder: "/Products/nova-crm",
    demoOnRequest: true,
  },

  // ── COMING SOON ─────────────────────────────────────────────────────────
  {
    slug: "est8core",
    name: "Est8Core",
    status: "coming-soon",
    stage: {
      en: "In final development — preparing for early access",
      ar: "في مرحلة التطوير النهائية — تجهيز للوصول المبكر",
    },
    category: {
      en: "Real Estate Brokerage CRM",
      ar: "CRM لشركات الوساطة العقارية",
    },
    tagline: {
      en: "From lead to closed deal — commissions, installments, and approvals included.",
      ar: "من اللييد لإقفال الصفقة — بالعمولات والأقساط والموافقات.",
    },
    description: {
      en: "Est8Core is a CRM built specifically for real estate brokerages and individual brokers. Leads are captured and assigned automatically, properties are managed as branch inventory with public listing pages, and deals close through a real workflow: commission splits between agency and agent, installment schedules, and manager approvals above your thresholds — all multi-tenant with full team hierarchy.",
      ar: "Est8Core نظام CRM مبني خصيصاً لشركات الوساطة العقارية والبروكرز الأفراد. اللييدز بتتسجل وتتوزع تلقائياً، والعقارات بتتدار كمخزون بفروعك مع صفحات نشر عامة، والصفقات بتقفل بـ workflow حقيقي: تقسيم عمولات بين الشركة والوكيل، جداول أقساط، وموافقات المدير فوق الحدود اللي بتحددها — وكل ده multi-tenant بهيكل فرق كامل.",
    },
    audience: {
      en: "Real estate brokerage companies (branches, teams, roles) and individual brokers.",
      ar: "شركات الوساطة العقارية (فروع وفرق وأدوار) والبروكرز الأفراد.",
    },
    features: [
      {
        en: "Lead capture with automatic assignment and follow-up tracking",
        ar: "تسجيل اللييدز بتوزيع تلقائي وتتبع متابعات",
      },
      {
        en: "Deal workflow: commission split, co-broke, agent share — auto-calculated on close",
        ar: "صفقات بعمولة مقسمة (شركة/وكيل/co-broke) بتتحسب تلقائياً عند الإقفال",
      },
      {
        en: "Installment schedules per deal with paid-tracking and alerts",
        ar: "جداول أقساط لكل صفقة بتتبع السداد والتنبيهات",
      },
      {
        en: "Manager approval gates for deals above your thresholds",
        ar: "موافقات إدارية إلزامية للصفقات فوق الحد اللي تحدده",
      },
      {
        en: "Property inventory per branch + public listing pages with clean URLs",
        ar: "مخزون عقارات لكل فرع + صفحات نشر عامة بروابط نظيفة",
      },
      {
        en: "Full hierarchy: branches, teams, granular role permissions",
        ar: "هيكل كامل: فروع وفرق وصلاحيات أدوار دقيقة",
      },
      {
        en: "Real-time notifications the moment a lead or deal moves",
        ar: "إشعارات لحظية أول ما لييد أو صفقة تتحرك",
      },
    ],
    imagesFolder: "/Products/est8core",
    links: [
      {
        key: "website",
        url: "https://est8core.com",
        label: {
          en: "Website",
          ar: "موقع الويب",
        },
      }
    ],
    demoOnRequest: false,
    investorCta: false,
  },
  {
    slug: "smartestprop",
    name: "SmartestProp",
    status: "coming-soon",
    stage: {
      en: "Private beta running — early access open",
      ar: "نسخة تجريبية خاصة تعمل — التسجيل المبكر مفتوح",
    },
    category: {
      en: "AI Assistant for Real Estate",
      ar: "مساعد ذكاء اصطناعي للعقارات",
    },
    tagline: {
      en: "Your branded AI agent answers every property inquiry — and hands you a qualified lead.",
      ar: "مساعد AI بهويتك يرد على كل استفسار عقاري — ويسلّمك Lead مؤهل وجاهز.",
    },
    description: {
      en: "SmartestProp gives real estate companies a white-label AI assistant on their website, WhatsApp, and Telegram. It understands property requests in any language ('3 bedrooms in New Cairo under 5M'), searches live inventory, replies with curated recommendations and payment plans, and captures the lead — scored and ready for your sales team. Train it on your own projects, brand it as your own, and never miss an inquiry again.",
      ar: "SmartestProp بيدي شركات العقارات مساعد ذكاء اصطناعي بهويتها على موقعها وواتساب وتيليجرام. بيفهم طلب العميل بأي لغة («3 غرف في القاهرة الجديدة تحت 5 مليون»)، يدوّر في المخزون الحي، يرد بترشيحات منسقة بخطط السداد، ويسجل الـ Lead مُقيّماً وجاهزاً لفريق مبيعاتك. درّبه على مشاريعك، وخليه بهويتك، وعمرك ما تفوّت استفسار تاني.",
    },
    audience: {
      en: "Brokerages, developers, and property portals in Egypt and the Gulf.",
      ar: "شركات الوساطة والمطورين والبوابات العقارية في مصر والخليج.",
    },
    features: [
      {
        en: "One AI assistant on three channels: website widget, WhatsApp, Telegram",
        ar: "مساعد واحد على ثلاث قنوات: ويدجت الموقع وواتساب وتيليجرام",
      },
      {
        en: "Understands natural requests in Arabic, English, and more",
        ar: "يفهم الطلبات الطبيعية بالعربي والإنجليزي وأكثر",
      },
      {
        en: "Searches live inventory and replies with curated matches + payment plans",
        ar: "يبحث في المخزون الحي ويرد بترشيحات منسقة وخطط سداد",
      },
      {
        en: "Captures and scores every lead — handed to sales ready to close",
        ar: "يسجل ويقيّم كل Lead — ويسلّمه للمبيعات جاهز للإقفال",
      },
      {
        en: "Custom persona builder: your name, your tone, your knowledge base",
        ar: "ابنِ شخصية مساعدك: اسمه وأسلوبه وقاعدة معرفته من ملفاتك",
      },
      {
        en: "Fully white-label: your logo, your colors, your domain",
        ar: "White-label بالكامل: لوجو وألوان ودومين شركتك",
      },
      {
        en: "Usage-based credits — or bring your own AI keys to cut costs",
        ar: "استهلاك بالـ credits — أو وصّل مفاتيح AI الخاصة بك لتقليل التكلفة",
      },
    ],
    imagesFolder: "/Products/smartestprop",
    investorCta: true,
  },
  {
    slug: "agency-os",
    name: "Agency OS",
    status: "coming-soon",
    stage: {
      en: "In active development — self-hosted edition nearing release",
      ar: "قيد التطوير النشط — النسخة المستضافة ذاتياً تقترب من الإصدار",
    },
    category: {
      en: "Operating System for Service Agencies",
      ar: "نظام تشغيل لوكالات الخدمات",
    },
    tagline: {
      en: "Your clients see their projects. Your meetings turn into tasks. Unlimited users, flat price.",
      ar: "عملاؤك شايفين مشاريعهم. واجتماعاتك بتتحول مهام. مستخدمين بلا حدود بسعر ثابت.",
    },
    description: {
      en: "Agency OS solves the three things that break every service agency: agreements lost in WhatsApp, meeting decisions that evaporate, and clients who keep asking 'where is my project?'. Clients get a branded transparency portal with progress and milestones. Meetings get recorded, AI-transcribed, and summarized into action items that become tasks. And the whole thing is Arabic-first with unlimited users — no per-seat pricing.",
      ar: "Agency OS بيحل التلات حاجات اللي بتكسر أي وكالة خدمات: الاتفاقات اللي بتضيع في واتساب، قرارات الاجتماعات اللي بتتبخر، والعميل اللي بيسأل كل يوم «وصل فين مشروعي؟». العميل بياخد بوابة شفافية بهوية وكالتك فيها التقدم والمراحل. والاجتماعات بتتسجل وتتفرّغ وتتلخص بالـ AI لـ Action Items بتتحول مهام. وكل ده عربي أصيل بمستخدمين بلا حدود — مفيش تسعير بالمقعد.",
    },
    audience: {
      en: "Service agencies of every kind — software, marketing, design, consulting — that run client projects.",
      ar: "وكالات الخدمات بكل أنواعها — برمجة وتسويق وتصميم واستشارات — اللي بتدير مشاريع لعملاء.",
    },
    features: [
      {
        en: "Client transparency portal: progress, milestones, and notes — branded as yours",
        ar: "بوابة شفافية للعميل: التقدم والمراحل والملاحظات — بهوية وكالتك",
      },
      {
        en: "Meeting intelligence: record → AI transcript → summary + action items → tasks",
        ar: "ذكاء اجتماعات: تسجيل ← تفريغ AI ← ملخص وAction Items ← مهام",
      },
      {
        en: "Projects, phases, and Kanban boards with task codes and assignments",
        ar: "مشاريع ومراحل ولوحات Kanban بأكواد مهام وتوزيعات",
      },
      {
        en: "Scheduled client updates on three channels: email, portal, and in-app",
        ar: "تحديثات دورية للعميل على ثلاث قنوات: إيميل وبوابة وداخل النظام",
      },
      {
        en: "Semantic search across every meeting and decision ever made",
        ar: "بحث دلالي في كل اجتماع وقرار اتاخد من يوم ما بدأتم",
      },
      {
        en: "Unlimited users, flat pricing — your team grows, your bill doesn't",
        ar: "مستخدمين بلا حدود وسعر ثابت — فريقك يكبر وفاتورتك ثابتة",
      },
      {
        en: "Self-hosted edition: run it on your own server, own your data",
        ar: "نسخة مستضافة ذاتياً: شغّلها على سيرفرك وامتلك بياناتك",
      },
    ],
    imagesFolder: "/Products/agency-os",
    investorCta: true,
  },
];

export function GetProduct(slug: string): TProduct | undefined {
  return Products.find((product) => product.slug === slug);
}
