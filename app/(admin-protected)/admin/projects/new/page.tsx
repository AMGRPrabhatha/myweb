'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { saveProjectAction } from '@/lib/actions';
import { Project, ProjectServiceTag } from '@/lib/types';
import { cleanupProjectCover, uploadProjectCover } from '@/lib/project-cover-upload-client';

const categories: ProjectServiceTag[] = [
  'Websites',
  'Web Design',
  'UI/UX Design',
  'Mobile Apps',
  'Social Content',
  'Combined Projects',
];

export default function NewProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState<ProjectServiceTag>('Websites');
  const [isConcept, setIsConcept] = useState('false');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [summary, setSummary] = useState('');
  const [businessNeed, setBusinessNeed] = useState('');
  const [deliveredScope, setDeliveredScope] = useState('');
  const [coverImage, setCoverImage] = useState('/images/hero-work-showcase.png');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const projectId = useRef<string>();
  const uploadedCover = useRef<{ file: File; path: string; url: string }>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto slug generator when user types title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManual) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter a project title.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Sanitize slug
      let finalSlug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      if (!finalSlug) {
        finalSlug = `project-${Date.now().toString().slice(-6)}`;
      }

      // 2. Handle cover file upload if user picked a file
      let finalCover = coverImage.trim() || '/images/hero-work-showcase.png';
      if (selectedFile) {
        if (uploadedCover.current?.file !== selectedFile) {
          const previous = uploadedCover.current;
          const uploaded = await uploadProjectCover(selectedFile);
          uploadedCover.current = { file: selectedFile, ...uploaded };
          if (previous) void cleanupProjectCover(previous.path);
        }
        finalCover = uploadedCover.current.url;
      }
      if (finalCover.startsWith('blob:') || finalCover.startsWith('data:')) throw new Error('Choose a permanent cover image URL or upload an image.');

      // 3. Format scope items
      const scopeItems = deliveredScope
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const finalDelivered = scopeItems.length > 0 ? scopeItems : [
        'Custom responsive architecture & UI design',
        'Mobile optimization & sub-second performance',
        '100% full source code handover',
      ];

      const newProject: Project = {
        id: (projectId.current ??= `proj-${crypto.randomUUID()}`),
        title: title.trim(),
        slug: finalSlug,
        clientName: clientName.trim() || title.trim(),
        category,
        summary: summary.trim() || 'Custom digital development project delivered with transparent milestones.',
        businessNeed: businessNeed.trim() || 'Modern digital presence and scalable performance.',
        deliveredScope: finalDelivered,
        isConcept: isConcept === 'true',
        coverImage: finalCover,
        galleryImages: [],
        status,
        displayOrder: 1,
        publishedAt: status === 'published' ? new Date().toISOString() : '',
      };

      const result = await saveProjectAction(newProject);
      if (result.success) {
        router.push('/admin/projects');
        router.refresh();
      } else {
        setErrorMsg(result.error || 'Could not save project. Please check fields and try again.');
        if (uploadedCover.current && (result.error?.includes('already exists') || result.error?.includes('not allowed') || result.error?.includes('permanent HTTPS'))) {
          void cleanupProjectCover(uploadedCover.current.path);
          uploadedCover.current = undefined;
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = 'w-full rounded-xl border border-warm-300 bg-warm-50/80 p-3 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white transition-all';

  return (
    <div className="max-w-4xl space-y-6 animate-fadeIn pb-12">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-ink transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Projects</span>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Create New Project
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-ink-500">
            Add a new client case study or concept showcase to your public portfolio.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-warm-300 bg-white p-6 sm:p-8 text-xs sm:text-sm text-ink shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Project Title */}
          <div>
            <label className="block font-bold text-ink mb-1.5">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Apex Dynamics - SaaS Platform"
              className={field}
            />
          </div>

          {/* URL Slug (Auto-generated with manual override) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-ink">URL Slug *</label>
              <span className="text-[10px] text-slate-400 font-mono">/work/{slug || '...'}</span>
            </div>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setSlugManual(true);
                setSlug(e.target.value);
              }}
              placeholder="e.g. apex-dynamics-platform"
              className={field}
            />
          </div>

          {/* Client Name */}
          <div>
            <label className="block font-bold text-ink mb-1.5">Client / Brand Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Apex Dynamics Inc."
              className={field}
            />
          </div>

          {/* Service Category */}
          <div>
            <label className="block font-bold text-ink mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProjectServiceTag)}
              className={field}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Project Type */}
          <div>
            <label className="block font-bold text-ink mb-1.5">Project Type</label>
            <select
              value={isConcept}
              onChange={(e) => setIsConcept(e.target.value)}
              className={field}
            >
              <option value="false">Commercial Client Project</option>
              <option value="true">Concept Showcase Demonstration</option>
            </select>
          </div>

          {/* Publication Status */}
          <div>
            <label className="block font-bold text-ink mb-1.5">Publication Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className={field}
            >
              <option value="published">Published (Visible on /work)</option>
              <option value="draft">Draft (Private in admin)</option>
            </select>
          </div>
        </div>

        {/* Project Summary */}
        <div>
          <label className="block font-bold text-ink mb-1.5">Project Summary *</label>
          <textarea
            required
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A short punchy 1-2 sentence description shown in portfolio cards..."
            className={field}
          />
        </div>

        {/* Business Challenge / Need */}
        <div>
          <label className="block font-bold text-ink mb-1.5">Business Challenge / Context</label>
          <textarea
            rows={2}
            value={businessNeed}
            onChange={(e) => setBusinessNeed(e.target.value)}
            placeholder="What was the client's objective or problem statement?..."
            className={field}
          />
        </div>

        {/* Delivered Scope Items */}
        <div>
          <label className="block font-bold text-ink mb-1.5">
            Delivered Scope Items <span className="font-normal text-slate-400">(one deliverable per line)</span>
          </label>
          <textarea
            rows={3}
            value={deliveredScope}
            onChange={(e) => setDeliveredScope(e.target.value)}
            placeholder="Next.js App Router & Tailwind CSS UI&#10;PostgreSQL Database Integration&#10;Coordinated Social Media Launch Assets"
            className={`${field} font-mono`}
          />
        </div>

        {/* Cover Image */}
        <div className="grid gap-5 sm:grid-cols-2 pt-2 border-t border-slate-100">
          <div>
            <label className="block font-bold text-ink mb-1.5">Cover Image URL / Path</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="/images/hero-work-showcase.png"
              className={field}
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Default fallback is provided automatically.
            </p>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1.5">Or Upload Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  setErrorMsg('');
                }
              }}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-ink hover:file:bg-slate-200 cursor-pointer pt-1"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-warm-200">
          <Link
            href="/admin/projects"
            className="px-6 py-2.5 rounded-full border border-slate-300 font-bold text-slate-600 hover:text-ink transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full brand-solid-button px-8 py-3 font-bold text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            <span>{isSubmitting ? 'Saving Project...' : 'Save & Publish Project'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
