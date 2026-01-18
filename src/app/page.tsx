import { Hero } from '@/components/features/Hero';
import { ServicesSection } from '@/components/features/ServicesSection';
import { WhyUsSection } from '@/components/features/WhyUsSection';
import { TechnologiesSection } from '@/components/features/TechnologiesSection';
import { CTASection } from '@/components/features/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyUsSection />
      <TechnologiesSection />
      <CTASection />
    </>
  );
}
