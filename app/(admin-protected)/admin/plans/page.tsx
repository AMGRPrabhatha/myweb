import { requireAdmin } from '@/lib/admin-auth';
import Link from 'next/link';
import { db } from '@/lib/db';
import { savePlanAction } from '@/lib/actions';
import { Tag, Check, X, Clock, Edit } from 'lucide-react';
import { Plan } from '@/lib/types';

export const revalidate = 0;

export default async function AdminPlansPage() {
  const plans = await db.getAllPlans();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Plans & Package Configurations
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 mt-1">
            Manage deliverables, billing presentation, revision cycles, and publication states.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-warm-300 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warm-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-warm-200 text-ink-700 px-2 py-0.5 rounded">
                    {plan.category}
                  </span>
                  <span className="text-xs text-ink-400 font-mono">ID: {plan.id}</span>
                </div>
                <h2 className="text-xl font-bold text-ink mt-1.5">{plan.title}</h2>
                <p className="text-xs text-ink-600 mt-0.5">{plan.subtitle}</p>
              </div>

              {/* Status form */}
              <form
                action={async (formData: FormData) => {
                  'use server';
                  await requireAdmin();
                  const newStatus = formData.get('status') as 'draft' | 'published';
                  await savePlanAction({ ...plan, status: newStatus });
                }}
                className="flex items-center gap-2"
              >
                <select
                  name="status"
                  defaultValue={plan.status}
                  className="text-xs font-bold bg-warm-50 border border-warm-300 py-1.5 px-3 rounded-lg text-ink"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-ink text-white rounded-lg text-xs font-bold hover:bg-ink-700"
                >
                  Update
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-warm-50 p-3.5 rounded-xl border border-warm-200">
                <span className="font-bold text-ink block mb-0.5">Billing Mode:</span>
                <span className="text-ink-600 capitalize">{plan.pricingMode} ({plan.category === 'combined' ? 'Hybrid One-time + Monthly' : plan.category === 'social' ? 'Monthly Retainer' : 'Milestone Project'})</span>
              </div>
              <div className="bg-warm-50 p-3.5 rounded-xl border border-warm-200">
                <span className="font-bold text-ink block mb-0.5">Turnaround Time:</span>
                <span className="text-ink-600">{plan.turnaroundTime}</span>
              </div>
              <div className="bg-warm-50 p-3.5 rounded-xl border border-warm-200">
                <span className="font-bold text-ink block mb-0.5">Revisions:</span>
                <span className="text-ink-600">{plan.revisions}</span>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-ink-500 text-[11px] block">
                  Inclusions ({plan.inclusions.length})
                </span>
                <ul className="space-y-1.5">
                  {plan.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink-700">
                      <Check className="w-3.5 h-3.5 text-cobalt flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-ink-500 text-[11px] block">
                  Exclusions ({plan.exclusions.length})
                </span>
                <ul className="space-y-1.5">
                  {plan.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink-500">
                      <X className="w-3.5 h-3.5 text-warm-400 flex-shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
