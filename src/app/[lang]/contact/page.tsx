import type { Metadata } from 'next';
import { IsLang, PageMetadata } from '@/lib/seo';
import ContactContent from './ContactContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return PageMetadata(IsLang(lang) ? lang : 'en', 'contact', '/contact');
}

export default function ContactPage() {
    return <ContactContent />;
}
