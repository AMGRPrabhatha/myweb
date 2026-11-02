import { Metadata } from 'next';
import Link from 'next/link';
import TypewriterText from '@/components/TypewriterText';

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description: 'Understand how Design1X collects, stores, and protects your information.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-warm-100 min-h-screen py-16" style={{ paddingTop: 'calc(var(--marketing-header-height) + 64px)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-warm-300 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cobalt">Legal & Data Use</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mt-2">
              <TypewriterText lines={['Privacy Notice']} />
            </h1>
            <p className="mt-2 text-xs text-ink-500">
              Last updated: 25 October 2026 • Compliant with truthful agency operations
            </p>
          </div>

          <div className="prose prose-sm text-ink-700 space-y-6 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink">1. Information We Collect</h2>
              <p>
                When you submit a project enquiry on our website, we collect your name, email address, optional phone number, company name, service interest, and project brief details. We do not require or ask for credit card numbers, passwords, or confidential account access keys via public forms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink">2. How We Use Your Data</h2>
              <p>
                Information submitted through our enquiry form is used exclusively to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Evaluate project feasibility and draft an appropriate proposal.</li>
                <li>Send communication regarding your requested services and coordinate discovery calls.</li>
                <li>Maintain internal agency records regarding agreed project deliverables.</li>
              </ul>
              <p>
                We do not sell, rent, or lease your contact information to third parties. We do not enroll your email address in unsolicited third-party marketing lists.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink">3. Storage & Security</h2>
              <p>
                Your lead data is stored in our private PostgreSQL database hosted with Supabase. Access is protected by strict Row-Level Security (RLS) policies and server-side role authentication. Privileged database keys are never exposed in public client bundles.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink">4. Data Retention & Deletion Rights</h2>
              <p>
                You may request a copy of the information we hold about you or request deletion of your enquiry records at any time by emailing our data coordinator at <a href="mailto:hello@cobaltkinetic.example.com" className="text-cobalt underline">hello@cobaltkinetic.example.com</a>.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-warm-200">
            <Link
              href="/contact"
              className="text-xs font-bold text-cobalt hover:underline"
            >
              ← Return to Contact Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
