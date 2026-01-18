"use client";

import { useLanguage } from '@/context/LanguageContext';
import { features } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Users } from 'lucide-react';
import Image from 'next/image';


export function WhyUsSection() {
    const { t, language } = useLanguage()
    const featuresData = features({
        language,
        ShieldCheck,
        Zap,
        Globe,
        Users
    })
    return (
        <section className="py-24 bg-bg-dark">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
                        <Image
                            src="/assets/hero-illustration.png"
                            alt="Why Us"
                            width={500}
                            height={500}
                            className="relative z-10 w-full h-auto drop-shadow-2xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6"
                        >
                            {t('whyUs.title')}
                            <span className="text-primary-blue"
                                dir={language === 'ar' ? 'rtl' : 'ltr'}

                            > {t('whyUs.subtitle')}</span></h2>
                        <p className="text-text-muted text-lg mb-8"                        >
                            {t('whyUs.description')}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {featuresData.map((feature, i) => (
                                <div key={i} className="flex items-start space-x-4">
                                    <div className="p-2 rounded-lg bg-surface-dark text-cyan-glow">
                                        <feature.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{feature.title}</h4>
                                        <p className="text-sm text-text-muted">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
