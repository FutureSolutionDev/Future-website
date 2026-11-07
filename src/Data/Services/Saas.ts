import type { TService } from "./Types";

export const SAAS_SERVICE: TService = {
  Id: "saas",
  Icon: "Cloud",
  Title: { en: "SaaS Platforms", ar: "منصات SaaS" },
  Description: {
    en: "Launch a subscription product that scales smoothly from 10 users to 10K.",
    ar: "أطلق منتجك بنظام الاشتراك ليتوسع بسلاسة من 10 مستخدمين إلى 10 آلاف.",
  },
  MetaDescription: {
    en: "Multi-tenant SaaS platforms with subscriptions, Stripe, Paymob and Fawry billing, roles, APIs and reports, from MVP to scale.",
    ar: "منصات SaaS متعددة المستأجرين باشتراكات ودفع عبر Stripe وPaymob وFawry، وصلاحيات وتكاملات وتقارير، من أول نسخة حتى التوسع.",
  },
  Intro: {
    en: "We build subscription platforms end to end: multi-tenant architecture, billing, roles, integrations and the reporting your customers pay for. A typical first version ships in 4 to 8 weeks.",
    ar: "نبني منصات الاشتراك من البداية إلى النهاية: بنية متعددة المستأجرين، والفوترة، والصلاحيات، والتكاملات، والتقارير التي يدفع عملاؤك مقابلها. وتُسلَّم النسخة الأولى عادةً خلال 4 إلى 8 أسابيع.",
  },
  Features: [
    { en: "Subscriptions and billing built in", ar: "اشتراكات وفوترة مدمجة" },
    { en: "Scales as your users grow", ar: "يتوسع مع نمو مستخدميك" },
    { en: "Admin dashboard included", ar: "لوحة تحكم إدارية جاهزة" },
    { en: "Reports that track your numbers", ar: "تقارير تتابع منها أرقامك" },
  ],
  SubServices: [
    {
      Title: { en: "From idea to first version", ar: "من الفكرة إلى أول نسخة" },
      Text: {
        en: "An MVP focused on the one workflow customers will pay for, ready to sell and measure.",
        ar: "نسخة أولى تركز على سير العمل الذي سيدفع العميل مقابله، جاهزة للبيع والقياس.",
      },
    },
    {
      Title: { en: "Multi-tenant architecture", ar: "بنية متعددة المستأجرين" },
      Text: {
        en: "Each customer's data isolated, with its own subdomain and branding when you need it.",
        ar: "بيانات كل عميل معزولة، مع نطاق فرعي وهوية خاصة به عند الحاجة.",
      },
    },
    {
      Title: { en: "Subscriptions and payments", ar: "الاشتراكات والمدفوعات" },
      Text: {
        en: "Plans, trials, invoices and renewals through Stripe, Paymob or Fawry.",
        ar: "خطط وفترات تجربة وفواتير وتجديد تلقائي عبر Stripe أو Paymob أو Fawry.",
      },
    },
    {
      Title: { en: "Roles and permissions", ar: "الأدوار والصلاحيات" },
      Text: {
        en: "Teams, branches and approvals so every user sees exactly what they should.",
        ar: "فرق وفروع وموافقات، ليرى كل مستخدم ما يخصه فقط.",
      },
    },
    {
      Title: { en: "Integrations and public API", ar: "التكاملات والـ API" },
      Text: {
        en: "WhatsApp Business API, webhooks and a documented REST API your customers can build on.",
        ar: "WhatsApp Business API وWebhooks وواجهة REST موثقة يبني عليها عملاؤك.",
      },
    },
    {
      Title: { en: "Reports and analytics", ar: "التقارير والتحليلات" },
      Text: {
        en: "Dashboards for you and your customers, with exports to Excel and CSV.",
        ar: "لوحات متابعة لك ولعملائك، مع تصدير إلى Excel وCSV.",
      },
    },
  ],
  StackGroups: [
    { Label: { en: "Runtime and frameworks", ar: "بيئة التشغيل والأطر" }, Tools: ["Node.js", "Bun", "Hono", "NestJS", "Go"] },
    { Label: { en: "Data and jobs", ar: "البيانات والمهام" }, Tools: ["PostgreSQL", "Drizzle", "Prisma", "Redis", "BullMQ"] },
    { Label: { en: "Payments", ar: "المدفوعات" }, Tools: ["Stripe", "Paymob", "Fawry"] },
    {
      Label: { en: "Realtime and integrations", ar: "التحديث المباشر والتكاملات" },
      Tools: ["WebSockets", "Socket.IO", "OpenAPI", "WhatsApp Business API"],
    },
  ],
  Deliverables: [
    { en: "An admin dashboard to run the platform", ar: "لوحة إدارة لتشغيل المنصة" },
    { en: "API documentation for integrations", ar: "توثيق الـ API للتكاملات" },
  ],
  Proof: {
    Kind: "product",
    Slug: "est8core",
    Note: {
      en: "Our real estate CRM: multi-tenant, with each brokerage on its own branded subdomain.",
      ar: "نظام CRM العقاري الخاص بنا: متعدد المستأجرين، ولكل شركة وساطة نطاقها وهويتها.",
    },
  },
  Faqs: [
    {
      Question: { en: "How long until my first version is live?", ar: "متى تكون النسخة الأولى جاهزة؟" },
      Answer: {
        en: "Usually 4 to 8 weeks depending on scope, with a working link you can test every week.",
        ar: "عادةً خلال 4 إلى 8 أسابيع حسب النطاق، مع رابط يعمل تختبره كل أسبوع.",
      },
    },
    {
      Question: { en: "Which payment gateways do you support?", ar: "ما بوابات الدفع التي تدعمونها؟" },
      Answer: {
        en: "Stripe for international customers, Paymob and Fawry for Egypt, and others your market needs.",
        ar: "Stripe للعملاء الدوليين، وPaymob وFawry لمصر، وأي بوابة أخرى يحتاجها سوقك.",
      },
    },
    {
      Question: { en: "Can each customer have their own branding?", ar: "هل يمكن أن تكون لكل عميل هويته الخاصة؟" },
      Answer: {
        en: "Yes. Each tenant can get its own subdomain, logo and colors, as in Est8Core.",
        ar: "نعم. يمكن أن يحصل كل عميل على نطاق فرعي وشعار وألوان خاصة، كما في Est8Core.",
      },
    },
  ],
};
