import type { Metadata } from 'next';
import { Hero } from '@/components/features/Hero';
import { ServicesSection } from '@/components/features/ServicesSection';
import { FeaturedWorkSection } from '@/components/features/FeaturedWorkSection';
import { ProcessSection } from '@/components/features/ProcessSection';
import { TestimonialsSection } from '@/components/features/TestimonialsSection';
import { WhyUsSection } from '@/components/features/WhyUsSection';
import { TechnologiesSection } from '@/components/features/TechnologiesSection';
import { FAQSection } from '@/components/features/FAQSection';
import { CTASection } from '@/components/features/CTASection';
import { IsLang, PageMetadata } from '@/lib/seo';
import { Projects } from '@/data/projects';
import { GetProjectImages } from '@/lib/projectImages';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return PageMetadata(IsLang(lang) ? lang : 'en', 'home', '');
}

export default function Home() {
  // Build-time images for every project; the carousel refreshes the active one at runtime
  const featuredImagesByFolder = Object.fromEntries(
    Projects.map((p) => [p.imagesFolder, GetProjectImages(p.imagesFolder)])
  );
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedWorkSection initialImagesByFolder={featuredImagesByFolder} />
      <TestimonialsSection />
      <ProcessSection />
      <WhyUsSection />
      <TechnologiesSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
