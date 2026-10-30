'use client';

import React, { useState } from 'react';
import {
  Users,
  Code2,
  Video,
  Database,
  CheckCircle2,
  ChevronDown,
  Quote,
} from 'lucide-react';

interface TeamMember {
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  quote: string;
  deliverables: string[];
  icon: React.ElementType;
  colorName: string;
  textColor: string;
  accentBg: string;
  subtextColor: string;
  glowBg: string;
  badgeBg: string;
}

const teamMembers: TeamMember[] = [
  {
    num: '01',
    tag: 'Lead Pod Partner',
    title: 'Project Manager & Lead Partner',
    subtitle: 'Orchestrates backlog, milestones & deadlines.',
    quote:
      'Your dedicated partner keeps delivery flowing without guesswork. Weekly async roadmaps, milestone tracking, and daily status triage — zero micromanagement needed.',
    deliverables: [
      'Weekly async sprint & video summaries',
      'Direct Slack & WhatsApp triage channel',
      'Guaranteed 1-business-day response time',
    ],
    icon: Users,
    colorName: 'blue',
    textColor: 'text-blue-600',
    accentBg: 'bg-blue-600',
    subtextColor: 'text-blue-600 font-semibold',
    glowBg: 'from-blue-50/70 via-white to-white',
    badgeBg: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    num: '02',
    tag: 'Engineering Lead',
    title: 'Senior Next.js Web Engineer',
    subtitle: 'Production App Router, sub-second LCP & SEO.',
    quote:
      'Builds responsive, high-converting interfaces scoring 98+ on Google Lighthouse. Implements WCAG 2.2 accessibility, edge CDN caching, and clean TypeScript.',
    deliverables: [
      'Next.js 15 App Router & Tailwind CSS',
      'Sub-second Core Web Vitals (LCP < 1.2s)',
      'Clean modular TypeScript & 100% handover',
    ],
    icon: Code2,
    colorName: 'purple',
    textColor: 'text-purple-600',
    accentBg: 'bg-purple-600',
    subtextColor: 'text-purple-600 font-semibold',
    glowBg: 'from-purple-50/70 via-white to-white',
    badgeBg: 'bg-purple-50 border-purple-200 text-purple-700',
  },
  {
    num: '03',
    tag: 'Creative Director',
    title: 'Social Creative Director & Reels Editor',
    subtitle: 'Multi-platform visuals, reels & growth captions.',
    quote:
      'Designs synchronized ad creatives, TikTok & Instagram 9:16 reels, and cohesive brand carousels that match your landing pages to turn impressions into qualified sales.',
    deliverables: [
      '9:16 Short-form reels & TikTok motion edits',
      'High-CTR visual hooks & conversion captions',
      'Cohesive Figma brand assets & style guides',
    ],
    icon: Video,
    colorName: 'pink',
    textColor: 'text-pink-600',
    accentBg: 'bg-pink-600',
    subtextColor: 'text-pink-600 font-semibold',
    glowBg: 'from-pink-50/70 via-white to-white',
    badgeBg: 'bg-pink-50 border-pink-200 text-pink-700',
  },
  {
    num: '04',
    tag: 'Architecture & Cloud',
    title: 'Database & Systems Specialist',
    subtitle: 'PostgreSQL schemas, Supabase & secure pipelines.',
    quote:
      'Architects PostgreSQL database tables, Server Actions, Row-Level Security policies, Stripe checkout flows, and automated email webhook pipelines with 100% full code handover.',
    deliverables: [
      'PostgreSQL with Row-Level Security (RLS)',
      'Automated email notifications & Resend webhooks',
      'Stripe checkout integration & user auth',
    ],
    icon: Database,
    colorName: 'orange',
    textColor: 'text-orange-600',
    accentBg: 'bg-[#FF5722]',
    subtextColor: 'text-[#FF5722] font-semibold',
    glowBg: 'from-orange-50/70 via-white to-white',
    badgeBg: 'bg-orange-50 border-orange-200 text-orange-700',
  },
];

