'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Palette,
  Users,
  Rocket,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function StartupBenefits() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const advantages = [
    {
      num: '01',
      title: 'Consistent Visual & Verbal Identity',
      subtitle: 'Unified typography, brand voice & aesthetics',
      description:
        'Avoid the disjointed look of having one freelancer build your website while another designs social graphics. Your fonts, brand colors, photography style, and tone of voice match seamlessly across every touchpoint.',
      badges: ['Unified Brand Kit', '100% Visual Consistency'],
      icon: Palette,
      gradient: 'from-blue-500 to-indigo-600',
      ringColor: 'border-blue-400/40 text-blue-600 ring-blue-500/10',
    },
    {
      num: '02',
      title: 'One Clear Point of Accountability',
      subtitle: 'Single lead partner, zero blame games',
      description:
        'No finger-pointing between web developers and social marketers. Whether a campaign URL needs updating or a new landing page is required for an upcoming reel, one coordinated team handles it with direct communication.',
      badges: ['Single Point of Contact', 'Zero Freelancer Silos'],
      icon: Users,
      gradient: 'from-orange-500 to-amber-600',
      ringColor: 'border-orange-400/40 text-[#FF5722] ring-[#FF5722]/10',
    },
    {
      num: '03',
      title: 'Coordinated Launch Timelines',
      subtitle: 'Parallel web deployment & social countdown',
      description:
        'Your social teasers, countdown posts, and Next.js website deployment go live in tandem. We align pre-launch testing, domain DNS setup, and promotional schedules so your brand lands with maximum traction.',
      badges: ['Synchronized Rollout', 'Launch Day Momentum'],
      icon: Rocket,
      gradient: 'from-violet-500 to-purple-600',
      ringColor: 'border-purple-400/40 text-purple-600 ring-purple-500/10',
    },
    {
      num: '04',
      title: 'Ongoing Monthly Content Engine',
      subtitle: 'Structured calendars & 9:16 short-form video',
      description:
        'A website is only as valuable as the attention driven to it. Our monthly social management keeps your startup visible with structured batch calendars, short-form video reels, captions, and conversion hooks.',
      badges: ['8–16 Monthly Creatives', 'Reels & TikToks with Hooks'],
      icon: Clock,
      gradient: 'from-emerald-500 to-teal-600',
      ringColor: 'border-emerald-400/40 text-emerald-600 ring-emerald-500/10',
    },
    {
      num: '05',
      title: 'Attributable Leads & Transparent ROI',
      subtitle: 'Server-verified inquiries & database analytics',
      description:
        'Enquiries originating from social links and website traffic are server-validated, stored in PostgreSQL, and dispatched to your email with attribution details so you clearly see which campaigns generate real customers.',
      badges: ['Database Lead Capture', 'Verifiable Channel Attribution'],
      icon: ShieldCheck,
      gradient: 'from-rose-500 to-pink-600',
      ringColor: 'border-rose-400/40 text-rose-600 ring-rose-500/10',
    },
  ];

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
        
        {/* ========================================================= */}
        {/* 1. SECTION HEADER (High-Impact Modern Typography)         */}
        {/* ========================================================= */}
        <div className="max-w-4xl space-y-4">
          <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-ink tracking-tight leading-[1.1]">
            Built for Startups & Small Businesses —{' '}
            <span className="text-ink">Strategy That Scales, Built to Maximize ROI</span>
          </h2>

          <p className="text-base sm:text-lg text-ink-600 leading-relaxed font-normal max-w-3xl">
            One Process. Every Touchpoint. Fully Coordinated. We don’t just hand over a template and walk away—we run your entire digital engine by uniting high-performance Next.js websites and active social media under one reliable team.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. NUMBERED TIMELINE ROWS (Inspired by Ninja Promo UI)    */}
        {/* ========================================================= */}
        <div className="border-t border-warm-300 divide-y divide-warm-200">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.num}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group py-8 sm:py-10 transition-all duration-300 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl ${
                  isHovered ? 'bg-warm-50/80 shadow-xs' : 'bg-transparent'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  
                  {/* Left: Large Step Number (Col 1-2) */}
                  <div className="lg:col-span-1 flex items-center">
                    <span className="text-lg sm:text-xl font-mono font-black text-ink-400 group-hover:text-ink transition-colors">
                      {item.num}
                    </span>
                  </div>

                  {/* Middle: Circular Icon Badge + Title (Col 2-6) */}
                  <div className="lg:col-span-5 flex items-start gap-4 sm:gap-5">
                    {/* Glowing Circular Badge */}
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 bg-white flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm ring-4 ${
                        item.ringColor
                      } ${
                        isHovered ? 'scale-110 shadow-md' : ''
                      }`}
                    >
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-105" />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight group-hover:text-[#FF5722] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-ink-500">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Description & Deliverable Badges (Col 7-12) */}
                  <div className="lg:col-span-6 space-y-3 lg:pl-4">
                    <p className="text-sm sm:text-base text-ink-600 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Feature Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {item.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-warm-300 text-xs font-bold text-ink-800 shadow-2xs"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#FF5722]" />
                          <span>{badge}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM CALLOUT BAR: Practical Takeaway + Action CTA   */}
        {/* ========================================================= */}
        <div className="bg-warm-100/70 rounded-[24px] p-6 sm:p-8 border border-warm-300 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-ink">
              Ready to coordinate your website and social presence?
            </h4>
            <p className="text-xs sm:text-sm text-ink-600">
              Get an initial scope breakdown and fixed or milestone pricing within 1 business day.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full brand-gradient-button text-ink font-bold text-sm transition-all shadow-md shadow-indigo-500/25 active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
