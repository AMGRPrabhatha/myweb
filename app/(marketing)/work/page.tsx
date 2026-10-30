import HeroTicker from '@/components/HeroTicker';
import { Metadata } from 'next';
import WorkHero from '@/components/WorkHero';
import WorkFilterGrid from '@/components/WorkFilterGrid';
import WorkPrinciples from '@/components/WorkPrinciples';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Work | Portfolio of Websites, Social Content & Combined Projects',
  description:
    'Explore our portfolio of responsive web applications, social media content campaigns, and coordinated startup launch projects.',
};

export const revalidate = 60;

export default async function WorkPage({ searchParams }: { searchParams?: { category?: string } }) {
  const category = searchParams?.category;
  const selectedCategory = category === 'websites' ? 'Websites' : category === 'social' ? 'Social Content' : 'All';
  const projects = await db.getProjects({ status: 'published' });

  return (
    <div className="bg-white min-h-screen text-ink">
      
      <WorkHero />
      <HeroTicker />

      <section id="projects" className="scroll-mt-28 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WorkFilterGrid key={selectedCategory} initialProjects={projects} initialCategory={selectedCategory} />
      </section>
      <WorkPrinciples />
    </div>
  );
}
