import type { TBilingual } from "@/Lib/Seo";

export type TTestimonial = {
  Quote: TBilingual;
  Name: string;
  Role: TBilingual;
  Link?: string;
  Approved: boolean;
};

export const TESTIMONIALS: TTestimonial[] = [
  {
    Quote: {
      ar: "كنت محتاج متجر يبيع منتجاتي الرقمية باحترافية، واستلمت منصة كاملة: دفع وفواتير ولوحة تحكم وتسويق مدمج. كل أسبوع كنت شايف التقدم بنفسي على لينك شغال، والتسليم جه في معاده.",
      en: "I needed a store that sells my digital products professionally, and I received a complete platform: payments, invoices, a dashboard and built-in marketing. Every week I saw the progress myself on a live link, and delivery came on time.",
    },
    Name: "Imtithal",
    Role: {
      ar: "مؤسس منصة امتثال، متجر وثائق امتثال ISO",
      en: "Founder of Imtithal, an ISO compliance documents store",
    },
    Link: "https://imtithal.store",
    Approved: true,
  },
];

export const APPROVED_TESTIMONIALS = TESTIMONIALS.filter((Testimonial) => Testimonial.Approved);
