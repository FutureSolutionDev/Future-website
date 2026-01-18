"use client";

import { motion } from 'framer-motion';
import { ShoppingCart, BarChart, Server, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

export default function SolutionsPage() {
    const { t, language } = useLanguage();

    const solutions = [
        {
            icon: ShoppingCart,
            title: t('solutions.ecommerce'),
            content: language === 'ar' ? 'حلول تجارة إلكترونية شاملة تشمل إدارة المخزون وبوابات الدفع.' : 'Comprehensive e-commerce solutions including inventory management, payment gateway integration.',
        },
        {
            icon: BarChart,
            title: t('solutions.fintech'),
            content: language === 'ar' ? 'تطبيقات مالية آمنة للبنوك والتداول مع تصور للبيانات في الوقت الفعلي.' : 'Secure financial technology applications for banking, trading, and personal finance management.',
        },
        {
            icon: Server,
            title: t('solutions.erp'),
            content: language === 'ar' ? 'أنظمة تخطيط موارد المؤسسات المخصصة لإدارة العمليات من الموارد البشرية إلى التوريد.' : 'Custom Enterprise Resource Planning (ERP) systems to manage business processes.',
        },
        {
            icon: Layers,
            title: t('solutions.healthcare'),
            content: language === 'ar' ? 'أنظمة إدارة الرعاية الصحية المتوافقة ومنصات الطب عن بعد.' : 'HIPAA-compliant healthcare management systems, telemedicine platforms.',
        },
    ];

    return (
        <div className="pt-20">
            <section className="py-20 bg-bg-dark">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-cyan-glow/10 text-cyan-glow text-sm">
                            {language === 'ar' ? 'تخصصاتنا' : 'Industry Focus'}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {t('solutions.title')} <span className="text-cyan-glow"></span>
                        </h1>
                        <p className="text-text-muted max-w-2xl mx-auto">
                            {t('solutions.subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {solutions.map((sol, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col md:flex-row gap-6 p-8 rounded-2xl bg-surface-dark border border-white/5 hover:border-cyan-glow/30 transition-all duration-300"
                            >
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-blue/20 to-cyan-glow/20 flex items-center justify-center text-primary-blue">
                                        <sol.icon size={32} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">{sol.title}</h3>
                                    <p className="text-text-muted mb-4 leading-relaxed">
                                        {sol.content}
                                    </p>
                                    <Button variant="outline" size="sm">
                                        {language === 'ar' ? 'المزيد' : 'Learn More'}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
