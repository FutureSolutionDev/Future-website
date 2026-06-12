"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { ContactForm } from '@/components/features/ContactForm';
import { useLanguage } from '@/context/LanguageContext';
import { ASSET_VERSION, Contact } from '@/lib/constants';

const NEXT_STEPS = [
    {
        en: "We reply within one business day",
        ar: "بنرد خلال يوم عمل واحد",
    },
    {
        en: "A short call to understand your goal",
        ar: "مكالمة قصيرة نفهم فيها هدفك",
    },
    {
        en: "You get a clear plan and a fixed quote",
        ar: "بتستلم خطة واضحة وعرض سعر ثابت",
    },
];

export default function ContactContent() {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';

    return (
        <section className="py-14 bg-bg-dark min-h-screen">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="bg-surface-dark border border-white/5 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-6">{t('contact.info')}</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <a href={`mailto:${Contact.Email}`} className="text-primary-blue">{Contact.Email}</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <a href={`tel:${Contact.Phone}`} className="text-primary-blue" dir="ltr">{Contact.Phone}</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <span className="text-text-muted">{Contact.Address}</span>
                                </div>
                            </div>
                            {/* The fastest channel gets the loudest button */}
                            <a
                                href={Contact.WhatsApp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#25D366] text-white font-bold hover:bg-[#1EBE5D] transition-colors"
                            >
                                <Image src={`/assets/whatsapp.svg?v=${ASSET_VERSION}`} alt="" width={20} height={20} className="w-5 h-5 brightness-0 invert" />
                                {isRTL ? 'كلمنا واتساب — أسرع رد' : 'WhatsApp us — fastest reply'}
                            </a>
                        </div>

                        {/* What happens after you reach out — removes the fear of the unknown */}
                        <div className="bg-surface-dark border border-white/5 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                                <MessageCircle size={20} className="text-cyan-glow" />
                                {isRTL ? 'إيه اللي بيحصل بعد رسالتك؟' : 'What happens after you reach out?'}
                            </h3>
                            <ol className="space-y-4">
                                {NEXT_STEPS.map((step, i) => (
                                    <li key={`next-step-${i}`} className="flex items-start gap-3">
                                        <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-primary-blue to-cyan-glow flex items-center justify-center text-white text-sm font-bold">
                                            {i + 1}
                                        </span>
                                        <span className="text-text-muted leading-relaxed pt-0.5">
                                            {isRTL ? step.ar : step.en}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-surface-dark border border-white/5 rounded-2xl p-8"
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
