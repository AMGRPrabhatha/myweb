'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/types';
import { saveBlogPostAction, deleteBlogPostAction } from '@/lib/actions';
import {
  ArrowLeft,
  Save,
  Eye,
  Edit3,
  Sparkles,
  Tag,
  Clock,
  Calendar,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  User,
  Loader2,
  Share2,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

interface BlogEditorProps {
  initialPost?: BlogPost;
  isNew?: boolean;
}

const PRESET_COVERS = [
  {
    label: 'Next.js & Performance',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Social Media Studio',
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Tokyo Delivery Hub',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Clean Architecture',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Growth & Analytics',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
];

const PRESET_AUTHORS = [
  {
    name: 'Kasun Perera',
    role: 'Principal Engineer & Founder',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Kenji Sato',
    role: 'Tokyo Delivery Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Agency Editorial Team',
    role: 'Design & Growth Strategy',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
];

const CATEGORIES = [
  'Web Development',
  'Social Media Strategy',
  'Growth Case Study',
  'Design Systems',
  'Enterprise Architecture',
  'Conversion Rate Optimization',
];

export default function BlogEditor({ initialPost, isNew = false }: BlogEditorProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isPending, startTransition] = useTransition();
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [isSlugManual, setIsSlugManual] = useState(!isNew);
  const [category, setCategory] = useState(initialPost?.category || 'Web Development');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [contentRaw, setContentRaw] = useState(
    initialPost?.content ? initialPost.content.join('\n\n') : ''
  );
  const [coverImage, setCoverImage] = useState(
    initialPost?.coverImage || PRESET_COVERS[0].url
  );
  const [authorName, setAuthorName] = useState(
    initialPost?.author?.name || PRESET_AUTHORS[0].name
  );
  const [authorRole, setAuthorRole] = useState(
    initialPost?.author?.role || PRESET_AUTHORS[0].role
  );
  const [authorAvatar, setAuthorAvatar] = useState(
    initialPost?.author?.avatar || PRESET_AUTHORS[0].avatar
  );
  const [tagsRaw, setTagsRaw] = useState(
    initialPost?.tags ? initialPost.tags.join(', ') : 'NextJS, WebDev, Growth'
  );
  const [readTime, setReadTime] = useState(initialPost?.readTime || '4 min read');
  const [publishedAt, setPublishedAt] = useState(
    initialPost?.publishedAt ||
      new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
  );

  // Auto-generate slug and calculate read time when title or content changes
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isSlugManual) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContentRaw(newContent);
    const words = newContent.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    setReadTime(`${minutes} min read`);
  };

  // Prepare current post data
  const currentPost: BlogPost = {
    id: initialPost?.id || `blog-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: title || 'Untitled Article',
    slug: slug || 'untitled-article',
    category: category,
    categorySlug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    excerpt: excerpt || 'Article excerpt summary goes here...',
    content: contentRaw
      ? contentRaw
          .split('\n\n')
          .map((p) => p.trim())
          .filter(Boolean)
      : ['Article paragraph content will appear here.'],
    coverImage: coverImage,
    readTime: readTime,
    publishedAt: publishedAt,
    author: {
      name: authorName,
      role: authorRole,
      avatar: authorAvatar,
    },
    tags: tagsRaw
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean),
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title for the blog article.');
      return;
    }
    if (!slug.trim()) {
      alert('Please enter a slug for the blog article URL.');
      return;
    }

    startTransition(async () => {
      const res = await saveBlogPostAction(currentPost);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          router.push('/admin/blog');
        }, 1200);
      }
    });
  };

  const handleDelete = () => {
    if (!initialPost?.id) return;
    if (confirm(`Are you sure you want to delete "${initialPost.title}"?`)) {
      startTransition(async () => {
        await deleteBlogPostAction(initialPost.id);
        router.push('/admin/blog');
      });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn pb-16">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-300">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="w-9 h-9 rounded-xl bg-white hover:bg-warm-100 border border-warm-300 flex items-center justify-center text-ink hover:text-cobalt transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
              {isNew ? 'Write New Blog Article' : `Edit: ${initialPost?.title}`}
            </h1>
            <p className="text-xs text-ink-500">
              {isNew
                ? 'Create a new article for the public website with live preview.'
                : 'Modify content, categories, author bio, or metadata.'}
            </p>
          </div>
        </div>

        {/* View Toggle Tabs & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex rounded-xl bg-warm-200/80 p-1 border border-warm-300 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'edit'
                  ? 'bg-white text-ink shadow-xs'
                  : 'text-ink-600 hover:text-ink'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-cobalt shadow-xs'
                  : 'text-ink-600 hover:text-ink'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>

          {!isNew && initialPost && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
              title="Delete Article"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold text-xs tracking-tight shadow-sm transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Publish Article</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. EDIT MODE TAB                                          */}
      {/* ========================================================= */}
      {activeTab === 'edit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title & Slug */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-warm-300 shadow-sm space-y-5">
              <div>
                <label htmlFor="blogTitle" className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-1.5">
                  Article Title <span className="text-[#FF5722]">*</span>
                </label>
                <input
                  type="text"
                  id="blogTitle"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Next.js 15 Speed Optimization & Conversion Guide"
                  className="w-full px-4 py-3 rounded-xl border border-warm-300 text-sm sm:text-base font-bold text-ink placeholder:text-ink-300 focus:outline-none focus:border-[#FF5722] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="blogSlug" className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-1.5">
                  URL Slug <span className="text-ink-400 font-normal">(/blog/[slug])</span>
                </label>
                <div className="flex items-center rounded-xl border border-warm-300 bg-warm-50/50 px-3 py-2 text-xs text-ink-500 focus-within:border-[#FF5722] transition-colors">
                  <span className="font-mono text-ink-400 select-none">/blog/</span>
                  <input
                    type="text"
                    id="blogSlug"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setIsSlugManual(true);
                    }}
                    placeholder="nextjs-speed-optimization"
                    className="w-full bg-transparent font-mono text-ink font-semibold focus:outline-none pl-1"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="blogExcerpt" className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-1.5">
                  Summary / Excerpt <span className="text-[#FF5722]">*</span>
                </label>
                <textarea
                  id="blogExcerpt"
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise 1-2 sentence lead paragraph shown on article preview cards and at the top of the post."
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink placeholder:text-ink-300 focus:outline-none focus:border-[#FF5722] transition-colors"
                />
              </div>
            </div>

            {/* Article Body Content */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-warm-300 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="blogContent" className="block text-xs font-bold uppercase tracking-wider text-ink-600">
                  Article Body Paragraphs <span className="text-[#FF5722]">*</span>
                </label>
                <span className="text-[11px] text-ink-400">
                  Separate paragraphs with an empty line
                </span>
              </div>

              <textarea
                id="blogContent"
                rows={12}
                value={contentRaw}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Write your article paragraphs here. Leave a blank line between paragraphs to separate them cleanly.&#10;&#10;Second paragraph discussing technical architecture, social campaign workflows, or case study metrics.&#10;&#10;Third paragraph concluding with actionable client recommendations."
                className="w-full p-4 rounded-xl border border-warm-300 text-xs sm:text-sm font-normal text-ink placeholder:text-ink-300 focus:outline-none focus:border-[#FF5722] transition-colors font-mono leading-relaxed"
              />

              <div className="flex items-center justify-between text-[11px] text-ink-400 pt-1">
                <span>
                  Paragraphs: {contentRaw.split('\n\n').filter(Boolean).length} | Words:{' '}
                  {contentRaw.trim().split(/\s+/).filter(Boolean).length}
                </span>
                <span className="font-semibold text-cobalt">Calculated Read: {readTime}</span>
              </div>
            </div>

            {/* Cover Image Settings */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-warm-300 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-600">
                <ImageIcon className="w-4 h-4 text-[#FF5722]" />
                <span>Featured Cover Image</span>
              </div>

              <div>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink placeholder:text-ink-300 focus:outline-none focus:border-[#FF5722] transition-colors font-mono"
                />
              </div>

              {/* Quick Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-ink-500">Quick Image Presets:</span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COVERS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setCoverImage(preset.url)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        coverImage === preset.url
                          ? 'bg-[#FF5722] text-white border-[#FF5722]'
                          : 'bg-warm-50 hover:bg-warm-100 text-ink-700 border-warm-300'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Preview */}
              {coverImage && (
                <div className="relative w-full aspect-[16/9] max-h-56 rounded-xl overflow-hidden bg-warm-100 border border-warm-200 mt-2">
                  <Image
                    src={coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                    sizes="600px"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Settings (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Category & Tags */}
            <div className="bg-white p-6 rounded-2xl border border-warm-300 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-ink-600">
                <Tag className="w-4 h-4 text-cobalt" />
                <span>Category &amp; Classification</span>
              </div>

              <div>
                <label htmlFor="blogCategory" className="block font-bold text-ink-600 mb-1">
                  Primary Category
                </label>
                <select
                  id="blogCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-warm-300 text-ink bg-warm-50 focus:bg-white focus:outline-none focus:border-[#FF5722] cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="blogTags" className="block font-bold text-ink-600 mb-1">
                  Tags <span className="text-ink-400 font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  id="blogTags"
                  value={tagsRaw}
                  onChange={(e) => setTagsRaw(e.target.value)}
                  placeholder="NextJS, WebDev, Growth, Strategy"
                  className="w-full px-3 py-2 rounded-xl border border-warm-300 text-ink focus:outline-none focus:border-[#FF5722]"
                />
              </div>
            </div>

            {/* Author Settings */}
            <div className="bg-white p-6 rounded-2xl border border-warm-300 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-ink-600">
                <User className="w-4 h-4 text-cobalt" />
                <span>Author Information</span>
              </div>

              {/* Author Quick Presets */}
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-warm-200">
                {PRESET_AUTHORS.map((author) => (
                  <button
                    key={author.name}
                    type="button"
                    onClick={() => {
                      setAuthorName(author.name);
                      setAuthorRole(author.role);
                      setAuthorAvatar(author.avatar);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                      authorName === author.name
                        ? 'bg-cobalt text-white border-cobalt'
                        : 'bg-warm-50 hover:bg-warm-100 text-ink-700 border-warm-300'
                    }`}
                  >
                    {author.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div>
                <label htmlFor="authorName" className="block font-bold text-ink-600 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-warm-300 text-ink focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label htmlFor="authorRole" className="block font-bold text-ink-600 mb-1">
                  Author Title / Role
                </label>
                <input
                  type="text"
                  id="authorRole"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-warm-300 text-ink focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label htmlFor="authorAvatar" className="block font-bold text-ink-600 mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  id="authorAvatar"
                  value={authorAvatar}
                  onChange={(e) => setAuthorAvatar(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-warm-300 text-ink font-mono text-[11px] focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              {authorAvatar && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-warm-200 border border-warm-300">
                    <Image src={authorAvatar} alt={authorName} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-ink">{authorName}</div>
                    <div className="text-[10px] text-ink-400">{authorRole}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Publishing Metadata */}
            <div className="bg-white p-6 rounded-2xl border border-warm-300 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-ink-600">
                <Calendar className="w-4 h-4 text-cobalt" />
                <span>Publication Metadata</span>
              </div>

              <div>
                <label htmlFor="publishedDate" className="block font-bold text-ink-600 mb-1">
                  Publish Date
                </label>
                <input
                  type="text"
                  id="publishedDate"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  placeholder="Oct 26, 2026"
                  className="w-full px-3 py-2 rounded-xl border border-warm-300 text-ink focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label htmlFor="readTimeInput" className="block font-bold text-ink-600 mb-1">
                  Read Time Estimate
                </label>
                <input
                  type="text"
                  id="readTimeInput"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="4 min read"
                  className="w-full px-3 py-2 rounded-xl border border-warm-300 text-ink focus:outline-none focus:border-[#FF5722]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. LIVE PREVIEW MODE TAB (EXACT SAME PUBLIC BLOG DESIGN)  */}
      {/* ========================================================= */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          {/* Preview Banner */}
          <div className="p-3.5 rounded-xl bg-cobalt-50 border border-cobalt-200 flex items-center justify-between text-xs text-cobalt-900">
            <div className="flex items-center gap-2 font-bold">
              <Eye className="w-4 h-4 text-cobalt" />
              <span>Live Article Preview (Matches Exact Public Page Layout)</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className="px-3 py-1 rounded-lg bg-white border border-cobalt-200 text-cobalt font-bold hover:bg-cobalt-100 transition-colors cursor-pointer"
            >
              ← Back to Editor
            </button>
          </div>

          {/* Exact Public Blog Post Layout Canvas */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-14 text-ink relative">
            {/* Subtle background dot pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(#151B25 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
            </div>

            <div className="relative space-y-8 sm:space-y-10">
              {/* Back Link Breadcrumb */}
              <div>
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Articles</span>
                </span>
              </div>

              {/* Article Header */}
              <div className="max-w-4xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Tag className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span>{currentPost.category}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-[1.15]">
                  {currentPost.title}
                </h1>

                {/* Author Strip */}
                <div className="flex items-center gap-3.5 pt-2">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                    <Image
                      src={currentPost.author.avatar}
                      alt={currentPost.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-ink">{currentPost.author.name}</div>
                    <div className="text-xs text-slate-400">
                      {currentPost.author.role} • Published {currentPost.publishedAt} •{' '}
                      {currentPost.readTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Hero Image */}
              <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-slate-100 border border-slate-200/90 shadow-xl">
                <Image
                  src={currentPost.coverImage}
                  alt={currentPost.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>

              {/* Content Layout: 8 cols Article Body + 4 cols Sticky Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4">
                {/* Left Column: Article Body (8 cols) */}
                <article className="lg:col-span-8 space-y-8 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                  {/* Excerpt Lead */}
                  <p className="text-lg sm:text-xl font-medium text-ink leading-relaxed border-l-4 border-[#FF5722] pl-5 italic">
                    {currentPost.excerpt}
                  </p>

                  {/* Paragraphs */}
                  <div className="space-y-6">
                    {currentPost.content.map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Category Tags & CTA Bar */}
                  <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Tags:
                      </span>
                      {currentPost.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200/60"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5722] text-white font-bold text-xs tracking-tight shadow-md">
                      <span>Start a Project with Us</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </article>

                {/* Right Column: Sticky Sidebar (4 cols) */}
                <aside className="lg:col-span-4 space-y-6">
                  {/* Article Info Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs space-y-2.5">
                    <div className="font-bold text-ink uppercase tracking-wider text-[11px]">
                      Publication Status
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Live Status:</span>
                      <span className="font-bold text-emerald-600">Draft Preview</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Read Time:</span>
                      <span className="font-bold text-ink">{currentPost.readTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>URL Preview:</span>
                      <span className="font-mono text-[10px] text-cobalt truncate max-w-[160px]">
                        /blog/{currentPost.slug}
                      </span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
