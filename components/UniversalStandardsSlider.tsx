'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users,
  Database,
  Zap,
  Layers,
  Rocket,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface StandardItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  glowColor: string;
  pills: string[];
  graphicSvg: React.ReactNode;
}

const standards: StandardItem[] = [
  {
    id: 'lead-partner',
    num: '01',
    title: 'Dedicated Lead Partner',
    subtitle: 'Direct senior access with zero freelancer handoffs',
    description:
      'You communicate directly with an experienced engineering lead and creative partner throughout the entire project. Backlogs, sprint milestones, and technical trade-offs are resolved without junior account intermediaries.',
    accentColor: 'text-cobalt',
    glowColor: 'from-blue-500/[0.12] to-transparent',
    pills: [
      'Direct Lead Access',
      'Senior Engineer Led',
      'No Junior Reps',
      'Sprint Milestones',
      'Weekly Comms',
    ],
    graphicSvg: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 text-cobalt stroke-current fill-none" strokeWidth="1.5">
        <circle cx="60" cy="60" r="54" strokeDasharray="4 4" className="opacity-30" />
        <circle cx="60" cy="60" r="42" className="opacity-40" />
        <circle cx="60" cy="46" r="14" />
        <path d="M38 86c0-12 10-18 22-18s22 6 22 18" strokeLinecap="round" />
        <circle cx="90" cy="36" r="4" fill="currentColor" />
        <circle cx="30" cy="80" r="4" fill="#FF5722" />
      </svg>
    ),
  },
  {
    id: 'verified-leads',
    num: '02',
    title: 'Database & Verified Leads',
    subtitle: 'Server-validated customer capture in PostgreSQL',
    description:
      'Every enquiry, booking, and signup is verified on the server and recorded securely into a production PostgreSQL database with Supabase Row-Level Security and instant email alerts.',
    accentColor: 'text-[#FF5722]',
    glowColor: 'from-orange-500/[0.12] to-transparent',
    pills: [
      'PostgreSQL Database',
      'Server-Validated Forms',
      'Instant Lead Alerts',
      'Row-Level Security',
      'Encrypted Storage',
    ],
    graphicSvg: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 text-[#FF5722] stroke-current fill-none" strokeWidth="1.5">
        <ellipse cx="60" cy="30" rx="36" ry="12" />
        <path d="M24 30v26c0 6.6 16.1 12 36 12s36-5.4 36-12V30" />
        <path d="M24 56v26c0 6.6 16.1 12 36 12s36-5.4 36-12V56" />
        <circle cx="60" cy="60" r="4" fill="currentColor" />
        <circle cx="84" cy="74" r="3" fill="#2F5BFF" />
      </svg>
    ),
  },
  {
    id: 'sub-second-seo',
    num: '03',
    title: 'Sub-Second Performance & SEO',
    subtitle: 'Next.js App Router built for 100 Lighthouse scores',
    description:
      'Engineered for maximum Core Web Vitals, ultra-fast server components, WCAG 2.2 AA accessibility, and automatic sitemap.xml to dominate Google organic search rankings.',
    accentColor: 'text-indigo-600',
    glowColor: 'from-indigo-500/[0.12] to-transparent',
    pills: [
      'Next.js App Router',
      '100 Lighthouse Score',
      'WCAG 2.2 AA Standard',
      'Automated Sitemap',
      'Sub-Second LCP',
    ],
    graphicSvg: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 text-indigo-600 stroke-current fill-none" strokeWidth="1.5">
        <circle cx="60" cy="60" r="50" className="opacity-30" strokeDasharray="6 6" />
        <path d="M60 22v12M60 86v12M22 60h12M86 60h12" strokeLinecap="round" />
        <path d="M42 42l36 36M78 42L42 78" strokeDasharray="2 4" className="opacity-40" />
        <polygon points="62,38 48,64 58,64 54,82 72,56 62,56" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'counting-rules',
    num: '04',
    title: 'Clear Counting Rules',
    subtitle: 'Transparent deliverable accounting with zero hidden fees',
    description:
      'We define exact counting rules upfront. Multi-platform adaptations, static graphics, reels, and page layouts are accounted for with full transparency and verified batch deliveries.',
    accentColor: 'text-emerald-600',
    glowColor: 'from-emerald-500/[0.12] to-transparent',
    pills: [
      'Deliverable Accounting',
      'Platform Adaptations',
      'Zero Overages',
      'Exact Asset Quantities',
      'Batch Proofing',
    ],
    graphicSvg: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 text-emerald-600 stroke-current fill-none" strokeWidth="1.5">
        <rect x="24" y="24" width="72" height="72" rx="16" className="opacity-30" />
        <path d="M24 48h72M24 72h72M48 24v72M72 24v72" strokeDasharray="3 3" className="opacity-40" />
        <circle cx="48" cy="48" r="6" fill="currentColor" />
        <circle cx="72" cy="72" r="6" fill="#FF5722" />
        <path d="M38 72l20-20 14 14 20-20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'launch-pacing',
    num: '05',
    title: 'Synchronized Launch Pacing',
    subtitle: 'Coordinated social teasers and website deployment',
    description:
      'Social countdown graphics, audience warming posts, and web launch go live in perfect parallel. Every social campaign has a matching high-converting landing page ready on day one.',
    accentColor: 'text-purple-600',
    glowColor: 'from-purple-500/[0.12] to-transparent',
    pills: [
      'Synchronized Go-Live',
      'Campaign Teasers',
      'Matching Landers',
      'Attribution Tracking',
      'Full-Funnel Rollout',
    ],
    graphicSvg: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 text-purple-600 stroke-current fill-none" strokeWidth="1.5">
        <path d="M60 20c-15 15-20 40-15 60h30c5-20 0-45-15-60z" strokeWidth="2" />
        <circle cx="60" cy="50" r="6" fill="currentColor" />
        <path d="M45 80l-12 12M75 80l12 12" strokeLinecap="round" />
        <path d="M60 80v20" strokeLinecap="round" strokeDasharray="3 3" />
        <circle cx="33" cy="92" r="3" fill="#FF5722" />
        <circle cx="87" cy="92" r="3" fill="#2F5BFF" />
      </svg>
    ),
  },
  {
    id: 'code-ownership',
    num: '06',
    title: '100% Asset & Code Ownership',
    subtitle: 'Complete IP handover with zero proprietary lock-in',
    description:
      'You own all Git repositories, Figma design systems, database credentials, and social platform accounts. Full technical documentation and a 1-on-1 staff handover session are included.',
    accentColor: 'text-rose-600',
    glowColor: 'from-rose-500/[0.12] to-transparent',
    pills: [
      'GitHub Repository Access',
      'Complete IP Handover',
      'Figma Source Files',
      'Database Ownership',
      'Zero Lock-In',
    ],
    graphicSvg: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 text-rose-600 stroke-current fill-none" strokeWidth="1.5">
        <path d="M60 22l34 14v30c0 24-20 38-34 44-14-6-34-20-34-44V36l34-14z" className="opacity-40" />
        <rect x="46" y="52" width="28" height="24" rx="6" />
        <path d="M52 52v-8a8 8 0 0 1 16 0v8" />
        <circle cx="60" cy="64" r="3" fill="currentColor" />
      </svg>
    ),
  },
];

