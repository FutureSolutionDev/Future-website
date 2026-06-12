// Global 404 — exported as out/404.html and served (by nginx or any static host)
// for every unknown path. Doubles as the language normalizer: a path missing the
// /en|/ar prefix is redirected to the visitor's language before the UI paints.
import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export const metadata: Metadata = {
    title: 'Page Not Found | Future Solutions Dev',
    robots: { index: false, follow: false },
};

// Runs before paint: /services → /en/services (or /ar/services for Arabic users).
// If the normalized path doesn't exist either, this same page is served again —
// now WITH a lang prefix, so the script does nothing and the 404 UI shows. No loops.
const NORMALIZE_SCRIPT = `
(function () {
    var path = location.pathname;
    if (/^\\/(en|ar)(\\/|$)/.test(path)) return;
    var lang = 'en';
    try {
        if (localStorage.getItem('language') === 'ar') lang = 'ar';
    } catch (e) { }
    document.documentElement.style.visibility = 'hidden';
    location.replace('/' + lang + (path === '/' ? '' : path) + location.search);
})();
`;

export default function GlobalNotFound() {
    return (
        <html lang="en" className="dark">
            <head>
                <script dangerouslySetInnerHTML={{ __html: NORMALIZE_SCRIPT }} />
            </head>
            <body className={`${inter.variable} ${cairo.variable} min-h-screen bg-bg-dark text-text-main antialiased font-sans`}>
                <main className="min-h-screen flex items-center justify-center px-4">
                    <div className="text-center max-w-xl">
                        <p className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
                            404
                        </p>
                        <h1 className="text-2xl md:text-3xl font-bold mb-3">Page not found</h1>
                        <p className="text-text-muted mb-2">
                            The page you are looking for does not exist or has been moved.
                        </p>
                        <p className="text-text-muted mb-10 font-arabic" dir="rtl" lang="ar">
                            الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
                        </p>
                        {/* Plain anchors on purpose: this page is a standalone static
                            document (404.html) with no Next router on unknown paths */}
                        {/* eslint-disable @next/next/no-html-link-for-pages */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="/en"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-blue text-white font-bold hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(29,161,242,0.4)]"
                            >
                                Back to Home
                            </a>
                            <a
                                href="/ar"
                                lang="ar"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary-blue/50 text-primary-blue font-bold hover:bg-primary-blue/10 transition-colors font-arabic"
                            >
                                العودة للرئيسية
                            </a>
                        </div>
                        {/* eslint-enable @next/next/no-html-link-for-pages */}
                    </div>
                </main>
            </body>
        </html>
    );
}
