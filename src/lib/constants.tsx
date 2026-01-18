
export const title = "Future Solutions Dev"
export const description = `
  At ${title}, we specialize in creating bespoke software solutions that perfectly align with your
                business needs. Our team of experienced developers works closely with you to understand your
                requirements and deliver high-quality software that enhances your operational efficiency and drives
                growth. Whether you need a web application, a mobile app, or a desktop application, we have the
                expertise to bring your vision to life.
  `
export const Contact = {
    WhatsApp: "https://wa.me/201148371185",
    Email: "contact@futuresolutions.dev",
    Phone: "201015471713",
    Facebook: "https://www.facebook.com/futuresolutionsdev",
    LinkedIn: "https://www.linkedin.com/company/futuresolutionsdev",
    Address: "Cairo, Egypt"
}
export const MetaConfig = {
    title,
    description,
    icons: {
        icon: "/favicon.png",
        apple: "/favicon.png",
        shortcut: "/favicon.png",
        other: {
            rel: "icon",
            url: "/favicon.png",
        },
    },
    alternates: { canonical: "https://futuresolutionsdev.com" },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large" as const,
            "max-video-preview": -1,
            "max-snippet": -1,
        },
    },
    keywords: [
        "Future Solutions",
        title,
        "Software Solutions",
        "Software Development",
        "Software Company",
        "React",
        "Next.js",
        "Node.js",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind",
        "Bootstrap",
        "Material UI",
        "Figma",
        "Adobe XD",
        "Git",
        "GitHub",
        "GitLab",
        "Bitbucket",
        "Jira",
        "Trello",
        "Agile",
        "Scrum",
        "Kanban",
        "Jira",
        "Php",
        "Laravel",
        "Python",
        "Django",
        "Flask",
        "MySQL",
        "MongoDB",
        "PostgreSQL",
        "Redis",
        "C#",
        "C++",
        "C",
        "Java",
        "Cypress",
        "Jest",
        "Selenium",
        "Cucumber",
    ],
    twitter: {
        card: "summary_large_image",
        creator: "@Future Solutions Dev",
        title,
        description,
        images: ["/favicon.png", "/Icons/512.png"],
    },
    openGraph: {
        type: "website",
        url: "https://futuresolutionsdev.com",
        title,
        description,
        siteName: title,
        images: [
            {
                url: "/Icons/512.png",
            },
            {
                url: "/favicon.png",
            },
        ],
    },
    metadataBase: new URL("https://futuresolutionsdev.com"),
    publisher: title,
    referrer: "origin" as const,
    manifest: "/manifest.json",
};


export const technologies = [
    {
        name: "Frontend",
        items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion", "TypeScript"]
    },
    {
        name: "Backend",
        items: ["Node.js", "Express", "Python", "Django", "FastAPI", "Go"]
    },
    {
        name: "Database",
        items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Supabase", "Firebase"]
    },
    {
        name: "DevOps & Cloud",
        items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Vercel", "GitHub Actions"]
    }
];

type IconComponent = React.ComponentType<{ size?: number }>;
type TranslateFunction = (key: string) => string;

export const solutions = ({
    language,
    t,
    ShoppingCart,
    BarChart,
    Server,
    Layers,
}: {
    language: string;
    t: TranslateFunction;
    ShoppingCart: IconComponent;
    BarChart: IconComponent;
    Server: IconComponent;
    Layers: IconComponent;
}) => [
        {
            icon: ShoppingCart,
            slug: "e-commerce-solutions",
            title: t('solutions.ecommerce'),
            content: language === 'ar' ? 'حلول تجارة إلكترونية شاملة تشمل إدارة المخزون وبوابات الدفع.' : 'Comprehensive e-commerce solutions including inventory management, payment gateway integration.',
        },
        {
            icon: BarChart,
            slug: "fintech-solutions",
            title: t('solutions.fintech'),
            content: language === 'ar' ? 'تطبيقات مالية آمنة للبنوك والتداول مع تصور للبيانات في الوقت الفعلي.' : 'Secure financial technology applications for banking, trading, and personal finance management.',
        },
        {
            icon: Server,
            slug: "erp-solutions",
            title: t('solutions.erp'),
            content: language === 'ar' ? 'أنظمة تخطيط موارد المؤسسات المخصصة لإدارة العمليات من الموارد البشرية إلى التوريد.' : 'Custom Enterprise Resource Planning (ERP) systems to manage business processes.',
        },
        {
            icon: Layers,
            slug: "healthcare-solutions",
            title: t('solutions.healthcare'),
            content: language === 'ar' ? 'أنظمة إدارة الرعاية الصحية المتوافقة ومنصات الطب عن بعد.' : 'HIPAA-compliant healthcare management systems, telemedicine platforms.',
        },
    ];

