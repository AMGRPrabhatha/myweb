import { requireAdmin } from '@/lib/admin-auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { updateLeadStatusAction, addLeadNoteAction } from '@/lib/actions';
import { formatDateTime, formatDate } from '@/lib/utils';
import { LeadStatus } from '@/lib/types';
import { ArrowLeft, Clock, Mail, Phone, Calendar, User, Tag, ShieldCheck, MessageSquarePlus } from 'lucide-react';

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export default async function AdminLeadDetailPage({ params }: Props) {
  const [lead, notes] = await Promise.all([
    db.getLeadById(params.id),
    db.getLeadNotes(params.id),
  ]);

  if (!lead) notFound();

  const statuses: LeadStatus[] = ['New', 'Contacted', 'Proposal Sent', 'Won', 'Closed'];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl">
      {/* Back button */}
      <div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-xs font-bold text-cobalt hover:text-cobalt-700 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Leads</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
                {lead.name}
              </h1>
              <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                lead.status === 'New'
                  ? 'bg-cobalt-50 text-cobalt border border-cobalt-200'
                  : lead.status === 'Won'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : lead.status === 'Proposal Sent'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-warm-100 text-ink-600 border border-warm-200'
              }`}>
                {lead.status}
              </span>
            </div>
            <p className="text-xs text-ink-500 mt-1">
              Received {formatDateTime(lead.createdAt)} • Source: {lead.source || 'Direct'}
            </p>
          </div>

          {/* Quick Status Update Form */}
          <form
            action={async (formData: FormData) => {
              'use server';
              await requireAdmin();
              const newStatus = formData.get('status') as LeadStatus;
              if (newStatus) {
                await updateLeadStatusAction(lead.id, newStatus);
              }
            }}
            className="flex items-center gap-2 bg-white p-2 rounded-xl border border-warm-300 shadow-sm"
          >
            <span className="text-xs font-bold text-ink-600 pl-2">Status:</span>
            <select
              name="status"
              defaultValue={lead.status}
              className="text-xs font-bold text-ink bg-warm-50 py-1.5 px-3 rounded-lg border border-warm-300 focus:outline-none focus:ring-2 focus:ring-cobalt"
            >
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-ink text-white font-bold text-xs hover:bg-ink-700 transition-colors"
            >
              Update
            </button>
          </form>
        </div>
      </div>

      {/* Grid: Lead Details (7 cols) + Internal Notes (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Brief & Contact Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-2xl p-6 border border-warm-300 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400 border-b border-warm-200 pb-2">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-ink-400 font-semibold block">Email:</span>
                <a href={`mailto:${lead.email}`} className="text-cobalt font-bold hover:underline">
                  {lead.email}
                </a>
              </div>
              <div>
                <span className="text-ink-400 font-semibold block">Phone / WhatsApp:</span>
                <span className="text-ink-800 font-medium">{lead.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-ink-400 font-semibold block">Company / Brand:</span>
                <span className="text-ink-800 font-medium">{lead.businessName || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-ink-400 font-semibold block">Service Interest:</span>
                <span className="text-ink-800 font-bold capitalize">
                  {lead.serviceInterest === 'both' ? 'Website + Social' : lead.serviceInterest}
                </span>
              </div>
            </div>
          </div>

          {/* Project Brief */}
          <div className="bg-white rounded-2xl p-6 border border-warm-300 shadow-sm space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400 border-b border-warm-200 pb-2">
              Project Brief
            </h2>
            <div className="bg-warm-50 p-4 rounded-xl border border-warm-200 text-sm text-ink-800 leading-relaxed whitespace-pre-wrap font-sans">
              {lead.projectBrief}
            </div>
          </div>

          {/* Selected Plan Snapshot */}
          {lead.planSnapshot && (
            <div className="bg-white rounded-2xl p-6 border border-warm-300 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-cobalt font-bold text-sm border-b border-warm-200 pb-2">
                <Tag className="w-4 h-4" />
                <span>Preselected Plan Snapshot</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="text-base font-bold text-ink">
                  {lead.planSnapshot.title}
                </div>
                <div className="text-ink-500">
                  Category: {lead.planSnapshot.category} • Billing: {lead.planSnapshot.pricingMode}
                </div>
                <div className="pt-2">
                  <span className="font-bold text-ink-700 block mb-1">Snapshot Inclusions:</span>
                  <ul className="space-y-1 list-disc pl-4 text-ink-600">
                    {lead.planSnapshot.inclusions.slice(0, 4).map((inc, i) => (
                      <li key={i}>{inc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Conditional Context & Meta */}
          <div className="bg-white rounded-2xl p-6 border border-warm-300 shadow-sm space-y-3 text-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-400 border-b border-warm-200 pb-2">
              Additional Parameters
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-ink-400 font-semibold block">Budget Range:</span>
                <span className="text-ink-800">{lead.budgetRange || 'Flexible / Unspecified'}</span>
              </div>
              <div>
                <span className="text-ink-400 font-semibold block">Target Timeline:</span>
                <span className="text-ink-800">{lead.targetTimeline || 'Flexible / Unspecified'}</span>
              </div>
              {lead.existingWebsite && (
                <div className="col-span-2">
                  <span className="text-ink-400 font-semibold block">Current Website:</span>
                  <a href={lead.existingWebsite} target="_blank" rel="noreferrer" className="text-cobalt underline">
                    {lead.existingWebsite}
                  </a>
                </div>
              )}
              {lead.existingPlatforms && (
                <div className="col-span-2">
                  <span className="text-ink-400 font-semibold block">Social Handles:</span>
                  <span className="text-ink-800">{lead.existingPlatforms}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Internal Follow-up Notes */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-warm-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-ink font-bold text-base border-b border-warm-200 pb-2">
              <MessageSquarePlus className="w-5 h-5 text-cobalt" />
              <span>Internal Staff Notes ({notes.length})</span>
            </div>

            {/* Add note form */}
            <form
              action={async (formData: FormData) => {
                'use server';
                await requireAdmin();
                await addLeadNoteAction(formData);
              }}
              className="space-y-3 bg-warm-50 p-4 rounded-xl border border-warm-200 text-xs"
            >
              <input type="hidden" name="leadId" value={lead.id} />
              <input type="hidden" name="authorName" value="Staff Member" />

              <div>
                <label htmlFor="note" className="block font-bold text-ink-700 mb-1">
                  Add Follow-Up Note:
                </label>
                <textarea
                  id="note"
                  name="note"
                  required
                  rows={3}
                  placeholder="e.g. Spoke on phone, scheduled wireframe review for Friday..."
                  className="w-full p-2.5 rounded-lg border border-warm-300 bg-white text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="followUpDate" className="block font-bold text-ink-700 mb-1">
                  Next Follow-up Date (Optional):
                </label>
                <input
                  type="date"
                  id="followUpDate"
                  name="followUpDate"
                  className="p-2 rounded-lg border border-warm-300 bg-white text-ink text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-3 rounded-lg bg-cobalt hover:bg-cobalt-600 text-white font-bold text-xs transition-colors shadow-sm"
              >
                Save Internal Note
              </button>
            </form>

            {/* Notes Timeline */}
            <div className="space-y-3 pt-2">
              {notes.map((n) => (
                <div key={n.id} className="p-3.5 rounded-xl bg-warm-100/70 border border-warm-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-ink-500 text-[10px]">
                    <span className="font-bold text-ink-700">{n.authorName}</span>
                    <span>{formatDateTime(n.createdAt)}</span>
                  </div>
                  <p className="text-ink-800 leading-relaxed font-sans">{n.note}</p>
                  {n.followUpDate && (
                    <div className="flex items-center gap-1 text-[10px] text-cobalt font-semibold pt-1">
                      <Calendar className="w-3 h-3" />
                      <span>Next Action Date: {formatDate(n.followUpDate)}</span>
                    </div>
                  )}
                </div>
              ))}

              {notes.length === 0 && (
                <p className="text-center py-4 text-xs text-ink-400">
                  No internal notes recorded yet for this enquiry.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
