import type { TService } from "./Types";

export const AI_SERVICE: TService = {
  Id: "ai",
  Icon: "Brain",
  Title: { en: "AI Solutions", ar: "حلول الذكاء الاصطناعي" },
  Description: {
    en: "Automate the busywork and unlock the insights hiding in your data.",
    ar: "أتمتة المهام المتكررة واستخراج الرؤى المخفية في بياناتك.",
  },
  MetaDescription: {
    en: "AI assistants on your own data, document and voice processing and workflow automation with Claude, GPT, Gemini and open models.",
    ar: "مساعدات ذكية تعمل على بياناتك، ومعالجة المستندات والصوت، وأتمتة سير العمل بـ Claude وGPT وGemini والنماذج المفتوحة.",
  },
  Intro: {
    en: "We add AI where it saves time or money: assistants that answer from your own data, document and voice processing, and automations, each on the model that fits the task and the budget.",
    ar: "نضيف الذكاء الاصطناعي حيث يوفر وقتًا أو مالًا: مساعدات تجيب من بياناتك، ومعالجة المستندات والصوت، وأتمتة المهام، وكل ذلك على النموذج الذي يناسب المهمة والميزانية.",
  },
  Features: [
    { en: "Automate repetitive work", ar: "أتمتة المهام المتكررة" },
    { en: "Smart search and recommendations", ar: "بحث وتوصيات ذكية" },
    { en: "An assistant that serves your customers", ar: "مساعد ذكي يخدم عملاءك" },
    { en: "Decisions backed by your data", ar: "قرارات مبنية على بياناتك" },
  ],
  SubServices: [
    {
      Title: { en: "Assistants on your data", ar: "مساعدات على بياناتك" },
      Text: {
        en: "An assistant on your site or WhatsApp that answers from your documents and catalog, with sources.",
        ar: "مساعد على موقعك أو واتساب يجيب من مستنداتك وكتالوجك، ويذكر مصدر الإجابة.",
      },
    },
    {
      Title: { en: "Sales and lead qualification", ar: "المبيعات وتأهيل العملاء" },
      Text: {
        en: "An agent that understands requests, recommends options and hands your team a scored lead.",
        ar: "مساعد يفهم الطلب ويرشح الخيارات المناسبة، ويسلّم فريقك عميلًا مُقيّمًا.",
      },
    },
    {
      Title: { en: "Document and data extraction", ar: "استخراج البيانات من المستندات" },
      Text: {
        en: "Invoices, contracts and forms turned into structured data in your system.",
        ar: "الفواتير والعقود والنماذج تتحول إلى بيانات منظمة داخل نظامك.",
      },
    },
    {
      Title: { en: "Voice and transcription", ar: "الصوت والتفريغ النصي" },
      Text: {
        en: "Calls and meetings transcribed and summarized in Arabic and English with Whisper.",
        ar: "تفريغ المكالمات والاجتماعات وتلخيصها بالعربية والإنجليزية باستخدام Whisper.",
      },
    },
    {
      Title: { en: "Workflow automation", ar: "أتمتة سير العمل" },
      Text: {
        en: "Repetitive steps between your tools handled automatically, with a person approving what matters.",
        ar: "خطوات متكررة بين أدواتك تُنفَّذ تلقائيًا، مع موافقة بشرية على ما يهم.",
      },
    },
    {
      Title: { en: "AI security testing", ar: "اختبار الأمان بالذكاء الاصطناعي" },
      Text: {
        en: "A team of AI specialists that tests your site the way an attacker would.",
        ar: "فريق من متخصصي الذكاء الاصطناعي يختبر موقعك كما يفعل المهاجم.",
      },
    },
  ],
  StackGroups: [
    { Label: { en: "Models", ar: "النماذج" }, Tools: ["Claude", "GPT", "Gemini", "Kimi", "GLM", "Llama", "Mistral"] },
    { Label: { en: "Retrieval and speech", ar: "الاسترجاع والصوت" }, Tools: ["pgvector", "LangChain", "Whisper"] },
    { Label: { en: "Services", ar: "الخدمات" }, Tools: ["Python", "FastAPI", "Node.js"] },
  ],
  Deliverables: [
    { en: "An accuracy test on your real data before launch", ar: "اختبار دقة على بياناتك الحقيقية قبل الإطلاق" },
    { en: "Usage and cost tracking per model", ar: "متابعة الاستخدام والتكلفة لكل نموذج" },
  ],
  Proof: {
    Kind: "product",
    Slug: "bunxray",
    Note: {
      en: "Our AI security product: specialists that plan, attack and verify findings on real sites.",
      ar: "منتجنا للأمان بالذكاء الاصطناعي: متخصصون يخططون ويختبرون ويتحققون من النتائج على مواقع حقيقية.",
    },
  },
  Faqs: [
    {
      Question: { en: "Which AI model will you use?", ar: "أي نموذج ذكاء اصطناعي ستستخدمون؟" },
      Answer: {
        en: "The one that fits the task and budget. We test several, and can run open models on your own server when data must stay in-house.",
        ar: "الذي يناسب المهمة والميزانية. نختبر أكثر من نموذج، ويمكننا تشغيل نماذج مفتوحة على خادمك إذا كان يجب أن تبقى البيانات داخليًا.",
      },
    },
    {
      Question: { en: "Will my data be used to train the models?", ar: "هل تُستخدم بياناتي في تدريب النماذج؟" },
      Answer: {
        en: "No. We use API terms that exclude training, or open models hosted privately for you.",
        ar: "لا. نستخدم واجهات لا تدرّب على بياناتك، أو نماذج مفتوحة مستضافة لك بشكل خاص.",
      },
    },
    {
      Question: { en: "What if the assistant gives a wrong answer?", ar: "ماذا لو أعطى المساعد إجابة خاطئة؟" },
      Answer: {
        en: "We ground answers in your own content, show the source and add human review for sensitive steps.",
        ar: "نبني الإجابات على محتواك أنت، ونعرض المصدر، ونضيف مراجعة بشرية للخطوات الحساسة.",
      },
    },
  ],
};