export const services = ({
    t,
    Code,
    Smartphone,
    Cloud,
    Brain,
    Database,
    Shield,
}: {
    t: TranslateFunction;
    Code: IconComponent;
    Smartphone: IconComponent;
    Cloud: IconComponent;
    Brain: IconComponent;
    Database: IconComponent;
    Shield: IconComponent;
}) => [
        {
            icon: Code,
            title: t('services.web.title'),
            description: t('services.web.desc'),
            features: ['Next.js', 'React', 'Tailwind', 'PWA']
        },
        {
            icon: Smartphone,
            title: t('services.mobile.title'),
            description: t('services.mobile.desc'),
            features: ['iOS', 'Android', 'Flutter', 'React Native']
        },
        {
            icon: Cloud,
            title: t('services.saas.title'),
            description: t('services.saas.desc'),
            features: ['Multi-tenancy', 'Cloud', 'API', 'Scale']
        },
        {
            icon: Brain,
            title: t('services.ai.title'),
            description: t('services.ai.desc'),
            features: ['ML', 'NLP', 'Data', 'Bot']
        },
        {
            icon: Database,
            title: t('services.devops.title'),
            description: t('services.devops.desc'),
            features: ['CI/CD', 'AWS', 'Docker', 'Security']
        },
        {
            icon: Shield,
            title: t('services.security.title'),
            description: t('services.security.desc'),
            features: ['PenTest', 'Compliance', 'Audit', 'Guard']
        }
    ];
export const projects = ({ language }: { language: string }) => [
    {
        title: 'FinDash System',
        image: '/Projects/FinDash.png',
        category: 'SaaS / FinTech',
        description: language === 'ar' ? 'لوحة تحكم مالية شاملة للشركات الصغيرة والمتوسطة لتتبع النفقات والإيرادات.' : 'A comprehensive financial dashboard for SMEs to track expenses, revenue, and forecasts in real-time.',
        tech: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts'],
        color: 'from-blue-500 to-indigo-600',
        links: {
            Github: "",
            Live: "https://futuresolutionsdev.com"
        }
    },
    {
        title: 'HealthConnect',
        image: '/Projects/HealthConnect.png',
        category: 'Healthcare App',
        description: language === 'ar' ? 'تطبيق جوال للتطبب عن بعد يربط المرضى بالأطباء للاستشارات الافتراضية.' : 'Telemedicine mobile application connecting patients with doctors for virtual consultations.',
        tech: ['React Native', 'Node.js', 'WebRTC'],
        color: 'from-emerald-500 to-teal-600',
        links: {
            Github: "",
            Live: "https://futuresolutionsdev.com"
        }
    },
    {
        title: 'ShopifyPlus Theme',
        category: 'E-commerce',
        image: '/Projects/ShopifyPlus.png',
        description: language === 'ar' ? 'ثيم Shopify مخصص عالي التحويل يركز على السرعة وتجربة المستخدم.' : 'High-conversion custom Shopify theme focusing on speed and user experience.',
        tech: ['Liquid', 'JavaScript', 'Tailwind'],
        color: 'from-purple-500 to-pink-600',
        links: {
            Github: "",
            Live: "https://futuresolutionsdev.com"
        }
    },
    {
        title: 'AI Content Gen',
        category: 'AI Tool',
        image: '/Projects/AIContentGen.png',
        description: language === 'ar' ? 'أداة توليد محتوى تستخدم OpenAI API لمساعدة المسوقين.' : 'Content generation tool leveraging OpenAI API to help marketers create seo-optimized posts.',
        tech: ['Next.js', 'OpenAI API', 'Stripe'],
        color: 'from-orange-500 to-red-600',
        links: {
            Github: "",
            Live: "https://futuresolutionsdev.com"
        }
    }
];

