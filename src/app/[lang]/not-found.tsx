"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
    const { language } = useLanguage();
    return (
        <section className="py-32 bg-bg-dark min-h-screen flex items-center justify-center">
            <div className="text-center space-y-6 px-4">
                <p className="text-7xl font-bold text-cyan-glow">404</p>
                <h1 className="text-2xl font-bold">
                    {language === 'ar' ? 'الصفحة غير موجودة' : 'Page not found'}
                </h1>
                <p className="text-text-muted">
                    {language === 'ar'
                        ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
                        : 'The page you are looking for does not exist or has been moved.'}
                </p>
                <Link
                    href={`/${language}`}
                    className="inline-block px-6 py-3 rounded-lg bg-primary-blue text-white font-medium hover:bg-blue-600 transition-colors"
                >
                    {language === 'ar' ? 'العودة للرئيسية' : 'Back to home'}
                </Link>
            </div>
        </section>
    );
}
