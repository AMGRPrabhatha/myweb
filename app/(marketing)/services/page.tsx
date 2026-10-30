import HeroTicker from '@/components/HeroTicker';
import { Metadata } from 'next';
import ServicesHero from '@/components/ServicesHero';
import ServicesSlider from '@/components/ServicesSlider';
import MilestonesSection from '@/components/MilestonesSection';
import GlobalHubsSection from '@/components/GlobalHubsSection';

export const metadata: Metadata = {
  title: 'Services | Website Development & Social Media Management',
  description:
    'Explore our coordinated digital services: high-performance Next.js web application development and ongoing social media management built for modern startups.',
};

export default async function ServicesPage() {
  return (
    <div className="bg-white min-h-screen text-ink">
      <ServicesHero />
      <HeroTicker />

      <ServicesSlider />

      {/* ========================================================= */}
      {/* 3. MILESTONES OF SUCCESS (Ninja Promo Bento Grid)         */}
      {/* ========================================================= */}
      <MilestonesSection />

      {/* ========================================================= */}
      {/* 4. GLOBAL HUBS & LOCAL TALENT (Ninja Promo Glass Layout)  */}
      {/* ========================================================= */}
      <GlobalHubsSection />

    </div>
  );
}
