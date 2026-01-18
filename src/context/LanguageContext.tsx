"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '@/lib/translations';
type Language = 'en' | 'ar';
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    useEffect(() => {
        const savedLang = typeof window !== 'undefined' ? localStorage.getItem('language') as Language : 'en';
        // Persist language preference
        if (savedLang) {
            setTimeout(() => {
                setLanguage(savedLang);
                document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
                document.documentElement.lang = savedLang;
            }, 0);
        }
    }, [setLanguage]);
    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    };
    // Translation dictionary imported from lib
    const t = (key: string) => {
        const trans = translations[key as keyof typeof translations];
        return trans ? trans[language] : key;
    };
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dir }}>
            <div dir={dir} className={language === 'ar' ? 'font-arabic' : 'font-sans'}>
                {children}
            </div>
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
