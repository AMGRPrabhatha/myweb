import { requireAdmin } from '@/lib/admin-auth';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { saveProjectAction } from '@/lib/actions';
import { ArrowLeft, Save, ExternalLink } from 'lucide-react';
import { Project, ProjectServiceTag } from '@/lib/types';
import ProjectCoverField from './ProjectCoverField';

export const revalidate = 0;

interface Props {
  params: { id: string };
  searchParams?: { error?: string };
}

export default async function AdminProjectEditPage({ params, searchParams }: Props) {
  const project = (await db.getProjects()).find(p => p.id === params.id);
  if (!project) notFound();

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-xs font-bold text-cobalt hover:text-cobalt-700"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Projects</span>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">
            Edit Project: {project.title}
          </h1>
          <p className="text-xs text-ink-500 mt-0.5">
            Manage scope, concept flag, and published visibility.
          </p>
        </div>
        {project.status === 'published' && <Link
          href={`/work/${project.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-warm-300 text-xs font-bold text-ink hover:bg-warm-100"
        >
          <span>Preview Public Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>}
      </div>

      {searchParams?.error === 'image' && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">The cover upload is incomplete or its URL is invalid. Please try again.</p>}
      {searchParams?.error === 'save' && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">The project could not be saved. Check your permissions and try again.</p>}

      <form
        action={async (formData: FormData) => {
          'use server';
          await requireAdmin();
          const title = formData.get('title')?.toString() || project.title;
          const slug = formData.get('slug')?.toString() || project.slug;
          const clientName = formData.get('clientName')?.toString() || project.clientName;
          const category = formData.get('category')?.toString() as ProjectServiceTag || project.category;
          const summary = formData.get('summary')?.toString() || project.summary;
          const businessNeed = formData.get('businessNeed')?.toString() || project.businessNeed;
          const isConcept = formData.get('isConcept') === 'true';
          const status = formData.get('status')?.toString() as 'draft' | 'published' || project.status;
          const deliveredScopeRaw = formData.get('deliveredScope')?.toString() || '';
          const deliveredScope = deliveredScopeRaw
            .split('\n')
            .map(s => s.trim())
            .filter(Boolean);
          const coverImage = formData.get('coverImage')?.toString().trim() || project.coverImage;
          if (formData.get('coverUploadError') || !/^(https:\/\/|\/(?!\/))/.test(coverImage)) {
            redirect(`/admin/projects/${project.id}?error=image`);
          }

          const updated: Project = {
            ...project,
            title,
            slug,
            clientName,
            category,
            summary,
            businessNeed,
            isConcept,
            status,
            coverImage,
            publishedAt: status === 'published' ? (project.publishedAt || new Date().toISOString()) : project.publishedAt,
            deliveredScope: deliveredScope.length > 0 ? deliveredScope : project.deliveredScope,
          };

          const result = await saveProjectAction(updated);
          if (!result.success) redirect(`/admin/projects/${project.id}?error=save`);
          redirect('/admin/projects');
        }}
        className="bg-white p-8 rounded-2xl border border-warm-300 shadow-sm space-y-6 text-xs text-ink-700"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block font-bold text-ink mb-1.5">Project Title</label>
            <input
              type="text"
              name="title"
              defaultValue={project.title}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-ink mb-1.5">URL Slug</label>
            <input
              type="text"
              name="slug"
              defaultValue={project.slug}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block font-bold text-ink mb-1.5">Client or Organization</label>
            <input
              type="text"
              name="clientName"
              defaultValue={project.clientName}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-ink mb-1.5">Service Category</label>
            <select
              name="category"
              defaultValue={project.category}
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs"
            >
              <option value="Combined Projects">Combined Projects</option>
              <option value="Websites">Websites</option>
              <option value="Web Design">Web Design</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="Social Content">Social Content</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1.5">Concept Demo Flag</label>
            <select
              name="isConcept"
              defaultValue={project.isConcept ? 'true' : 'false'}
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs"
            >
              <option value="true">Concept Demonstration (Prominently Labeled)</option>
              <option value="false">Verified Commercial Client</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-ink mb-1.5">Project Summary</label>
          <textarea
            name="summary"
            defaultValue={project.summary}
            rows={2}
            required
            className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-ink mb-1.5">Business Challenge / Need</label>
          <textarea
            name="businessNeed"
            defaultValue={project.businessNeed}
            rows={3}
            required
            className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-ink mb-1.5">Delivered Scope Items (One per line)</label>
          <textarea
            name="deliveredScope"
            defaultValue={project.deliveredScope.join('\n')}
            rows={4}
            className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs font-mono"
          />
        </div>

        <ProjectCoverField initialUrl={project.coverImage} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-warm-200">
          <div>
            <label className="block font-bold text-ink mb-1.5">Publication Status</label>
            <select
              name="status"
              defaultValue={project.status}
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs"
            >
              <option value="published">Published (Visible on /work)</option>
              <option value="draft">Draft (Private, Staff Only)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl bg-warm-200 text-ink font-bold text-xs hover:bg-warm-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cobalt hover:bg-cobalt-600 text-white font-bold text-xs shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
