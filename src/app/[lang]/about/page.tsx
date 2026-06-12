import type { Metadata } from 'next';
import { IsLang, PageMetadata } from '@/lib/seo';
import AboutContent from './AboutContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return PageMetadata(IsLang(lang) ? lang : 'en', 'about', '/about');
}

export default function AboutPage() {
    return <AboutContent />;
}
