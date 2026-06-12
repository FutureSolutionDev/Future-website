import type { Metadata } from 'next';

export type Lang = 'en' | 'ar';
export const LANGS: Lang[] = ['en', 'ar'];
export const DEFAULT_LANG: Lang = 'en';

export const SITE_URL = 'https://futuresolutionsdev.com';
export const SITE_NAME = 'Future Solutions Dev';
export const DEFAULT_OG_IMAGE = '/og/default.png';

export const SITE_DESCRIPTION: Record<Lang, string> = {
    en: 'Future Solutions builds custom web, mobile and SaaS software for businesses across the Arab world and worldwide — from e-commerce and ERP to AI-powered systems.',
    ar: 'نبني برمجيات مخصصة — ويب وموبايل وSaaS — للشركات في الوطن العربي وحول العالم: من التجارة الإلكترونية وأنظمة ERP إلى الحلول المدعومة بالذكاء الاصطناعي.',
};

type PageCopy = { title: string; description: string };

/** Per-page, per-language titles and descriptions (descriptions ≤ 160 chars). */
export const PAGE_SEO: Record<string, Record<Lang, PageCopy>> = {
    home: {
        en: {
            title: 'Future Solutions — Custom Software Development Company | MENA & Worldwide',
            description: 'We design, build and scale web, mobile, SaaS and AI-powered software for businesses across the Arab world and beyond. Book a free consultation today.',
        },
        ar: {
            title: 'Future Solutions — شركة تطوير برمجيات وحلول رقمية | الوطن العربي والعالم',
            description: 'نصمم ونطور أنظمة ويب وتطبيقات موبايل وحلول SaaS وذكاء اصطناعي للشركات في الوطن العربي وحول العالم. احجز استشارة مجانية اليوم.',
        },
    },
    services: {
        en: {
            title: 'Software Development Services',
            description: 'Web development, mobile apps, SaaS platforms, AI integration, DevOps and cybersecurity — software services tailored to your industry.',
        },
        ar: {
            title: 'خدمات تطوير البرمجيات',
            description: 'تطوير مواقع وتطبيقات موبايل ومنصات SaaS وتكامل ذكاء اصطناعي وDevOps وأمن سيبراني — خدمات برمجية مصممة لمجال عملك.',
        },
    },
    solutions: {
        en: {
            title: 'Industry Solutions — E-Commerce, FinTech, ERP & Healthcare',
            description: 'Ready-to-tailor software solutions for e-commerce, financial technology, enterprise resource planning and healthcare businesses.',
        },
        ar: {
            title: 'حلول للقطاعات — التجارة الإلكترونية والتقنية المالية وERP والرعاية الصحية',
            description: 'حلول برمجية جاهزة للتخصيص لقطاعات التجارة الإلكترونية والتقنية المالية وأنظمة تخطيط الموارد والرعاية الصحية.',
        },
    },
    portfolio: {
        en: {
            title: 'Our Work — Software Projects & Case Studies',
            description: 'Selected software projects we designed, built and shipped — with the technologies behind them and the results they delivered.',
        },
        ar: {
            title: 'أعمالنا — مشاريع برمجية ودراسات حالة',
            description: 'مختارات من المشاريع البرمجية التي صممناها وبنيناها وأطلقناها — مع التقنيات المستخدمة والنتائج التي حققتها.',
        },
    },
    technologies: {
        en: {
            title: 'Technologies & Tools We Use',
            description: 'React, Next.js, Node.js, Python, PostgreSQL, AWS, Docker and more — the battle-tested stack behind our software.',
        },
        ar: {
            title: 'التقنيات والأدوات التي نستخدمها',
            description: 'React وNext.js وNode.js وPython وPostgreSQL وAWS وDocker وغيرها — التقنيات الموثوقة التي نبني بها برمجياتنا.',
        },
    },
    about: {
        en: {
            title: 'About Us — Who We Are',
            description: 'Future Solutions Dev is a software agency founded in 2024, serving clients across the Arab world and worldwide — engineers, designers and strategists transforming businesses.',
        },
        ar: {
            title: 'من نحن — تعرف على فريقنا',
            description: 'Future Solutions Dev وكالة برمجيات تأسست 2024 وتخدم عملاء في الوطن العربي وحول العالم — مهندسون ومصممون واستراتيجيون يحوّلون الأعمال.',
        },
    },
    contact: {
        en: {
            title: 'Contact Us — Get a Free Consultation',
            description: 'Have a project in mind? Talk to our team — email, phone, WhatsApp or the contact form. We reply within one business day.',
        },
        ar: {
            title: 'تواصل معنا — احجز استشارة مجانية',
            description: 'لديك مشروع في ذهنك؟ تواصل مع فريقنا عبر الإيميل أو الهاتف أو واتساب أو نموذج التواصل. نرد خلال يوم عمل واحد.',
        },
    },
    blog: {
        en: {
            title: 'Blog — Software & Business Insights',
            description: 'In-depth articles on e-commerce, FinTech, ERP systems and healthcare technology — written by the Future Solutions team.',
        },
        ar: {
            title: 'المدونة — مقالات عن البرمجيات والأعمال',
            description: 'مقالات متعمقة عن التجارة الإلكترونية والتقنية المالية وأنظمة ERP وتكنولوجيا الرعاية الصحية — بقلم فريق Future Solutions.',
        },
    },
};

export function IsLang(value: string): value is Lang {
    return value === 'en' || value === 'ar';
}

type BuildMetadataOptions = {
    lang: Lang;
    /** Route path WITHOUT the language prefix, e.g. '' for home or '/services'. */
    path: string;
    title: string | { absolute: string };
    description: string;
    ogType?: 'website' | 'article';
    images?: { url: string; width?: number; height?: number; alt?: string }[];
};

/** Shared page metadata: canonical + hreflang + OpenGraph + Twitter, all localized. */
export function BuildMetadata({ lang, path, title, description, ogType = 'website', images }: BuildMetadataOptions): Metadata {
    const url = `/${lang}${path}`;
    const ogImages = images ?? [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }];
    const plainTitle = typeof title === 'string' ? title : title.absolute;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                en: `/en${path}`,
                ar: `/ar${path}`,
                'x-default': `/en${path}`,
            },
        },
        openGraph: {
            title: plainTitle,
            description,
            url,
            siteName: SITE_NAME,
            type: ogType,
            locale: lang === 'ar' ? 'ar_EG' : 'en_US',
            images: ogImages,
        },
        twitter: {
            card: 'summary_large_image',
            title: plainTitle,
            description,
            images: ogImages.map((image) => image.url),
        },
    };
}

/** Metadata for one of the standard pages defined in PAGE_SEO. */
export function PageMetadata(lang: Lang, pageKey: keyof typeof PAGE_SEO, path: string): Metadata {
    const copy = PAGE_SEO[pageKey][lang];
    return BuildMetadata({
        lang,
        path,
        // Home carries the full brand title; inner pages use the layout's "%s | ..." template
        title: pageKey === 'home' ? { absolute: copy.title } : copy.title,
        description: copy.description,
    });
}
