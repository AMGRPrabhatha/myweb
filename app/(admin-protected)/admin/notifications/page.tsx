import { requireAdmin } from '@/lib/admin-auth';
import { db } from '@/lib/db';
import { retryNotificationJobAction } from '@/lib/actions';
import { formatDateTime } from '@/lib/utils';
import { Bell, AlertCircle, CheckCircle2, RotateCcw, Clock, ShieldCheck, Mail } from 'lucide-react';

export const revalidate = 0;

export default async function AdminNotificationsPage() {
  const [jobs, leads] = await Promise.all([
    db.getNotificationJobs(),
    db.getLeads(),
  ]);

  const leadMap = new Map(leads.map(l => [l.id, l]));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Transactional Notification Queue
        </h1>
        <p className="text-xs sm:text-sm text-ink-600 mt-1">
          Monitor transactional email alerting state, inspect delivery errors, and trigger retries.
        </p>
      </div>

      {/* Operational Assurance Card */}
      <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-sm flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-cobalt-50 text-cobalt flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs text-ink-600">
          <h2 className="font-bold text-sm text-ink">Decoupled Resilience Architecture</h2>
          <p>
            Enquiries are always committed to the database before transactional email notifications are dispatched. If an email service provider times out or rejects the alert payload, the lead record remains intact and a notification retry job is flagged below.
          </p>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl border border-warm-300 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-warm-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">Recent Notification Jobs ({jobs.length})</h2>
          <span className="text-xs font-mono text-ink-500">Live Database Queue</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-700">
            <thead className="bg-warm-50 text-ink-500 uppercase tracking-wider font-semibold border-b border-warm-200">
              <tr>
                <th className="px-6 py-3.5">Associated Lead</th>
                <th className="px-6 py-3.5">Event Type</th>
                <th className="px-6 py-3.5">Delivery State</th>
                <th className="px-6 py-3.5">Attempts</th>
                <th className="px-6 py-3.5">Error Diagnostic Summary</th>
                <th className="px-6 py-3.5 text-right">Retry Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-200">
              {jobs.map((job) => {
                const lead = leadMap.get(job.leadId);
                return (
                  <tr key={job.id} className="hover:bg-warm-50/70 transition-colors">
                    <td className="px-6 py-4">
                      {lead ? (
                        <div>
                          <span className="font-bold text-ink text-sm block">{lead.name}</span>
                          <span className="text-ink-500 text-[11px]">{lead.email}</span>
                          <span className="text-[10px] text-ink-400 font-mono block mt-0.5">ID: {lead.id}</span>
                        </div>
                      ) : (
                        <span className="text-ink-400 italic">Lead ID: {job.leadId}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono font-semibold text-ink-800">
                      {job.eventType}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        job.state === 'success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : job.state === 'failed'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {job.state === 'success' && <CheckCircle2 className="w-3 h-3" />}
                        {job.state === 'failed' && <AlertCircle className="w-3 h-3" />}
                        {job.state === 'pending' && <Clock className="w-3 h-3" />}
                        <span className="capitalize">{job.state}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-semibold">
                      {job.attemptCount} / 3
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      {job.errorSummary ? (
                        <span className="text-rose-700 text-[11px] font-mono leading-tight block truncate" title={job.errorSummary}>
                          {job.errorSummary}
                        </span>
                      ) : (
                        <span className="text-ink-400 text-[11px]">Provider accepted cleanly.</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {job.state === 'failed' && (
                        <form
                          action={async () => {
                            'use server';
                            await requireAdmin();
                            await retryNotificationJobAction(job.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] shadow-sm transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Retry Alert</span>
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-12 text-ink-400 text-xs">
            No notification jobs currently queued.
          </div>
        )}
      </div>
    </div>
  );
}
