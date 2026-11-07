import type { TService } from "./Types";

export const SECURITY_SERVICE: TService = {
  Id: "security",
  Icon: "Shield",
  Title: { en: "Cybersecurity", ar: "الأمن السيبراني" },
  Description: {
    en: "Protect your customers' data and your reputation before incidents happen.",
    ar: "احمِ بيانات عملائك وسمعتك قبل وقوع الحوادث، لا بعدها.",
  },
  MetaDescription: {
    en: "Penetration testing, AI security testing, server hardening, dependency audits and Cloudflare protection, with a clear report of every fix.",
    ar: "اختبارات اختراق واختبار أمان بالذكاء الاصطناعي وتأمين الخوادم وفحص المكتبات وحماية Cloudflare، مع تقرير واضح بكل إصلاح.",
  },
  Intro: {
    en: "We find the weak points in your site and servers before attackers do, fix them, and set up the protection and monitoring that keep them closed.",
    ar: "نكتشف نقاط الضعف في موقعك وخوادمك قبل المهاجمين، ونصلحها، ونجهز الحماية والمراقبة التي تُبقيها مغلقة.",
  },
  Features: [
    { en: "Customer data protected", ar: "حماية بيانات عملائك" },
    { en: "Regular penetration testing", ar: "اختبارات اختراق دورية" },
    { en: "Compliance-ready", ar: "جاهزية للامتثال والمعايير" },
    { en: "An incident response plan", ar: "خطة استجابة للطوارئ" },
  ],
  SubServices: [
    {
      Title: { en: "Penetration testing", ar: "اختبار الاختراق" },
      Text: {
        en: "Manual and tool-assisted testing of your site and API against the OWASP Top 10 and logic flaws.",
        ar: "اختبار يدوي وبالأدوات لموقعك والـ API ضد قائمة OWASP Top 10 وثغرات المنطق.",
      },
    },
    {
      Title: { en: "AI security testing", ar: "اختبار الأمان بالذكاء الاصطناعي" },
      Text: {
        en: "Our own AI team tests your real site step by step, and you watch every request it sends.",
        ar: "فريقنا من الذكاء الاصطناعي يختبر موقعك خطوة بخطوة، وتتابع كل طلب يرسله.",
      },
    },
    {
      Title: { en: "Server hardening", ar: "تأمين الخوادم" },
      Text: {
        en: "Firewall rules, brute-force blocking, SSL and least-privilege access on every server.",
        ar: "قواعد جدار الحماية، وصد محاولات التخمين، وشهادات SSL، وصلاحيات بالحد الأدنى على كل خادم.",
      },
    },
    {
      Title: { en: "Code and dependency audits", ar: "فحص الكود والمكتبات" },
      Text: {
        en: "Known vulnerabilities in your libraries found and patched automatically.",
        ar: "اكتشاف الثغرات المعروفة في مكتباتك وتحديثها تلقائيًا.",
      },
    },
    {
      Title: { en: "Attack protection", ar: "الحماية من الهجمات" },
      Text: {
        en: "Cloudflare in front of your site to absorb DDoS attacks and block malicious traffic.",
        ar: "Cloudflare أمام موقعك لامتصاص هجمات DDoS وحجب الزيارات الضارة.",
      },
    },
    {
      Title: { en: "Monitoring and response", ar: "المراقبة والاستجابة" },
      Text: {
        en: "Error and attack monitoring, plus a clear plan for who does what when something happens.",
        ar: "مراقبة للأخطاء ومحاولات الهجوم، وخطة واضحة لمن يفعل ماذا عند وقوع حادث.",
      },
    },
  ],
  StackGroups: [
    { Label: { en: "Testing", ar: "الاختبار" }, Tools: ["BunXRay", "OWASP ZAP", "Burp Suite"] },
    { Label: { en: "Protection", ar: "الحماية" }, Tools: ["Cloudflare", "Let's Encrypt", "Fail2ban", "UFW"] },
    { Label: { en: "Code and monitoring", ar: "الكود والمراقبة" }, Tools: ["Snyk", "Dependabot", "Sentry"] },
  ],
  Deliverables: [
    { en: "A report with evidence and severity for each finding", ar: "تقرير بالدليل ودرجة الخطورة لكل ثغرة" },
    { en: "A retest after fixes to confirm they hold", ar: "إعادة اختبار بعد الإصلاح للتأكد من إغلاقها" },
  ],
  Proof: {
    Kind: "product",
    Slug: "bunxray",
    Note: {
      en: "Our AI security testing product, now in invite-only beta.",
      ar: "منتجنا لاختبار الأمان بالذكاء الاصطناعي، والمتاح الآن بنسخة تجريبية بالدعوة.",
    },
  },
  Faqs: [
    {
      Question: { en: "How often should we run a security test?", ar: "كل كم مرة نختبر أمان الموقع؟" },
      Answer: {
        en: "Before every major launch, and on a schedule that matches your risk, usually every quarter.",
        ar: "قبل كل إطلاق كبير، وعلى جدول يناسب حجم المخاطر لديك، وغالبًا كل ثلاثة أشهر.",
      },
    },
    {
      Question: { en: "Can testing break my live site?", ar: "هل يمكن أن يتسبب الاختبار في تعطيل موقعي؟" },
      Answer: {
        en: "We agree on scope and timing first, and test on a staging copy whenever possible.",
        ar: "نتفق على النطاق والتوقيت أولًا، ونختبر على نسخة تجريبية كلما أمكن.",
      },
    },
    {
      Question: { en: "What do I get at the end?", ar: "ماذا أستلم في النهاية؟" },
      Answer: {
        en: "A report with each finding, its evidence, its severity and the exact fix, then a retest.",
        ar: "تقرير بكل ثغرة ودليلها ودرجة خطورتها والإصلاح المطلوب بالتحديد، ثم إعادة اختبار.",
      },
    },
  ],
};
