import type { TService } from "./Types";

export const MOBILE_SERVICE: TService = {
  Id: "mobile",
  Icon: "Smartphone",
  Title: { en: "Mobile Apps", ar: "تطبيقات الجوال" },
  Description: {
    en: "Apps your customers keep coming back to, on iPhone and Android alike.",
    ar: "تطبيقات يعود إليها عملاؤك يوميًا على iPhone وAndroid معًا.",
  },
  MetaDescription: {
    en: "iPhone and Android apps from one codebase with Flutter or React Native, with notifications, offline mode and store publishing.",
    ar: "تطبيقات iPhone وAndroid من كود واحد بـ Flutter أو React Native، بإشعارات وعمل دون إنترنت ونشر على المتاجر.",
  },
  Intro: {
    en: "We build apps for iPhone and Android from one codebase with Flutter or React Native, connect them to your systems and publish them on both stores under your name.",
    ar: "نبني تطبيقات iPhone وAndroid من كود واحد بـ Flutter أو React Native، ونربطها بأنظمتك، وننشرها على المتجرين باسمك.",
  },
  Features: [
    { en: "One app for iOS and Android", ar: "تطبيق واحد لنظامي iOS وAndroid" },
    { en: "Notifications that bring users back", ar: "إشعارات تعيد عملاءك إليك" },
    { en: "Works even offline", ar: "يعمل حتى دون اتصال بالإنترنت" },
    { en: "Store-ready from day one", ar: "جاهز للنشر على المتاجر" },
  ],
  SubServices: [
    {
      Title: { en: "Customer apps", ar: "تطبيقات العملاء" },
      Text: {
        en: "Ordering, booking and browsing apps that keep your brand on your customer's home screen.",
        ar: "تطبيقات طلب وحجز وتصفح تُبقي علامتك على شاشة عميلك الرئيسية.",
      },
    },
    {
      Title: { en: "Field team apps", ar: "تطبيقات الفرق الميدانية" },
      Text: {
        en: "Tools for sales reps, drivers and inspectors that keep working when the signal drops.",
        ar: "أدوات لمندوبي المبيعات والسائقين والمفتشين تستمر في العمل عند انقطاع الشبكة.",
      },
    },
    {
      Title: { en: "A companion app for your platform", ar: "تطبيق مكمّل لمنصتك" },
      Text: {
        en: "The mobile side of your web system, sharing the same accounts, data and API.",
        ar: "الجانب المحمول من نظامك على الويب، بالحسابات والبيانات والـ API نفسها.",
      },
    },
    {
      Title: { en: "Notifications and engagement", ar: "الإشعارات والتفاعل" },
      Text: {
        en: "Targeted push notifications that bring users back at the right moment.",
        ar: "إشعارات موجهة تعيد المستخدم إلى التطبيق في الوقت المناسب.",
      },
    },
    {
      Title: { en: "Store publishing", ar: "النشر على المتاجر" },
      Text: {
        en: "Listings, review requirements and releases on Google Play and the App Store, handled for you.",
        ar: "نتولى صفحات التطبيق ومتطلبات المراجعة والإصدارات على Google Play وApp Store.",
      },
    },
    {
      Title: { en: "Updates and upkeep", ar: "التحديث والصيانة" },
      Text: {
        en: "New features and compatibility with every new iOS and Android release.",
        ar: "ميزات جديدة وتوافق مع كل إصدار جديد من iOS وAndroid.",
      },
    },
  ],
  StackGroups: [
    { Label: { en: "Cross-platform", ar: "تعدد المنصات" }, Tools: ["Flutter", "Dart", "React Native", "Expo"] },
    {
      Label: { en: "App services", ar: "خدمات التطبيق" },
      Tools: ["Firebase Auth", "Firebase Cloud Messaging", "Crashlytics"],
    },
    { Label: { en: "Backend and data", ar: "الخادم والبيانات" }, Tools: ["Node.js", "PostgreSQL", "REST", "WebSockets"] },
    { Label: { en: "Stores", ar: "المتاجر" }, Tools: ["Google Play", "App Store"] },
  ],
  Deliverables: [
    { en: "Store listings and release builds", ar: "صفحات المتجر ونسخ الإصدار جاهزة" },
    { en: "Crash and usage tracking from day one", ar: "تتبع الأعطال والاستخدام من اليوم الأول" },
  ],
  Proof: {
    Kind: "project",
    Slug: "adham-fathallah",
    Note: {
      en: "A property app live on Google Play, connected to the same platform as the website.",
      ar: "تطبيق عقاري منشور على Google Play ومتصل بالمنصة نفسها التي يعمل عليها الموقع.",
    },
  },
  Faqs: [
    {
      Question: { en: "Flutter or React Native?", ar: "Flutter أم React Native؟" },
      Answer: {
        en: "We choose per project: Flutter for highly custom interfaces, React Native when you already run a React web stack and want to share logic.",
        ar: "نختار حسب المشروع: Flutter للواجهات المخصصة بالكامل، وReact Native إذا كان لديك موقع React وتريد مشاركة المنطق بينهما.",
      },
    },
    {
      Question: { en: "Do I need two separate apps?", ar: "هل أحتاج إلى تطبيقين منفصلين؟" },
      Answer: {
        en: "No. One codebase serves both iPhone and Android, which lowers cost and keeps both versions in sync.",
        ar: "لا. كود واحد يخدم iPhone وAndroid معًا، وهذا يقلل التكلفة ويُبقي النسختين متطابقتين.",
      },
    },
    {
      Question: { en: "Who publishes the app on the stores?", ar: "من ينشر التطبيق على المتاجر؟" },
      Answer: {
        en: "We do, under your own developer accounts, so the app always stays in your name.",
        ar: "نحن ننشره من حسابات المطوّر الخاصة بك، فيبقى التطبيق باسمك دائمًا.",
      },
    },
  ],
};
