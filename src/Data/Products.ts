import type { TBilingual } from "@/Lib/Seo";
import type { TLinkItem, TScreenCaptions } from "@/Data/Links";

export type TProductStatus = "live" | "beta" | "coming-soon" | "open-source";

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
  License?: { Name: string; Url: string };
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
      "01-dashboard.webp": { en: "Department dashboard", ar: "لوحة القسم" },
      "02-master-data.webp": { en: "Master data", ar: "البيانات الأساسية" },
      "03-Customers.webp": { en: "Customers", ar: "العملاء" },
      "04-acc-manager.webp": { en: "Account manager view", ar: "واجهة مدير الحساب" },
    },
  },
  {
    Slug: "bunxray",
    Name: "BunXRay",
    Status: "beta",
    Stage: { en: "Free, invite-only beta", ar: "نسخة تجريبية مجانية بالدعوة" },
    Category: { en: "AI Security Testing", ar: "اختبار أمني بالذكاء الاصطناعي" },
    Tagline: {
      en: "Watch a team of AI specialists test your site's security, step by step.",
      ar: "شاهد فريقًا من متخصصي الذكاء الاصطناعي يختبر أمان موقعك خطوة بخطوة.",
    },
    Description: {
      en: "BunXRay tests your real site the way an attacker would. A team of AI specialists, each able to run on a different model, maps your pages and endpoints, argues out a plan in a shared room, then tries it with real requests while you watch every message and every request as it happens. A different specialist re-checks each finding against its evidence before it reaches you, and the report shows the plans tried, the evidence and the model behind each finding.",
      ar: "يختبر BunXRay موقعك الحقيقي كما يفعل المهاجم. فريق من متخصصي الذكاء الاصطناعي، يستطيع كل منهم العمل على نموذج مختلف، يرسم خريطة صفحاتك ونقاط الاتصال، ويتناقش في خطة داخل غرفة مشتركة، ثم ينفذها بطلبات حقيقية بينما تتابع كل رسالة وكل طلب لحظة بلحظة. ويعيد متخصص آخر فحص كل نتيجة مقابل دليلها قبل أن تصلك، ويعرض التقرير الخطط التي جُرّبت والأدلة والنموذج الذي يقف وراء كل نتيجة.",
    },
    Audience: {
      en: "Teams and founders who own a web app and want to find the logic flaws a fixed scanner misses.",
      ar: "الفرق وأصحاب المنتجات الذين يملكون تطبيق ويب ويريدون اكتشاف ثغرات المنطق التي لا تلتقطها أدوات الفحص التقليدية.",
    },
    Features: [
      { en: "Recon first: the team maps your pages, forms and endpoints before any attack", ar: "الاستطلاع أولًا: يرسم الفريق خريطة الصفحات والنماذج ونقاط الاتصال قبل أي هجوم" },
      { en: "Specialists argue out the plan in a shared room you can read live", ar: "يتناقش المتخصصون في الخطة داخل غرفة مشتركة تقرؤها مباشرة" },
      { en: "Live execution on your real site: see every request and response, then pause, steer or stop", ar: "تنفيذ مباشر على موقعك: ترى كل طلب ورده، وتستطيع الإيقاف أو التوجيه في أي لحظة" },
      { en: "Every finding is re-checked by a different specialist against its evidence", ar: "يعيد متخصص آخر فحص كل نتيجة مقابل دليلها قبل اعتمادها" },
      { en: "A team you shape: add your own specialists, roles and models", ar: "فريق تشكّله بنفسك: أضف متخصصيك وأدوارهم ونماذجهم" },
      { en: "Deeper mode with two test accounts proves authorization flaws, such as one customer reaching another's data", ar: "وضع أعمق بحسابين تجريبيين يثبت ثغرات الصلاحيات، مثل وصول عميل إلى بيانات عميل آخر" },
      { en: "No login to your site required for the default external scan", ar: "لا يحتاج الفحص الخارجي الافتراضي إلى تسجيل دخول في موقعك" },
    ],
    ImagesFolder: "/Products/bunxray",
    Links: [
      { key: "website", url: "https://bunxray.com", label: { en: "Request an invite", ar: "اطلب دعوة" } },
      { key: "x", url: "https://x.com/BunXRay" },
    ],
    Captions: {
      "01-home.webp": { en: "Home page and invite request", ar: "الصفحة الرئيسية وطلب الدعوة" },
      "02-how-it-works.webp": { en: "How an engagement unfolds, in five steps", ar: "مراحل الاختبار الخمس" },
      "03-team.webp": { en: "A team of specialists you shape", ar: "فريق متخصصين تشكّله بنفسك" },
      "04-logic-flaws.webp": { en: "The logic flaws no checklist catches", ar: "ثغرات المنطق التي لا تلتقطها القوائم الجاهزة" },
    },
  },
  {
    Slug: "internet-monitor",
    Name: "Internet Monitor",
    Status: "open-source",
    Stage: { en: "Free for home and work · Elastic License 2.0", ar: "مجاني للبيت والعمل · Elastic License 2.0" },
    Category: { en: "Free desktop app for Windows, Mac and Linux", ar: "تطبيق مجاني لأنظمة Windows وMac وLinux" },
    Tagline: {
      en: "Document every internet outage, and complain to your provider with proof.",
      ar: "وثّق كل انقطاع في الإنترنت، واشتكِ لشركة الإنترنت بدليل.",
    },
    Description: {
      en: "Internet Monitor quietly watches your home internet. Every time it drops or slows down, it records when, for how long and why, then turns the record into proof you can send to your provider. It runs on Windows, Mac and Linux, needs no account and keeps your data on your own computer. Our team built it and published its code for everyone as a contribution to the community.",
      ar: "يراقب «مراقب الإنترنت» اتصال المنزل بهدوء. كلما انقطع الإنترنت أو أبطأ، يسجّل متى حدث ذلك وكم استمر ولماذا، ثم يحوّل السجل إلى دليل ترسله لشركة الإنترنت. يعمل على Windows وMac وLinux دون حساب، وتبقى بياناتك على جهازك. طوّره فريقنا ونشر كوده للجميع مساهمةً منا في المجتمع.",
    },
    Audience: {
      en: "Anyone who pays for an internet line and wants evidence when it fails: households, freelancers and small offices.",
      ar: "كل من يدفع مقابل خط إنترنت ويريد دليلًا عندما يتعطل: الأسر والمستقلون والمكاتب الصغيرة.",
    },
    Features: [
      { en: "Every outage written down: exact start, duration and which part failed, even short drops", ar: "كل انقطاع مسجّل: وقت البداية بالضبط والمدة والجزء الذي تعطل، حتى الانقطاعات القصيرة" },
      { en: "Tells you whether the problem is your router or your provider", ar: "يحدد إن كانت المشكلة في الراوتر عندك أم عند شركة الإنترنت" },
      { en: "A complaint text built from your measurements in one click, with an evidence file", ar: "نص شكوى جاهز بضغطة واحدة مبني على قياساتك، مع ملف إثبات" },
      { en: "Scheduled speed tests compared with the speed in your contract", ar: "اختبارات سرعة مجدولة تقارنها بالسرعة المذكورة في عقدك" },
      { en: "A monthly PDF report and complaint tracking with the provider's deadline", ar: "تقرير شهري بصيغة PDF، ومتابعة للشكاوى ومهلة رد الشركة" },
      { en: "No account, no ads, no tracking: your data stays on your computer", ar: "دون حساب أو إعلانات أو تتبّع، وبياناتك تبقى على جهازك" },
      { en: "Available in Arabic, English, French, Turkish and Urdu", ar: "متاح بالعربية والإنجليزية والفرنسية والتركية والأردية" },
    ],
    Stats: [
      { Value: "3", Label: { en: "Platforms: Windows, Mac and Linux", ar: "أنظمة: Windows وMac وLinux" } },
      { Value: "5", Label: { en: "Interface languages", ar: "لغات للواجهة" } },
      { Value: "0", Label: { en: "Accounts, ads or trackers", ar: "حسابات أو إعلانات أو تتبّع" } },
    ],
    ImagesFolder: "/Products/internet-monitor",
    Links: [
      { key: "website", url: "https://khaymah.github.io/internet-monitor/", label: { en: "Download the app", ar: "حمّل التطبيق" } },
      { key: "github", url: "https://github.com/Khaymah/internet-monitor", label: { en: "Source code on GitHub", ar: "الكود على GitHub" } },
    ],
    License: { Name: "Elastic License 2.0", Url: "https://github.com/Khaymah/internet-monitor/blob/master/LICENSE" },
    Captions: {
      "01-overview.webp": { en: "Dashboard: connection status, response time and outage timeline", ar: "لوحة المتابعة: حالة الاتصال وزمن الاستجابة وخط الانقطاعات" },
      "02-complaints.webp": { en: "Complaints, the provider's deadline and the proof for each", ar: "الشكاوى ومهلة الشركة والإثبات لكل شكوى" },
      "03-report.webp": { en: "A monthly report you can save as PDF", ar: "التقرير الشهري بصيغة PDF" },
      "04-history.webp": { en: "Every outage of the day with its time, length and cause", ar: "انقطاعات اليوم بوقتها ومدتها وسببها" },
      "05-home.webp": { en: "The app website", ar: "موقع التطبيق" },
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
      "01-dashboard.webp": { en: "Dashboard with yearly performance", ar: "لوحة التحكم وأداء السنة" },
      "02-leads-board.webp": { en: "Leads board by stage", ar: "لوحة العملاء المحتملين حسب المرحلة" },
      "03-properties.webp": { en: "Property inventory", ar: "مخزون العقارات" },
      "04-deals-pipeline.webp": { en: "Deals pipeline and win rate", ar: "مسار الصفقات ومعدل الفوز" },
      "05-deal-detail.webp": { en: "Deal details and approval stages", ar: "تفاصيل الصفقة ومراحل الموافقة" },
      "06-reports.webp": { en: "Conversion funnel report", ar: "تقرير مسار تحويل العملاء" },
      "07-team-branches.webp": { en: "Teams and branches", ar: "الفرق والفروع" },
      "08-my-workspace.webp": { en: "Each agent's workspace", ar: "مساحة عمل كل وكيل" },
      "09-white-label-login.webp": { en: "Login under the brokerage's own brand", ar: "تسجيل الدخول بهوية شركة الوساطة" },
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
];

export function IsAvailable(Product: TProduct): boolean {
  return Product.Status !== "coming-soon";
}

export function StatusLabel(Product: TProduct, Copy: { Live: string; Beta: string; ComingSoon: string; OpenCode: string }): string {
  if (Product.Status === "live") return Copy.Live;
  if (Product.Status === "beta") return Copy.Beta;
  if (Product.Status === "open-source") return Copy.OpenCode;
  return Copy.ComingSoon;
}

export function GetProductBySlug(Slug: string): TProduct | undefined {
  return PRODUCTS.find((Product) => Product.Slug === Slug);
}
