"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import QuoteCanvas from './QuoteCanvas';

export default function AboutPage() {
    const { language } = useLanguage();
    const about = {
        title: language === 'ar' ? 'من' : 'Who We',
        description: language === 'ar' ? 'فيوتشر سوليوشنز للتطوير هي وكالة برمجيات رائدة مكرسة لتحويل الأعمال من خلال التكنولوجيا. تأسست في عام 2024، وسرعان ما نمت لتصبح فريقًا من المهندسين والمصممين والاستراتيجيين الشغوفين.' : 'Future Solutions Dev is a premier software development agency dedicated to transforming businesses through technology. Founded in 2024, we have rapidly grown into a team of passionate engineers, designers, and strategists.',
    }
    return (
        <div className="pt-20">
            <section className="py-20 bg-bg-dark">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-4xl font-bold mb-6">
                                {about.title} <span className="text-primary-blue">{language === 'ar' ? 'نحن' : 'Are'}</span>
                            </h1>
                            <div className="prose prose-invert text-text-muted">
                                <p className="mb-4">
                                    {about.description}
                                </p>
                                <p className="mb-4">
                                    {language === 'ar'
                                        ? 'مهمتنا بسيطة: بناء برمجيات ليست مجرد وظيفية، بل استثنائية. نؤمن بقوة البرمجة في حل مشاكل العالم الحقيقي وخلق فرص جديدة للنمو.'
                                        : 'Our mission is simple: to build software that is not just functional, but exceptional. We believe in the power of code to solve real-world problems and create new opportunities for growth.'}
                                </p>
                                <p>
                                    {language === 'ar'
                                        ? 'سواء كنت شركة ناشئة تتطلع لإطلاق منتجك الأول أو مؤسسة تسعى لتحسين عملياتها، لدينا الخبرة والرؤية للوصول بك إلى هدفك.'
                                        : 'Whether you are a startup looking to launch your first MVP or an enterprise seeking to optimize your operations, we have the expertise and the vision to get you there.'}
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative h-[400px] rounded-2xl overflow-hidden bg-surface-dark border border-white/10 flex items-center justify-center p-8 text-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 to-purple-500/10" />
                            {/* <QuoteCanvas lang={language} /> */}
                            <QuoteCanvas
                                lang={language}
                                text={language === 'ar' ? 'الابتكار في قلب كل شيء نقوم به' : 'Innovation is at the core of everything we do'}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
