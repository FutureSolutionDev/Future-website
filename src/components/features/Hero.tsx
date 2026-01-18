"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export function Hero() {
    const { t, language } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-blue/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-glow/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8 max-w-2xl pt-20"
                >
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                            {language === 'ar' ? 'نصنع حلولاً برمجية' : 'Building Future-Ready'} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                {language === 'ar' ? 'جاهزة للمستقبل' : 'Software Solutions'}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-200/60 max-w-lg leading-relaxed">
                            {language === 'ar'
                                ? 'نصمم ونطور ونوسع نطاق أنظمة الويب، الجوال، SaaS، والأنظمة المدعومة بالذكاء الاصطناعي للأعمال الحديثة.'
                                : 'We design, develop, and scale web, mobile, SaaS, and AI-powered systems for modern businesses.'}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 border-none shadow-[0_0_30px_-10px_rgba(37,99,235,0.6)]"
                        >
                            {t('hero.cta.primary')}
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-transparent border-blue-500/30 text-blue-100 hover:bg-blue-500/10 hover:border-blue-500/50"
                        >
                            {t('hero.cta.secondary')}
                        </Button>
                    </div>
                </motion.div>

                {/* Visual Content - Replaced with Layout Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative flex items-center justify-center rtl:justify-start pt-20"
                >
                    <div className="relative w-full max-w-[650px] aspect-square">
                        {/* Glow behind image */}
                        <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
                        <Image
                            src="/assets/hero-illustration.png"
                            alt="Future Solutions Technology"
                            width={650}
                            height={650}
                            className="relative z-10 w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
