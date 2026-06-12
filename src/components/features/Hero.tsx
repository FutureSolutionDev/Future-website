"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { Contact } from '@/lib/constants';
import Link from 'next/link';

export function Hero() {
    const { t, language } = useLanguage();
    return (
        <div className="relative w-full aspect-square h-auto md:h-[55rem] mb-4">
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
            {/* Desktop-only LCP image: <picture> with a media query so phones
                never download it (display:none alone does not prevent the fetch) */}
            <picture>
                <source media="(min-width: 768px)" srcSet="/assets/hero.webp" />
                <img
                    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                    alt="Future Solutions Technology"
                    width={1300}
                    height={1300}
                    fetchPriority="high"
                    className="hidden md:block relative z-10 w-full h-full drop-shadow-2xl"
                />
            </picture>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="
                    initial
                    md:absolute
                    left-[10%]
                    top-[60%]
                    -translate-y-1/2
                    z-20
                    space-y-8
                    w-full
                    p-4
                    md:p-0
                    md:max-w-2xl
                    "
            >
                <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary-blue/10 border border-primary-blue/25 text-primary-blue text-sm font-medium">
                        {language === 'ar' ? 'شركة تطوير برمجيات — القاهرة' : 'Software Development Company — Cairo'}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                        {language === 'ar' ? 'عندك فكرة أو مشكلة؟' : 'Your business deserves'} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            {language === 'ar' ? 'إحنا بنبنيها منصة تكسب' : 'a platform that wins'}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-blue-200/60 max-w-lg leading-relaxed">
                        {t('hero.desc')}
                    </p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Link href={Contact.WhatsApp} target="_blank" referrerPolicy="no-referrer">
                        <Button size="lg">
                            {t('hero.cta.secondary')}
                        </Button>
                    </Link>
                    <Link href={`/${language}/portfolio`}>
                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-transparent border-blue-500/30 text-blue-100 hover:bg-blue-500/10"
                        >
                            {language === 'ar' ? 'شوف أعمالنا' : 'See Our Work'}
                        </Button>
                    </Link>
                </div>
                {/* Trust line — quick answers to "can I trust these people?" */}
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-200/50">
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
                        {language === 'ar' ? 'منصات حية في الإنتاج' : 'Platforms live in production'}
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
                        {language === 'ar' ? 'الكود ملكك 100%' : 'You own the code 100%'}
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
                        {language === 'ar' ? 'عرض سعر ثابت — بلا مفاجآت' : 'Fixed quotes — no surprises'}
                    </li>
                </ul>
            </motion.div>
        </div>


    );
}
