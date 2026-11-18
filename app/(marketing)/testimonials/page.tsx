import ContentHero from '@/components/ContentHero';
import HeroTicker from '@/components/HeroTicker';
import { pageMetadata } from '@/lib/seo';
import { db } from '@/lib/db';
import TestimonialsList from '@/components/TestimonialsList';
import ResultsMetrics from '@/components/ResultsMetrics';

export const metadata = pageMetadata({
  title: 'Client Reviews & Testimonials',
  description: 'Read client feedback about Design1X website development and social media work.',
  path: '/testimonials',
});

export const revalidate = 60;

export default async function TestimonialsPage() {
  const testimonials = await db.getPublishedTestimonials();

  return (
    <div className="bg-white min-h-screen text-ink">
      <ContentHero variant="testimonials" />
      <HeroTicker />
      <section id="client-reviews" className="scroll-mt-28 bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Interactive Testimonials List with Video Cards */}
          <TestimonialsList initialTestimonials={testimonials} />

          <ResultsMetrics />

        </div>
      </section>

    </div>
  );
}
