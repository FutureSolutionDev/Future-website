import type { TBilingual } from "@/Lib/Seo";

export type TFaqLink = {
  Label: TBilingual;
  Href: string;
  Kind: "page" | "article" | "whatsapp";
};

export type TFaqAnswerPart = string | { Text: string; Href: string };

export type TFaq = {
  Id: string;
  Question: TBilingual;
  Answer: Record<"en" | "ar", TFaqAnswerPart[]>;
  Links?: TFaqLink[];
};

export type TFaqChapterIcon = "Compass" | "ShieldCheck" | "Wallet" | "Rocket";

export type TFaqChapter = {
  Id: string;
  Icon: TFaqChapterIcon;
  Title: TBilingual;
  Faqs: TFaq[];
};

export const FAQ_CHAPTERS: TFaqChapter[] = [
  {
    Id: "start",
    Icon: "Compass",
    Title: { en: "Getting started", ar: "البداية" },
    Faqs: [
      {
        Id: "cost",
        Question: { en: "How much does a project cost?", ar: "كم تبلغ تكلفة المشروع؟" },
        Answer: {
          en: [
            "It depends on the scope: a landing site is not an e-commerce platform. After one ",
            { Text: "free consultation", Href: "/contact" },
            " you get a fixed quote with a clear scope. The price you approve is the price you pay.",
          ],
          ar: [
            "تعتمد التكلفة على النطاق؛ فالموقع التعريفي يختلف عن منصة التجارة الإلكترونية. بعد ",
            { Text: "استشارة مجانية", Href: "/contact" },
            " واحدة تستلم عرض سعر ثابتًا بنطاق واضح، والسعر الذي توافق عليه هو ما تدفعه.",
          ],
        },
        Links: [
          {
            Label: { en: "Article: Website development cost in Egypt 2026", ar: "مقال: تكلفة تصميم موقع إلكتروني في مصر 2026" },
            Href: "/blog/website-development-cost-egypt",
            Kind: "article",
          },
        ],
      },
      {
        Id: "timeline",
        Question: { en: "How long does it take?", ar: "كم يستغرق التنفيذ؟" },
        Answer: {
          en: [
            "A typical first version ships in 4 to 8 weeks depending on scope, with a working link you can see every week from week one, as described in ",
            { Text: "how we work", Href: "/#process" },
            ".",
          ],
          ar: [
            "تُسلَّم النسخة الأولى عادةً خلال 4 إلى 8 أسابيع حسب النطاق، وترى رابطًا يعمل ويتحدث كل أسبوع منذ الأسبوع الأول، كما نشرح في ",
            { Text: "طريقة عملنا", Href: "/#process" },
            ".",
          ],
        },
      },
      {
        Id: "not-technical",
        Question: {
          en: "I have an idea but I'm not technical. Where do I start?",
          ar: "لدي فكرة لكني لست تقنيًا، من أين أبدأ؟",
        },
        Answer: {
          en: [
            "That is exactly what the free consultation is for. Tell us the business goal in your own words, and we translate it into what is possible, what it costs and how long it takes.",
          ],
          ar: [
            "هذا بالضبط دور الاستشارة المجانية. احكِ لنا هدفك بكلماتك، ونترجمه نحن إلى ما هو ممكن، وبأي تكلفة، وفي كم من الوقت.",
          ],
        },
        Links: [
          {
            Label: { en: "Article: How to choose a software company", ar: "مقال: كيف تختار شركة البرمجة المناسبة" },
            Href: "/blog/how-to-choose-software-company",
            Kind: "article",
          },
          { Label: { en: "Ask us on WhatsApp", ar: "اسألنا عبر واتساب" }, Href: "whatsapp", Kind: "whatsapp" },
        ],
      },
      {
        Id: "what-you-need",
        Question: {
          en: "What do you need from me to get started?",
          ar: "ما المطلوب مني لنبدأ؟",
        },
        Answer: {
          en: [
            "Three things: describe your goal in plain words, share examples you like (any site or app), and be available for quick decisions when we ask. We handle design, content structure and everything technical. ",
            { Text: "Send us your idea", Href: "/contact" },
            ".",
          ],
          ar: [
            "ثلاثة أشياء: أن تشرح هدفك بكلمات بسيطة، وأن ترسل لنا أمثلة تعجبك (أي موقع أو تطبيق)، وأن تكون متاحًا لقرارات سريعة عندما نسألك. والتصميم وهيكلة المحتوى وكل ما هو تقني علينا. ",
            { Text: "أرسل لنا فكرتك", Href: "/contact" },
            ".",
          ],
        },
      },
    ],
  },
  {
    Id: "ownership",
    Icon: "ShieldCheck",
    Title: { en: "Ownership & security", ar: "الملكية والأمان" },
    Faqs: [
      {
        Id: "code-ownership",
        Question: { en: "Who owns the code?", ar: "لمن تعود ملكية الكود؟" },
        Answer: {
          en: [
            "You do, 100%. Code, design and data are yours, delivered with documentation. There is no lock-in: any developer can continue the work after us.",
          ],
          ar: [
            "لك بالكامل. يُسلَّم إليك الكود والتصميم والبيانات مع التوثيق، فلا احتكار، ويستطيع أي مطوّر استكمال العمل بعدنا.",
          ],
        },
      },
      {
        Id: "confidential",
        Question: { en: "My idea is confidential. How is it protected?", ar: "فكرتي سرية، فما الذي يحميها؟" },
        Answer: {
          en: [
            "We sign an NDA before you share any details. It is standard practice for us. Your idea, data and business information stay confidential whether or not we end up working together.",
          ],
          ar: [
            "نوقّع اتفاقية عدم إفشاء (NDA) قبل أن تشاركنا أي تفاصيل، وهو إجراء معتاد لدينا. تبقى فكرتك وبياناتك ومعلومات عملك سرية سواء عملنا معًا في النهاية أم لا.",
          ],
        },
      },
      {
        Id: "hosting-costs",
        Question: { en: "Who pays for hosting and running costs?", ar: "من يتحمل تكاليف الاستضافة والتشغيل؟" },
        Answer: {
          en: [
            "Hosting and domain are registered in your name and stay yours. Typical costs are known upfront with no hidden markup. We set everything up and can manage it for you through our ",
            { Text: "hosting and operations service", Href: "/services#hosting" },
            ".",
          ],
          ar: [
            "تُسجَّل الاستضافة والنطاق باسمك وتبقى ملكك، وتكلفتها معروفة من البداية دون زيادات مخفية. نجهز كل شيء ويمكننا إدارته لك ضمن ",
            { Text: "خدمة الاستضافة والتشغيل", Href: "/services#hosting" },
            ".",
          ],
        },
      },
    ],
  },
  {
    Id: "payment",
    Icon: "Wallet",
    Title: { en: "Payment & contract", ar: "الدفع والتعاقد" },
    Faqs: [
      {
        Id: "upfront",
        Question: { en: "Do I pay everything upfront?", ar: "هل أدفع المبلغ كاملًا مقدمًا؟" },
        Answer: {
          en: [
            "No. Payment is split into installments tied to delivery milestones you can see and test. You pay for progress you have verified, not for promises.",
          ],
          ar: [
            "لا. يكون الدفع على دفعات مرتبطة بمراحل تسليم تراها وتجربها بنفسك، فتدفع مقابل تقدم تأكدت منه، لا مقابل وعود.",
          ],
        },
      },
      {
        Id: "outside-egypt",
        Question: { en: "Do you work with clients outside Egypt?", ar: "هل تعملون مع عملاء خارج مصر؟" },
        Answer: {
          en: [
            "Yes. We work fully remotely in Arabic and English, and our platforms ship bilingual when your market needs it. See ",
            { Text: "our work", Href: "/portfolio" },
            ".",
          ],
          ar: [
            "نعم، نعمل عن بُعد بالكامل بالعربية والإنجليزية، ومنصاتنا ثنائية اللغة متى احتاج سوقك ذلك. شاهد ",
            { Text: "أعمالنا", Href: "/portfolio" },
            ".",
          ],
        },
      },
    ],
  },
  {
    Id: "after-launch",
    Icon: "Rocket",
    Title: { en: "After launch", ar: "بعد الإطلاق" },
    Faqs: [
      {
        Id: "after-launch",
        Question: { en: "What happens after launch?", ar: "ماذا يحدث بعد الإطلاق؟" },
        Answer: {
          en: [
            "We don't disappear. Support and maintenance plans keep your platform fast, secure and up to date, and we are there for the next feature when you are ready.",
          ],
          ar: [
            "لا نختفي. تحافظ باقات الدعم والصيانة على منصتك سريعة وآمنة ومحدّثة، ونبقى معك للميزة التالية عندما تكون جاهزًا.",
          ],
        },
      },
      {
        Id: "old-system",
        Question: {
          en: "I already have an old website or system. Rebuild or improve?",
          ar: "لدي موقع أو نظام قديم، هل نطوّره أم نبني من جديد؟",
        },
        Answer: {
          en: [
            "We assess it first. Sometimes targeted improvements get you 80% of the value at a fraction of the cost; sometimes a rebuild is genuinely cheaper in the long run. We tell you which, with reasons, before you spend.",
          ],
          ar: [
            "نقيّمه أولًا. أحيانًا تحقق تحسينات محددة 80% من القيمة بجزء بسيط من التكلفة، وأحيانًا تكون إعادة البناء أوفر على المدى الطويل. ونخبرك بالخيار المناسب مع الأسباب قبل أن تدفع.",
          ],
        },
        Links: [
          {
            Label: { en: "Article: Custom website or a website builder?", ar: "مقال: موقع جاهز أم موقع مخصص؟" },
            Href: "/blog/custom-website-vs-website-builders",
            Kind: "article",
          },
        ],
      },
    ],
  },
];

export const ALL_FAQS: TFaq[] = FAQ_CHAPTERS.flatMap((Chapter) => Chapter.Faqs);

export const HOME_FAQ_IDS = ["cost", "timeline", "code-ownership"];

export function AnswerText(Parts: TFaqAnswerPart[]): string {
  return Parts.map((Part) => (typeof Part === "string" ? Part : Part.Text)).join("");
}
