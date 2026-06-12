import type { Metadata } from 'next';
import { IsLang, PageMetadata } from '@/lib/seo';
import SolutionsContent from './SolutionsContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return PageMetadata(IsLang(lang) ? lang : 'en', 'solutions', '/solutions');
}

export default function SolutionsPage() {
    return <SolutionsContent />;
}
