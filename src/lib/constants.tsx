import { Bird } from "lucide-react";

export const title = "Future Solutions Dev";
export const description = `${title} builds custom web, mobile and SaaS software for businesses across the Arab world and worldwide — from e-commerce and ERP to AI-powered systems.`;
export const Contact = {
  WhatsApp: "https://wa.me/201148371185",
  Email: "info@futuresolutionsdev.com",
  Phone: "201015471713",
  Facebook: "https://www.facebook.com/futuresolutionsdev",
  LinkedIn: "https://www.linkedin.com/company/futuresolutionsdev",
  Address: "Cairo, Egypt",
};

// Public runtime keys. The deployment platform doesn't inject env vars, so the
// live values live here (all NEXT_PUBLIC_* — already exposed to the browser by
// design). Env vars still win when present, so local/CI overrides keep working.
export const SiteKeys = {
  Web3FormsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "1f7339db-d8e0-4a1b-a2ff-9861770fd9a5",
  GaId: process.env.NEXT_PUBLIC_GA_ID || "",
  GoogleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "KZqsk3oGtcDsiEFbH2SDUbaSsBA238c42ShrLfsmv2g",
  BingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "314B6D037027F4B4D7C73C663ECF08DA",
  FbDomainVerification: process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION || "",
};
export const Greetings: Record<
  string,
  {
    Active: boolean;
    Favicon: string;
    Logo: string;
    Title: string;
    Description: string;
  }
> = {
  Default: {
    Active: false,
    Favicon: "/favico/favico.png",
    Logo: "/favico/logo.webp",
    Title: title,
    Description: description,
  },
  Ramadan: {
    Active: false,
    Favicon: "/favico/favico.Ramadan.png",
    Logo: "/favico/logo.Ramadan.webp",
    Title: title,
    Description: description,
  },
  EidAlFitr: {
    Active: false,
    Favicon: "/favico/favico.EidAlFitr.png",
    Logo: "/favico/logo.EidAlFitr.webp",
    Title: title,
    Description: description,
  },
  EidAlAdha: {
    Active: false,
    Favicon: "/favico/favico.EidAlAdha.png",
    Logo: "/favico/logo.EidAlAdha.webp",
    Title: title,
    Description: description,
  },
};
export const ActiveGreeting =
  Object.values(Greetings).find((g) => g.Active) || Greetings.Default;

export type SeasonName = "Ramadan" | "EidAlFitr" | "EidAlAdha";
export const ActiveSeasonName: SeasonName | null =
  (Object.entries(Greetings).find(
    ([name, g]) => g.Active && name !== "Default",
  )?.[0] as SeasonName | undefined) ?? null;

export const technologies = [
  {
    name: "Frontend",
    benefit: {
      en: "What your customers see — fast, polished, and works on every screen.",
      ar: "اللي عميلك بيشوفه — سريع ومتقن ويشتغل على كل الشاشات.",
    },
    items: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "Gastby",
      "Astro",
    ],
  },
  {
    name: "Mobile",
    benefit: {
      en: "One investment, two platforms — your app on iPhone and Android together.",
      ar: "استثمار واحد لمنصتين — تطبيقك على iPhone وAndroid مع بعض.",
    },
    items: [
      "Flutter",
      "React Native",
      "Expo",
      "Swift",
      "Kotlin",
      "Objective-C",
    ],
  },
  {
    name: "Backend",
    benefit: {
      en: "The engine room — stable under pressure and ready for growth.",
      ar: "غرفة المحركات — ثابت تحت الضغط وجاهز للنمو.",
    },
    items: [
      "Node.js",
      "Bun",
      "Nestjs",
      "Hono",
      "Express",
      "Fastify",
      "Python",
      "Django",
      "FastAPI",
      "Go",
      "Php Laravel",
    ],
  },
  {
    name: "Database",
    benefit: {
      en: "Your data safe, organized, and backed up — the asset your business runs on.",
      ar: "بياناتك آمنة ومنظمة وليها نسخ احتياطي — دي أصول شغلك.",
    },
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "MariaDB",
      "Redis",
      "Supabase",
      "Firebase",
    ],
  },
  {
    name: "DevOps & Cloud",
    benefit: {
      en: "Always online, updates without downtime, and bills that don't surprise you.",
      ar: "شغال دايماً، تحديثات من غير توقف، وفواتير استضافة من غير مفاجآت.",
    },
    items: [
      "AWS",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Vercel",
      "GitHub Actions",
      "GitLab",
      "Bitbucket",
      "Azure",
      "DigitalOcean",
      "Nginx",
      "Apache",
    ],
  },
];

