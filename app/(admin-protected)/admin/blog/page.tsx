import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import {
  BookOpen,
  Plus,
  ExternalLink,
  Edit3,
  Calendar,
  Clock,
  Tag,
  Eye,
  ArrowRight,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminBlogPage() {
  const posts = await db.getAllBlogPosts();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-cobalt" />
            <span>Blog &amp; Editorial Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 mt-1">
            Write, edit, and publish technical insights, social media case studies, and growth articles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-warm-300 text-xs font-bold text-ink hover:bg-white transition-colors"
          >
            <span>View Public Blog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Total Published</span>
            <div className="text-3xl font-extrabold text-cobalt">{posts.length}</div>
            <span className="text-[11px] text-ink-500">Live articles on site</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-cobalt-50 text-cobalt flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Categories</span>
            <div className="text-3xl font-extrabold text-ink">
              {new Set(posts.map((p) => p.category)).size}
            </div>
            <span className="text-[11px] text-ink-500">Distinct technical tracks</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-warm-100 text-ink flex items-center justify-center font-bold">
            <Tag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Editorial Engine</span>
            <div className="text-sm font-extrabold text-emerald-600 flex items-center gap-1.5 pt-1">
              <Eye className="w-4 h-4" />
              <span>Live Preview Ready</span>
            </div>
            <span className="text-[11px] text-ink-500">Instant full-fidelity rendering</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-warm-300 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-warm-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-ink">Published Articles</h2>
            <p className="text-xs text-ink-500">Click any article to edit content or view the real-time preview.</p>
          </div>
          <span className="text-xs font-semibold text-ink-400">
            {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-700">
            <thead className="bg-warm-50 text-ink-500 uppercase tracking-wider font-semibold border-b border-warm-200">
              <tr>
                <th className="px-6 py-3.5">Article &amp; Excerpt</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Author</th>
                <th className="px-6 py-3.5">Published &amp; Read Time</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-warm-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-warm-100 border border-warm-200 shrink-0">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="space-y-1 max-w-md">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="font-bold text-ink text-sm hover:text-[#FF5722] transition-colors block line-clamp-1"
                        >
                          {post.title}
                        </Link>
                        <p className="text-[11px] text-ink-500 line-clamp-1">
                          {post.excerpt}
                        </p>
                        <div className="font-mono text-[10px] text-cobalt truncate">
                          /blog/{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200">
                      {post.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden bg-warm-200 shrink-0">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-ink text-xs">{post.author.name}</div>
                        <div className="text-[10px] text-ink-400">{post.author.role}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-ink font-medium">{post.publishedAt}</div>
                    <div className="text-ink-400 text-[11px]">{post.readTime}</div>
                  </td>

                  <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 font-semibold text-ink-500 hover:text-ink text-xs"
                    >
                      <span>Public</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cobalt-50 hover:bg-cobalt-100 text-cobalt font-bold text-xs transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit &amp; Preview</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
