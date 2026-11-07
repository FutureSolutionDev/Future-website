import type { TIconName } from "@/Components/Common/Icon";
import type { TWorkKind } from "@/Lib/Resolve";
import type { TBilingual } from "@/Lib/Seo";

export type TIndustryLink = { Kind: TWorkKind; Slug: string };

export type TIndustry = {
  Slug: string;
  Icon: TIconName;
  Title: TBilingual;
  Content: TBilingual;
  Points: TBilingual[];
  Link?: TIndustryLink;
  Proofs?: TIndustryLink[];
};

export const FEATURED_INDUSTRY: TIndustry = {
  Slug: "real-estate",
  Icon: "Building",
  Title: { en: "Real Estate", ar: "العقارات" },
  Content: {
    en: "Our deepest sector. We built the platforms brokers use every day: live developer prices and payment plans, brokerage CRMs with commissions and approvals, and buyer portals with mobile apps.",
    ar: "أعمق قطاع لدينا. بنينا المنصات التي يستخدمها الوسطاء يوميًا: أسعار المطورين وأنظمة السداد المحدّثة، وأنظمة CRM لشركات الوساطة بالعمولات والموافقات، وبوابات للمشترين مع تطبيقات جوال.",
  },
  Points: [
    { en: "Live prices, payment plans and ROI calculators", ar: "أسعار محدّثة وأنظمة سداد وحاسبات عائد" },
    { en: "Brokerage CRM with commissions and approvals", ar: "CRM للوساطة بالعمولات والموافقات" },
    { en: "Buyer portals, listings and mobile apps", ar: "بوابات للمشترين وصفحات عرض وتطبيقات جوال" },
    { en: "AI assistants that qualify property inquiries", ar: "مساعدات ذكية تؤهل الاستفسارات العقارية" },
  ],
  Proofs: [
    { Kind: "project", Slug: "master-v" },
    { Kind: "project", Slug: "adham-fathallah" },
    { Kind: "product", Slug: "est8core" },
    { Kind: "product", Slug: "smartestprop" },
  ],
};

