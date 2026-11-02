import ContentHero from '@/components/ContentHero';
import HeroTicker from '@/components/HeroTicker';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import TestimonialsList from '@/components/TestimonialsList';
import ResultsMetrics from '@/components/ResultsMetrics';

export const metadata: Metadata = {
  title: 'Client Testimonials & Video Stories | Design1X',
  description:
    'Read real client stories and watch verified testimonials from founders and executives across Japan, Europe, and Sri Lanka.',
};

export const revalidate = 60;

export default async function TestimonialsPage() {
  const testimonials = await db.getAllTestimonials();

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
