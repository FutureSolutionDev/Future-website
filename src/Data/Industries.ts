import type { TBilingual } from "@/Lib/Seo";

export type TIndustryIcon = "ShoppingCart" | "BarChart" | "Server" | "Layers";

export type TIndustry = {
  Slug: string;
  Icon: TIndustryIcon;
  Title: TBilingual;
  Content: TBilingual;
  Points: TBilingual[];
};

export const INDUSTRIES: TIndustry[] = [
  {
    Slug: "e-commerce-solutions",
    Icon: "ShoppingCart",
    Title: { en: "E-Commerce", ar: "التجارة الإلكترونية" },
    Content: {
      en: "Your store is more than product pages. It is a system that sells while you sleep: it takes payments, manages stock and wins back abandoned carts.",
      ar: "متجرك ليس مجرد صفحات منتجات، بل نظام كامل يبيع وأنت نائم: يستقبل المدفوعات، ويدير المخزون، ويعيد العميل الذي ترك السلة.",
    },
    Points: [
      { en: "Cart and secure checkout (cards and bank transfer)", ar: "سلة ودفع إلكتروني آمن (بطاقات وتحويل بنكي)" },
      { en: "Inventory, orders and automatic invoices", ar: "إدارة المخزون والطلبات والفواتير تلقائيًا" },
      { en: "Coupons, email campaigns and cart recovery", ar: "كوبونات وحملات بريدية واسترجاع السلات" },
      { en: "Dashboard with daily sales reports", ar: "لوحة تحكم بتقارير مبيعات يومية" },
    ],
  },
  {
    Slug: "fintech-solutions",
    Icon: "BarChart",
    Title: { en: "FinTech", ar: "التقنية المالية" },
    Content: {
      en: "With money there is no room for error: financial systems where every transaction is recorded, encrypted and auditable.",
      ar: "لا مجال للخطأ عندما يتعلق الأمر بالمال: أنظمة مالية تُسجَّل فيها كل عملية وتُشفَّر وتكون قابلة للتدقيق.",
    },
    Points: [
      { en: "Encrypted transactions with two-factor authentication", ar: "عمليات آمنة بتشفير وتحقق ثنائي" },
      { en: "Real-time dashboards for balances and flows", ar: "لوحات بيانات فورية للأرصدة والتدفقات" },
      { en: "Complete audit logs for every action", ar: "سجلات تدقيق كاملة لكل حركة" },
      { en: "Payment gateway and banking integrations", ar: "تكامل مع بوابات الدفع والبنوك" },
    ],
  },
  {
    Slug: "erp-solutions",
    Icon: "Server",
    Title: { en: "Enterprise ERP", ar: "أنظمة تخطيط الموارد" },
    Content: {
      en: "Instead of running your business across Excel, WhatsApp and paper, use one system for HR, inventory, procurement and accounting.",
      ar: "بدلًا من أن يتوزع عملك بين Excel وواتساب والأوراق، نظام واحد يجمع الموارد البشرية والمخازن والمشتريات والحسابات.",
    },
    Points: [
      { en: "Every department in one connected system", ar: "كل الأقسام في نظام واحد متصل" },
      { en: "Role-based permissions for each employee", ar: "صلاحيات دقيقة لكل موظف حسب دوره" },
      { en: "Customizable reports for decision-making", ar: "تقارير قابلة للتخصيص لاتخاذ القرار" },
      { en: "Integrates with your existing tools", ar: "يتكامل مع أنظمتك وأدواتك الحالية" },
    ],
  },
  {
    Slug: "healthcare-solutions",
    Icon: "Layers",
    Title: { en: "Healthcare", ar: "الرعاية الصحية" },
    Content: {
      en: "Your clinic deserves a system that respects patients' time and data privacy, from booking to follow-up.",
      ar: "عيادتك أو مركزك يستحق نظامًا يحترم وقت المريض وخصوصية بياناته، من الحجز حتى المتابعة.",
    },
    Points: [
      { en: "Online booking with automatic reminders", ar: "حجز مواعيد عبر الإنترنت مع تذكيرات تلقائية" },
      { en: "Secure, organized patient records", ar: "ملفات مرضى آمنة ومنظمة" },
      { en: "Video telemedicine consultations", ar: "استشارات عن بُعد بالفيديو" },
      { en: "Health-data privacy compliance built in", ar: "التزام بمعايير خصوصية البيانات الصحية" },
    ],
  },
];
