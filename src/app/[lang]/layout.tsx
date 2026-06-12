import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { notFound } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import SeasonalGreetings from '@/components/ui/SeasonalGreetings';
import '../globals.css';
import { cn } from '@/lib/utils';
import { ActiveGreeting, Contact, SiteKeys, title as SiteTitle } from '@/lib/constants';
import { IsLang, LANGS, SITE_DESCRIPTION, SITE_NAME, SITE_URL, type Lang } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

const GA_ID = SiteKeys.GaId;

export function generateStaticParams() {
    return LANGS.map((lang) => ({ lang }));
}

// Only /en and /ar exist — anything else is a hard 404 (also in dev)
export const dynamicParams = false;

// Site-wide defaults; every page overrides title/description/canonical/og via PageMetadata()
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const language: Lang = IsLang(lang) ? lang : 'en';

    const verification: NonNullable<Metadata['verification']> = {};
    if (SiteKeys.GoogleSiteVerification) {
        verification.google = SiteKeys.GoogleSiteVerification;
    }
    const otherVerification: Record<string, string> = {};
    if (SiteKeys.BingSiteVerification) {
        otherVerification['msvalidate.01'] = SiteKeys.BingSiteVerification;
    }
    if (SiteKeys.FbDomainVerification) {
        otherVerification['facebook-domain-verification'] = SiteKeys.FbDomainVerification;
    }
    if (Object.keys(otherVerification).length > 0) {
        verification.other = otherVerification;
    }

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: SITE_NAME,
            template: `%s | ${SiteTitle}`,
        },
        description: SITE_DESCRIPTION[language],
        publisher: SiteTitle,
        manifest: '/manifest.json',
        icons: {
            icon: ActiveGreeting.Favicon,
            apple: ActiveGreeting.Favicon,
            shortcut: ActiveGreeting.Favicon,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-video-preview': -1,
                'max-snippet': -1,
            },
        },
        verification,
    };
}

const OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favico/favico.png`,
    email: Contact.Email,
    telephone: `+${Contact.Phone}`,
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cairo',
        addressCountry: 'EG',
    },
    sameAs: [Contact.Facebook, Contact.LinkedIn],
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    if (!IsLang(lang)) {
        notFound();
    }

    return (
        <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className="dark">
            <body
                className={cn(
                    inter.variable,
                    cairo.variable,
                    lang === 'ar' ? 'font-arabic' : 'font-sans',
                    'min-h-screen bg-bg-dark text-text-main antialiased flex flex-col'
                )}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(OrganizationSchema) }}
                />
                <LanguageProvider lang={lang}>
                    <SeasonalGreetings />
                    <Navbar />
                    <main
                        className="flex-grow
                        md:min-h-[calc(100dvh-8.6rem)] min-h-[calc(100dvh-9rem)]
                        overflow-y-auto overflow-x-hidden
                        "
                    >
                        {children}
                    </main>
                    <Footer />
                </LanguageProvider>
                {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
            </body>
        </html>
    );
}
