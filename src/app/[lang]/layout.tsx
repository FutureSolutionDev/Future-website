import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Navbar, type TNavItem } from "@/Components/Public/Layout/Navbar";
import { Footer } from "@/Components/Public/Layout/Footer";
import { THEME_INIT_SCRIPT } from "@/Components/Public/Layout/ThemeToggle";
import SeasonalGreetings from "@/Components/Public/Seasonal/SeasonalGreetings";
import { JsonLd } from "@/Components/Common/JsonLd";
import { GetDictionary } from "@/I18n/Index";
import { ACTIVE_GREETING, SITE_KEYS, SITE_TITLE } from "@/Lib/Site";
import {
  IsLang,
  LANGS,
  PathFor,
  SITE_NAME,
  SITE_URL,
  SeoCopy,
  ToLang,
  type Lang,
} from "@/Lib/Seo";
import { OrganizationSchema, WebSiteSchema } from "@/Lib/Schema";
import { Cn } from "@/Lib/Cn";
import "@/Styles/Globals.css";

const PlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const InterFont = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const PlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2840" },
  ],
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const Language = ToLang((await params).lang);
  const Other: Record<string, string> = {};
  if (SITE_KEYS.BingSiteVerification)
    Other["msvalidate.01"] = SITE_KEYS.BingSiteVerification;
  if (SITE_KEYS.FbDomainVerification)
    Other["facebook-domain-verification"] = SITE_KEYS.FbDomainVerification;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s | ${SITE_TITLE}` },
    description: SeoCopy(Language).SiteDescription,
    applicationName: SITE_NAME,
    publisher: SITE_TITLE,
    manifest: "/manifest.json",
    icons: {
      icon: ACTIVE_GREETING.Favicon,
      apple: ACTIVE_GREETING.Favicon,
      shortcut: ACTIVE_GREETING.Favicon,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
    verification: {
      ...(SITE_KEYS.GoogleSiteVerification
        ? { google: SITE_KEYS.GoogleSiteVerification }
        : {}),
      ...(Object.keys(Other).length > 0 ? { other: Other } : {}),
    },
  };
}

function NavItems(Language: Lang): TNavItem[] {
  const Nav = GetDictionary(Language).Common.Nav;
  return [
    {
      Key: "services",
      Label: Nav.Services,
      Path: PathFor(Language, "/services"),
    },
    {
      Key: "industries",
      Label: Nav.Industries,
      Path: PathFor(Language, "/solutions"),
    },
    { Key: "work", Label: Nav.Work, Path: PathFor(Language, "/portfolio") },
    { Key: "blog", Label: Nav.Blog, Path: PathFor(Language, "/blog") },
    { Key: "faq", Label: Nav.Faq, Path: PathFor(Language, "/faq") },
    { Key: "about", Label: Nav.About, Path: PathFor(Language, "/about") },
  ];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!IsLang(lang)) notFound();
  const Common = GetDictionary(lang).Common;
  const Items = NavItems(lang);

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={Cn(PlexArabic.variable, InterFont.variable, PlexMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          {Common.SkipToContent}
        </a>
        <JsonLd Data={[OrganizationSchema(lang), WebSiteSchema(lang)]} />
        <SeasonalGreetings />
        <Navbar
          Language={lang}
          Items={Items}
          Nav={Common.Nav}
          BookLabel={Common.Cta.BookConsultation}
          LogoSrc={ACTIVE_GREETING.Logo}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer
          Language={lang}
          Common={Common}
          Items={Items}
          LogoSrc={ACTIVE_GREETING.Logo}
        />
        {SITE_KEYS.GaId && <GoogleAnalytics gaId={SITE_KEYS.GaId} />}
      </body>
    </html>
  );
}
