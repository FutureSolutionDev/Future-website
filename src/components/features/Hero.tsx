"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { ASSET_VERSION, Contact } from '@/lib/constants';
import Link from 'next/link';

export function Hero() {
    const { t, language } = useLanguage();
    return (
        <section className="relative overflow-hidden">
            {/* Background glow — pinned to the section so it never bleeds into the next block */}
            <div className="absolute inset-x-0 top-0 h-full bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Flow layout (no absolute positioning) — content can grow without overlapping the next section */}
                <div className="grid md:grid-cols-2 gap-10 items-center py-16 md:py-24 min-h-[34rem]">
                    {/* Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-7"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-blue/10 border border-primary-blue/25 text-primary-blue text-sm font-medium">
                            {language === 'ar'
                                ? 'شركة برمجيات — نخدم الوطن العربي والعالم'
                                : 'Software Company — Serving MENA & Worldwide'}
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

                    {/* Illustration — desktop only: <picture> media query keeps phones from fetching it */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="hidden md:block"
                    >
                        <picture>
                            <source media="(min-width: 768px)" srcSet={`/assets/hero.webp?v=${ASSET_VERSION}`} />
                            <img
                                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                alt="Future Solutions Technology"
                                width={1300}
                                height={1300}
                                fetchPriority="high"
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </picture>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
