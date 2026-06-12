import type { Metadata } from 'next';
import { IsLang, PageMetadata } from '@/lib/seo';
import { Projects } from '@/data/projects';
import { GetProjectImages } from '@/lib/projectImages';
import PortfolioContent from './PortfolioContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return PageMetadata(IsLang(lang) ? lang : 'en', 'portfolio', '/portfolio');
}

export default function PortfolioPage() {
    // Build-time snapshot of each gallery folder; the client refreshes it at
    // runtime from the server's JSON folder listing (new uploads, no rebuild)
    const initialImagesByFolder = Object.fromEntries(
        Projects.map((project) => [project.imagesFolder, GetProjectImages(project.imagesFolder)])
    );
    return <PortfolioContent initialImagesByFolder={initialImagesByFolder} />;
}
