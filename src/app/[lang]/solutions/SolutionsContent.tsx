"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, BarChart, Server, Layers, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { Contact, solutions } from '@/lib/constants';


export default function SolutionsContent() {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';
    const solutionsData = solutions({
        language,
        t,
        ShoppingCart,
        BarChart,
        Server,
        Layers,
    })
    return (
        <section className="py-20 bg-bg-dark">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        {t('solutions.title')} <span className="text-cyan-glow"></span>
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        {t('solutions.subtitle')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {solutionsData.map((sol, i) => (
                        <motion.div
                            key={`sol-${i}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex flex-col md:flex-row gap-6 p-8 rounded-2xl bg-surface-dark border border-white/5 hover:border-cyan-glow/30 transition-all duration-300"
                        >
                            <div className="shrink-0">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-blue/20 to-cyan-glow/20 flex items-center justify-center text-primary-blue group-hover:text-cyan-glow transition-colors">
                                    <sol.icon size={32} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">{sol.title}</h3>
                                <p className="text-text-muted mb-4 leading-relaxed">
                                    {sol.content}
                                </p>
                                <ul className="space-y-2 mb-5">
                                    {sol.points.map((point) => (
                                        <li key={point} className="flex items-start gap-2.5 text-sm text-text-main/90">
                                            <CheckCircle size={15} className="text-cyan-glow shrink-0 mt-0.5" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={`/${language}/blog/${sol.slug}`}>
                                    <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                                        {language === 'ar' ? 'اعرف أكثر عن الحل ده' : 'Learn more about this solution'}
                                        <ArrowRight size={16} className="rtl:rotate-180" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Page CTA — every solution page visit should have a next step */}
                <div className="text-center mt-16">
                    <p className="text-text-muted mb-4">
                        {isRTL
                            ? 'مجالك مش في القائمة؟ احكيلنا عن شغلك — كل منصاتنا بتتفصل على المقاس.'
                            : "Don't see your industry? Tell us about your business — every platform we build is tailored."}
                    </p>
                    <a
                        href={Contact.WhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary-blue text-white text-lg font-bold hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(29,161,242,0.5)]"
                    >
                        {isRTL ? 'احجز استشارة مجانية' : 'Book a Free Consultation'}
                    </a>
                </div>
            </div>
        </section>
    );
}