type IconComponent = React.ComponentType<{ size?: number }>;
type TranslateFunction = (key: string) => string;

export const solutions = ({
  language,
  t,
  ShoppingCart,
  BarChart,
  Server,
  Layers,
}: {
  language: string;
  t: TranslateFunction;
  ShoppingCart: IconComponent;
  BarChart: IconComponent;
  Server: IconComponent;
  Layers: IconComponent;
}) => [
  {
    icon: ShoppingCart,
    slug: "e-commerce-solutions",
    title: t("solutions.ecommerce"),
    content:
      language === "ar"
        ? "متجرك مش مجرد صفحات منتجات — نظام كامل يبيع وانت نايم: يستقبل الدفع، يدير المخزون، ويرجّع العميل اللي ساب السلة."
        : "Your store isn't just product pages — it's a system that sells while you sleep: takes payments, manages stock, and wins back abandoned carts.",
    points:
      language === "ar"
        ? ["سلة ودفع إلكتروني آمن (بطاقات وتحويل بنكي)", "إدارة مخزون وطلبات وفواتير تلقائية", "كوبونات وحملات بريدية واسترجاع سلات", "لوحة تحكم بتقارير مبيعات يومية"]
        : ["Cart & secure checkout (cards + bank transfer)", "Inventory, orders, and automatic invoices", "Coupons, email campaigns, cart recovery", "Dashboard with daily sales reports"],
  },
  {
    icon: BarChart,
    slug: "fintech-solutions",
    title: t("solutions.fintech"),
    content:
      language === "ar"
        ? "في الفلوس مفيش مجال للخطأ — أنظمة مالية كل عملية فيها مسجلة ومشفرة وقابلة للتدقيق."
        : "With money there's no room for error — financial systems where every transaction is recorded, encrypted, and auditable.",
    points:
      language === "ar"
        ? ["عمليات آمنة بتشفير وتحقق ثنائي", "لوحات بيانات لحظية للأرصدة والتدفقات", "سجلات تدقيق كاملة لكل حركة", "تكامل مع بوابات الدفع والبنوك"]
        : ["Encrypted transactions with two-factor auth", "Real-time dashboards for balances & flows", "Complete audit logs for every action", "Payment gateway & banking integrations"],
  },
  {
    icon: Server,
    slug: "erp-solutions",
    title: t("solutions.erp"),
    content:
      language === "ar"
        ? "بدل ما شغلك متقسم بين Excel وواتساب وورق — نظام واحد يجمع الموارد البشرية والمخازن والمشتريات والحسابات."
        : "Instead of running your business across Excel, WhatsApp, and paper — one system for HR, inventory, procurement, and accounting.",
    points:
      language === "ar"
        ? ["كل الأقسام في نظام واحد متصل", "صلاحيات دقيقة لكل موظف حسب دوره", "تقارير قابلة للتخصيص لاتخاذ القرار", "يتكامل مع أنظمتك وأدواتك الحالية"]
        : ["Every department in one connected system", "Role-based permissions per employee", "Customizable reports for decision-making", "Integrates with your existing tools"],
  },
  {
    icon: Layers,
    slug: "healthcare-solutions",
    title: t("solutions.healthcare"),
    content:
      language === "ar"
        ? "عيادتك أو مركزك يستحق نظام يحترم وقت المريض وخصوصية بياناته — من الحجز للمتابعة."
        : "Your clinic deserves a system that respects patients' time and data privacy — from booking to follow-up.",
    points:
      language === "ar"
        ? ["حجز مواعيد أونلاين وتذكيرات تلقائية", "ملفات مرضى آمنة ومنظمة", "استشارات عن بعد بالفيديو", "التزام بمعايير خصوصية البيانات الصحية"]
        : ["Online booking with automatic reminders", "Secure, organized patient records", "Video telemedicine consultations", "Health-data privacy compliance built in"],
  },
];

