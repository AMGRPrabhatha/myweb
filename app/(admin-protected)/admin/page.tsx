import Link from 'next/link';
import { db } from '@/lib/db';
import { formatDate, formatDateTime } from '@/lib/utils';
import { Inbox, AlertCircle, CheckCircle2, Clock, Users, ArrowUpRight, ArrowRight, ShieldCheck, BookOpen, Plus } from 'lucide-react';

export const revalidate = 0; // Uncached admin data

export default async function AdminDashboardPage() {
  const [leads, projects, plans, jobs, blogPosts] = await Promise.all([
    db.getLeads(),
    db.getProjects(),
    db.getAllPlans(),
    db.getNotificationJobs(),
    db.getAllBlogPosts(),
  ]);

  const newLeads = leads.filter(l => l.status === 'New');
  const wonLeads = leads.filter(l => l.status === 'Won');
  const proposalLeads = leads.filter(l => l.status === 'Proposal Sent');
  const failedJobs = jobs.filter(j => j.state === 'failed');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Agency Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 mt-1">
            Real-time overview of client enquiries, proposal pipeline, and editorial thought leadership.
          </p>
        </div>
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-warm-300 text-xs font-bold text-ink hover:bg-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write Article</span>
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cobalt hover:bg-cobalt-600 text-white font-bold text-xs shadow-sm"
          >
            <span>Review Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Notification Failure Alert Banner */}
      {failedJobs.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold text-rose-900">
                {failedJobs.length} Transactional Notification {failedJobs.length === 1 ? 'Job' : 'Jobs'} Require Attention
              </h2>
              <p className="text-xs text-rose-700 mt-0.5">
                Saved leads were safely recorded in the database, but email notifications were not accepted by the provider.
              </p>
            </div>
          </div>
          <Link
            href="/admin/notifications"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            Inspect & Retry Queue →
          </Link>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-warm-300 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">New Enquiries</span>
            <div className="text-3xl font-extrabold text-cobalt">{newLeads.length}</div>
            <span className="text-[11px] text-ink-500">Awaiting initial review</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cobalt-50 text-cobalt flex items-center justify-center font-bold">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-warm-300 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Proposals Sent</span>
            <div className="text-3xl font-extrabold text-ink">{proposalLeads.length}</div>
            <span className="text-[11px] text-ink-500">In customer evaluation</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-warm-100 text-ink flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-warm-300 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Won Projects</span>
            <div className="text-3xl font-extrabold text-emerald-600">{wonLeads.length}</div>
            <span className="text-[11px] text-ink-500">Converted agreements</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-warm-300 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Total Inquiries</span>
            <div className="text-3xl font-extrabold text-ink">{leads.length}</div>
            <span className="text-[11px] text-ink-500">All-time database leads</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-warm-100 text-ink flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-2xl border border-warm-300 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-warm-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink">Recent Inbound Briefs</h2>
            <p className="text-xs text-ink-500">Latest submissions captured via public contact flow.</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-cobalt hover:underline flex items-center gap-1"
          >
            <span>View All ({leads.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-700">
            <thead className="bg-warm-50 text-ink-500 uppercase tracking-wider font-semibold border-b border-warm-200">
              <tr>
                <th className="px-6 py-3.5">Contact & Business</th>
                <th className="px-6 py-3.5">Service & Plan</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Received</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-200">
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-warm-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-ink text-sm">{lead.name}</div>
                    <div className="text-ink-500 text-[11px]">{lead.email}</div>
                    {lead.businessName && (
                      <div className="text-[11px] text-cobalt font-medium mt-0.5">{lead.businessName}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold capitalize text-ink-800">
                      {lead.serviceInterest === 'both' ? 'Website + Social' : lead.serviceInterest}
                    </span>
                    {lead.planSnapshot && (
                      <div className="text-[11px] text-ink-500 mt-0.5">
                        Plan: {lead.planSnapshot.title}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full font-bold text-[10px] ${
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
                  </td>
                  <td className="px-6 py-4 text-ink-500">
                    {formatDateTime(lead.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center gap-1 font-bold text-cobalt hover:text-cobalt-700 text-xs"
                    >
                      <span>Triage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
