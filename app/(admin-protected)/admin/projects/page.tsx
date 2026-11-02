import Link from 'next/link';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { Plus, FolderPlus, ExternalLink, Edit } from 'lucide-react';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await db.getProjects();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & Prominent Add Project Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-warm-300 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Portfolio & Concept Projects
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 mt-1">
            Manage case studies, service tags, publication state, and deliverables.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-full brand-solid-button px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Add New Project</span>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-warm-300 p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF5722] flex items-center justify-center mx-auto">
            <FolderPlus className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-ink">No projects added yet</h3>
          <p className="text-xs text-ink-500 max-w-sm mx-auto">
            Get started by creating your first client case study or showcase project.
          </p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-full brand-solid-button px-6 py-2.5 text-xs font-bold text-white shadow-sm"
          >
            <Plus className="w-4 h-4" /> Create First Project
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-warm-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink-700">
              <thead className="bg-warm-50 text-ink-500 uppercase tracking-wider font-semibold border-b border-warm-200">
                <tr>
                  <th className="px-6 py-3.5">Project Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Concept Demo?</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Published Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-200">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-warm-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-ink text-sm">{proj.title}</div>
                      <div className="text-ink-400 text-[11px] font-mono">/work/{proj.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-ink-800">{proj.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      {proj.isConcept ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-warm-200 text-ink-700 text-[10px] font-bold">
                          Concept Demo
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          Commercial Client
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        proj.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-warm-100 text-ink-600 border border-warm-200'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-ink-500">
                      {formatDate(proj.publishedAt)}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      {proj.status === 'published' && (
                        <Link
                          href={`/work/${proj.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-ink-400 hover:text-ink font-semibold"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/projects/${proj.id}`}
                        className="inline-flex items-center gap-1 font-bold text-cobalt hover:text-cobalt-700"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit Scope</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
