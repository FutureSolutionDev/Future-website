import type { TBilingual } from "@/Lib/Seo";

export type TProcessStep = {
  Title: TBilingual;
  Description: TBilingual;
};

export const PROCESS_STEPS: TProcessStep[] = [
  {
    Title: { en: "Free consultation", ar: "استشارة مجانية" },
    Description: {
      en: "We listen to your goal and tell you honestly what is possible, and what is not worth building at all.",
      ar: "نستمع إلى هدفك ونخبرك بصراحة بما هو ممكن، وبما لا يستحق البناء أصلًا.",
    },
  },
  {
    Title: { en: "Plan & fixed quote", ar: "خطة وعرض سعر ثابت" },
    Description: {
      en: "A clear scope, a timeline and one known price, before a single line of code is written.",
      ar: "نطاق واضح وجدول زمني وسعر واحد معروف قبل كتابة أي سطر برمجي.",
    },
  },
  {
    Title: { en: "Weekly deliveries", ar: "تسليمات أسبوعية" },
    Description: {
      en: "You see real progress every week on a working link, with no black box and no surprises at the end.",
      ar: "ترى تقدمًا حقيقيًا كل أسبوع على رابط يعمل، بلا صندوق أسود ولا مفاجآت في النهاية.",
    },
  },
  {
    Title: { en: "Launch & ongoing support", ar: "إطلاق ودعم مستمر" },
    Description: {
      en: "We launch together, train your team and stay with you for maintenance and the next growth step.",
      ar: "نطلق المنصة معًا وندرّب فريقك، ونبقى معك للصيانة وخطوة النمو التالية.",
    },
  },
];