// Service cards lead with client benefits, not technology names —
// the stack lives on the Technologies page for whoever cares.
export const services = ({
  language,
  t,
  Code,
  Smartphone,
  Cloud,
  Brain,
  Database,
  Shield,
}: {
  language: string;
  t: TranslateFunction;
  Code: IconComponent;
  Smartphone: IconComponent;
  Cloud: IconComponent;
  Brain: IconComponent;
  Database: IconComponent;
  Shield: IconComponent;
}) => {
  const isAr = language === "ar";
  return [
    {
      icon: Code,
      title: t("services.web.title"),
      description: t("services.web.desc"),
      features: isAr
        ? ["تحميل في أقل من ثانية", "جاهز لتصدر نتائج Google", "مثالي على الموبايل", "مصمم لتحويل الزوار لعملاء"]
        : ["Loads in under a second", "Built to rank on Google", "Flawless on mobile", "Designed to convert visitors"],
    },
    {
      icon: Smartphone,
      title: t("services.mobile.title"),
      description: t("services.mobile.desc"),
      features: isAr
        ? ["تطبيق واحد لـ iOS وAndroid", "إشعارات ترجّع عملاءك", "يعمل حتى بدون إنترنت", "جاهز للنشر على المتاجر"]
        : ["One app for iOS & Android", "Notifications that bring users back", "Works even offline", "Store-ready from day one"],
    },
    {
      icon: Cloud,
      title: t("services.saas.title"),
      description: t("services.saas.desc"),
      features: isAr
        ? ["اشتراكات وفوترة مدمجة", "يتوسع مع نمو مستخدميك", "لوحة تحكم إدارية جاهزة", "تقارير تتابع منها أرقامك"]
        : ["Subscriptions & billing built in", "Scales as your users grow", "Admin dashboard included", "Reports that track your numbers"],
    },
    {
      icon: Brain,
      title: t("services.ai.title"),
      description: t("services.ai.desc"),
      features: isAr
        ? ["أتمتة المهام المتكررة", "بحث وتوصيات ذكية", "مساعد ذكي يخدم عملاءك", "قرارات مبنية على بياناتك"]
        : ["Automate repetitive work", "Smart search & recommendations", "An assistant that serves your customers", "Decisions backed by your data"],
    },
    {
      icon: Database,
      title: t("services.devops.title"),
      description: t("services.devops.desc"),
      features: isAr
        ? ["استقرار على مدار الساعة", "تحديثات تنزل في دقائق", "نسخ احتياطي تلقائي", "تكاليف استضافة تحت السيطرة"]
        : ["Online around the clock", "Updates ship in minutes", "Automatic backups", "Hosting costs under control"],
    },
    {
      icon: Shield,
      title: t("services.security.title"),
      description: t("services.security.desc"),
      features: isAr
        ? ["حماية بيانات عملائك", "اختبارات اختراق دورية", "جاهزية للامتثال والمعايير", "خطة استجابة للطوارئ"]
        : ["Customer data protected", "Regular penetration testing", "Compliance-ready", "An incident response plan"],
    },
  ];
};

