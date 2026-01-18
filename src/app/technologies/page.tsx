"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function TechnologiesPage() {
    const { language } = useLanguage();

    const categories = [
        {
            name: "Frontend",
            items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion", "TypeScript"]
        },
        {
            name: "Backend",
            items: ["Node.js", "Express", "Python", "Django", "FastAPI", "Go"]
        },
        {
            name: "Database",
            items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Supabase", "Firebase"]
        },
        {
            name: "DevOps & Cloud",
            items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Vercel", "GitHub Actions"]
        }
    ];

    return (
        <div className="pt-20">
            <section className="py-20 bg-bg-dark">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {language === 'ar' ? 'التقنيات' : 'Technologies'} <span className="text-purple-500">{language === 'ar' ? 'والأدوات' : '& Tools'}</span>
                        </h1>
                        <p className="text-text-muted max-w-2xl mx-auto">
                            {language === 'ar'
                                ? 'نستخدم أحدث التقنيات وأكثرها موثوقية لبناء منتجاتك الرقمية.'
                                : 'We use the latest and most reliable technologies to build your digital products.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-surface-dark border border-white/5 rounded-2xl p-6"
                            >
                                <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">{cat.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map(item => (
                                        <span key={item} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-text-muted hover:bg-white/10 hover:text-white transition-colors cursor-default">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
