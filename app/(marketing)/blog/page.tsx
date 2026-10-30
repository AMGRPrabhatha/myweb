import ContentHero from '@/components/ContentHero';
import HeroTicker from '@/components/HeroTicker';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import BlogList from '@/components/BlogList';
import BlogFeatureCarousel from '@/components/BlogFeatureCarousel';

export const metadata: Metadata = {
  title: 'Blog & Digital Insights | Cobalt & Kinetic Digital',
  description:
    'Read actionable insights, Next.js engineering playbooks, social media growth strategies, and cross-border digital delivery case studies.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await db.getAllBlogPosts();

  return (
    <div className="bg-white min-h-screen text-ink">
      <ContentHero variant="blog" />
      <HeroTicker />
      <section id="journal-articles" className="scroll-mt-28 bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <BlogFeatureCarousel posts={posts} />
          {/* Interactive Blog List with Category Filters & Liquid Glass Cards */}
          <BlogList initialPosts={posts} />
        </div>
      </section>

    </div>
  );
}
