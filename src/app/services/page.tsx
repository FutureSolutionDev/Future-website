"use client";

import { motion } from 'framer-motion';
import { Code, Smartphone, Cloud, Brain, Database, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { services } from '@/lib/constants';
import Link from 'next/link';
export default function ServicesPage() {
    const { t } = useLanguage();
    const servicesData = services({
        t,
        Code,
        Smartphone,
        Cloud,
        Brain,
        Database,
        Shield,
    })

    return (
        <>
            {/* Header */}
            <section className="pt-20 bg-bg-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-blue/5 blur-3xl pointer-events-none" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        {t('services.title')}
                    </motion.h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        {t('services.subtitle')}
                    </p>
                </div>
            </section>
            {/* Services Grid */}
            <section className="py-10 bg-surface-dark/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary-blue/30 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary-blue/10 flex items-center justify-center text-primary-blue mb-6 group-hover:scale-110 transition-transform">
                                    <service.icon size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-text-muted mb-6">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map(feature => (
                                        <li key={feature} className="flex items-center text-sm text-text-muted">
                                            <CheckCircle size={14} className="text-cyan-glow mr-2 rtl:ml-2 rtl:mr-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-10 bg-bg-dark text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">{t('services.cta.title')}</h2>

                    <Link
                        href={"/contact"}
                        className="relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 active:scale-95 bg-primary-blue text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(29,161,242,0.5)] px-8 py-4 text-lg"
                    >
                        {t('services.cta.btn')}</Link>
                </div>
            </section>
        </>
    );
}
