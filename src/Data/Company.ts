import type { TBilingual } from "@/Lib/Seo";

export type TValueIcon = "LineChart" | "PackageCheck" | "Eye" | "Handshake";
export type TPrincipleIcon = "ShieldCheck" | "Zap" | "Globe" | "Users";

export const COMPANY_VALUES: { Icon: TValueIcon; Title: TBilingual; Text: TBilingual }[] = [
  {
    Icon: "LineChart",
    Title: { en: "Results you can measure", ar: "نتائج تُقاس بالأرقام" },
    Text: {
      en: "Every project starts from a business goal (more sales, faster operations, lower costs), not from a technology wishlist.",
      ar: "يبدأ كل مشروع من هدف تجاري واضح (مبيعات أكثر، وعمليات أسرع، وتكلفة أقل)، لا من قائمة تقنيات.",
    },
  },
  {
    Icon: "PackageCheck",
    Title: { en: "A working product, not just code", ar: "منتج كامل، لا مجرد كود" },
    Text: {
      en: "You receive a running platform: design, development, hosting and training, ready to take customers from day one.",
      ar: "تستلم منصة تعمل: تصميم وتطوير واستضافة وتدريب، جاهزة لاستقبال عملائك من اليوم الأول.",
    },
  },
  {
    Icon: "Eye",
    Title: { en: "Full transparency", ar: "شفافية كاملة" },
    Text: {
      en: "A clear plan, weekly progress you can see for yourself and one price with no surprises.",
      ar: "خطة واضحة، وتقدم أسبوعي تراه بنفسك، وسعر واحد بلا مفاجآت.",
    },
  },
  {
    Icon: "Handshake",
    Title: { en: "A partner after launch", ar: "شريك بعد الإطلاق" },
    Text: {
      en: "Launch is the beginning, not the end. We stay for support, improvements and the next growth step.",
      ar: "الإطلاق بداية العمل لا نهايته، ونبقى معك للدعم والتحسين وخطوة النمو التالية.",
    },
  },
];

export const COMPANY_PRINCIPLES: { Icon: TPrincipleIcon; Title: TBilingual; Text: TBilingual }[] = [
  {
    Icon: "ShieldCheck",
    Title: { en: "Secure & reliable", ar: "آمن وموثوق" },
    Text: { en: "Enterprise-grade security standards.", ar: "معايير أمان على مستوى المؤسسات." },
  },
  {
    Icon: "Zap",
    Title: { en: "High performance", ar: "أداء عالٍ" },
    Text: { en: "Optimized for speed and efficiency.", ar: "سرعة وكفاءة في كل شاشة." },
  },
  {
    Icon: "Globe",
    Title: { en: "Built to scale", ar: "قابلية التوسع" },
    Text: { en: "Infrastructure that grows with you.", ar: "بنية تحتية تنمو معك." },
  },
  {
    Icon: "Users",
    Title: { en: "Expert team", ar: "فريق خبير" },
    Text: { en: "Dedicated senior engineers.", ar: "مهندسون ذوو خبرة عالية." },
  },
];

export const COMPANY_STATS: { Value: string; Label: TBilingual }[] = [
  { Value: "2022", Label: { en: "Founded, serving worldwide", ar: "سنة التأسيس، ونخدم العالم كله" } },
  { Value: "100%", Label: { en: "You own the code", ar: "الكود ملكك بالكامل" } },
  { Value: "24/7", Label: { en: "Platforms live in production", ar: "منصات تعمل في الإنتاج دائمًا" } },
  { Value: "2", Label: { en: "Languages: Arabic and English", ar: "لغتان: العربية والإنجليزية" } },
];

export const HOME_METRICS: { Value: string; Label: TBilingual }[] = [
  { Value: "10K+", Label: { en: "Active brokers on Master V", ar: "وسيط عقاري نشط على Master V" } },
  { Value: "20K+", Label: { en: "Buyers on Adham Fathallah", ar: "مشترٍ على منصة Adham Fathallah" } },
  { Value: "500+", Label: { en: "Digital files sold on Imtithal", ar: "ملف رقمي مُباع على Imtithal" } },
  { Value: "100%", Label: { en: "Code ownership for the client", ar: "ملكية الكود للعميل" } },
];
