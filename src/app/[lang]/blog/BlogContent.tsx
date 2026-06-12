"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, BarChart, Server, Layers, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const iconMap = {
    ShoppingCart,
    BarChart,
    Server,
    Layers,
};

export type TArticleListItem = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    icon: keyof typeof iconMap;
};

export default function BlogContent({ articles }: { articles: TArticleListItem[] }) {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    return (
        <section className="py-20 bg-bg-dark min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        {isRTL ? 'مدونة' : 'Blog'}{' '}
                        <span className="text-cyan-glow">
                            {isRTL ? 'الحلول' : 'Solutions'}
                        </span>
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg">
                        {isRTL
                            ? 'اكتشف كيف يمكن لحلولنا أن تساعد في تحويل أعمالك. مقالات متعمقة حول التجارة الإلكترونية والتكنولوجيا المالية وأنظمة ERP والرعاية الصحية.'
                            : 'Discover how our solutions can help transform your business. In-depth articles about E-Commerce, FinTech, ERP Systems, and Healthcare.'
                        }
                    </p>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {articles.map((article, index) => {
                        const IconComponent = iconMap[article.icon];
                        return (
                            <motion.article
                                key={article.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <Link href={`/${language}/blog/${article.slug}`}>
                                    <div className="h-full p-8 rounded-2xl bg-surface-dark border border-white/5 hover:border-cyan-glow/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-glow/5">
                                        {/* Category & Read Time */}
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="px-3 py-1 text-sm rounded-full bg-primary-blue/20 text-primary-blue">
                                                {article.category}
                                            </span>
                                            <span className="flex items-center gap-2 text-text-muted text-sm">
                                                <Clock size={14} />
                                                {article.readTime}
                                            </span>
                                        </div>

                                        {/* Icon & Title */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary-blue/20 to-cyan-glow/20 flex items-center justify-center text-primary-blue group-hover:text-cyan-glow transition-colors">
                                                {IconComponent && <IconComponent size={28} />}
                                            </div>
                                            <h2 className="text-xl font-bold leading-tight group-hover:text-cyan-glow transition-colors">
                                                {article.title}
                                            </h2>
                                        </div>

                                        {/* Excerpt */}
                                        <p className="text-text-muted mb-6 leading-relaxed">
                                            {article.excerpt}
                                        </p>

                                        {/* Read More */}
                                        <div className="flex items-center gap-2 text-primary-blue group-hover:text-cyan-glow transition-colors">
                                            <span className="font-medium">
                                                {isRTL ? 'اقرأ المزيد' : 'Read More'}
                                            </span>
                                            <ArrowRight
                                                size={18}
                                                className="transform transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
