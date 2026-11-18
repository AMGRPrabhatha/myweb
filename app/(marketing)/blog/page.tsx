import ContentHero from '@/components/ContentHero';
import HeroTicker from '@/components/HeroTicker';
import { pageMetadata } from '@/lib/seo';
import { db } from '@/lib/db';
import BlogList from '@/components/BlogList';
import BlogFeatureCarousel from '@/components/BlogFeatureCarousel';

export const metadata = pageMetadata({
  title: 'Web Development & Social Media Blog',
  description: 'Read Design1X articles about web development, UI/UX, social media strategy and digital projects.',
  path: '/blog',
});

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
