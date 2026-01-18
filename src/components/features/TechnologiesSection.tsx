"use client";

import { useLanguage } from '@/context/LanguageContext';
import { techs } from '@/lib/constants';
import { motion } from 'framer-motion';
import {
    Atom,
    Server,
    Triangle,
    FileCode2,
    Braces,
    Cloud,
    Database,
    Container,
} from 'lucide-react';

export function TechnologiesSection() {
    const {language } = useLanguage();

    const techsData = techs({
        Atom,
        Server,
        Triangle,
        FileCode2,
        Braces,
        Cloud,
        Database,
        Container,
    })

    return (
        <section className="relative z-10 w-full">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mb-8"
                >
                    <h2 className="text-4xl font-bold mb-4">   {language === 'ar' ? 'التقنيات' : 'Technologies'} <span className="text-purple-500">{language === 'ar' ? 'والأدوات' : '& Tools'}</span>
                    </h2>
                    <p className="text-blue-200/60">   {language === 'ar'
                        ? 'نستخدم أحدث التقنيات وأكثرها موثوقية لبناء منتجاتك الرقمية.'
                        : 'We use the latest and most reliable technologies to build your digital products.'}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {techsData.map((tech, i) => (
                        <motion.div
                            key={`tech-data-${i}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-6 rounded-2xl bg-[#0a0a25] border border-blue-500/10 hover:border-blue-500/50 flex flex-col items-center justify-center gap-4 aspect-square group transition-all"
                        >
                            <div className={`text-5xl group-hover:scale-110 transition-transform ${tech.color}`}>
                                {tech.icon}
                            </div>
                            <span className="font-semibold text-xl text-white/90">{tech.name}</span>
                            {tech.description?.[language] && <p className="text-blue-200/60 mb-8 leading-relaxed text-sm">
                                {tech.description[language]}
                            </p>}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
