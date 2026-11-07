import type { TBilingual } from "@/Lib/Seo";

export type TServiceIcon = "Code" | "Smartphone" | "Cloud" | "Brain" | "Server" | "Shield";

export type TSubService = { Title: TBilingual; Text: TBilingual };

export type TStackGroup = { Label: TBilingual; Tools: string[] };

export type TServiceProof = { Kind: "project" | "product"; Slug: string; Note: TBilingual };

export type TServiceFaq = { Question: TBilingual; Answer: TBilingual };

export type TService = {
  Id: string;
  Icon: TServiceIcon;
  Title: TBilingual;
  Description: TBilingual;
  MetaDescription: TBilingual;
  Intro: TBilingual;
  Features: TBilingual[];
  SubServices: TSubService[];
  StackGroups: TStackGroup[];
  Deliverables: TBilingual[];
  Proof: TServiceProof;
  Faqs: TServiceFaq[];
};

export const SHARED_DELIVERABLES: TBilingual[] = [
  { en: "Full source code and design, owned by you", ar: "الكود والتصميم كاملين وملكيتهما لك" },
  { en: "Documentation and a handover session for your team", ar: "توثيق كامل وجلسة تسليم لفريقك" },
  { en: "Accounts, domain and hosting registered in your name", ar: "الحسابات والنطاق والاستضافة مسجلة باسمك" },
  { en: "Payments tied to milestones you can test", ar: "دفعات مرتبطة بمراحل تختبرها بنفسك" },
];
