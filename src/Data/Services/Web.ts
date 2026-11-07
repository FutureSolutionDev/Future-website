import type { TService } from "./Types";

export const WEB_SERVICE: TService = {
  Id: "web",
  Icon: "Code",
  Title: { en: "Web Development", ar: "تطوير المواقع" },
  Description: {
    en: "Websites that load fast, rank on Google and turn visitors into paying customers.",
    ar: "مواقع سريعة تتصدر نتائج البحث وتحوّل الزوار إلى عملاء.",
  },
  MetaDescription: {
    en: "Fast bilingual websites, custom stores and web apps built with Next.js and React, made to rank on Google and convert visitors.",
    ar: "مواقع ومتاجر وتطبيقات ويب ثنائية اللغة بـ Next.js وReact، سريعة ومهيأة لتصدر Google وتحويل الزوار إلى عملاء.",
  },
  Intro: {
    en: "We build websites and web apps on Next.js and React that load fast, rank on Google and are easy for your team to run. Every project starts from the goal behind it: more inquiries, more sales or less manual work.",
    ar: "نبني المواقع وتطبيقات الويب بـ Next.js وReact لتكون سريعة وتتصدر نتائج Google ويسهل على فريقك إدارتها. ويبدأ كل مشروع من هدفه: استفسارات أكثر، أو مبيعات أكثر، أو عمل يدوي أقل.",
  },
  Features: [
    { en: "Loads in under a second", ar: "تحميل في أقل من ثانية" },
    { en: "Built to rank on Google", ar: "مهيأ لتصدّر نتائج Google" },
    { en: "Flawless on mobile", ar: "مثالي على الجوال" },
    { en: "Designed to convert visitors", ar: "مصمم لتحويل الزوار إلى عملاء" },
  ],
  SubServices: [
    {
      Title: { en: "Company websites", ar: "مواقع الشركات" },
      Text: {
        en: "A fast Arabic and English site that explains what you do and turns visitors into inquiries.",
        ar: "موقع سريع بالعربية والإنجليزية يشرح ما تقدمه ويحوّل الزائر إلى استفسار.",
      },
    },
    {
      Title: { en: "Campaign landing pages", ar: "صفحات هبوط للحملات" },
      Text: {
        en: "Pages built for one offer and one action, measured against what you spend on ads.",
        ar: "صفحات مبنية لعرض واحد وإجراء واحد، وتُقاس نتائجها مقابل ما تنفقه على الإعلانات.",
      },
    },
    {
      Title: { en: "Custom online stores", ar: "متاجر إلكترونية مخصصة" },
      Text: {
        en: "Your own store with your checkout, payment gateways and inventory, without platform commissions.",
        ar: "متجرك الخاص بخطوات الشراء وبوابات الدفع والمخزون التي تناسبك، دون عمولات منصات.",
      },
    },
    {
      Title: { en: "Portals and dashboards", ar: "البوابات ولوحات التحكم" },
      Text: {
        en: "Customer portals, admin panels and internal tools that replace scattered spreadsheets.",
        ar: "بوابات العملاء ولوحات الإدارة والأدوات الداخلية التي تحل محل الجداول المتفرقة.",
      },
    },
    {
      Title: { en: "Web applications", ar: "تطبيقات الويب" },
      Text: {
        en: "Interactive apps with live data, built with React and Vite and connected to your systems.",
        ar: "تطبيقات تفاعلية ببيانات مباشرة، مبنية بـ React وVite ومتصلة بأنظمتك.",
      },
    },
    {
      Title: { en: "Rebuilds and speed fixes", ar: "إعادة البناء وتحسين السرعة" },
      Text: {
        en: "Move an old or slow site to a modern stack and fix Core Web Vitals and SEO without losing rankings.",
        ar: "ننقل الموقع القديم أو البطيء إلى تقنيات حديثة، ونصلح مؤشرات Core Web Vitals والـ SEO دون خسارة ترتيبك.",
      },
    },
  ],
  StackGroups: [
    {
      Label: { en: "Interface", ar: "الواجهة" },
      Tools: ["Next.js", "React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion", "GSAP"],
    },
    {
      Label: { en: "Data and forms", ar: "البيانات والنماذج" },
      Tools: ["TanStack Query", "SWR", "Zustand", "Redux Toolkit", "React Hook Form", "Zod"],
    },
    {
      Label: { en: "Server", ar: "الخادم" },
      Tools: ["Node.js", "Bun", "Hono", "Express", "NestJS", "Go", "Laravel", "PHP", ".NET"],
    },
    {
      Label: { en: "Databases and APIs", ar: "قواعد البيانات والـ APIs" },
      Tools: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "REST", "OpenAPI", "GraphQL", "tRPC"],
    },
  ],
  Deliverables: [
    { en: "A speed and SEO report at launch", ar: "تقرير سرعة وSEO عند الإطلاق" },
    { en: "An admin panel to edit your content", ar: "لوحة تحكم لتعديل المحتوى بنفسك" },
  ],
  Proof: {
    Kind: "project",
    Slug: "adham-fathallah",
    Note: {
      en: "A bilingual property platform serving 20K+ buyers, with live developer prices.",
      ar: "منصة عقارية ثنائية اللغة يتصفحها أكثر من 20 ألف مشترٍ، بأسعار مطورين محدّثة.",
    },
  },
  Faqs: [
    {
      Question: { en: "Will my website work in Arabic and English?", ar: "هل يعمل موقعي بالعربية والإنجليزية؟" },
      Answer: {
        en: "Yes. We build both languages from day one, with a right-to-left layout done properly rather than added later.",
        ar: "نعم. نبني اللغتين من اليوم الأول، مع اتجاه صحيح من اليمين لليسار وليس مضافًا لاحقًا.",
      },
    },
    {
      Question: { en: "Can I update the content myself?", ar: "هل أستطيع تعديل المحتوى بنفسي؟" },
      Answer: {
        en: "Yes. You get an admin panel to update text, images and pages without a developer.",
        ar: "نعم. تحصل على لوحة تحكم تعدّل منها النصوص والصور والصفحات دون الحاجة إلى مطوّر.",
      },
    },
    {
      Question: { en: "Can you improve my current site instead of rebuilding it?", ar: "هل يمكن تحسين موقعي الحالي بدل إعادة بنائه؟" },
      Answer: {
        en: "Often, yes. We start with a speed and SEO audit, then decide with you whether to optimize or rebuild.",
        ar: "غالبًا نعم. نبدأ بفحص للسرعة والـ SEO، ثم نقرر معك هل الأفضل التحسين أم إعادة البناء.",
      },
    },
  ],
};
