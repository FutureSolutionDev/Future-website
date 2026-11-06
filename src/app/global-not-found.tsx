import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { PAGES_AR } from "@/I18n/Pages/Ar";
import { PAGES_EN } from "@/I18n/Pages/En";
import "@/Styles/Globals.css";

const PlexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-plex-arabic" });

export const metadata: Metadata = {
  title: "404 | Future Solutions Dev",
  robots: { index: false, follow: false },
};

const NORMALIZE_SCRIPT = `
(function () {
  var path = location.pathname;
  if (/^\\/(en|ar)(\\/|$)/.test(path)) return;
  var lang = 'en';
  try { if (localStorage.getItem('language') === 'ar') lang = 'ar'; } catch (e) {}
  document.documentElement.style.visibility = 'hidden';
  location.replace('/' + lang + (path === '/' ? '' : path) + location.search);
})();
`;

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={PlexArabic.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NORMALIZE_SCRIPT }} />
      </head>
      <body data-theme="inverse" className="grid min-h-screen place-items-center px-4">
        <main className="max-w-xl text-center">
          <p className="font-mono text-7xl font-semibold text-accent">404</p>
          <h1 className="mt-6 text-3xl font-bold">{PAGES_AR.NotFound.Title}</h1>
          <p className="mt-3 text-ink-muted">{PAGES_AR.NotFound.Text}</p>
          <p lang="en" dir="ltr" className="mt-2 text-ink-soft">
            {PAGES_EN.NotFound.Text}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/ar" className="inline-flex h-[50px] items-center rounded-md bg-primary px-6 font-semibold text-on-primary">
              {PAGES_AR.NotFound.Back}
            </Link>
            <Link href="/en" lang="en" className="inline-flex h-[50px] items-center rounded-md border border-line-strong px-6 font-semibold">
              {PAGES_EN.NotFound.Back}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
