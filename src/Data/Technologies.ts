import type { TBilingual } from "@/Lib/Seo";

export type TTechCategory = {
  Name: TBilingual;
  Benefit: TBilingual;
  Items: string[];
};

export type TKeyTech = {
  Name: string;
  Description: TBilingual;
};

export const TECH_CATEGORIES: TTechCategory[] = [
  {
    Name: { en: "Frontend", ar: "الواجهات" },
    Benefit: {
      en: "What your customers see: fast, polished and working on every screen.",
      ar: "ما يراه عميلك: سريع ومتقن ويعمل على كل الشاشات.",
    },
    Items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Framer Motion", "Three.js", "Gatsby", "Astro"],
  },
  {
    Name: { en: "Mobile", ar: "الجوال" },
    Benefit: {
      en: "One investment, two platforms: your app on iPhone and Android together.",
      ar: "استثمار واحد لمنصتين: تطبيقك على iPhone وAndroid معًا.",
    },
    Items: ["Flutter", "React Native", "Expo", "Swift", "Kotlin", "Objective-C"],
  },
  {
    Name: { en: "Backend", ar: "الأنظمة الخلفية" },
    Benefit: {
      en: "The engine room: stable under pressure and ready for growth.",
      ar: "غرفة المحركات: ثابتة تحت الضغط وجاهزة للنمو.",
    },
    Items: ["Node.js", "Bun", "NestJS", "Hono", "Express", "Fastify", "Python", "Django", "FastAPI", "Go", "PHP Laravel"],
  },
  {
    Name: { en: "Database", ar: "قواعد البيانات" },
    Benefit: {
      en: "Your data safe, organized and backed up: the asset your business runs on.",
      ar: "بياناتك آمنة ومنظمة ولها نسخ احتياطية، فهي الأصل الذي يقوم عليه عملك.",
    },
    Items: ["PostgreSQL", "MongoDB", "MySQL", "MariaDB", "Redis", "Supabase", "Firebase"],
  },
  {
    Name: { en: "DevOps & Cloud", ar: "التشغيل والسحابة" },
    Benefit: {
      en: "Always online, updates without downtime and hosting bills that don't surprise you.",
      ar: "تعمل دائمًا، وتحديثات دون توقف، وفواتير استضافة بلا مفاجآت.",
    },
    Items: [
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

export const KEY_TECHS: TKeyTech[] = [
  {
    Name: "React",
    Description: {
      en: "A JavaScript library for building fast, interactive user interfaces from reusable components.",
      ar: "مكتبة JavaScript لبناء واجهات مستخدم تفاعلية وسريعة تعتمد على مكونات قابلة لإعادة الاستخدام.",
    },
  },
  {
    Name: "Node.js",
    Description: {
      en: "A JavaScript runtime for building high-performance, scalable backend applications.",
      ar: "بيئة تشغيل JavaScript على الخادم لبناء تطبيقات خلفية عالية الأداء وقابلة للتوسع.",
    },
  },
  {
    Name: "Next.js",
    Description: {
      en: "A React framework supporting SSR and SSG for performance, SEO and user experience.",
      ar: "إطار عمل مبني على React يدعم SSR وSSG لتحسين الأداء وتجربة المستخدم والظهور في محركات البحث.",
    },
  },
  {
    Name: "TypeScript",
    Description: {
      en: "A typed superset of JavaScript that improves code quality and reduces errors in large projects.",
      ar: "امتداد لـ JavaScript يضيف نظام أنواع قويًا لتحسين جودة الكود وتقليل الأخطاء في المشاريع الكبيرة.",
    },
  },
  {
    Name: "Flutter",
    Description: {
      en: "Google's UI toolkit for building cross-platform apps for Android, iOS and the web from one codebase.",
      ar: "إطار عمل مفتوح المصدر من Google لبناء تطبيقات تعمل على Android وiOS والويب بقاعدة كود واحدة.",
    },
  },
  {
    Name: "Python",
    Description: {
      en: "A versatile language widely used in AI, data analysis, automation and backend development.",
      ar: "لغة برمجة متعددة الاستخدامات في الذكاء الاصطناعي وتحليل البيانات والأتمتة والأنظمة الخلفية.",
    },
  },
  {
    Name: "AWS",
    Description: {
      en: "A cloud platform providing scalable, secure infrastructure for modern applications.",
      ar: "منصة خدمات سحابية توفر بنية تحتية موثوقة وقابلة للتوسع لتشغيل التطبيقات والأنظمة.",
    },
  },
  {
    Name: "PostgreSQL",
    Description: {
      en: "A powerful, secure relational database built for complex queries and large-scale data.",
      ar: "نظام قواعد بيانات علائقي قوي وآمن يدعم الاستعلامات المعقدة والبيانات الكبيرة.",
    },
  },
  {
    Name: "Docker",
    Description: {
      en: "A containerization platform that keeps deployments consistent across environments.",
      ar: "أداة لتشغيل التطبيقات داخل حاويات معزولة تضمن سهولة النشر والتوافق بين البيئات المختلفة.",
    },
  },
];
