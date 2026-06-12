// Portfolio projects — fill this in and the Portfolio page goes live automatically.
// While the list is empty the page is hidden from the navbar and the sitemap
// (see Navbar.tsx and app/sitemap.ts).
import type { Lang } from "@/lib/seo";

export type TProject = {
  title: string;
  /** Image under public/Projects/, e.g. '/Projects/FinDash.webp' (compress before adding!) */
  image: string;
  category: string;
  description: Record<Lang, string>;
  /** One concrete, measurable outcome — results sell better than tech lists */
  result?: Record<Lang, string>;
  tech: string[];
  features?: string[];
  /** Tailwind gradient classes for the card accent */
  color: string;
  links: { Github?: string; Live?: string };
};

export const Projects: TProject[] = [
  // Template — copy, fill with a REAL project, and delete this comment:
  {
    title: " Imtithal",
    image: "/Projects/Imtithal.png",
    category: "E-Commerce",
    description: {
      en: "ISO compliance documentation packs for B2B teams — structured, priced clearly, and ready to download.",
      ar: "حزم وثائق امتثال ISO لفرق B2B — منظمة وواضحة الأسعار وجاهزة للتحميل الفوري.",
    },
    result: {
      en: "ISO compliance documentation packs for B2B teams — structured, priced clearly, and ready to download.",
      ar: "حزم وثائق امتثال ISO لفرق B2B — منظمة وواضحة الأسعار وجاهزة للتحميل الفوري.",
    },
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Cms"],
    features: [
      "Invoice Management",
      "Payment Gateway Integration",
      "Order Management System",
      "Analytics Dashboard",
      "Multi-Language Support",
      "Mobile-First Design",
      "SEO Optimization",
      "User-Friendly Interface",
      "Customer Support",
      "Secure Payment Processing",
      "API Integration",
      "CMS",
      "Email Marking System",
      "Full Admin Moderation Control",
      "Advanced Reporting",
      "Advanced Import Packs",
      "Multi-Warehouse Support",
      "Belt-In Contact Tickets Support",
      "Belt-In Live Chat Support",

    ],
    color: "from-blue-500 to-indigo-600",
    links: { Live: "https://imtithal.store" },
  },
];
