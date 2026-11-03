import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import {
  MessageSquareQuote,
  Plus,
  ExternalLink,
  Edit3,
  Star,
  CheckCircle2,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await db.getAllTestimonials();
  const averageRating = testimonials.length
    ? (testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / testimonials.length).toFixed(1)
    : '—';

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-3">
            <MessageSquareQuote className="w-7 h-7 text-cobalt" />
            <span>Client Testimonials Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 mt-1">
            Manage verified client reviews, KPI badges, showcase images, and public endorsements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/testimonials"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-warm-300 text-xs font-bold text-ink hover:bg-white transition-colors"
          >
            <span>View Public Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl brand-solid-button font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Total Reviews</span>
            <div className="text-3xl font-extrabold text-cobalt">{testimonials.length}</div>
            <span className="text-[11px] text-ink-500">Saved client endorsements</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-cobalt-50 text-cobalt flex items-center justify-center font-bold">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Average Rating</span>
            <div className="text-3xl font-extrabold text-amber-500 flex items-center gap-1">
              {averageRating} <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[11px] text-ink-500">Based on saved testimonials</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-300 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Format Standard</span>
            <div className="text-sm font-extrabold text-emerald-600 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Clean Image Cards</span>
            </div>
            <span className="text-[11px] text-ink-500">Zero video lag, pure visual polish</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-warm-300 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-warm-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-ink">Testimonials</h2>
            <p className="text-xs text-ink-500">Click &apos;Edit Card&apos; to change copy, client quotes, images, or KPI badges.</p>
          </div>
          <span className="text-xs font-semibold text-ink-400">
            {testimonials.length} Reviews
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-700">
            <thead className="bg-warm-50 text-ink-500 uppercase tracking-wider font-semibold border-b border-warm-200">
              <tr>
                <th className="px-6 py-3.5">Showcase &amp; Brand</th>
                <th className="px-6 py-3.5">Client Contact</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Rating</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-200">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-warm-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-16 h-11 rounded-lg overflow-hidden bg-warm-100 border border-warm-200 shrink-0">
                        <Image
                          src={t.videoThumbnail}
                          alt={t.companyName}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="space-y-0.5 max-w-xs">
                        <div className="font-bold text-ink text-sm">{t.companyName}</div>
                        <p className="text-[11px] text-ink-500 line-clamp-1">{t.companySubtitle}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-bold text-ink text-xs">{t.clientName}</div>
                    <div className="text-[11px] text-ink-400">{t.clientRole}</div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200">
                      {t.serviceCategory}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/testimonials/${t.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cobalt-50 hover:bg-cobalt-100 text-cobalt font-bold text-xs transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Card</span>
                    </Link>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-ink-500">No testimonials yet. Add your first client review.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
