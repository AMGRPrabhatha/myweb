import HeroTicker from '@/components/HeroTicker';
import { pageMetadata } from '@/lib/seo';
import ServicesHero from '@/components/ServicesHero';
import ServicesSlider from '@/components/ServicesSlider';
import MilestonesSection from '@/components/MilestonesSection';
import GlobalHubsSection from '@/components/GlobalHubsSection';

export const metadata = pageMetadata({
  title: 'Website Development & Social Media Services',
  description: 'Explore Design1X website development, UI/UX design and social media management services for businesses in Sri Lanka and beyond.',
  path: '/services',
});

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
