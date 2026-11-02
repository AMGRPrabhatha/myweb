'use client';


import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe2, ArrowUpRight, CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';

interface DeliveryRegion {
  region: string;
  badge: string;
  badgeColor: string;
  dotColor: string;
  headline: string;
  scopeSummary: string;
  stats: string;
  tag: string;
  image: string;
  workUrl: string;
  glowGradient: string;
  borderHover: string;
}

const deliveryRegions: DeliveryRegion[] = [
  {
    region: 'Japan',
    badge: 'International Delivery',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/80',
    dotColor: 'bg-rose-500',
    headline: 'Enterprise Web Platforms & E-Commerce',
    scopeSummary: 'High-speed Next.js web applications, bilingual UI/UX architectures, and precision performance engineering for Tokyo and Kansai clients.',
    stats: '15+ Projects Delivered · Tokyo & Osaka',
    tag: 'Asia-Pacific Tech',
    image: '/images/cities/japan.png',
    workUrl: '/work',
    glowGradient: 'from-rose-500/[0.10] via-rose-300/[0.03] to-transparent',
    borderHover: 'hover:border-rose-300/80',
  },
  {
    region: 'Europe',
    badge: 'Global Client Projects',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
    dotColor: 'bg-blue-500',
    headline: 'SaaS Platforms & Brand Campaigns',
    scopeSummary: 'Modern cloud web applications, conversion-driven landing experiences, and coordinated multi-channel creative sets across the UK & Europe.',
    stats: '25+ Deliverables · UK & EU Markets',
    tag: 'European Standards',
    image: '/images/cities/london.png',
    workUrl: '/work',
    glowGradient: 'from-blue-500/[0.10] via-blue-300/[0.03] to-transparent',
    borderHover: 'hover:border-blue-300/80',
  },
  {
    region: 'Sri Lanka',
    badge: 'Local Headquarters & National Reach',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dotColor: 'bg-emerald-500',
    headline: 'End-to-End Websites & Social Media',
    scopeSummary: 'High-impact corporate web systems, custom enquiry portals, and ongoing 30-day social media management for local enterprises & startups.',
    stats: '60+ Local Deployments · Islandwide',
    tag: 'Colombo HQ & Islandwide',
    image: '/images/cities/sri-lanka.png',
    workUrl: '/work',
    glowGradient: 'from-emerald-500/[0.10] via-emerald-300/[0.03] to-transparent',
    borderHover: 'hover:border-emerald-300/80',
  },
];

export default function GlobalHubsSection() {
  return (
    <section className="relative py-14 sm:py-20 bg-white overflow-hidden">
      {/* Background radial dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#151B25 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-[1.15]">
            Proven Digital Success.{' '}
            <span className="brand-gradient-text">
              Delivered Across Japan, Europe & Sri Lanka.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-1">
            We partner with businesses worldwide and at home. From high-scale digital platforms in Japan and modern web applications across Europe to market-leading brands in Sri Lanka, our coordinated delivery model consistently drives measurable growth.
          </p>
        </div>

        {/* 3 Region Cards: Japan, Europe, Sri Lanka - White Liquid Glass Cards */}
        <div className="mobile-card-rail grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {deliveryRegions.map((item) => (
            <div
              key={item.region}
              className={`group relative bg-white/95 backdrop-blur-xl border border-slate-200/90 ${item.borderHover} rounded-[28px] p-5 sm:p-6 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
            >
              {/* Dynamic Liquid Glass Shade - Only visible on mouse hover */}
              <div
                className={`absolute inset-0 rounded-[28px] bg-gradient-to-tr ${item.glowGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Card Body */}
              <div className="relative z-10 space-y-4">
                {/* Horizontal Top: Landmark Photo + Region Headline */}
                <div className="flex items-start gap-4">
                  {/* Landmark Visual */}
                  <div className="relative w-24 sm:w-28 h-24 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-slate-100/90 shadow-[0_2px_10px_rgba(0,0,0,0.06)] bg-slate-100">
                    <Image
                      src={item.image}
                      alt={`${item.region} Delivered Projects`}
                      fill
                      sizes="(max-width: 640px) 96px, 112px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Region & Scope */}
                  <div className="flex-1 min-w-0 pt-0.5 space-y-1.5">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${item.badgeColor} tracking-wide`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                      <span>{item.badge}</span>
                    </div>

                    <h3 className="text-2xl font-black text-ink tracking-tight group-hover:text-[#FF5722] transition-colors">
                      {item.region}
                    </h3>

                    <p className="text-xs font-bold text-slate-700 line-clamp-1">
                      {item.headline}
                    </p>
                  </div>
                </div>

                {/* Scope Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.scopeSummary}
                </p>

                {/* Project Stats Pill */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.stats}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action: View Projects ↗ */}
              <div className="relative z-10 pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={item.workUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-[#FF5722] transition-colors group/link"
                >
                  <Layers className="w-3.5 h-3.5 text-cobalt group-hover/link:text-[#FF5722] transition-colors" />
                  <span>View Delivered Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-[#FF5722] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>

                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Action Strip */}
        <div className="mt-12 sm:mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              100+ Successful Projects Delivered
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cobalt" />
              Bilingual & Cross-Timezone Execution
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
              Dedicated Lead & Transparent Pricing
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink hover:bg-ink-800 text-white font-bold text-xs tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              <span>Discuss Your Project With Us</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5722]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
