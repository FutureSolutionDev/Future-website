import type { Metadata } from 'next';
import { IsLang, PageMetadata } from '@/lib/seo';
import PortfolioContent from './PortfolioContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return PageMetadata(IsLang(lang) ? lang : 'en', 'portfolio', '/portfolio');
}

export default function PortfolioPage() {
    return <PortfolioContent />;
}