export default function UniversalStandardsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? standards.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === standards.length - 1 ? 0 : prev + 1));
  };

  // Indices for left and right adjacent peek cards
  const prevIndex = activeIndex === 0 ? standards.length - 1 : activeIndex - 1;
  const nextIndex = activeIndex === standards.length - 1 ? 0 : activeIndex + 1;

  const currentItem = standards[activeIndex];
  const prevItem = standards[prevIndex];
  const nextItem = standards[nextIndex];

  return (
    <section className="relative py-14 sm:py-22 bg-white overflow-hidden">
      {/* Subtle background radial dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#151B25 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-[1.15]">
            Included in All Plans:{' '}
            <span className="brand-gradient-text">
              Every Service Under One Roof.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-1 max-w-2xl mx-auto">
            Every package is backed by rigorous quality assurance, accessible Next.js engineering, and dedicated lead execution.
          </p>
        </div>

        {/* ========================================================= */}
        {/* FOCUS SLIDER: Center Highlight + Faded Peeking Side Cards */}
        {/* ========================================================= */}
        <div className="relative max-w-6xl mx-auto">
          
          <div className="flex items-center justify-center gap-4 sm:gap-6 relative min-h-[380px] sm:min-h-[420px]">
            
            {/* Left Faded Peeking Card (Clickable to switch) */}
            <div
              onClick={prevSlide}
              className="hidden lg:block w-1/4 shrink-0 cursor-pointer transform -translate-x-2 transition-all duration-500 opacity-40 hover:opacity-70 scale-[0.88] select-none"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 border border-slate-200 shadow-sm space-y-3 pointer-events-none">
                <span className="text-xs font-bold text-slate-400 font-mono">
                  {prevItem.num}
                </span>
                <h3 className="text-xl font-black text-ink tracking-tight line-clamp-1">
                  {prevItem.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {prevItem.subtitle}
                </p>
              </div>
            </div>

            {/* Center Active Highlighted Card - Modern White Liquid Glass */}
            <div className="w-full lg:max-w-3xl shrink-0 transition-all duration-500 scale-100 opacity-100 z-10">
              <div className="group relative bg-white/95 backdrop-blur-xl rounded-[32px] sm:rounded-[36px] p-7 sm:p-10 border border-slate-200/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-12px_rgba(255,87,34,0.12)] transition-all duration-300 overflow-hidden">
                
                {/* Dynamic Liquid Glass Corner Shade */}
                <div
                  className={`absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-gradient-to-tr ${currentItem.glowColor} opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10 space-y-6">
                  
                  {/* Top Split: Number + Title + Graphic SVG Art */}
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-2 max-w-lg">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-mono font-bold text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                        <span>Standard {currentItem.num} of 06</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight pt-1">
                        {currentItem.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-bold text-slate-500">
                        {currentItem.subtitle}
                      </p>
                    </div>

                    {/* Right Graphic Illustration (Matching Ninja Promo Art) */}
                    <div className="shrink-0 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 shadow-sm flex items-center justify-center">
                      {currentItem.graphicSvg}
                    </div>
                  </div>

                  {/* Body Paragraph */}
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed pt-1">
                    {currentItem.description}
                  </p>

                  {/* Feature Tags/Pills Row (Matching Ninja Promo Bottom Pills) */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 sm:gap-2.5">
                    {currentItem.pills.map((pill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/90 text-slate-700 text-xs font-semibold tracking-tight transition-colors border border-slate-200/60"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            </div>

            {/* Right Faded Peeking Card (Clickable to switch) */}
            <div
              onClick={nextSlide}
              className="hidden lg:block w-1/4 shrink-0 cursor-pointer transform translate-x-2 transition-all duration-500 opacity-40 hover:opacity-70 scale-[0.88] select-none"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 border border-slate-200 shadow-sm space-y-3 pointer-events-none">
                <span className="text-xs font-bold text-slate-400 font-mono">
                  {nextItem.num}
                </span>
                <h3 className="text-xl font-black text-ink tracking-tight line-clamp-1">
                  {nextItem.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {nextItem.subtitle}
                </p>
              </div>
            </div>

          </div>

          {/* Navigation Controls: Arrows & Indicator Dots */}
          <div className="pt-8 flex items-center justify-between max-w-3xl mx-auto px-4">
            
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous standard"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 text-ink flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]"
            >
              <ChevronLeft className="w-5 h-5 text-ink" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {standards.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to standard ${s.num}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === idx
                      ? 'w-8 h-2.5 bg-ink'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next standard"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 text-ink flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]"
            >
              <ChevronRight className="w-5 h-5 text-ink" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
