import type { Metadata } from 'next';
import { IsLang, PageMetadata } from '@/lib/seo';
import TechnologiesContent from './TechnologiesContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return PageMetadata(IsLang(lang) ? lang : 'en', 'technologies', '/technologies');
}

export default function TechnologiesPage() {
    return <TechnologiesContent />;
}
