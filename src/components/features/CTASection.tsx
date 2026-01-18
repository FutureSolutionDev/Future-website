"use client";

import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { Contact } from '@/lib/constants';
import Link from 'next/link';

export function CTASection() {
    const { t } = useLanguage();
    return (
        <section className="py-24 relative overflow-hidden overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 text-center
            bg-primary-blue/5
            ">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    {t('cta.title')}
                    <span className="text-primary-blue">{t('cta.subtitle')}</span>
                </h2>
                <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8">
                    {t('cta.description')}
                </p>
                <div className="flex justify-center gap-4">
                    <Link href={Contact.WhatsApp} target="_blank">
                        <Button size="lg">{t('cta.button1')}</Button>
                    </Link>
                    <Link href={"/contact"}>
                        <Button variant="secondary" size="lg">{t('cta.button2')}</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
