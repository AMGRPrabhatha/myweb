'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  Share2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function ServicesSlider() {
  const [activeTab, setActiveTab] = useState<'website' | 'social'>('website');

  const webCards = [
    {
      number: '01',
      title: 'Responsive Business Sites',
      description:
        'Tailored layouts optimized for phone, tablet, and desktop screens with sub-second LCP and zero visual layout shifts.',
    },
    {
      number: '02',
      title: 'Databases & Admin Portals',
      description:
        'PostgreSQL data modeling, Supabase authentication, and protected staff interfaces for managing leads, products, and bookings.',
    },
    {
      number: '03',
      title: 'Dependable Lead Capture',
      description:
        'Server-validated inquiry forms with bot detection, duplicate prevention keys, and transactional email alert jobs.',
    },
    {
      number: '04',
      title: 'Deployment & Handover',
      description:
        'Production hosting setup on commercial Vercel infrastructure, DNS configuration, and comprehensive code handover documentation.',
    },
  ];

  const socialCards = [
    {
      number: '01',
      title: 'Monthly Content Calendars',
      description:
        'Topic planning aligned with your industry cycles, seasonal promotions, and educational customer queries. Submitted 7 days prior.',
    },
    {
      number: '02',
      title: 'Short-Form Video Editing',
      description:
        'Transforming your raw clips into 9:16 vertical videos (Reels & TikToks) with subtitles, hooks, and trending audio curation.',
    },
    {
      number: '03',
      title: 'Design & Copywriting',
      description:
        'Multi-slide educational carousels, infographics, and engaging captions written in your verified brand voice.',
    },
    {
      number: '04',
      title: 'Community & Reporting',
      description:
        'Direct message and comment handling during business hours, accompanied by transparent monthly attribution summaries.',
    },
  ];

  const isWeb = activeTab === 'website';
  const currentCards = isWeb ? webCards : socialCards;

  return (
    <section id="service-disciplines" className="scroll-mt-28 relative py-16 sm:py-24 bg-white overflow-hidden">
      
      {/* Subtle ambient radial dot pattern on pure white */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#151B25 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* ========================================================= */}
        {/* 1. SLIDEBAR / SEGMENTED TAB SWITCHER                      */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4">
          
          {/* Section Indicator */}
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
              Explore Our Service Disciplines
            </h2>
          </div>

          {/* Liquid Glass Capsule Slidebar Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-slate-100/90 border border-slate-200 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('website')}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 ${
                isWeb
                  ? 'bg-ink text-white shadow-md scale-[1.02]'
                  : 'text-slate-600 hover:text-ink hover:bg-white/60'
              }`}
            >
              <Globe className={`w-4 h-4 ${isWeb ? 'text-[#FF5722]' : 'text-slate-500'}`} />
              <span>Website Development</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('social')}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 ${
                !isWeb
                  ? 'bg-ink text-white shadow-md scale-[1.02]'
                  : 'text-slate-600 hover:text-ink hover:bg-white/60'
              }`}
            >
              <Share2 className={`w-4 h-4 ${!isWeb ? 'text-[#FF5722]' : 'text-slate-500'}`} />
              <span>Social Media Management</span>
            </button>
          </div>

          {/* Quick Slider Controls (Prev / Next) */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('website')}
              aria-label="View Website Development"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                isWeb
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-default'
                  : 'bg-white border-slate-300 text-ink hover:border-ink hover:scale-105'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-500 px-1">
              {isWeb ? '01 / 02' : '02 / 02'}
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('social')}
              aria-label="View Social Media Management"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                !isWeb
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-default'
                  : 'bg-white border-slate-300 text-ink hover:border-ink hover:scale-105'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 2. SPLIT LAYOUT                                           */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Heading + Description + CTAs (Col 5) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 animate-fadeIn">
            
            <div className="space-y-4">
              <h3 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-[1.12]">
                {isWeb
                  ? 'Complete Website Development'
                  : 'Ongoing Social Media Management'}
              </h3>

              <p className="text-base sm:text-lg text-ink-600 leading-relaxed font-normal">
                {isWeb
                  ? 'We build fast, accessible, search-ready websites that present your company with authority, support client conversion actions, and give your staff the tools needed to maintain agreed content.'
                  : 'We handle the monthly planning, graphic production, caption writing, short-form video editing, and publishing across Facebook, Instagram, TikTok, and LinkedIn.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={isWeb ? '/services/website-development' : '/services/social-media-management'}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full brand-gradient-button text-ink font-bold text-sm tracking-tight transition-all shadow-md shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>
                  {isWeb ? 'Detailed Website Scope' : 'Detailed Social Scope'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={isWeb ? '/contact?service=website' : '/contact?service=social'}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-slate-100 text-ink font-bold text-sm tracking-tight transition-all border border-slate-300 shadow-xs"
              >
                <span>
                  {isWeb ? 'Enquire for Web' : 'Enquire for Social'}
                </span>
              </Link>
            </div>

          </div>

          {/* Right Column: 4 White Liquid Glass Cards with Hover Corner Shade (Col 7) */}
          <div className="mobile-card-rail lg:col-span-7 space-y-4 sm:space-y-4.5 animate-fadeIn">
            {currentCards.map((card) => (
              <div
                key={card.number}
                className="group relative rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(255,87,34,0.12)] hover:border-[#FF5722]/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-start justify-between gap-5"
              >
                {/* Subtle Liquid Glass Atmospheric Shade / Glow — Appears ONLY on Mouse Hover */}
                <div
                  className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-br from-[#FF5722]/[0.12] via-[#FF7043]/[0.08] to-amber-500/[0.04] blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative z-10 space-y-2.5 flex-1 pr-2">
                  {/* Number Badge + Role / Capability Title */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-orange-50 text-[#FF5722] border border-orange-200/80 group-hover:bg-[#FF5722] group-hover:text-white transition-colors flex-shrink-0">
                      {card.number}
                    </span>
                    <h4 className="text-lg sm:text-[1.25rem] font-bold text-ink tracking-tight leading-snug group-hover:text-[#FF5722] transition-colors">
                      {card.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Subtle Interactive Arrow Indicator on Right */}
                <div className="relative z-10 w-9 h-9 rounded-full bg-slate-100/90 border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:bg-[#FF5722] group-hover:text-white group-hover:border-[#FF5722] transition-all flex-shrink-0 shadow-2xs mt-0.5">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
