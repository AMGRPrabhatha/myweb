import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import TypewriterText from '@/components/TypewriterText';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Share2,
  Tag,
  CheckCircle2,
} from 'lucide-react';

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const post = await db.getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Article Not Found | Cobalt & Kinetic Digital',
    };
  }

  return {
    title: `${post.title} | Cobalt & Kinetic Digital`,
    description: post.excerpt,
  };
}

export const revalidate = 60;

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const [post, allPosts] = await Promise.all([
    db.getBlogPostBySlug(params.slug),
    db.getAllBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  // Recommended articles (other posts)
  const recommendedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 5);

  return (
    <div className="bg-white min-h-screen text-ink">
      <div className="relative pt-8 pb-16 sm:pt-12 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10" style={{ paddingTop: 'var(--marketing-hero-top-space)' }}>
        
        {/* Back Link Breadcrumb (Matching Image 2) */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-ink transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Tag className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-[1.15]">
            <TypewriterText lines={[post.title]} />
          </h1>

          {/* Author Strip (Matching Image 2) */}
          <div className="flex items-center gap-3.5 pt-2">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-extrabold text-sm text-ink">{post.author.name}</div>
              <div className="text-xs text-slate-400">
                {post.author.role} • Published {post.publishedAt} • {post.readTime}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Hero Image (Matching Image 2) */}
        <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-slate-100 border border-slate-200/90 shadow-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Content Layout: 8 cols Article Body + 4 cols Sticky Sidebar (Matching Images 2 & 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4">
          
          {/* Left Column: Article Body (8 cols) */}
          <article className="lg:col-span-8 space-y-8 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            
            {/* Excerpt Lead */}
            <p className="text-lg sm:text-xl font-medium text-ink leading-relaxed border-l-4 border-[#FF5722] pl-5 italic">
              {post.excerpt}
            </p>

            {/* Paragraphs */}
            <div className="space-y-6">
              {post.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Category Tags & CTA Bar (Matching Image 3) */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full brand-gradient-button text-ink font-bold text-xs tracking-tight transition-all shadow-md shadow-indigo-500/25 active:scale-[0.98]"
              >
                <span>Start a Project with Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </article>

          {/* Right Column: Sticky Sidebar (4 cols) (Matching Images 2 & 3) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-28">
            
            {/* Recommended for You List (Matching Image 2) */}
            <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-6 border border-slate-200/90 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.04)] space-y-5">
              <h3 className="text-lg font-black text-ink tracking-tight border-b border-slate-100 pb-3">
                Recommended for you
              </h3>

              <div className="space-y-4">
                {recommendedPosts.map((rec) => (
                  <Link
                    key={rec.id}
                    href={`/blog/${rec.slug}`}
                    className="group flex items-start gap-3.5 hover:bg-slate-50/70 p-2 rounded-2xl transition-colors"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                      <Image
                        src={rec.coverImage}
                        alt={rec.title}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-ink group-hover:text-[#FF5722] transition-colors line-clamp-2 leading-snug">
                        {rec.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {rec.publishedAt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}
