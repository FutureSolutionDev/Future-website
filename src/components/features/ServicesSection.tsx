"use client";
import { motion } from 'framer-motion';
import { Code, Smartphone, Cloud, Brain, Database, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { services } from '@/lib/constants';
export function ServicesSection() {
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
        <section className="relative z-10 w-full">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('services.title')}</h2>
                    <p className="text-blue-200/60 text-lg">{t('services.subtitle')}</p>
                </motion.div>
                <section className="bg-surface-dark/30">
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
            </div>
        </section>
    );
}
