import type { TBilingual } from "@/Lib/Seo";

export type TServiceIcon = "Code" | "Smartphone" | "Cloud" | "Brain" | "Server" | "Shield";

export type TService = {
  Id: string;
  Icon: TServiceIcon;
  Title: TBilingual;
  Description: TBilingual;
  Features: TBilingual[];
  Stack?: string[];
};

export const SERVICES: TService[] = [
  {
    Id: "web",
    Icon: "Code",
    Title: { en: "Web Development", ar: "تطوير المواقع" },
    Description: {
      en: "Websites that load fast, rank on Google and turn visitors into paying customers.",
      ar: "مواقع سريعة تتصدر نتائج البحث وتحوّل الزوار إلى عملاء.",
    },
    Features: [
      { en: "Loads in under a second", ar: "تحميل في أقل من ثانية" },
      { en: "Built to rank on Google", ar: "مهيأ لتصدّر نتائج Google" },
      { en: "Flawless on mobile", ar: "مثالي على الجوال" },
      { en: "Designed to convert visitors", ar: "مصمم لتحويل الزوار إلى عملاء" },
    ],
    Stack: ["Next.js", "React", "TypeScript"],
  },
  {
    Id: "mobile",
    Icon: "Smartphone",
    Title: { en: "Mobile Apps", ar: "تطبيقات الجوال" },
    Description: {
      en: "Apps your customers keep coming back to, on iPhone and Android alike.",
      ar: "تطبيقات يعود إليها عملاؤك يوميًا على iPhone وAndroid معًا.",
    },
    Features: [
      { en: "One app for iOS and Android", ar: "تطبيق واحد لنظامي iOS وAndroid" },
      { en: "Notifications that bring users back", ar: "إشعارات تعيد عملاءك إليك" },
      { en: "Works even offline", ar: "يعمل حتى دون اتصال بالإنترنت" },
      { en: "Store-ready from day one", ar: "جاهز للنشر على المتاجر" },
    ],
    Stack: ["Flutter"],
  },
  {
    Id: "saas",
    Icon: "Cloud",
    Title: { en: "SaaS Platforms", ar: "منصات SaaS" },
    Description: {
      en: "Launch a subscription product that scales smoothly from 10 users to 10K.",
      ar: "أطلق منتجك بنظام الاشتراك ليتوسع بسلاسة من 10 مستخدمين إلى 10 آلاف.",
    },
    Features: [
      { en: "Subscriptions and billing built in", ar: "اشتراكات وفوترة مدمجة" },
      { en: "Scales as your users grow", ar: "يتوسع مع نمو مستخدميك" },
      { en: "Admin dashboard included", ar: "لوحة تحكم إدارية جاهزة" },
      { en: "Reports that track your numbers", ar: "تقارير تتابع منها أرقامك" },
    ],
    Stack: ["Node.js", "Bun", "Hono", "PostgreSQL"],
  },
  {
    Id: "ai",
    Icon: "Brain",
    Title: { en: "AI Solutions", ar: "حلول الذكاء الاصطناعي" },
    Description: {
      en: "Automate the busywork and unlock the insights hiding in your data.",
      ar: "أتمتة المهام المتكررة واستخراج الرؤى المخفية في بياناتك.",
    },
    Features: [
      { en: "Automate repetitive work", ar: "أتمتة المهام المتكررة" },
      { en: "Smart search and recommendations", ar: "بحث وتوصيات ذكية" },
      { en: "An assistant that serves your customers", ar: "مساعد ذكي يخدم عملاءك" },
      { en: "Decisions backed by your data", ar: "قرارات مبنية على بياناتك" },
    ],
    Stack: ["Claude", "GPT", "Gemini", "Kimi", "GLM", "Llama", "Mistral", "pgvector", "Whisper", "LangChain", "Python", "FastAPI"],
  },
  {
    Id: "hosting",
    Icon: "Server",
    Title: { en: "Hosting & Operations", ar: "الاستضافة والتشغيل" },
    Description: {
      en: "Your platform online around the clock, with updates shipped in minutes.",
      ar: "منصتك تعمل على مدار الساعة، والتحديثات تُنشر في دقائق.",
    },
    Features: [
      { en: "Online around the clock", ar: "استقرار على مدار الساعة" },
      { en: "Updates ship in minutes", ar: "تحديثات تُنشر في دقائق" },
      { en: "Automatic backups", ar: "نسخ احتياطي تلقائي" },
      { en: "Hosting costs under control", ar: "تكاليف استضافة تحت السيطرة" },
    ],
    Stack: ["Nginx", "GitHub Actions"],
  },
  {
    Id: "security",
    Icon: "Shield",
    Title: { en: "Cybersecurity", ar: "الأمن السيبراني" },
    Description: {
      en: "Protect your customers' data and your reputation before incidents happen.",
      ar: "احمِ بيانات عملائك وسمعتك قبل وقوع الحوادث، لا بعدها.",
    },
    Features: [
      { en: "Customer data protected", ar: "حماية بيانات عملائك" },
      { en: "Regular penetration testing", ar: "اختبارات اختراق دورية" },
      { en: "Compliance-ready", ar: "جاهزية للامتثال والمعايير" },
      { en: "An incident response plan", ar: "خطة استجابة للطوارئ" },
    ],
    Stack: ["BunXRay", "Cloudflare", "Let's Encrypt", "Fail2ban", "UFW", "Sentry", "OWASP ZAP", "Burp Suite", "Snyk", "Dependabot"],
  },
];

export const TECH_EXPERTISE: string[] = Array.from(new Set(SERVICES.flatMap((Service) => Service.Stack ?? [])));