export const techs = ({
    Atom,
    Server,
    Triangle,
    FileCode2,
    Braces,
    Cloud,
    Database,
    Container,
}: {
    Atom: IconComponent;
    Server: IconComponent;
    Triangle: IconComponent;
    FileCode2: IconComponent;
    Braces: IconComponent;
    Cloud: IconComponent;
    Database: IconComponent;
    Container: IconComponent;
}) => [
        {
            name: 'React',
            icon: <Atom />,
            color: 'text-cyan-400',
            description: {
                ar: 'مكتبة JavaScript قوية لبناء واجهات مستخدم تفاعلية وسريعة تعتمد على مبدأ المكونات القابلة لإعادة الاستخدام.',
                en: 'A powerful JavaScript library for building fast, interactive user interfaces using reusable components.',
            },
        },
        {
            name: 'Node.js',
            icon: <Server />,
            color: 'text-green-500',
            description: {
                ar: 'بيئة تشغيل JavaScript على الخادم تتيح بناء تطبيقات خلفية عالية الأداء وقابلة للتوسع.',
                en: 'A JavaScript runtime for building high-performance, scalable backend applications.',
            },
        },
        {
            name: 'Next.js',
            icon: <Triangle />,
            color: 'text-white',
            description: {
                ar: 'إطار عمل مبني على React يدعم SSR و SSG لتحسين الأداء وتجربة المستخدم وتحسين محركات البحث.',
                en: 'A React framework supporting SSR and SSG for optimal performance, SEO, and user experience.',
            },
        },
        {
            name: 'TypeScript',
            icon: <FileCode2 />,
            color: 'text-blue-500',
            description: {
                ar: 'امتداد لـ JavaScript يضيف نظام أنواع قوي لتحسين جودة الكود وتقليل الأخطاء في المشاريع الكبيرة.',
                en: 'A typed superset of JavaScript that improves code quality and reduces errors in large-scale projects.',
            },
        },
        {
            name: 'Python',
            icon: <Braces />,
            color: 'text-yellow-300',
            description: {
                ar: 'لغة برمجة متعددة الاستخدامات تُستخدم في الذكاء الاصطناعي، تحليل البيانات، والأتمتة.',
                en: 'A versatile programming language widely used in AI, data analysis, automation, and backend development.',
            },
        },
        {
            name: 'AWS',
            icon: <Cloud />,
            color: 'text-orange-400',
            description: {
                ar: 'منصة خدمات سحابية توفر بنية تحتية موثوقة وقابلة للتوسع لتشغيل التطبيقات والأنظمة.',
                en: 'A cloud computing platform providing scalable, secure infrastructure for modern applications.',
            },
        },
        {
            name: 'PostgreSQL',
            icon: <Database />,
            color: 'text-blue-300',
            description: {
                ar: 'نظام قواعد بيانات علائقي قوي وآمن يدعم الاستعلامات المعقدة والبيانات الكبيرة.',
                en: 'A powerful, secure relational database system designed for complex queries and large-scale data.',
            },
        },
        {
            name: 'Docker',
            icon: <Container />,
            color: 'text-blue-500',
            description: {
                ar: 'أداة لتشغيل التطبيقات داخل حاويات معزولة تضمن سهولة النشر والتوافق بين البيئات المختلفة.',
                en: 'A containerization platform that ensures consistent application deployment across environments.',
            },
        },
    ];
export const features = ({
    language,
    ShieldCheck,
    Zap,
    Globe,
    Users,
}: {
    language: string;
    ShieldCheck: IconComponent;
    Zap: IconComponent;
    Globe: IconComponent;
    Users: IconComponent;
}) => [
    {
        icon: ShieldCheck,
        title: language === 'ar' ? 'آمن وموثوق' : 'Secure & Reliable',
        description: language === 'ar' ? 'معايير أمان على مستوى المؤسسات.' : 'Enterprise-grade security standards.',

    },
    {
        icon: Zap,
        title: language === 'ar' ? 'أداء عالي' : 'High Performance',
        description: language === 'ar' ? 'تحسين السرعة والكفاءة.' : 'Optimized for speed and efficiency.',
    },
    {
        icon: Globe,
        title: language === 'ar' ? 'قابلية التوسع' : 'Global Scale',
        description: language === 'ar' ? 'بنية تحتية تنمو معك.' : 'Infrastructure that grows with you.',
    },
    {
        icon: Users,
        title: language === 'ar' ? 'فريق خبير' : 'Expert Team',
        description: language === 'ar' ? 'مهندسين ذوي خبرة عالية.' : 'Dedicated senior engineers.',
    },
];