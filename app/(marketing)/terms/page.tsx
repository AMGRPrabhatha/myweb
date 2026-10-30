import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Operating terms, commercial milestones, deliverables, and service boundaries.',
};

export default function TermsPage() {
  return (
    <div className="bg-warm-100 min-h-screen py-16" style={{ paddingTop: 'calc(var(--marketing-header-height) + 64px)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-warm-300 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cobalt">Commercial Terms</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mt-2">
              Terms of Service
            </h1>
            <p className="mt-2 text-xs text-ink-500">
              Effective Date: 25 October 2026
            </p>
          </div>

          <div className="prose prose-sm text-ink-700 space-y-6 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink">1. Service Scope & Proposals</h2>
              <p>
                All website development and social media management services are governed by written, approved milestone proposals. Quotes presented on this website are illustrative estimates based on standard project types and become binding only upon countersigned agreement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink">2. Billing & Milestone Invoicing</h2>
              <p>
                Website development projects require an agreed initial deposit prior to work commencement, with the remaining balance due upon staging approval and prior to production domain handover. Ongoing social media management is billed in advance on a 30-day recurring basis.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink">3. Asset Ownership & Delegated Access</h2>
              <p>
                Clients retain 100% intellectual property ownership of delivered code, custom database migrations, and creative assets upon full settlement of project invoices. Domain names and platform profiles remain registered in the client organisation’s name. We never store client social account passwords in public form fields.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink">4. Honest Advertising & Disclaimers</h2>
              <p>
                In compliance with professional standards, we do not guarantee specific sales outcomes, search engine ranks, or viral follower counts. Performance is subject to platform algorithms, client industry conditions, and ad spend funded directly by the client.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-warm-200">
            <Link
              href="/plans"
              className="text-xs font-bold text-cobalt hover:underline"
            >
              ← Return to Plans & Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
