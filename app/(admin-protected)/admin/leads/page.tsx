import Link from 'next/link';
import { db } from '@/lib/db';
import { formatDate, formatDateTime } from '@/lib/utils';
import { Inbox, ArrowRight, Filter, Search, Tag } from 'lucide-react';

export const revalidate = 0;

interface Props {
  searchParams: { status?: string; q?: string };
}

export default async function AdminLeadsPage({ searchParams }: Props) {
  const currentStatus = searchParams.status || 'All';
  const searchQuery = searchParams.q || '';

  const leads = await db.getLeads({
    status: currentStatus,
    search: searchQuery,
  });

  const statuses = ['All', 'New', 'Contacted', 'Proposal Sent', 'Won', 'Closed'];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Client Inquiries & Briefs
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 mt-1">
            Browse, filter, and triage all incoming project leads.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-warm-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {statuses.map((st) => {
            const isSelected = currentStatus === st;
            return (
              <Link
                key={st}
                href={`/admin/leads?status=${st}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-ink text-white'
                    : 'bg-warm-100 text-ink-700 hover:bg-warm-200'
                }`}
              >
                {st}
              </Link>
            );
          })}
        </div>

        {/* Search */}
        <form method="GET" action="/admin/leads" className="w-full sm:w-72">
          <input type="hidden" name="status" value={currentStatus} />
          <div className="relative">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search by name, email, brand..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-warm-300 text-xs text-ink bg-warm-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cobalt"
            />
          </div>
        </form>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-warm-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-700">
            <thead className="bg-warm-50 text-ink-500 uppercase tracking-wider font-semibold border-b border-warm-200">
              <tr>
                <th className="px-6 py-3.5">Lead & Contact</th>
                <th className="px-6 py-3.5">Service Interest</th>
                <th className="px-6 py-3.5">Preselected Plan</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-warm-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-ink text-sm">{lead.name}</div>
                    <div className="text-ink-500 text-[11px]">{lead.email}</div>
                    {lead.businessName && (
                      <div className="text-[11px] text-cobalt font-medium mt-0.5">{lead.businessName}</div>
                    )}
                    {lead.phone && (
                      <div className="text-[11px] text-ink-400 mt-0.5">{lead.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold capitalize text-ink-800">
                      {lead.serviceInterest === 'both' ? 'Website + Social' : lead.serviceInterest}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {lead.planSnapshot ? (
                      <div>
                        <span className="font-semibold text-ink-800">{lead.planSnapshot.title}</span>
                        <div className="text-[10px] text-ink-500">
                          {lead.planSnapshot.category} • {lead.planSnapshot.pricingMode}
                        </div>
                      </div>
                    ) : (
                      <span className="text-ink-400 italic">None preselected</span>
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
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center gap-1 font-bold text-cobalt hover:text-cobalt-700 text-xs"
                    >
                      <span>Open Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {leads.length === 0 && (
          <div className="text-center py-12 text-ink-500 text-xs">
            No inquiries matching the selected criteria.
          </div>
        )}
      </div>
    </div>
  );
}
