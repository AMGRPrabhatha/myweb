'use client';

import { useState } from 'react';
import { Plus, Minus, Sparkles } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: 'How do you approach website development & marketing strategy?',
    answer:
      'We start by analyzing your audience, business model, and competitor landscape. From there, we design high-converting Next.js website wireframes and a synchronized social media calendar so every marketing asset drives visitors toward qualified conversion actions.',
  },
  {
    id: 2,
    question: 'How do you maintain brand consistency across all channels?',
    answer:
      'Because one coordinated team builds your website and manages your daily social presence, your visual identity—including typography, color palette, design systems, and tone of voice—is 100% synchronized across every touchpoint.',
  },
  {
    id: 3,
    question: 'Who owns the website code, domain, and social media accounts?',
    answer:
      'You own 100% of your assets. Domain names and social media profiles remain registered under your organization. We only request delegated partner access. Full source code, designs, and database migrations are handed over to you upon project completion.',
  },
  {
    id: 4,
    question: 'Do you supply the video footage and photos, or do we provide them?',
    answer:
      'Our standard social management plans cover static graphic design, copywriting, audio curation, and editing of customer-supplied footage into high-engagement vertical reels (TikToks/Instagram). If you need on-site video filming or studio photography, we provide that as an agreed add-on.',
  },
  {
    id: 5,
    question: 'How are revisions handled during website builds and social planning?',
    answer:
      'Website projects include 2 structured review rounds for layout wireframes and working staging builds before deployment. Monthly social calendars are submitted 7 days before each publishing month for your feedback and approval.',
  },
  {
    id: 6,
    question: 'Are domain registration, hosting, and database costs included in the fees?',
    answer:
      'Third-party infrastructure operating expenses (such as domain registration, commercial Vercel hosting, Supabase database tiers, and email providers) are paid directly to those providers under your own account. This guarantees uninterrupted service ownership and full control over billing.',
  },
  {
    id: 7,
    question: 'Can we start with a website build and add social management later?',
    answer:
      'Yes, absolutely. Many startups begin with our Launch Website package to establish their professional online platform and lead capture pipeline, then transition into a monthly Social Essentials or Social Growth plan when ready for active audience outreach.',
  },
  {
    id: 8,
    question: 'How do you measure the success of website conversions and campaigns?',
    answer:
      'We track verifiable lead outcomes: form enquiries stored in your database, call clicks, and campaign source attribution. You receive transparent monthly reports detailing traffic sources, engagement metrics, and qualified lead counts without vanity statistics.',
  },
  {
    id: 9,
    question: 'Do you guarantee specific follower numbers, sales, or search rankings?',
    answer:
      'No. In compliance with truthful advertising and professional integrity, we do not make false guarantees regarding arbitrary follower counts, instant sales, or search rankings. What we deliver is top-tier technical execution, accessible markup, consistent creative content, and disciplined lead capture.',
  },
  {
    id: 10,
    question: 'How quickly can our website launch and social posting begin?',
    answer:
      'Our standard Launch Website is delivered in 2 to 3 weeks with agreed milestones. For combined packages, we launch your social media campaign in tandem with the website go-live date so you land with maximum promotional momentum.',
  },
];

export default function ProofAndFaq() {
  const [openIds, setOpenIds] = useState<number[]>([1]); // First item open by default like Ninja Promo

  const toggle = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const renderFaqCard = (faq: FaqItem) => {
    const isOpen = openIds.includes(faq.id);

    return (
      <div
        key={faq.id}
        className={`rounded-[22px] transition-all duration-300 ${
          isOpen
            ? 'bg-gradient-to-br from-[#FFF7F3] via-[#FAF5FF] to-[#F3EEFF] border border-[#FF5722]/30 shadow-md ring-2 ring-[#FF5722]/5 p-6 sm:p-7'
            : 'bg-[#F6F7F9] hover:bg-[#EEF1F5] border border-transparent hover:border-warm-300/60 p-5 sm:p-6'
        }`}
      >
        <button
          type="button"
          onClick={() => toggle(faq.id)}
          className="w-full text-left flex items-start justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] rounded-lg"
          aria-expanded={isOpen}
        >
          <span
            className={`text-base sm:text-lg font-bold leading-snug transition-colors ${
              isOpen ? 'text-ink font-extrabold' : 'text-ink-800'
            }`}
          >
            {faq.question}
          </span>

          {/* Plus / Minus Circular Toggle Button */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-2xs ${
              isOpen
                ? 'bg-white text-[#FF5722] shadow-sm rotate-180'
                : 'bg-white text-ink-500'
            }`}
          >
            {isOpen ? (
              <Minus className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </div>
        </button>

        {/* Expanded Answer Content */}
        {isOpen && (
          <div className="pt-3.5 text-sm sm:text-base text-ink-700 leading-relaxed font-normal animate-fadeIn">
            {faq.answer}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="relative bg-white text-ink py-20 sm:py-28 overflow-hidden">
      
      {/* Subtle background radial dot pattern on white */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#151B25 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ========================================================= */}
        {/* 1. HEADER (Ninja Promo Style: Simple, Bold, Impactful)    */}
        {/* ========================================================= */}
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-6xl font-black text-ink tracking-tight">
            FAQs
          </h2>
          <p className="text-base sm:text-lg text-ink-600 max-w-2xl font-normal leading-relaxed">
            Everything you need to know about our coordinated website development, ongoing social media management, and client ownership terms.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. TWO-COLUMN ACCORDION GRID (Ninja Promo Style)          */}
        {/* ========================================================= */}
        <div>
          <div className="mobile-card-rail mobile-faq-rail grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start" tabIndex={0} aria-label="Frequently asked questions, swipe to see more">
            {faqs.map((faq) => renderFaqCard(faq))}
          </div>
        </div>

      </div>

    </section>
  );
}
