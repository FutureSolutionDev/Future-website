"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ShoppingCart,
    BarChart,
    Server,
    Layers,
    Clock,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Sparkles,
    Zap,
    Target,
    ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Contact } from '@/lib/constants';

const iconMap = {
    ShoppingCart,
    BarChart,
    Server,
    Layers,
};

type Article = {
    slug: string;
    icon: string;
    category: { en: string; ar: string };
    title: { en: string; ar: string };
    excerpt: { en: string; ar: string };
    readTime: { en: string; ar: string };
    relatedSolutions?: string[];
    content: {
        en: ArticleContent;
        ar: ArticleContent;
    };
};

type ArticleContent = {
    introduction: string;
    sections: Section[];
    cta: {
        title: string;
        description: string;
        buttonText: string;
    };
};

type Section = {
    title: string;
    content: string;
    highlights?: string[];
    steps?: { title: string; description: string }[];
    features?: { name: string; description: string }[];
    technologies?: string[];
    stats?: { value: string; label: string }[];
};

export default function ArticleContent({
    article,
    relatedArticles,
}: {
    article: Article;
    relatedArticles: Article[];
}) {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const content = article.content[language as 'en' | 'ar'];
    const IconComponent = iconMap[article.icon as keyof typeof iconMap];

    return (
        <article className="py-12 bg-bg-dark min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/blog"
                        className={`inline-flex items-center gap-2 text-text-muted hover:text-cyan-glow transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                        {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                        <span>{isRTL ? 'العودة للمدونة' : 'Back to Blog'}</span>
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className={`flex flex-wrap items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="px-4 py-1.5 text-sm rounded-full bg-primary-blue/20 text-primary-blue font-medium">
                            {article.category[language as 'en' | 'ar']}
                        </span>
                        <span className={`flex items-center gap-2 text-text-muted text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Clock size={16} />
                            {article.readTime[language as 'en' | 'ar']}
                        </span>
                    </div>

                    <div className={`flex items-start gap-6 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-blue/20 to-cyan-glow/20 flex items-center justify-center text-cyan-glow">
                            {IconComponent && <IconComponent size={40} />}
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            {article.title[language as 'en' | 'ar']}
                        </h1>
                    </div>

                    <p className="text-xl text-text-muted leading-relaxed">
                        {article.excerpt[language as 'en' | 'ar']}
                    </p>
                </motion.header>

                {/* Introduction */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <p className="text-lg leading-relaxed text-text-main/90">
                        {content.introduction}
                    </p>
                </motion.section>

                {/* Content Sections */}
                {content.sections.map((section, index) => (
                    <motion.section
                        key={`section-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mb-12"
                    >
                        <h2 className={`text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Sparkles className="text-cyan-glow" size={28} />
                            {section.title}
                        </h2>

                        <p className="text-text-muted leading-relaxed mb-6">
                            {section.content}
                        </p>

                        {section.highlights && (
                            <div className="bg-surface-dark rounded-2xl p-6 border border-white/5">
                                <ul className="space-y-3">
                                    {section.highlights.map((item, i) => (
                                        <li key={`section-${index}-highlight-${i}`} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                            <CheckCircle className="text-cyan-glow shrink-0 mt-0.5" size={20} />
                                            <span className="text-text-main/90">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {section.steps && (
                            <div className="space-y-4">
                                {section.steps.map((step, i) => (
                                    <div key={`section-${index}-step-${i}`} className={`flex items-start gap-4 p-5 bg-surface-dark rounded-xl border border-white/5 hover:border-cyan-glow/20 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-blue to-cyan-glow flex items-center justify-center text-white font-bold">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                                            <p className="text-text-muted">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {section.features && (
                            <div className="grid md:grid-cols-2 gap-4">
                                {section.features.map((feature, i) => (
                                    <div key={`section-${index}-feature-${i}`} className="p-5 bg-surface-dark rounded-xl border border-white/5 hover:border-cyan-glow/20 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-glow/5">
                                        <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <Zap className="text-primary-blue" size={20} />
                                            <h4 className="font-bold">{feature.name}</h4>
                                        </div>
                                        <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {section.technologies && (
                            <div className="bg-surface-dark rounded-2xl p-6 border border-white/5">
                                <ul className="space-y-3">
                                    {section.technologies.map((tech, i) => (
                                        <li key={`section-${index}-tech-${i}`} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                            <ChevronRight className="text-cyan-glow shrink-0" size={18} />
                                            <span className="text-text-main/90">{tech}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {section.stats && (
                            <div className="grid grid-cols-3 gap-4">
                                {section.stats.map((stat, i) => (
                                    <div key={`section-${index}-stat-${i}`} className="text-center p-6 bg-surface-dark rounded-xl border border-white/5">
                                        <div className="text-3xl md:text-4xl font-bold text-cyan-glow mb-2">{stat.value}</div>
                                        <div className="text-text-muted text-sm">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.section>
                ))}

                {/* CTA Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="my-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary-blue/10 to-cyan-glow/10 border border-cyan-glow/20 text-center"
                >
                    <Target className="mx-auto text-cyan-glow mb-6" size={48} />
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.cta.title}</h2>
                    <p className="text-text-muted mb-8 max-w-2xl mx-auto">{content.cta.description}</p>
                    <Link href={Contact.WhatsApp} target="_blank">
                        <Button variant="primary" size="lg">{content.cta.buttonText}</Button>
                    </Link>
                </motion.section>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <h2 className="text-2xl font-bold mb-8">
                            {isRTL ? 'مقالات ذات صلة' : 'Related Articles'}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {relatedArticles.map((related) => {
                                const RelatedIcon = iconMap[related.icon as keyof typeof iconMap];
                                return (
                                    <Link key={`related-${related.slug}`} href={`/blog/${related.slug}`}>
                                        <div className={`flex items-start gap-4 p-6 bg-surface-dark rounded-xl border border-white/5 hover:border-cyan-glow/30 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-blue/20 to-cyan-glow/20 flex items-center justify-center text-primary-blue">
                                                {RelatedIcon && <RelatedIcon size={24} />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold mb-2 hover:text-cyan-glow transition-colors">
                                                    {related.title[language as 'en' | 'ar']}
                                                </h3>
                                                <p className="text-text-muted text-sm line-clamp-2">
                                                    {related.excerpt[language as 'en' | 'ar']}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.section>
                )}
            </div>
        </article>
    );
}
