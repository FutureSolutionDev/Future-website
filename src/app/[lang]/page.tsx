import type { Metadata } from 'next';
import { Hero } from '@/components/features/Hero';
import { ServicesSection } from '@/components/features/ServicesSection';
import { FeaturedWorkSection } from '@/components/features/FeaturedWorkSection';
import { WhyUsSection } from '@/components/features/WhyUsSection';
import { TechnologiesSection } from '@/components/features/TechnologiesSection';
import { CTASection } from '@/components/features/CTASection';
import { IsLang, PageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return PageMetadata(IsLang(lang) ? lang : 'en', 'home', '');
}

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedWorkSection />
      <WhyUsSection />
      <TechnologiesSection />
      <CTASection />
    </>
  );
}
