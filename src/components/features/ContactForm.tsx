"use client";

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { Contact } from '@/lib/constants';
import { SubmitContactMessage } from '@/lib/contactApi';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

const INPUT_CLASS = "w-full bg-bg-dark border border-white/10 rounded-lg px-4 py-2 focus:border-primary-blue focus:outline-none transition-colors";

export function ContactForm() {
    const { t, language } = useLanguage();
    const [status, setStatus] = useState<SubmitStatus>('idle');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (status === 'sending') return;

        const form = event.currentTarget;
        const formData = new FormData(form);

        setStatus('sending');
        const ok = await SubmitContactMessage({
            name: String(formData.get('name') ?? ''),
            email: String(formData.get('email') ?? ''),
            topic: String(formData.get('topic') ?? ''),
            message: String(formData.get('message') ?? ''),
        });

        if (ok) {
            setStatus('sent');
            form.reset();
            window.gtag?.('event', 'contact_form_submit');
        } else {
            setStatus('error');
        }
    }

    if (status === 'sent') {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center" role="status">
                <CheckCircle size={48} className="text-green-400" />
                <p className="text-lg font-bold">
                    {language === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent!'}
                </p>
                <p className="text-text-muted text-sm">
                    {language === 'ar' ? 'سنرد عليك في أقرب وقت ممكن.' : 'We will get back to you as soon as possible.'}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-medium text-text-muted">{t('contact.form.name')}</label>
                    <input id="contact-name" name="name" type="text" required maxLength={100} className={INPUT_CLASS} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-medium text-text-muted">{t('contact.form.email')}</label>
                    <input id="contact-email" name="email" type="email" required maxLength={200} className={INPUT_CLASS} />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="contact-topic" className="text-sm font-medium text-text-muted">{t('contact.form.subject')}</label>
                <input id="contact-topic" name="topic" type="text" maxLength={200} className={INPUT_CLASS} />
            </div>
            <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-text-muted">{t('contact.form.message')}</label>
                <textarea id="contact-message" name="message" required maxLength={5000} className={`${INPUT_CLASS} h-32 resize-none`} />
            </div>
            <Button type="submit" disabled={status === 'sending'} className="w-full disabled:opacity-60 disabled:cursor-not-allowed">
                <Send size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {status === 'sending'
                    ? (language === 'ar' ? 'جارٍ الإرسال...' : 'Sending...')
                    : t('contact.form.send')}
            </Button>
            {status === 'error' && (
                <div className="flex items-start gap-2 text-sm text-red-400" role="alert">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p>
                        {language === 'ar'
                            ? 'تعذر إرسال الرسالة. حاول مرة أخرى أو تواصل معنا مباشرة عبر '
                            : 'The message could not be sent. Please try again or reach us directly on '}
                        <a href={Contact.WhatsApp} target="_blank" rel="noopener noreferrer" className="underline text-[#25D366]">
                            WhatsApp
                        </a>
                    </p>
                </div>
            )}
        </form>
    );
}
