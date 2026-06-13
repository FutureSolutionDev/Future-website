"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Handshake, LineChart, PackageCheck, Eye, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Contact } from '@/lib/constants';
import { TeamSection } from '@/components/features/TeamSection';

const VALUES = [
    {
        icon: LineChart,
        title: { en: 'Results you can measure', ar: 'نتائج تقاس بالأرقام' },
        text: {
            en: 'Every project starts from a business goal — more sales, faster operations, lower costs — not from a technology wishlist.',
            ar: 'كل مشروع يبدأ من هدف تجاري واضح — مبيعات أكثر، عمليات أسرع، تكلفة أقل — مش من قائمة تقنيات.',
        },
    },
    {
        icon: PackageCheck,
        title: { en: 'A working product, not just code', ar: 'منتج كامل، مش مجرد كود' },
        text: {
            en: 'You receive a running platform: design, development, hosting, and training — ready to take customers from day one.',
            ar: 'تستلم منصة شغالة: تصميم وتطوير واستضافة وتدريب — جاهزة تستقبل عملاءك من أول يوم.',
        },
    },
    {
        icon: Eye,
        title: { en: 'Full transparency', ar: 'شفافية كاملة' },
        text: {
            en: 'A clear plan, weekly progress you can see for yourself, and one price with no surprises.',
            ar: 'خطة واضحة، وتقدم أسبوعي تشوفه بنفسك، وسعر واحد بدون مفاجآت.',
        },
    },
    {
        icon: Handshake,
        title: { en: 'A partner after launch', ar: 'شريك بعد الإطلاق' },
        text: {
            en: 'Launch is the beginning, not the end — we stay for support, improvements, and the next growth step.',
            ar: 'الإطلاق بداية الشغل مش نهايته — بنفضل معاك للدعم والتحسين وخطوة النمو الجاية.',
        },
    },
];

const STATS = [
    { value: '2024', label: { en: 'Founded — serving worldwide', ar: 'تأسست — نخدم العالم كله' } },
    { value: '100%', label: { en: 'You own the code', ar: 'الكود ملكك بالكامل' } },
    { value: '24/7', label: { en: 'Platforms live in production', ar: 'منصات حية تعمل دائماً' } },
    { value: '2', label: { en: 'Languages: Arabic & English', ar: 'لغتان: عربي وإنجليزي' } },
];

export default function AboutContent({ teamPhotos }: { teamPhotos: Record<string, string | null> }) {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    return (
        <div className="bg-bg-dark">
            {/* Positioning statement */}
            <section className="pt-24 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-blue/5 blur-3xl pointer-events-none" />
                <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                    >
                        {isRTL ? (
                            <>بنحوّل أفكار الأعمال إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">منصات تكسب</span></>
                        ) : (
                            <>We turn business ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">platforms that win</span></>
                        )}
                    </motion.h1>
                    <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                        {isRTL
                            ? 'Future Solutions وكالة برمجيات تأسست 2024 وتخدم عملاء في الوطن العربي وحول العالم. بنصمم ونبني ونشغّل منصات ويب وموبايل وSaaS لأصحاب الأعمال اللي عايزين نتيجة — مش مشروع تقني معلّق.'
                            : 'Future Solutions is a software agency founded in 2024, serving clients across the Arab world and beyond. We design, build, and run web, mobile, and SaaS platforms for business owners who want an outcome — not a stalled tech project.'}
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-5 text-text-muted leading-relaxed text-lg"
                    >
                        <p>
                            {isRTL
                                ? 'بدأنا من ملاحظة بسيطة: معظم أصحاب الأعمال مش محتاجين "موقع" — محتاجين نظام يبيع بدالهم، ينظم شغلهم، ويكبر معاهم. وعشان كده بنسلّم منصات كاملة: متجر يستقبل المدفوعات، لوحة تحكم تدير كل حاجة، وأدوات تسويق مدمجة.'
                                : 'We started from a simple observation: most business owners don’t need a "website" — they need a system that sells for them, organizes their work, and grows with them. So we deliver complete platforms: a store that takes payments, a dashboard that runs everything, and marketing tools built in.'}
                        </p>
                        <p>
                            {isRTL
                                ? 'فريقنا يجمع مهندسين ومصممين واستراتيجيين اشتغلوا على أنظمة حقيقية تخدم عملاء حقيقيين كل يوم — من التجارة الإلكترونية للأنظمة المالية والرعاية الصحية. بنشتغل بالعربي والإنجليزي عن بعد بالكامل، ونفهم أسواق الوطن العربي زي ما بنفهم الكود — ومنصاتنا بتخدم عملاء في أي مكان في العالم.'
                                : 'Our team combines engineers, designers, and strategists who have shipped real systems serving real customers every day — from e-commerce to FinTech and healthcare. We work in Arabic and English, fully remotely, and we understand Arab markets as well as we understand code — with platforms serving clients anywhere in the world.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats — honest, no invented numbers */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={`stat-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="text-center p-6 rounded-2xl bg-surface-dark border border-white/5"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-cyan-glow mb-2">{stat.value}</div>
                                <div className="text-text-muted text-sm">{isRTL ? stat.label.ar : stat.label.en}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What makes us different */}
            <section className="py-16 bg-surface-dark/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        {isRTL ? (
                            <>ليه أصحاب الأعمال <span className="text-primary-blue">بيختارونا</span></>
                        ) : (
                            <>Why business owners <span className="text-primary-blue">choose us</span></>
                        )}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {VALUES.map((value, i) => (
                            <motion.div
                                key={`value-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="p-7 rounded-2xl bg-surface-dark border border-white/5 hover:border-cyan-glow/25 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-blue/20 to-cyan-glow/20 flex items-center justify-center text-cyan-glow mb-4">
                                    <value.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{isRTL ? value.title.ar : value.title.en}</h3>
                                <p className="text-text-muted leading-relaxed text-sm">
                                    {isRTL ? value.text.ar : value.text.en}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <TeamSection photos={teamPhotos} />

            {/* CTA */}
            <section className="py-20 text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        {isRTL ? 'احكِ لنا عن مشروعك — الاستشارة الأولى مجانية' : 'Tell us about your project — the first consultation is free'}
                    </h2>
                    <p className="text-text-muted mb-8">
                        {isRTL
                            ? 'في مكالمة واحدة هتعرف إيه الممكن، بكام، وفي قد إيه.'
                            : 'In one call you’ll know what’s possible, what it costs, and how long it takes.'}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href={Contact.WhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary-blue text-white text-lg font-bold hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(29,161,242,0.5)]"
                        >
                            {isRTL ? 'احجز استشارة مجانية' : 'Book a Free Consultation'}
                        </a>
                        <Link
                            href={`/${language}/portfolio`}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-primary-blue/50 text-primary-blue text-lg font-bold hover:bg-primary-blue/10 transition-colors"
                        >
                            {isRTL ? 'شوف أعمالنا' : 'See Our Work'}
                            <ArrowRight size={18} className="rtl:rotate-180" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
