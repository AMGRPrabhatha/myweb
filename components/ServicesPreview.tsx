'use client';

import Link from 'next/link';
import {
  Globe,
  Share2,
  Layers,
  Database,
  Video,
  Zap,
  ArrowUpRight,
} from 'lucide-react';

export default function ServicesPreview() {
  const serviceCards = [
    {
      id: 'web-dev',
      title: 'Complete Website Development',
      description:
        'Fast, search-ready Next.js marketing websites built to showcase your brand, rank high on Google, and convert visitors into qualified leads.',
      href: '/services/website-development',
      icon: Globe,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50 border-blue-200/60',
      glowColor: 'bg-blue-400/[0.08]',
      borderHover: 'hover:border-blue-400/60',
    },
    {
      id: 'social-mgmt',
      title: 'Ongoing Social Media Management',
      description:
        'Strategic monthly content calendars, custom post graphics, and engaging short-form video reels that build an active startup audience.',
      href: '/services/social-media-management',
      icon: Share2,
      iconColor: 'text-[#FF5722]',
      iconBg: 'bg-orange-50 border-orange-200/60',
      glowColor: 'bg-[#FF5722]/[0.10]',
      borderHover: 'hover:border-[#FF5722]/60',
    },
    {
      id: 'combined-pkg',
      title: 'Combined Web & Social Delivery',
      description:
        'Single team accountability. Your website and promotional social media launch in tandem with 100% matched aesthetic identity.',
      href: '/plans',
      icon: Layers,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50 border-purple-200/60',
      glowColor: 'bg-purple-400/[0.08]',
      borderHover: 'hover:border-purple-400/60',
    },
    {
      id: 'db-portals',
      title: 'Custom Portals & Lead Capture',
      description:
        'Tailored PostgreSQL databases, server-validated customer inquiries, and protected staff administrative interfaces for easy lead triage.',
      href: '/admin',
      icon: Database,
      iconColor: 'text-cyan-600',
      iconBg: 'bg-cyan-50 border-cyan-200/60',
      glowColor: 'bg-cyan-400/[0.08]',
      borderHover: 'hover:border-cyan-400/60',
    },
    {
      id: 'short-form-video',
      title: 'Short-Form Video & Motion Creatives',
      description:
        'Engaging short-form video edits optimized for 9:16 mobile feeds with retention hooks, animated captions, and clear conversion calls-to-action.',
      href: '/services/social-media-management',
      icon: Video,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50 border-rose-200/60',
      glowColor: 'bg-rose-400/[0.08]',
      borderHover: 'hover:border-rose-400/60',
    },
    {
      id: 'seo-speed',
      title: 'Technical SEO & Speed Optimization',
      description:
        'Engineered for top Google Lighthouse performance, accessible navigation, Open Graph previews, and zero platform lock-in.',
      href: '/about',
      icon: Zap,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 border-emerald-200/60',
      glowColor: 'bg-emerald-400/[0.08]',
      borderHover: 'hover:border-emerald-400/60',
    },
  ];

  return (
    <section className="relative bg-white text-ink py-20 sm:py-28 overflow-hidden">
      
      {/* Ambient background grid pattern on white */}
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
        {/* 1. SECTION HEADER                                         */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-[1.12]">
            Two Connected Services,<br className="hidden sm:inline" /> Coordinated by One Team
          </h2>
          <p className="text-base sm:text-lg text-ink-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Eliminate communication gaps between your web developer and social media manager. We build your high-converting digital home and drive qualified audience engagement into it.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. LIQUID GLASS CARDS WITH ATMOSPHERIC SHADE (Image 2 UI)  */}
        {/* ========================================================= */}
        <div className="mobile-card-rail grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceCards.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.href}
                className={`group relative rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-8px_rgba(255,87,34,0.14)] ${service.borderHover} hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]`}
              >
                {/* Subtle Atmospheric Corner Shade / Glow (Liquid Glass Look) */}
                <div
                  className={`absolute -bottom-8 -right-8 w-44 h-44 rounded-full ${service.glowColor} blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
                />

                {/* Top Row: Icon Badge + Sleek Arrow */}
                <div className="relative z-10 flex items-center justify-between gap-4 mb-5">
                  <div
                    className={`w-11 h-11 rounded-2xl ${service.iconBg} border flex items-center justify-center ${service.iconColor} shadow-2xs group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100/80 border border-slate-200/60 flex items-center justify-center text-slate-500 group-hover:bg-[#FF5722] group-hover:text-white group-hover:border-[#FF5722] transition-all shadow-2xs">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Card Title & User-Friendly Description */}
                <div className="relative z-10 space-y-2.5">
                  <h3 className="text-xl sm:text-[1.28rem] font-bold text-ink group-hover:text-[#FF5722] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-ink-600 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>

    </section>
  );
}
