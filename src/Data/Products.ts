import type { TBilingual } from "@/Lib/Seo";
import type { TLinkItem, TScreenCaptions } from "@/Data/Links";

export type TProductStatus = "live" | "coming-soon";

export type TProduct = {
  Slug: string;
  Name: string;
  Status: TProductStatus;
  Stage?: TBilingual;
  Category: TBilingual;
  Tagline: TBilingual;
  Description: TBilingual;
  Audience: TBilingual;
  Features: TBilingual[];
  Stats?: { Value: string; Label: TBilingual }[];
  ImagesFolder?: string;
  Links?: TLinkItem[];
  AppsComingSoon?: boolean;
  InvestorCta?: boolean;
  DemoOnRequest?: boolean;
  Captions?: TScreenCaptions;
};

export const PRODUCTS: TProduct[] = [
  {
    Slug: "nova-crm",
    Name: "Nova CRM",
    Status: "live",
    Category: { en: "White-Label Enterprise CRM", ar: "منصة CRM مؤسسية بهوية العميل (White-Label)" },
    Tagline: {
      en: "The full revenue cycle, from the first call to renewal, in one branded system.",
      ar: "دورة الإيرادات كاملة، من أول مكالمة حتى التجديد، في نظام واحد بهوية شركتك.",
    },
    Description: {
      en: "Nova is a multi-tenant CRM platform serving service businesses in Egypt and Saudi Arabia. It runs the complete revenue pipeline (telesales, sales, contracts, accounts and technical delivery) with role-isolated reports for every department. Each end customer gets a branded self-service portal with live financial reports, documents and real-time support chat.",
      ar: "Nova منصة CRM متعددة المستأجرين تخدم شركات الخدمات في مصر والسعودية. تدير خط الإيرادات الكامل (المبيعات الهاتفية والمبيعات والعقود والحسابات والتسليم التقني) بتقارير معزولة لكل قسم حسب الدور. ويحصل كل عميل نهائي على بوابة خدمة ذاتية بهوية الشركة، فيها تقارير مالية مباشرة ومستندات ومحادثة دعم فورية.",
    },
    Audience: {
      en: "B2B service companies running recurring contracts: agencies, accounting-software vendors and managed services.",
      ar: "شركات الخدمات B2B التي تدير عقودًا دورية: الوكالات وشركات البرمجيات المحاسبية والخدمات المُدارة.",
    },
    Features: [
      {
        en: "Full pipeline: telesales, sales, contracts, accounts, then delivery",
        ar: "خط كامل: المبيعات الهاتفية ثم المبيعات ثم العقود ثم الحسابات ثم التسليم",
      },
      {
        en: "Branded customer portal: subscriptions, documents and live chat",
        ar: "بوابة عملاء بهوية شركتك: الاشتراكات والمستندات والمحادثة المباشرة",
      },
      {
        en: "Live financial reports inside the portal through accounting integration",
        ar: "تقارير مالية مباشرة داخل البوابة عبر التكامل مع نظام المحاسبة",
      },
      {
        en: "Role-isolated analytics: each department sees its own numbers",
        ar: "تحليلات معزولة حسب الدور: يرى كل قسم أرقامه فقط",
      },
      {
        en: "Real-time internal team chat with file sharing and read receipts",
        ar: "محادثة داخلية فورية للفريق بمشاركة الملفات وإشعارات القراءة",
      },
      {
        en: "Multi-branch and multi-tenant: one platform, many brands",
        ar: "متعددة الفروع والمستأجرين: منصة واحدة بهويات متعددة",
      },
      {
        en: "Local payments: Paymob, bank transfer and card gateways",
        ar: "مدفوعات محلية: Paymob والتحويل البنكي وبوابات البطاقات",
      },
    ],
    Stats: [
      { Value: "2", Label: { en: "Markets served: Egypt and KSA", ar: "سوقان: مصر والسعودية" } },
      { Value: "5", Label: { en: "Departments in one pipeline", ar: "أقسام في خط واحد" } },
      { Value: "271", Label: { en: "Automated endpoint tests passing", ar: "اختبارًا آليًا ناجحًا للنظام" } },
    ],
    ImagesFolder: "/Products/nova-crm",
    DemoOnRequest: true,
    Captions: {
      "01-dashboard.png": { en: "Department dashboard", ar: "لوحة القسم" },
      "02-master-data.png": { en: "Master data", ar: "البيانات الأساسية" },
      "03-Customers.png": { en: "Customers", ar: "العملاء" },
      "04-acc-manager.png": { en: "Account manager view", ar: "واجهة مدير الحساب" },
    },
  },
  {
    Slug: "est8core",
    Name: "Est8Core",
    Status: "coming-soon",
    Stage: {
      en: "In final development, preparing for early access",
      ar: "في مرحلة التطوير النهائية، والتجهيز للوصول المبكر",
    },
    Category: { en: "Real Estate Brokerage CRM", ar: "نظام CRM لشركات الوساطة العقارية" },
    Tagline: {
      en: "From lead to closed deal, with commissions, installments and approvals included.",
      ar: "من العميل المحتمل حتى إقفال الصفقة، بالعمولات والأقساط والموافقات.",
    },
    Description: {
      en: "Est8Core is a CRM built specifically for real estate brokerages and individual brokers. Leads are captured and assigned automatically, properties are managed as branch inventory with public listing pages, and deals close through a real workflow: commission splits between agency and agent, installment schedules and manager approvals above your thresholds. All of it is multi-tenant with a full team hierarchy.",
      ar: "Est8Core نظام CRM مبني خصيصًا لشركات الوساطة العقارية والوسطاء الأفراد. يُسجَّل العملاء المحتملون ويُوزَّعون تلقائيًا، وتُدار العقارات كمخزون لفروعك مع صفحات نشر عامة، وتُقفل الصفقات بسير عمل حقيقي: تقسيم العمولات بين الشركة والوكيل، وجداول الأقساط، وموافقات المدير فوق الحدود التي تحددها. وكل ذلك بنظام متعدد المستأجرين وهيكل فرق كامل.",
    },
    Audience: {
      en: "Real estate brokerage companies (branches, teams and roles) and individual brokers.",
      ar: "شركات الوساطة العقارية (الفروع والفرق والأدوار) والوسطاء الأفراد.",
    },
    Features: [
      {
        en: "Lead capture with automatic assignment and follow-up tracking",
        ar: "تسجيل العملاء المحتملين مع توزيع تلقائي وتتبع للمتابعات",
      },
      {
        en: "Deal workflow: commission split, co-broke and agent share, calculated automatically on close",
        ar: "صفقات بعمولة مقسّمة بين الشركة والوكيل والوسيط المشارك، تُحسب تلقائيًا عند الإقفال",
      },
      {
        en: "Installment schedules per deal with paid tracking and alerts",
        ar: "جداول أقساط لكل صفقة مع تتبع السداد والتنبيهات",
      },
      {
        en: "Manager approval gates for deals above your thresholds",
        ar: "موافقات إدارية إلزامية للصفقات التي تتجاوز الحد الذي تحدده",
      },
      {
        en: "Property inventory per branch and public listing pages with clean URLs",
        ar: "مخزون عقارات لكل فرع وصفحات نشر عامة بروابط واضحة",
      },
      {
        en: "Full hierarchy: branches, teams and granular role permissions",
        ar: "هيكل كامل: فروع وفرق وصلاحيات دقيقة لكل دور",
      },
      {
        en: "Real-time notifications the moment a lead or deal moves",
        ar: "إشعارات فورية بمجرد تحرك عميل محتمل أو صفقة",
      },
    ],
    ImagesFolder: "/Products/est8core",
    Links: [{ key: "website", url: "https://demo.est8core.com", label: { en: "Website", ar: "موقع الويب" } }],
    DemoOnRequest: false,
    InvestorCta: false,
    Captions: {
      "01-dashboard.png": { en: "Dashboard", ar: "لوحة التحكم" },
      "02-leads-list.png": { en: "Leads list", ar: "قائمة العملاء المحتملين" },
      "03-leads-filters.png": { en: "Lead filters", ar: "تصفية العملاء المحتملين" },
      "04-leads-detail.png": { en: "Lead details", ar: "تفاصيل العميل المحتمل" },
      "05-leads-kanban.png": { en: "Kanban board", ar: "لوحة Kanban" },
      "06-window-single.png": { en: "Single window view", ar: "عرض نافذة واحدة" },
      "07-windows-multi.png": { en: "Multiple windows", ar: "نوافذ متعددة" },
      "08-contacts-list.png": { en: "Contacts", ar: "جهات الاتصال" },
      "09-public-listing.png": { en: "Public property listing", ar: "صفحة النشر العامة للعقار" },
    },
  },
  {
    Slug: "smartestprop",
    Name: "SmartestProp",
    Status: "coming-soon",
    Stage: {
      en: "Private beta running, early access open",
      ar: "نسخة تجريبية خاصة تعمل الآن، والتسجيل المبكر مفتوح",
    },
    Category: { en: "AI Assistant for Real Estate", ar: "مساعد ذكاء اصطناعي للعقارات" },
    Tagline: {
      en: "Your branded AI agent answers every property inquiry and hands you a qualified lead.",
      ar: "مساعد ذكاء اصطناعي بهويتك يرد على كل استفسار عقاري، ويسلّمك عميلًا مؤهلًا وجاهزًا.",
    },
    Description: {
      en: "SmartestProp gives real estate companies a white-label AI assistant on their website, WhatsApp and Telegram. It understands property requests in any language ('3 bedrooms in New Cairo under 5M'), searches live inventory, replies with curated recommendations and payment plans, and captures the lead, scored and ready for your sales team. Train it on your own projects, brand it as your own and never miss an inquiry again.",
      ar: "يمنح SmartestProp شركات العقارات مساعد ذكاء اصطناعي بهويتها على موقعها وواتساب وتيليجرام. يفهم طلب العميل بأي لغة («3 غرف في القاهرة الجديدة بأقل من 5 ملايين»)، ويبحث في المخزون المباشر، ويرد بترشيحات منسقة مع خطط السداد، ويسجّل العميل المحتمل مُقيّمًا وجاهزًا لفريق مبيعاتك. درّبه على مشاريعك، واجعله بهويتك، ولن يفوتك أي استفسار بعد اليوم.",
    },
    Audience: {
      en: "Brokerages, developers and property portals in Egypt and the Gulf.",
      ar: "شركات الوساطة والمطورون العقاريون والبوابات العقارية في مصر والخليج.",
    },
    Features: [
      {
        en: "One AI assistant on three channels: website widget, WhatsApp and Telegram",
        ar: "مساعد واحد على ثلاث قنوات: أداة الموقع وواتساب وتيليجرام",
      },
      {
        en: "Understands natural requests in Arabic, English and more",
        ar: "يفهم الطلبات الطبيعية بالعربية والإنجليزية ولغات أخرى",
      },
      {
        en: "Searches live inventory and replies with curated matches and payment plans",
        ar: "يبحث في المخزون المباشر ويرد بترشيحات منسقة وخطط سداد",
      },
      {
        en: "Captures and scores every lead, handed to sales ready to close",
        ar: "يسجّل كل عميل محتمل ويقيّمه، ثم يسلّمه للمبيعات جاهزًا للإقفال",
      },
      {
        en: "Custom persona builder: your name, your tone, your knowledge base",
        ar: "ابنِ شخصية مساعدك: اسمه وأسلوبه وقاعدة معرفته من ملفاتك",
      },
      {
        en: "Fully white-label: your logo, your colors, your domain",
        ar: "بهويتك بالكامل: شعار شركتك وألوانها ونطاقها",
      },
      {
        en: "Usage-based credits, or bring your own AI keys to cut costs",
        ar: "استهلاك بنظام الرصيد، أو اربط مفاتيح الذكاء الاصطناعي الخاصة بك لتقليل التكلفة",
      },
    ],
    ImagesFolder: "/Products/smartestprop",
    InvestorCta: true,
  },
  {
    Slug: "agency-os",
    Name: "Agency OS",
    Status: "coming-soon",
    Stage: {
      en: "In active development, self-hosted edition nearing release",
      ar: "قيد التطوير النشط، والنسخة المستضافة ذاتيًا تقترب من الإصدار",
    },
    Category: { en: "Operating System for Service Agencies", ar: "نظام تشغيل لوكالات الخدمات" },
    Tagline: {
      en: "Your clients see their projects. Your meetings turn into tasks. Unlimited users, flat price.",
      ar: "عملاؤك يرون مشاريعهم، واجتماعاتك تتحول إلى مهام، ومستخدمون بلا حدود بسعر ثابت.",
    },
    Description: {
      en: "Agency OS solves the three things that break every service agency: agreements lost in WhatsApp, meeting decisions that evaporate, and clients who keep asking 'where is my project?'. Clients get a branded transparency portal with progress and milestones. Meetings are recorded, transcribed by AI and summarized into action items that become tasks. The whole system is Arabic-first with unlimited users and no per-seat pricing.",
      ar: "يحل Agency OS المشكلات الثلاث التي ترهق أي وكالة خدمات: الاتفاقات التي تضيع في واتساب، وقرارات الاجتماعات التي تتبخر، والعميل الذي يسأل كل يوم «إلى أين وصل مشروعي؟». يحصل العميل على بوابة شفافية بهوية وكالتك فيها التقدم والمراحل. وتُسجَّل الاجتماعات وتُفرَّغ وتُلخَّص بالذكاء الاصطناعي إلى مهام قابلة للتنفيذ. والنظام كله عربي أصيل بمستخدمين بلا حدود، دون تسعير لكل مستخدم.",
    },
    Audience: {
      en: "Service agencies of every kind (software, marketing, design and consulting) that run client projects.",
      ar: "وكالات الخدمات بكل أنواعها (البرمجة والتسويق والتصميم والاستشارات) التي تدير مشاريع لعملاء.",
    },
    Features: [
      {
        en: "Client transparency portal: progress, milestones and notes, branded as yours",
        ar: "بوابة شفافية للعميل: التقدم والمراحل والملاحظات، بهوية وكالتك",
      },
      {
        en: "Meeting intelligence: recording, AI transcript, summary and action items, then tasks",
        ar: "ذكاء الاجتماعات: تسجيل ثم تفريغ بالذكاء الاصطناعي ثم ملخص ومهام قابلة للتنفيذ",
      },
      {
        en: "Projects, phases and Kanban boards with task codes and assignments",
        ar: "مشاريع ومراحل ولوحات Kanban بأكواد للمهام وتوزيع للمسؤوليات",
      },
      {
        en: "Scheduled client updates on three channels: email, portal and in-app",
        ar: "تحديثات دورية للعميل على ثلاث قنوات: البريد والبوابة وداخل النظام",
      },
      {
        en: "Semantic search across every meeting and decision ever made",
        ar: "بحث دلالي في كل اجتماع وقرار منذ أن بدأتم",
      },
      {
        en: "Unlimited users, flat pricing: your team grows, your bill does not",
        ar: "مستخدمون بلا حدود وسعر ثابت: يكبر فريقك وتبقى فاتورتك كما هي",
      },
      {
        en: "Self-hosted edition: run it on your own server and own your data",
        ar: "نسخة مستضافة ذاتيًا: شغّلها على خادمك وامتلك بياناتك",
      },
    ],
    ImagesFolder: "/Products/agency-os",
    InvestorCta: true,
  },
];

export function GetProductBySlug(Slug: string): TProduct | undefined {
  return PRODUCTS.find((Product) => Product.Slug === Slug);
}
