"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PortfolioPage() {
    const { language } = useLanguage();

    const projects = [
        {
            title: 'FinDash System',
            category: 'SaaS / FinTech',
            description: language === 'ar' ? 'لوحة تحكم مالية شاملة للشركات الصغيرة والمتوسطة لتتبع النفقات والإيرادات.' : 'A comprehensive financial dashboard for SMEs to track expenses, revenue, and forecasts in real-time.',
            tech: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts'],
            color: 'from-blue-500 to-indigo-600'
        },
        {
            title: 'HealthConnect',
            category: 'Healthcare App',
            description: language === 'ar' ? 'تطبيق جوال للتطبب عن بعد يربط المرضى بالأطباء للاستشارات الافتراضية.' : 'Telemedicine mobile application connecting patients with doctors for virtual consultations.',
            tech: ['React Native', 'Node.js', 'WebRTC'],
            color: 'from-emerald-500 to-teal-600'
        },
        {
            title: 'ShopifyPlus Theme',
            category: 'E-commerce',
            description: language === 'ar' ? 'ثيم Shopify مخصص عالي التحويل يركز على السرعة وتجربة المستخدم.' : 'High-conversion custom Shopify theme focusing on speed and user experience.',
            tech: ['Liquid', 'JavaScript', 'Tailwind'],
            color: 'from-purple-500 to-pink-600'
        },
        {
            title: 'AI Content Gen',
            category: 'AI Tool',
            description: language === 'ar' ? 'أداة توليد محتوى تستخدم OpenAI API لمساعدة المسوقين.' : 'Content generation tool leveraging OpenAI API to help marketers create seo-optimized posts.',
            tech: ['Next.js', 'OpenAI API', 'Stripe'],
            color: 'from-orange-500 to-red-600'
        }
    ];

    return (
        <div className="pt-20">
            <section className="py-20 bg-bg-dark">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {language === 'ar' ? 'أعمالنا' : 'Our'} <span className="text-primary-blue">{language === 'ar' ? '' : 'Work'}</span>
                        </h1>
                        <p className="text-text-muted max-w-2xl mx-auto">
                            {language === 'ar'
                                ? 'استكشف مجموعة من مشاريعنا الأخيرة والتقنيات التي استخدمناها لبنائها.'
                                : 'Explore a selection of our recent projects and the technologies we used to build them.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-2xl bg-surface-dark border border-white/5"
                            >
                                <div className={`h-48 bg-gradient-to-r ${project.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

                                <div className="p-8 relative z-10 -mt-20">
                                    <div className="bg-bg-dark/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className="text-cyan-glow text-xs uppercase font-bold tracking-wider">{project.category}</span>
                                                <h3 className="text-2xl font-bold mt-1">{project.title}</h3>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                                    <Github size={18} />
                                                </button>
                                                <button className="p-2 rounded-full bg-primary-blue text-white hover:bg-blue-600 transition-colors">
                                                    <ExternalLink size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-text-muted mb-6 text-sm">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map(t => (
                                                <span key={t} className="px-2 py-1 bg-surface-dark text-xs text-text-muted rounded-md border border-white/5">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
