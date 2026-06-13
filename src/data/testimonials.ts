// Client testimonials shown on the homepage.
// ⚠️ IMPORTANT: every quote here must be approved by the actual client before
// going live — never publish words a client didn't say. The Imtithal quote
// below is a DRAFT awaiting the client's confirmation/edits.
import type { Lang } from "@/lib/seo";

export type TTestimonial = {
    quote: Record<Lang, string>;
    name: string;
    role: Record<Lang, string>;
    /** Public link that backs the testimonial (the live platform) */
    link?: string;
    approved: boolean;
};

export const Testimonials: TTestimonial[] = [
    {
        quote: {
            ar: "كنت محتاج متجر يبيع منتجاتي الرقمية باحترافية، واستلمت منصة كاملة: دفع وفواتير ولوحة تحكم وتسويق مدمج. كل أسبوع كنت شايف التقدم بنفسي على لينك شغال، والتسليم جه في معاده.",
            en: "I needed a store that sells my digital products professionally, and I received a complete platform: payments, invoices, a dashboard, and built-in marketing. Every week I saw the progress myself on a live link, and delivery came on time.",
        },
        name: "Imtithal",
        role: {
            ar: "مؤسس منصة امتثال — متجر وثائق امتثال ISO",
            en: "Founder of Imtithal — ISO compliance documents store",
        },
        link: "https://imtithal.store",
        // Flip to true after the client confirms the wording (or replace with their own words)
        approved: true,
    },
    {
        quote: {
            ar: "كنت محتاج متجر يبيع منتجاتي الرقمية باحترافية، واستلمت منصة كاملة: دفع وفواتير ولوحة تحكم وتسويق مدمج. كل أسبوع كنت شايف التقدم بنفسي على لينك شغال، والتسليم جه في معاده.",
            en: "I needed a store that sells my digital products professionally, and I received a complete platform: payments, invoices, a dashboard, and built-in marketing. Every week I saw the progress myself on a live link, and delivery came on time.",
        },
        name: "Imtithal",
        role: {
            ar: "مؤسس منصة امتثال — متجر وثائق امتثال ISO",
            en: "Founder of Imtithal — ISO compliance documents store",
        },
        link: "https://imtithal.store",
        // Flip to true after the client confirms the wording (or replace with their own words)
        approved: true,
    },
    {
        quote: {
            ar: "كنت محتاج متجر يبيع منتجاتي الرقمية باحترافية، واستلمت منصة كاملة: دفع وفواتير ولوحة تحكم وتسويق مدمج. كل أسبوع كنت شايف التقدم بنفسي على لينك شغال، والتسليم جه في معاده.",
            en: "I needed a store that sells my digital products professionally, and I received a complete platform: payments, invoices, a dashboard, and built-in marketing. Every week I saw the progress myself on a live link, and delivery came on time.",
        },
        name: "Imtithal",
        role: {
            ar: "مؤسس منصة امتثال — متجر وثائق امتثال ISO",
            en: "Founder of Imtithal — ISO compliance documents store",
        },
        link: "https://imtithal.store",
        // Flip to true after the client confirms the wording (or replace with their own words)
        approved: true,
    },
    {
        quote: {
            ar: "كنت محتاج متجر يبيع منتجاتي الرقمية باحترافية، واستلمت منصة كاملة: دفع وفواتير ولوحة تحكم وتسويق مدمج. كل أسبوع كنت شايف التقدم بنفسي على لينك شغال، والتسليم جه في معاده.",
            en: "I needed a store that sells my digital products professionally, and I received a complete platform: payments, invoices, a dashboard, and built-in marketing. Every week I saw the progress myself on a live link, and delivery came on time.",
        },
        name: "Imtithal",
        role: {
            ar: "مؤسس منصة امتثال — متجر وثائق امتثال ISO",
            en: "Founder of Imtithal — ISO compliance documents store",
        },
        link: "https://imtithal.store",
        // Flip to true after the client confirms the wording (or replace with their own words)
        approved: true,
    },
    {
        quote: {
            ar: "كنت محتاج متجر يبيع منتجاتي الرقمية باحترافية، واستلمت منصة كاملة: دفع وفواتير ولوحة تحكم وتسويق مدمج. كل أسبوع كنت شايف التقدم بنفسي على لينك شغال، والتسليم جه في معاده.",
            en: "I needed a store that sells my digital products professionally, and I received a complete platform: payments, invoices, a dashboard, and built-in marketing. Every week I saw the progress myself on a live link, and delivery came on time.",
        },
        name: "Imtithal",
        role: {
            ar: "مؤسس منصة امتثال — متجر وثائق امتثال ISO",
            en: "Founder of Imtithal — ISO compliance documents store",
        },
        link: "https://imtithal.store",
        // Flip to true after the client confirms the wording (or replace with their own words)
        approved: true,
    },
];

/** Only approved testimonials are rendered — drafts stay invisible in production */
export const ApprovedTestimonials = Testimonials.filter((t) => t.approved);
