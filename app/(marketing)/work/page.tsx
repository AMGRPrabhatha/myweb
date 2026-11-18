import HeroTicker from '@/components/HeroTicker';
import { pageMetadata } from '@/lib/seo';
import WorkHero from '@/components/WorkHero';
import WorkFilterGrid from '@/components/WorkFilterGrid';
import WorkPrinciples from '@/components/WorkPrinciples';
import { db } from '@/lib/db';

export const metadata = pageMetadata({
  title: 'Website & Digital Project Portfolio',
  description: 'Browse published Design1X website, web application and social media projects and read about the work behind them.',
  path: '/work',
});

export const revalidate = 60;

export default async function WorkPage({ searchParams }: { searchParams?: { category?: string } }) {
  const category = searchParams?.category;
  const selectedCategory = category === 'websites' ? 'Websites' : category === 'social' ? 'Social Content' : 'All';
  const projects = await db.getProjects({ status: 'published' });

  return (
    <div className="bg-white min-h-screen text-ink">
      
      <WorkHero projects={projects} />
      <HeroTicker />

      <section id="projects" className="scroll-mt-28 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WorkFilterGrid key={selectedCategory} initialProjects={projects} initialCategory={selectedCategory} />
      </section>
      <WorkPrinciples />
    </div>
  );
}
