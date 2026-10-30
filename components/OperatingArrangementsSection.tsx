'use client';

import React from 'react';
import Image from 'next/image';
import {
  Code2,
  Video,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface OperatingArrangementsSectionProps {
  settings: SiteSettings;
}

export default function OperatingArrangementsSection({
  settings,
}: OperatingArrangementsSectionProps) {
  const arrangements = [
    {
      step: 'Role 01',
      title: 'Web Engineering',
      metricNumber: 'Next.js 15',
      metricLabel: 'App Router & Supabase',
      metricColor: 'text-slate-900',
      description:
        'Led by experienced Next.js and TypeScript developers specializing in responsive UI, sub-second LCP, PostgreSQL schema design, and Supabase Row-Level Security policies.',
      avatars: [
        '/images/services/avatar-1.png',
        '/images/services/avatar-2.png',
        '/images/services/avatar-3.png',
        '/images/services/avatar-4.png',
      ],
      extraTag: '+100% Handover',
      accentColor: 'bg-blue-600',
      barWidth: 'w-full',
      barTrack: 'bg-slate-900',
    },
    {
      step: 'Role 02',
      title: 'Social Strategy & Video',
      metricNumber: '9:16 Video',
      metricLabel: 'Reels & Growth Motion',
      metricColor: 'text-blue-600',
      description:
        'Dedicated content strategists, visual graphic designers, and short-form video editors skilled in Reels, TikToks, high-converting ad visuals, and brand consistency across platforms.',
      avatars: [
        '/images/services/avatar-2.png',
        '/images/services/avatar-4.png',
        '/images/services/avatar-1.png',
        '/images/services/avatar-3.png',
      ],
      extraTag: '+High-CTR Hooks',
      accentColor: 'bg-purple-600',
      barWidth: 'w-[68%]',
      barTrack: 'bg-purple-600',
    },
    {
      step: 'Role 03',
      title: 'Distributed Delivery',
      metricNumber: '1-Day SLA',
      metricLabel: `${settings.officeLocation} & Remote`,
      metricColor: 'text-purple-600',
      description: `Operating with headquarters in ${settings.officeLocation}. Serving both local startups and international remote clients with direct Slack/WhatsApp triage and flexible scheduling.`,
      avatars: [
        '/images/services/avatar-3.png',
        '/images/services/avatar-1.png',
        '/images/services/avatar-2.png',
        '/images/services/avatar-4.png',
      ],
      extraTag: '+Direct Lead Access',
      accentColor: 'bg-[#FF5722]',
      barWidth: 'w-[42%]',
      barTrack: 'bg-[#FF5722]',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-50/40 via-purple-50/30 to-orange-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ========================================================= */}
        {/* Section Header (NinjaPromo Style)                         */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Operating Arrangements & Roles
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Specialized engineering, creative motion, and delivery leads coordinated under one roof — zero bloat, direct communication, and 100% accountability.
          </p>
        </div>

        {/* ========================================================= */}
        {/* Main Stage: NinjaPromo Step / Funnel Card Stage           */}
        {/* ========================================================= */}
        <div className="bg-slate-50/70 border border-slate-200/90 rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8 sm:space-y-10">
          {arrangements.map((item, idx) => (
            <div key={idx} className="space-y-6">
              
              {/* Row Grid: Left (Step & Title), Middle (Metric & Description), Right (Avatar Stack) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* Left Column: Step Pill + Role Title */}
                <div className="lg:col-span-4 space-y-2.5">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-slate-600 bg-white border border-slate-200 shadow-2xs">
                    {item.step}
                  </span>
                  <h3 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Middle Column: Metric Badge + Clear Narrative */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-baseline gap-2.5">
                    <span className={`text-2xl sm:text-3xl font-black tracking-tight ${item.metricColor}`}>
                      {item.metricNumber}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">
                      {item.metricLabel}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Right Column: Overlapping Avatar Cluster + Status Pill */}
                <div className="lg:col-span-3 flex lg:justify-end items-center">
                  <div className="flex items-center -space-x-3">
                    {item.avatars.map((av, avIdx) => (
                      <div
                        key={avIdx}
                        className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100 flex-shrink-0"
                      >
                        <Image
                          src={av}
                          alt="Team pod member"
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                    {/* Extra badge pill like +95 in NinjaPromo */}
                    <div className="relative h-10 sm:h-11 px-3 rounded-full border-2 border-white bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shadow-sm flex-shrink-0 z-10">
                      <span>{item.extraTag}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Progress Tracker Divider Line (NinjaPromo style) */}
              <div className="relative w-full h-[3px] bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.barTrack} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: item.barWidth.replace('w-[', '').replace(']', '').replace('w-full', '100%') }}
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