export const INDUSTRIES: TIndustry[] = [
  {
    Slug: "e-commerce-solutions",
    Icon: "ShoppingCart",
    Title: { en: "E-Commerce", ar: "التجارة الإلكترونية" },
    Content: {
      en: "A store that sells while you sleep: it takes payments, manages stock and wins back abandoned carts.",
      ar: "متجر يبيع وأنت نائم: يستقبل المدفوعات، ويدير المخزون، ويعيد العميل الذي ترك السلة.",
    },
    Points: [
      { en: "Secure checkout with cards and wallets", ar: "دفع آمن بالبطاقات والمحافظ" },
      { en: "Inventory, orders and automatic invoices", ar: "مخزون وطلبات وفواتير تلقائية" },
      { en: "Coupons and abandoned cart recovery", ar: "كوبونات واسترجاع السلات المتروكة" },
    ],
    Link: { Kind: "article", Slug: "e-commerce-solutions" },
  },
  {
    Slug: "fintech-solutions",
    Icon: "Wallet",
    Title: { en: "FinTech", ar: "التقنية المالية" },
    Content: {
      en: "Financial systems where every transaction is recorded, encrypted and auditable.",
      ar: "أنظمة مالية تُسجَّل فيها كل عملية وتُشفَّر وتكون قابلة للتدقيق.",
    },
    Points: [
      { en: "Encrypted transactions and two-factor login", ar: "عمليات مشفرة وتحقق ثنائي" },
      { en: "Installments, wallets and payment gateways", ar: "أقساط ومحافظ وبوابات دفع" },
      { en: "Complete audit logs for every action", ar: "سجلات تدقيق كاملة لكل حركة" },
    ],
    Link: { Kind: "article", Slug: "fintech-solutions" },
  },
  {
    Slug: "healthcare-solutions",
    Icon: "Stethoscope",
    Title: { en: "Healthcare", ar: "الرعاية الصحية" },
    Content: {
      en: "Clinics and medical centers that respect patients' time and the privacy of their records.",
      ar: "عيادات ومراكز طبية تحترم وقت المريض وخصوصية ملفه.",
    },
    Points: [
      { en: "Online booking with reminders", ar: "حجز إلكتروني مع تذكيرات" },
      { en: "Secure patient records", ar: "ملفات مرضى آمنة" },
      { en: "Video consultations", ar: "استشارات بالفيديو" },
    ],
    Link: { Kind: "article", Slug: "healthcare-solutions" },
  },
  {
    Slug: "education",
    Icon: "GraduationCap",
    Title: { en: "Education", ar: "التعليم" },
    Content: {
      en: "Learning platforms for schools, centers and course creators, with content, exams and payments in one place.",
      ar: "منصات تعليمية للمدارس والمراكز وصناع الكورسات، تجمع المحتوى والاختبارات والمدفوعات في مكان واحد.",
    },
    Points: [
      { en: "Courses, live classes and recorded lessons", ar: "كورسات وحصص مباشرة ودروس مسجلة" },
      { en: "Exams, grades and certificates", ar: "اختبارات ودرجات وشهادات" },
      { en: "Subscriptions and protected content", ar: "اشتراكات ومحتوى محمي" },
    ],
  },
  {
    Slug: "restaurants",
    Icon: "UtensilsCrossed",
    Title: { en: "Restaurants and Cafes", ar: "المطاعم والكافيهات" },
    Content: {
      en: "Your own ordering channel and digital menu, so you keep the margin that delivery apps take.",
      ar: "قناة طلب خاصة بك ومنيو رقمي، فتحتفظ بالهامش الذي تأخذه تطبيقات التوصيل.",
    },
    Points: [
      { en: "QR menus and direct online ordering", ar: "منيو QR وطلب مباشر أونلاين" },
      { en: "Kitchen and branch order management", ar: "إدارة الطلبات للمطبخ والفروع" },
      { en: "Loyalty points and offers", ar: "نقاط ولاء وعروض" },
    ],
  },
  {
    Slug: "logistics",
    Icon: "Truck",
    Title: { en: "Logistics and Delivery", ar: "اللوجستيات والتوصيل" },
    Content: {
      en: "Shipments, drivers and warehouses tracked live, with customers informed at every step.",
      ar: "متابعة الشحنات والمناديب والمخازن لحظة بلحظة، مع إبلاغ العميل في كل خطوة.",
    },
    Points: [
      { en: "Live tracking and proof of delivery", ar: "تتبع مباشر وإثبات تسليم" },
      { en: "Driver apps that work offline", ar: "تطبيقات مناديب تعمل دون إنترنت" },
      { en: "Warehouse and route management", ar: "إدارة المخازن وخطوط السير" },
    ],
  },
  {
    Slug: "tourism",
    Icon: "Plane",
    Title: { en: "Tourism and Hotels", ar: "السياحة والفنادق" },
    Content: {
      en: "Direct bookings for trips, rooms and experiences, without paying commission on every guest.",
      ar: "حجوزات مباشرة للرحلات والغرف والتجارب، دون دفع عمولة على كل نزيل.",
    },
    Points: [
      { en: "Booking engine with availability and pricing", ar: "محرك حجز بالتوافر والأسعار" },
      { en: "Multi-currency and multi-language", ar: "تعدد العملات واللغات" },
      { en: "Guest messages and reviews", ar: "رسائل النزلاء والتقييمات" },
    ],
  },
  {
    Slug: "hr",
    Icon: "Users",
    Title: { en: "HR and Recruitment", ar: "الموارد البشرية والتوظيف" },
    Content: {
      en: "Attendance, payroll and hiring handled in one system instead of spreadsheets.",
      ar: "الحضور والرواتب والتوظيف في نظام واحد بدل الجداول.",
    },
    Points: [
      { en: "Attendance, leave and payroll", ar: "الحضور والإجازات والرواتب" },
      { en: "Job posts and applicant tracking", ar: "نشر الوظائف ومتابعة المتقدمين" },
      { en: "Employee self-service portal", ar: "بوابة خدمة ذاتية للموظفين" },
    ],
  },
  {
    Slug: "agencies",
    Icon: "Megaphone",
    Title: { en: "Marketing and Service Agencies", ar: "وكالات التسويق والخدمات" },
    Content: {
      en: "Clients, projects and approvals in one place, so agreements never get lost in WhatsApp.",
      ar: "العملاء والمشاريع والموافقات في مكان واحد، فلا تضيع الاتفاقات في واتساب.",
    },
    Points: [
      { en: "Client CRM and project tracking", ar: "CRM للعملاء ومتابعة المشاريع" },
      { en: "Client approvals and content calendars", ar: "موافقات العملاء وتقويم المحتوى" },
      { en: "Time tracking and invoicing", ar: "تتبع الوقت والفواتير" },
    ],
  },
  {
    Slug: "wellness",
    Icon: "Dumbbell",
    Title: { en: "Beauty, Wellness and Fitness", ar: "التجميل والعناية واللياقة" },
    Content: {
      en: "Bookings, memberships and loyalty for salons, beauty clinics and gyms.",
      ar: "حجوزات واشتراكات وولاء العملاء للصالونات وعيادات التجميل والجيمات.",
    },
    Points: [
      { en: "Online booking by staff and service", ar: "حجز أونلاين حسب الموظف والخدمة" },
      { en: "Memberships and packages", ar: "اشتراكات وباقات" },
      { en: "Reminders that cut no-shows", ar: "تذكيرات تقلل الغياب عن المواعيد" },
    ],
  },
  {
    Slug: "manufacturing",
    Icon: "Factory",
    Title: { en: "Construction and Manufacturing", ar: "المقاولات والمصانع" },
    Content: {
      en: "Projects, inventory and production followed from the site or the factory floor.",
      ar: "متابعة المشاريع والمخزون والإنتاج من الموقع أو من أرض المصنع.",
    },
    Points: [
      { en: "Project progress and site reports", ar: "تقدم المشاريع وتقارير المواقع" },
      { en: "Materials, inventory and procurement", ar: "الخامات والمخزون والمشتريات" },
      { en: "Production planning and quality checks", ar: "تخطيط الإنتاج وفحص الجودة" },
    ],
  },
  {
    Slug: "startups",
    Icon: "Rocket",
    Title: { en: "Startups", ar: "الشركات الناشئة" },
    Content: {
      en: "From idea to a first version customers can pay for, usually within 4 to 8 weeks.",
      ar: "من الفكرة إلى أول نسخة يدفع العملاء مقابلها، غالبًا خلال 4 إلى 8 أسابيع.",
    },
    Points: [
      { en: "MVP focused on one core workflow", ar: "نسخة أولى تركز على سير عمل أساسي واحد" },
      { en: "Built to scale after traction", ar: "مبنية لتتوسع بعد إثبات الطلب" },
      { en: "Code you own, ready for investors", ar: "كود ملكك وجاهز أمام المستثمرين" },
    ],
    Link: { Kind: "service", Slug: "saas" },
  },
  {
    Slug: "government",
    Icon: "Landmark",
    Title: { en: "Government and Nonprofits", ar: "الجهات الحكومية وغير الربحية" },
    Content: {
      en: "Service portals and donation platforms that are accessible, secure and easy to use.",
      ar: "بوابات خدمات ومنصات تبرعات سهلة الاستخدام وآمنة ومتاحة للجميع.",
    },
    Points: [
      { en: "Online requests and status tracking", ar: "طلبات إلكترونية ومتابعة حالتها" },
      { en: "Donations and campaign pages", ar: "التبرعات وصفحات الحملات" },
      { en: "Accessibility and data protection", ar: "إتاحة للجميع وحماية للبيانات" },
    ],
  },
  {
    Slug: "legal",
    Icon: "Scale",
    Title: { en: "Law Firms", ar: "القانون والمحاماة" },
    Content: {
      en: "Cases, deadlines and contracts organized, with documents kept private and searchable.",
      ar: "تنظيم القضايا والمواعيد والعقود، مع مستندات محمية وسهلة البحث.",
    },
    Points: [
      { en: "Case and hearing management", ar: "إدارة القضايا والجلسات" },
      { en: "Contract drafting and templates", ar: "صياغة العقود والنماذج" },
      { en: "Client portal and billing", ar: "بوابة للموكلين والفواتير" },
    ],
  },
  {
    Slug: "ai",
    Icon: "Brain",
    Title: { en: "AI for Any Business", ar: "الذكاء الاصطناعي لأي نشاط" },
    Content: {
      en: "Whatever your sector, AI can answer customers, read documents and automate busywork.",
      ar: "أيًا كان قطاعك، يستطيع الذكاء الاصطناعي الرد على العملاء وقراءة المستندات وأتمتة المهام المتكررة.",
    },
    Points: [
      { en: "Assistants on your own data", ar: "مساعدات تعمل على بياناتك" },
      { en: "Document and voice processing", ar: "معالجة المستندات والصوت" },
      { en: "Workflow automation", ar: "أتمتة سير العمل" },
    ],
    Link: { Kind: "service", Slug: "ai" },
  },
];