export const techs = ({
  Atom,
  Server,
  Triangle,
  FileCode2,
  Braces,
  Cloud,
  Database,
  Container,
}: {
  Atom: IconComponent;
  Server: IconComponent;
  Triangle: IconComponent;
  FileCode2: IconComponent;
  Braces: IconComponent;
  Cloud: IconComponent;
  Database: IconComponent;
  Container: IconComponent;
}) => [
  {
    name: "React",
    icon: <Atom />,
    color: "text-cyan-400",
    description: {
      ar: "مكتبة JavaScript قوية لبناء واجهات مستخدم تفاعلية وسريعة تعتمد على مبدأ المكونات القابلة لإعادة الاستخدام.",
      en: "A powerful JavaScript library for building fast, interactive user interfaces using reusable components.",
    },
  },
  {
    name: "Node.js",
    icon: <Server />,
    color: "text-green-500",
    description: {
      ar: "بيئة تشغيل JavaScript على الخادم تتيح بناء تطبيقات خلفية عالية الأداء وقابلة للتوسع.",
      en: "A JavaScript runtime for building high-performance, scalable backend applications.",
    },
  },
  {
    name: "Next.js",
    icon: <Triangle />,
    color: "text-white",
    description: {
      ar: "إطار عمل مبني على React يدعم SSR و SSG لتحسين الأداء وتجربة المستخدم وتحسين محركات البحث.",
      en: "A React framework supporting SSR and SSG for optimal performance, SEO, and user experience.",
    },
  },
  {
    name: "TypeScript",
    icon: <FileCode2 />,
    color: "text-blue-500",
    description: {
      ar: "امتداد لـ JavaScript يضيف نظام أنواع قوي لتحسين جودة الكود وتقليل الأخطاء في المشاريع الكبيرة.",
      en: "A typed superset of JavaScript that improves code quality and reduces errors in large-scale projects.",
    },
  },
  {
    name: "Flutter",
    icon: <Bird />,
    color: "text-blue-400",
    description: {
      ar: " إطار عمل مفتوح المصدر تطوّره Google وتدعمه. يستخدم مطورو الواجهة الأمامية والمطورون الشاملون Flutter لإنشاء واجهة مستخدم (UI) للتطبيق تعمل على منصات متعددة بتعليمة برمجية أساسية واحدة.",
      en: " UI software development kit created by Google and used to develop cross-platform applications for Android, iOS, Web, and Fuchsia.",
    }
  },
  {
    name: "Python",
    icon: <Braces />,
    color: "text-yellow-300",
    description: {
      ar: "لغة برمجة متعددة الاستخدامات تُستخدم في الذكاء الاصطناعي، تحليل البيانات، والأتمتة.",
      en: "A versatile programming language widely used in AI, data analysis, automation, and backend development.",
    },
  },
  {
    name: "AWS",
    icon: <Cloud />,
    color: "text-orange-400",
    description: {
      ar: "منصة خدمات سحابية توفر بنية تحتية موثوقة وقابلة للتوسع لتشغيل التطبيقات والأنظمة.",
      en: "A cloud computing platform providing scalable, secure infrastructure for modern applications.",
    },
  },
  {
    name: "PostgreSQL",
    icon: <Database />,
    color: "text-blue-300",
    description: {
      ar: "نظام قواعد بيانات علائقي قوي وآمن يدعم الاستعلامات المعقدة والبيانات الكبيرة.",
      en: "A powerful, secure relational database system designed for complex queries and large-scale data.",
    },
  },
  {
    name: "Docker",
    icon: <Container />,
    color: "text-blue-500",
    description: {
      ar: "أداة لتشغيل التطبيقات داخل حاويات معزولة تضمن سهولة النشر والتوافق بين البيئات المختلفة.",
      en: "A containerization platform that ensures consistent application deployment across environments.",
    },
  },
];
export const features = ({
  language,
  ShieldCheck,
  Zap,
  Globe,
  Users,
}: {
  language: string;
  ShieldCheck: IconComponent;
  Zap: IconComponent;
  Globe: IconComponent;
  Users: IconComponent;
}) => [
  {
    icon: ShieldCheck,
    title: language === "ar" ? "آمن وموثوق" : "Secure & Reliable",
    description:
      language === "ar"
        ? "معايير أمان على مستوى المؤسسات."
        : "Enterprise-grade security standards.",
  },
  {
    icon: Zap,
    title: language === "ar" ? "أداء عالي" : "High Performance",
    description:
      language === "ar"
        ? "تحسين السرعة والكفاءة."
        : "Optimized for speed and efficiency.",
  },
  {
    icon: Globe,
    title: language === "ar" ? "قابلية التوسع" : "Global Scale",
    description:
      language === "ar"
        ? "بنية تحتية تنمو معك."
        : "Infrastructure that grows with you.",
  },
  {
    icon: Users,
    title: language === "ar" ? "فريق خبير" : "Expert Team",
    description:
      language === "ar"
        ? "مهندسين ذوي خبرة عالية."
        : "Dedicated senior engineers.",
  },
];