export default function DedicatedTeamAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(3); // Default to Specialist or PM

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Lightweight Ambient Radial Gradient (GPU Optimized) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(219, 234, 254, 0.4) 0%, rgba(243, 232, 255, 0.25) 40%, rgba(255, 237, 213, 0.15) 70%, transparent 85%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Meet Your Dedicated Digital Team
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            We assemble your specialized team around your industry, technical requirements, and target audience — seamlessly coordinated under one roof.
          </p>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP / TABLET: 100% Butter-Smooth GPU Accordion Stage        */}
        {/* ============================================================== */}
        <div className="hidden md:flex rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-100/80 overflow-hidden min-h-[520px] divide-x divide-slate-200 transform-gpu">
          {teamMembers.map((member, idx) => {
            const isActive = activeIndex === idx;
            const Icon = member.icon;

            return (
              <div
                key={member.num}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                style={{
                  flexGrow: isActive ? 2.8 : 1,
                  flexShrink: 1,
                  flexBasis: '0%',
                }}
                className={`relative cursor-pointer transition-[flex-grow,background-color] duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden select-none p-6 lg:p-8 transform-gpu ${
                  isActive
                    ? `bg-gradient-to-b ${member.glowBg}`
                    : 'bg-white hover:bg-slate-50/70'
                }`}
              >
                {/* ========================================================= */}
                {/* 1. ACTIVE VIEW (Persistent DOM, constant inner width)     */}
                {/* ========================================================= */}
                <div
                  className={`w-[290px] lg:w-[350px] max-w-[400px] h-full flex flex-col justify-between transition-opacity duration-300 ${
                    isActive
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none absolute inset-6 lg:inset-8'
                  }`}
                >
                  {/* Top: Pill Tag + Step Number */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${member.badgeBg}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{member.tag}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {member.num} / 04
                    </span>
                  </div>

                  {/* Middle: Title, Subtitle, Quote Mark, & Detailed Description */}
                  <div className="space-y-4 my-auto py-2">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {member.title}
                      </h3>
                      <p className={`mt-1.5 text-sm lg:text-base ${member.subtextColor}`}>
                        {member.subtitle}
                      </p>
                    </div>

                    {/* Stylized Quotation Mark */}
                    <div className="pt-1 text-slate-300">
                      <Quote className="w-7 h-7 fill-slate-200/80 text-transparent" />
                    </div>

                    {/* Main Paragraph Description */}
                    <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-700 leading-relaxed font-normal">
                      {member.quote}
                    </p>
                  </div>

                  {/* Bottom Deliverables Checklist */}
                  <div className="pt-4 border-t border-slate-200/70 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Responsibilities
                    </div>
                    <div className="space-y-2">
                      {member.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-2.5 text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle2
                            className={`w-4 h-4 flex-shrink-0 ${member.textColor}`}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* 2. INACTIVE VIEW (Persistent DOM, smooth fade in/out)    */}
                {/* ========================================================= */}
                <div
                  className={`h-full flex flex-col justify-between py-1 transition-opacity duration-200 ${
                    !isActive
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none absolute inset-6 lg:inset-8'
                  }`}
                >
                  {/* Top Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-mono font-bold text-slate-500">
                      {member.num}
                    </div>
                  </div>

                  {/* Bottom Title & Colored Subtitle */}
                  <div className="space-y-2">
                    <h3 className="text-base lg:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                      {member.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 ${member.subtextColor}`}>
                      {member.subtitle}
                    </p>
                    <div className="pt-1 flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <span>Explore role</span>
                      <span className="text-slate-300">&rarr;</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* MOBILE: Collapsible Accordion Cards                            */}
        {/* ============================================================== */}
        <div className="md:hidden space-y-3.5">
          {teamMembers.map((member, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div
                key={member.num}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                  isOpen
                    ? 'border-slate-300 shadow-md ring-1 ring-slate-200'
                    : 'border-slate-200 shadow-2xs hover:border-slate-300'
                }`}
              >
                {/* Header Button */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-mono font-bold text-slate-700 flex-shrink-0 mt-0.5">
                      {member.num}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {member.title}
                      </h3>
                      <p className={`text-xs mt-1 ${member.subtextColor}`}>
                        {member.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 mt-1 ${
                      isOpen ? 'rotate-180 text-slate-800' : ''
                    }`}
                  />
                </button>

                {/* Expanded Drawer */}
                {isOpen && (
                  <div
                    className={`px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 bg-gradient-to-b ${member.glowBg}`}
                  >
                    <div className="pt-2 text-slate-300">
                      <Quote className="w-7 h-7 fill-slate-200/80 text-transparent" />
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {member.quote}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-200/60">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Deliverables & Handover
                      </div>
                      {member.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-2 text-xs text-slate-700"
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 flex-shrink-0 ${member.textColor}`}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
