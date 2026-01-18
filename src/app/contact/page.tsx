"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { Contact } from '@/lib/constants';

export default function ContactPage() {
    const { t } = useLanguage();

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
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                                        <Mail size={20} />
                                    </div>
                                    <a href={`mailto:${Contact.Email}`} className="text-primary-blue">{Contact.Email || "info@futuresolutionsdev.com"}</a>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                                        <Phone size={20} />
                                    </div>
                                    <a href={`tel:${Contact.Phone}`} className="text-primary-blue">{Contact.Phone || "201015471713"}</a>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                                        <MapPin size={20} />
                                    </div>
                                    <span className="text-text-muted">{Contact.Address || "Cairo, Egypt"}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-surface-dark border border-white/5 rounded-2xl p-8"
                    >
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">{t('contact.form.name')}</label>
                                    <input type="text" className="w-full bg-bg-dark border border-white/10 rounded-lg px-4 py-2 focus:border-primary-blue focus:outline-none transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">{t('contact.form.email')}</label>
                                    <input type="email" className="w-full bg-bg-dark border border-white/10 rounded-lg px-4 py-2 focus:border-primary-blue focus:outline-none transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">{t('contact.form.subject')}</label>
                                <input type="text" className="w-full bg-bg-dark border border-white/10 rounded-lg px-4 py-2 focus:border-primary-blue focus:outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">{t('contact.form.message')}</label>
                                <textarea className="w-full bg-bg-dark border border-white/10 rounded-lg px-4 py-2 h-32 focus:border-primary-blue focus:outline-none transition-colors resize-none" />
                            </div>
                            <Button className="w-full">
                                <Send size={18} className="mr-2 rtl:ml-2 rtl:mr-0" /> {t('contact.form.send')}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
