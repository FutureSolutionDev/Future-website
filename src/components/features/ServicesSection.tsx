"use client";

import { motion } from 'framer-motion';
import { Code, Smartphone, Cloud, Brain, Globe, Server, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const services = [
    {
        icon: Globe,
        label: 'Web Development',
        description: 'High-performance websites and web applications built with modern frameworks.',
    },
    {
        icon: Smartphone,
        label: 'Mobile Apps',
        description: 'Native and cross-platform mobile solutions for iOS and Android.',
    },
    {
        icon: Cloud,
        label: 'SaaS Solutions',
        description: 'Scalable Software-as-a-Service platforms designed for growth.',
    },
    {
        icon: Brain,
        label: 'AI Integration',
        description: 'Smart algorithms and AI features to power your business logic.',
    },
    {
        icon: Server,
        label: 'DevOps',
        description: 'Streamlined CI/CD pipelines and cloud infrastructure management.',
    },
    {
        icon: Shield,
        label: 'Cybersecurity',
        description: 'Advanced security protocols to protect your digital assets.',
    },
];

export function ServicesSection() {
    const { t } = useLanguage();
    return (
        <section className="py-24 relative z-10 w-full">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('nav.services')}</h2>
                    <p className="text-blue-200/60 text-lg">Custom solutions that drive growth and innovation</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-3xl bg-[#0a0a2e]/40 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 overflow-hidden"
                        >
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-white shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform duration-300">
                                    <service.icon size={32} />
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors">
                                    {service.label}
                                </h3>

                                <p className="text-blue-200/60 mb-8 leading-relaxed text-sm">
                                    {service.description}
                                </p>

                                <button className="px-6 py-2 rounded-lg bg-blue-900/30 border border-blue-500/30 text-blue-300 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">
                                    Learn More <span className="text-lg">›</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
