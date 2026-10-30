'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { initialSiteSettings } from '@/lib/sample-data';

export default function FinalCta({ settings = initialSiteSettings }: { settings?: typeof initialSiteSettings }) {
  return (
    <section className="bg-white text-ink py-20 lg:py-24 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-warm-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-tight max-w-3xl mx-auto">
          Ready to launch your website and coordinate your social media?
        </h2>

        <p className="text-base sm:text-lg text-ink-600 max-w-2xl mx-auto leading-relaxed">
          Tell us about your startup or small business, select the services you need, and receive a clear, milestone-based proposal without aggressive sales pressure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full brand-gradient-button text-ink font-bold text-base transition-all shadow-md shadow-indigo-500/25 active:scale-[0.98] w-full sm:w-auto"
          >
            <span>Start Your Project Brief</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/plans"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-warm-100 hover:bg-warm-200/80 text-ink font-bold text-base transition-all border border-warm-300 w-full sm:w-auto"
          >
            <span>Review Structured Plans</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
