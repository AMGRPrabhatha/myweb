import ContentHero from '@/components/ContentHero';
import HeroTicker from '@/components/HeroTicker';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import TestimonialsList from '@/components/TestimonialsList';
import { Smile, Clock3, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Testimonials & Video Stories | Cobalt & Kinetic Digital',
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

          {/* Results, using the same details as the original statistic cards */}
          <section
            id="results"
            aria-labelledby="results-heading"
            className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#F8FAFF] via-[#F0F3FF] to-[#FFF6F0] px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cobalt-200/30 blur-3xl" />
            <div className="relative">
              <h2 id="results-heading" className="max-w-2xl text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Our work, in three numbers.
              </h2>

              <div className="mobile-card-rail mt-10 grid grid-cols-1 items-start gap-4 sm:gap-6 md:grid-cols-3 lg:mt-12">
                <article className="flex min-h-[280px] flex-col rounded-[28px] bg-white p-7 shadow-[0_18px_45px_-26px_rgba(31,48,91,0.25)] sm:min-h-[340px] sm:p-8">
                  <Smile aria-hidden="true" className="h-9 w-9 text-[#FF5722]" strokeWidth={1.8} />
                  <div className="mt-10 text-5xl font-black tracking-tight text-ink sm:text-6xl">98%</div>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-ink sm:text-2xl">Client Satisfaction</h3>
                  <p className="mt-auto pt-7 text-sm font-medium text-slate-500">Over 100+ delivered web and social projects</p>
                </article>

                <article className="flex min-h-[280px] flex-col rounded-[28px] bg-white p-7 shadow-[0_18px_45px_-26px_rgba(31,48,91,0.25)] sm:min-h-[370px] sm:p-8 md:translate-y-8">
                  <Clock3 aria-hidden="true" className="h-9 w-9 text-[#FF5722]" strokeWidth={1.8} />
                  <div className="mt-10 text-4xl font-black tracking-tight text-ink sm:text-5xl">1 Business Day</div>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-ink sm:text-2xl">Proposal Response SLA</h3>
                  <p className="mt-auto pt-7 text-sm font-medium text-slate-500">Fast feasibility check and milestone pricing</p>
                </article>

                <article className="flex min-h-[280px] flex-col rounded-[28px] bg-white p-7 shadow-[0_18px_45px_-26px_rgba(31,48,91,0.25)] sm:min-h-[340px] sm:p-8">
                  <Code2 aria-hidden="true" className="h-9 w-9 text-cobalt" strokeWidth={1.8} />
                  <div className="mt-10 text-5xl font-black tracking-tight text-ink sm:text-6xl">100%</div>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-ink sm:text-2xl">Code &amp; Asset Ownership</h3>
                  <p className="mt-auto pt-7 text-sm font-medium text-slate-500">Complete IP handover with zero lock-in</p>
                </article>
              </div>
            </div>
          </section>

        </div>
      </section>

    </div>
  );
}
