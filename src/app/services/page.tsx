"use client";

import { motion } from 'framer-motion';
import { Code, Smartphone, Cloud, Brain, Database, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

export default function ServicesPage() {
    const { t } = useLanguage();

    const services = [
        {
            icon: Code,
            title: t('services.web.title'),
            description: t('services.web.desc'),
            features: ['Next.js', 'React', 'Tailwind', 'PWA']
        },
        {
            icon: Smartphone,
            title: t('services.mobile.title'),
            description: t('services.mobile.desc'),
            features: ['iOS', 'Android', 'Flutter', 'React Native']
        },
        {
            icon: Cloud,
            title: t('services.saas.title'),
            description: t('services.saas.desc'),
            features: ['Multi-tenancy', 'Cloud', 'API', 'Scale']
        },
        {
            icon: Brain,
            title: t('services.ai.title'),
            description: t('services.ai.desc'),
            features: ['ML', 'NLP', 'Data', 'Bot']
        },
        {
            icon: Database,
            title: t('services.devops.title'),
            description: t('services.devops.desc'),
            features: ['CI/CD', 'AWS', 'Docker', 'Security']
        },
        {
            icon: Shield,
            title: t('services.security.title'),
            description: t('services.security.desc'),
            features: ['PenTest', 'Compliance', 'Audit', 'Guard']
        }
    ];

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="py-20 bg-bg-dark relative overflow-hidden">
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
            <section className="py-20 bg-surface-dark/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
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
            <section className="py-20 bg-bg-dark text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">{t('services.cta.title')}</h2>
                    <Button size="lg">{t('services.cta.btn')}</Button>
                </div>
            </section>
        </div>
    );
}
