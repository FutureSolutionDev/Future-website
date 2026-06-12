import type { Metadata } from 'next';
import { IsLang, PageMetadata } from '@/lib/seo';
import ServicesContent from './ServicesContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return PageMetadata(IsLang(lang) ? lang : 'en', 'services', '/services');
}

export default function ServicesPage() {
    return <ServicesContent />;
}
