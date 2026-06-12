"use client";
import React, { createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    /** Navigates to the same page in the other locale (language lives in the URL). */
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ lang, children }: { lang: Language; children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const setLanguage = (next: Language) => {
        if (next === lang) return;
        // Remember the preference so the root redirect can honour it later
        try {
            localStorage.setItem('language', next);
        } catch {
            // Storage unavailable (private mode) — switching still works via the URL
        }
        // '/' happens when nginx serves the English homepage at the domain root
        const pathWithoutLang = pathname === '/' ? '' : pathname.replace(/^\/(en|ar)(?=\/|$)/, '');
        // scroll: false — keep the reader exactly where they were when switching language
        router.push(`/${next}${pathWithoutLang || ''}`, { scroll: false });
    };

    const t = (key: string) => {
        const trans = translations[key as keyof typeof translations];
        return trans ? trans[lang] : key;
    };

    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    return (
        <LanguageContext.Provider value={{ language: lang, setLanguage, t, dir }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
