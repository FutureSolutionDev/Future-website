"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { Contact } from '@/lib/constants';
import Link from 'next/link';

export function Hero() {
    const { t, language } = useLanguage();
    return (
        <div className="relative w-full aspect-square h-auto md:h-[55rem] mb-4">
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
            <Image
                src="/assets/hero.png"
                alt="Future Solutions Technology"
                width={650}
                height={650}
                className="hidden md:block relative z-10 w-full h-full drop-shadow-2xl"
            />
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
                    <h1 className="text-4xl md:text-3xl font-bold leading-tight tracking-tight">
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
                <div className="flex gap-4">
                    <Link href={Contact.WhatsApp} target="_blank" referrerPolicy="no-referrer">
                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-transparent border-blue-500/30 text-blue-100 hover:bg-blue-500/10"
                        >
                            {t('hero.cta.secondary')}
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>


    );
}
