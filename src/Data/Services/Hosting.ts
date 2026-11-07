import type { TService } from "./Types";

export const HOSTING_SERVICE: TService = {
  Id: "hosting",
  Icon: "Server",
  Title: { en: "Hosting & Operations", ar: "الاستضافة والتشغيل" },
  Description: {
    en: "Your platform online around the clock, with updates shipped in minutes.",
    ar: "منصتك تعمل على مدار الساعة، والتحديثات تُنشر في دقائق.",
  },
  MetaDescription: {
    en: "Server setup, automated deployments, monitoring and backups on VPS or AWS, Google Cloud and Azure, with costs you can predict.",
    ar: "تجهيز الخوادم والنشر التلقائي والمراقبة والنسخ الاحتياطي على VPS أو AWS وGoogle Cloud وAzure، بتكلفة معروفة مسبقًا.",
  },
  Intro: {
    en: "We set up and run your infrastructure: servers, automated deployments, monitoring and backups. Your platform stays online, updates ship in minutes and you know what it costs every month.",
    ar: "نجهز البنية التحتية ونشغلها لك: الخوادم، والنشر التلقائي، والمراقبة، والنسخ الاحتياطي. تبقى منصتك متاحة، وتُنشر التحديثات في دقائق، وتعرف تكلفتها كل شهر.",
  },
  Features: [
    { en: "Online around the clock", ar: "استقرار على مدار الساعة" },
    { en: "Updates ship in minutes", ar: "تحديثات تُنشر في دقائق" },
    { en: "Automatic backups", ar: "نسخ احتياطي تلقائي" },
    { en: "Hosting costs under control", ar: "تكاليف استضافة تحت السيطرة" },
  ],
  SubServices: [
    {
      Title: { en: "Server setup", ar: "تجهيز الخوادم" },
      Text: {
        en: "A secured VPS or cloud setup sized for your traffic, registered in your name.",
        ar: "خادم VPS أو سحابي مؤمّن ومناسب لحجم زياراتك، ومسجل باسمك.",
      },
    },
    {
      Title: { en: "Automated deployments", ar: "النشر التلقائي" },
      Text: {
        en: "Every approved change goes live through GitHub Actions in minutes, with a quick rollback.",
        ar: "كل تعديل معتمد يُنشر عبر GitHub Actions في دقائق، مع إمكانية التراجع السريع.",
      },
    },
    {
      Title: { en: "Monitoring and alerts", ar: "المراقبة والتنبيهات" },
      Text: {
        en: "Uptime checks and performance dashboards that alert us before your customers notice.",
        ar: "فحص مستمر لتوفر المنصة ولوحات أداء تنبهنا قبل أن يلاحظ عملاؤك.",
      },
    },
    {
      Title: { en: "Backups and recovery", ar: "النسخ الاحتياطي والاستعادة" },
      Text: {
        en: "Scheduled backups of databases and files to separate storage, tested for restore.",
        ar: "نسخ احتياطي مجدول لقواعد البيانات والملفات في تخزين منفصل، مع اختبار الاستعادة.",
      },
    },
    {
      Title: { en: "Speed and cost tuning", ar: "تحسين السرعة والتكلفة" },
      Text: {
        en: "Caching, CDN and right-sized servers so you stop paying for capacity you do not use.",
        ar: "تخزين مؤقت وCDN وخوادم بالحجم المناسب، فلا تدفع مقابل موارد لا تستخدمها.",
      },
    },
    {
      Title: { en: "Platform migration", ar: "نقل المنصات" },
      Text: {
        en: "Move from shared hosting or another provider with no data loss and minimal downtime.",
        ar: "النقل من الاستضافة المشتركة أو من مزود آخر دون فقدان بيانات وبأقل توقف ممكن.",
      },
    },
  ],
  StackGroups: [
    {
      Label: { en: "Servers and cloud", ar: "الخوادم والسحابة" },
      Tools: ["Hetzner", "DigitalOcean", "Contabo", "AWS", "Google Cloud", "Azure", "Vercel", "Netlify"],
    },
    { Label: { en: "Runtime", ar: "التشغيل" }, Tools: ["Nginx", "PM2", "systemd", "Docker"] },
    { Label: { en: "Delivery", ar: "النشر" }, Tools: ["GitHub Actions"] },
    {
      Label: { en: "Monitoring and backups", ar: "المراقبة والنسخ الاحتياطي" },
      Tools: ["Uptime Kuma", "Better Stack", "Grafana", "Prometheus", "Cloudflare R2", "Amazon S3"],
    },
  ],
  Deliverables: [
    { en: "A runbook for your servers and deployments", ar: "دليل تشغيل للخوادم وخطوات النشر" },
    { en: "A monitoring dashboard you can open anytime", ar: "لوحة مراقبة تفتحها في أي وقت" },
  ],
  Proof: {
    Kind: "project",
    Slug: "master-v",
    Note: {
      en: "A platform used daily by 10K+ brokers, with prices refreshed every day.",
      ar: "منصة يستخدمها يوميًا أكثر من 10 آلاف وسيط، وأسعارها تُحدَّث كل يوم.",
    },
  },
  Faqs: [
    {
      Question: { en: "VPS or cloud?", ar: "خادم VPS أم سحابة؟" },
      Answer: {
        en: "A well-run VPS covers most projects at a fraction of cloud cost. We move to AWS, Google Cloud or Azure when scale or your company policy requires it.",
        ar: "خادم VPS مُدار جيدًا يكفي معظم المشاريع بجزء من تكلفة السحابة، وننتقل إلى AWS أو Google Cloud أو Azure عندما يتطلب الحجم أو سياسة شركتك ذلك.",
      },
    },
    {
      Question: { en: "Who owns the servers?", ar: "لمن تعود ملكية الخوادم؟" },
      Answer: {
        en: "You do. Hosting and domain are registered in your name, and we manage them for you.",
        ar: "لك. تُسجَّل الاستضافة والنطاق باسمك، ونتولى إدارتها نيابة عنك.",
      },
    },
    {
      Question: { en: "What happens if the site goes down at night?", ar: "ماذا يحدث إذا توقف الموقع ليلًا؟" },
      Answer: {
        en: "Monitoring alerts us within minutes, and tested backups let us restore service quickly.",
        ar: "تنبهنا المراقبة خلال دقائق، والنسخ الاحتياطية المختبرة تتيح لنا إعادة الخدمة بسرعة.",
      },
    },
  ],
};
