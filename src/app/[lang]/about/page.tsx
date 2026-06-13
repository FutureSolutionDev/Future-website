import type { Metadata } from 'next';
import { IsLang, PageMetadata } from '@/lib/seo';
import { Team } from '@/data/team';
import { GetTeamPhoto } from '@/lib/teamPhotos';
import AboutContent from './AboutContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return PageMetadata(IsLang(lang) ? lang : 'en', 'about', '/about');
}

export default function AboutPage() {
    // Resolve each member's photo at build time (file may or may not exist)
    const teamPhotos = Object.fromEntries(
        Team.map((member) => [member.photoSlug, GetTeamPhoto(member.photoSlug)])
    );
    return <AboutContent teamPhotos={teamPhotos} />;
}
