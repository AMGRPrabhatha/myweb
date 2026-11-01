import HomeStory from '@/components/HomeStory';
import HeroTicker from '@/components/HeroTicker';
import HeroSection from '@/components/HeroSection';
import SelectedWork from '@/components/SelectedWork';
import ServicesPreview from '@/components/ServicesPreview';
import StartupBenefits from '@/components/StartupBenefits';
import ResultsMetrics from '@/components/ResultsMetrics';
import PlansPreview from '@/components/PlansPreview';
import ProcessSection from '@/components/ProcessSection';
import ProofAndFaq from '@/components/ProofAndFaq';
import BlogFeatureCarousel from '@/components/BlogFeatureCarousel';
import { db } from '@/lib/db';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [projects, plans, posts] = await Promise.all([
    db.getProjects({ status: 'published' }),
    db.getAllPlans(),
    db.getAllBlogPosts(),
  ]);

  return (
    <>
      <HeroSection />
      <HeroTicker />
      <HomeStory />
      <SelectedWork projects={projects} />
      <ServicesPreview />
      <StartupBenefits />
      <div className="mx-auto max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
        <ResultsMetrics />
      </div>
      <PlansPreview plans={plans} />
      <ProcessSection />
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogFeatureCarousel posts={posts} />
        </div>
      </div>
      <ProofAndFaq />
    </>
  );
}
