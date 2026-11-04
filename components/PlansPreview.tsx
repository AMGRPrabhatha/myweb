'use client';


import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles, Gift, Globe, Smartphone, Share2, Layers } from 'lucide-react';
import { Plan } from '@/lib/types';
import { approximateUsd } from '@/lib/pricing';

interface PlansPreviewProps {
  plans?: Plan[];
}

type PlatformCategory = 'website' | 'mobile' | 'combined' | 'social';

interface PreviewTier {
  id: string;
  name: string;
  badge: string;
  scopeBadge: string;
  pageCount: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  discountBadge?: string;
  priceSub: string;
  isPopular?: boolean;
  bullets: string[];
  ctaPlanSlug: string;
}

export default function PlansPreview({ plans = [] }: PlansPreviewProps) {
  const [activeCategory, setActiveCategory] = useState<PlatformCategory>('website');
  const [includeSocial, setIncludeSocial] = useState<boolean>(false);

  const categories = [
    { id: 'website' as PlatformCategory, label: 'Website Development', icon: Globe },
    { id: 'mobile' as PlatformCategory, label: 'Mobile App (APK)', icon: Smartphone },
    { id: 'combined' as PlatformCategory, label: 'Combined (Save 10k LKR)', icon: Gift },
    { id: 'social' as PlatformCategory, label: 'Social Media Only', icon: Share2 },
  ];

  // =========================================================
  // DYNAMIC TIER DATA TAILORED TO USER'S EXACT LKR PRICING
  // =========================================================
  const getTiers = (): PreviewTier[] => {
    // 1. COMBINED BUNDLES VIEW (Or when includeSocial is toggled)
    if (activeCategory === 'combined' || ((activeCategory === 'website' || activeCategory === 'mobile') && includeSocial)) {
      const isMobile = activeCategory === 'mobile';
      const typeLabel = isMobile ? 'Mobile APK' : 'Website';
      const pageLabel = isMobile ? 'Screens' : 'Pages';
      const prefix = isMobile ? 'mobile' : 'web';

      return [
        {
          id: `${prefix}-fe-starter-social`,
          name: 'Starter Bundle',
          badge: `2–5 ${pageLabel}`,
          scopeBadge: 'Front-End',
          pageCount: `2–5 ${pageLabel}`,
          tagline: `${typeLabel} + 1 Mo Social Media Handling`,
          originalPrice: '45,000 LKR',
          discountBadge: 'Save 10,000 LKR',
          price: '30,000',
          priceSub: 'LKR (1st Month) · then 35k/mo',
          bullets: [
            `2 to 5 custom-designed ${pageLabel.toLowerCase()}`,
            '1 Full Month Social Media Management included',
            '12–16 custom branded social creatives & reels',
            'Mobile & tablet responsive architecture',
            '100% full source code & asset handover',
          ],
          ctaPlanSlug: `${prefix}-fe-starter-social`,
        },
        {
          id: `${prefix}-fe-scale-social`,
          name: 'Scale Bundle',
          badge: `8+ ${pageLabel}`,
          scopeBadge: 'Front-End',
          pageCount: `8+ ${pageLabel}`,
          tagline: `Expansive ${typeLabel} + Social Growth`,
          originalPrice: '50,000 LKR',
          discountBadge: 'Save 10,000 LKR',
          price: '40,000',
          priceSub: 'LKR (1st Month) · then 35k/mo',
          bullets: [
            `More than 8 interactive ${pageLabel.toLowerCase()}`,
            '1 Full Month Social Media Management included',
            'Multi-platform graphics & video reels',
            'Design system with reusable UI components',
            '100% full source code handover',
          ],
          ctaPlanSlug: `${prefix}-fe-scale-social`,
        },
        {
          id: `${prefix}-fs-starter-social`,
          name: 'Full-Stack Bundle',
          badge: `2–5 ${pageLabel}`,
          scopeBadge: 'Full-Stack',
          pageCount: `2–5 ${pageLabel}`,
          tagline: `Backend database + Social Media Growth`,
          isPopular: true,
          originalPrice: '65,000 LKR',
          discountBadge: 'Save 10,000 LKR',
          price: '55,000',
          priceSub: 'LKR (1st Month) · then 35k/mo',
          bullets: [
            `2 to 5 ${pageLabel.toLowerCase()} with PostgreSQL database`,
            'Admin dashboard & lead management system',
            '1 Full Month Social Media Management included',
            'Conversion-focused video reels & post batches',
            '100% database & complete code handover',
          ],
          ctaPlanSlug: `${prefix}-fs-starter-social`,
        },
        {
          id: `${prefix}-fs-scale-social`,
          name: 'Enterprise Bundle',
          badge: `8+ ${pageLabel}`,
          scopeBadge: 'Enterprise',
          pageCount: `8+ ${pageLabel}`,
          tagline: `Complete dynamic platform + Social Media`,
          originalPrice: '75,000 LKR',
          discountBadge: 'Save 10,000 LKR',
          price: '65,000',
          priceSub: 'LKR (1st Month) · then 35k/mo',
          bullets: [
            `8+ interactive ${pageLabel.toLowerCase()} with database & auth`,
            'Admin panel, server actions & automated alerts',
            '1 Full Month Social Media Management included',
            'High-converting social ad creatives & reels',
            'Production release & 100% code handover',
          ],
          ctaPlanSlug: `${prefix}-fs-scale-social`,
        },
      ];
    }

    // 2. WEBSITE DEVELOPMENT (STANDALONE)
    if (activeCategory === 'website') {
      return [
        {
          id: 'web-fe-starter',
          name: 'Front-End Starter',
          badge: '2–5 Pages',
          scopeBadge: 'Front-End Only',
          pageCount: '2–5 Pages',
          tagline: 'Clean, fast & modern responsive website',
          price: '15,000',
          priceSub: 'LKR · One-Time Fixed',
          bullets: [
            '2 to 5 custom-designed responsive pages',
            'Next.js App Router & Tailwind CSS speed',
            'Mobile, tablet & desktop optimization',
            'Inquiry form connected with WhatsApp alerts',
            '100% full source code handover',
          ],
          ctaPlanSlug: 'web-fe-starter',
        },
        {
          id: 'web-fe-scale',
          name: 'Front-End Scale',
          badge: '8+ Pages',
          scopeBadge: 'Front-End Only',
          pageCount: '8+ Pages',
          tagline: 'Expansive front-end for complete catalogs',
          price: '20,000',
          priceSub: 'LKR + · One-Time Fixed',
          bullets: [
            'More than 8 custom responsive layouts',
            'Design system with reusable UI components',
            'Search, filter & interactive showcases',
            'SEO-ready tags, schema & sitemap setup',
            '100% full source code handover',
          ],
          ctaPlanSlug: 'web-fe-scale',
        },
        {
          id: 'web-fs-starter',
          name: 'Full-Stack Starter',
          badge: '2–5 Pages',
          scopeBadge: 'Full-Stack',
          pageCount: '2–5 Pages',
          tagline: 'Dynamic site with database & admin panel',
          isPopular: true,
          price: '35,000',
          priceSub: 'LKR · One-Time Fixed',
          bullets: [
            '2 to 5 dynamic responsive web pages',
            'PostgreSQL database & secure backend setup',
            'Admin dashboard to view customer inquiries',
            'Server actions with email notifications',
            '100% full code & database handover',
          ],
          ctaPlanSlug: 'web-fs-starter',
        },
        {
          id: 'web-fs-scale',
          name: 'Full-Stack Enterprise',
          badge: '8+ Pages',
          scopeBadge: 'Full-Stack',
          pageCount: '8+ Pages',
          tagline: 'Enterprise web app with complex backend logic',
          price: '45,000',
          priceSub: 'LKR + · One-Time Milestone',
          bullets: [
            '8+ dynamic pages with user workflows',
            'PostgreSQL schema, database migrations & APIs',
            'User authentication & protected admin roles',
            'Automated email notifications & webhooks',
            '100% full code & database handover',
          ],
          ctaPlanSlug: 'web-fs-scale',
        },
      ];
    }

    // 3. MOBILE APP (APK) (STANDALONE)
    if (activeCategory === 'mobile') {
      return [
        {
          id: 'mobile-fe-starter',
          name: 'APK Front-End Starter',
          badge: '2–5 Screens',
          scopeBadge: 'Front-End Only',
          pageCount: '2–5 Screens',
          tagline: 'Cross-platform Android APK UI design',
          price: '15,000',
          priceSub: 'LKR · One-Time Fixed',
          bullets: [
            '2 to 5 custom-designed mobile app screens',
            'Smooth micro-interactions & touch components',
            'Ready-to-install debug/release Android APK',
            'Modern mobile design matching your brand',
            '100% full mobile source code handover',
          ],
          ctaPlanSlug: 'mobile-fe-starter',
        },
        {
          id: 'mobile-fe-scale',
          name: 'APK Front-End Scale',
          badge: '8+ Screens',
          scopeBadge: 'Front-End Only',
          pageCount: '8+ Screens',
          tagline: 'Multi-screen mobile workflows & layout',
          price: '20,000',
          priceSub: 'LKR + · One-Time Fixed',
          bullets: [
            'More than 8 interactive mobile screens',
            'Tab navigation, drawers & modal flows',
            'Reusable component library for mobile',
            'Release-ready Android APK packaging',
            '100% full mobile source code handover',
          ],
          ctaPlanSlug: 'mobile-fe-scale',
        },
        {
          id: 'mobile-fs-starter',
          name: 'APK Full-Stack Starter',
          badge: '2–5 Screens',
          scopeBadge: 'Full-Stack',
          pageCount: '2–5 Screens',
          tagline: 'Mobile APK connected to cloud database',
          isPopular: true,
          price: '35,000',
          priceSub: 'LKR · One-Time Fixed',
          bullets: [
            '2 to 5 screens with live database integration',
            'PostgreSQL/Supabase cloud database setup',
            'User authentication & cloud API endpoints',
            'Release-ready APK with real-time state',
            '100% mobile source code handover',
          ],
          ctaPlanSlug: 'mobile-fs-starter',
        },
        {
          id: 'mobile-fs-scale',
          name: 'APK Full-Stack Enterprise',
          badge: '8+ Screens',
          scopeBadge: 'Full-Stack',
          pageCount: '8+ Screens',
          tagline: 'Production mobile app with database & auth',
          price: '45,000',
          priceSub: 'LKR + · One-Time Milestone',
          bullets: [
            '8+ screens with complete backend workflows',
            'Cloud database schema, migrations & REST APIs',
            'User profiles, state & push notification setup',
            'Admin dashboard to manage app records',
            'Production-signed APK with 100% code handover',
          ],
          ctaPlanSlug: 'mobile-fs-scale',
        },
      ];
    }

    // 4. SOCIAL MEDIA MANAGEMENT ONLY
    return [
      {
        id: 'social-starter',
        name: 'Social Essentials',
        badge: '8 Posts / Mo',
        scopeBadge: 'Starter',
        pageCount: '2 Channels',
        tagline: 'Consistent professional brand presence',
        price: '20,000',
        priceSub: 'LKR / month · No Lock-In',
        bullets: [
          '8 custom-designed graphic posts per month',
          'Active on 2 channels (Instagram & Facebook)',
          'Engaging captions, hashtags & audience hooks',
          'Monthly content calendar for your approval',
          'Inquiry alerts & basic triage support',
        ],
        ctaPlanSlug: 'social-media-handling',
      },
      {
        id: 'social-media-handling',
        name: 'Social Growth Retainer',
        badge: 'Standard Retainer',
        scopeBadge: 'Most Popular',
        pageCount: '3 Channels',
        tagline: 'Complete social management + short video reels',
        isPopular: true,
        price: '35,000',
        priceSub: 'LKR / month · Standard Rate',
        bullets: [
          '12 to 16 custom branded graphic posts per month',
          '4 edited short-form video Reels / TikToks per month',
          'Active on Facebook, Instagram, TikTok/LinkedIn',
          'Inbox triage & customer inquiry handling',
          'Monthly growth, leads & reach performance report',
        ],
        ctaPlanSlug: 'social-media-handling',
      },
      {
        id: 'social-scale',
        name: 'Social Scale + Ads',
        badge: '24 Posts / Mo',
        scopeBadge: 'Scale',
        pageCount: 'Multi-Channel',
        tagline: 'High-production content & ad variations',
        price: '50,000',
        priceSub: 'LKR / month · High Volume',
        bullets: [
          '24 high-production posts + 8 short-form Reels',
          'Paid social ad creative designs & testing',
          'Direct WhatsApp line to social media strategist',
          'Story sequences & community engagement',
          'Rapid 24-hour turnaround for urgent notices',
        ],
        ctaPlanSlug: 'social-media-handling',
      },
      {
        id: 'social-enterprise',
        name: 'Dedicated Media Squad',
        badge: 'Daily Publishing',
        scopeBadge: 'Enterprise',
        pageCount: 'All Channels',
        tagline: 'Complete outsourced creative department',
        price: 'Custom',
        priceSub: 'Tailored Monthly Scope',
        bullets: [
          'Daily multi-channel content, motion graphics & video',
          'Executive LinkedIn branding & article ghostwriting',
          'Scriptwriting, video editing & voiceover support',
          'Dedicated creative director assigned to brand',
          'Real-time trend jacking & crisis management',
        ],
        ctaPlanSlug: 'social-media-handling',
      },
    ];
  };

  const currentTiers = getTiers();

  return (
    <section className="relative bg-white text-ink py-20 sm:py-28 overflow-hidden">
      
      {/* Subtle Background Radial Grid on White */}
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
        
        {/* ========================================================= */}
        {/* 1. HEADER & TOP SWITCHER (NinjaPromo Inspired)            */}
        {/* ========================================================= */}
        <div className="text-center max-w-6xl mx-auto space-y-4">
          <h2 className="max-w-3xl mx-auto text-3xl sm:text-5xl font-black text-ink tracking-tight leading-[1.1]">
            You Set the Vision.<br />
            <span className="text-ink">We Deliver the Platform & Audience.</span>
          </h2>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-ink-600 leading-relaxed font-normal">
            Your dedicated team works on transparent milestone pricing with zero hidden costs. Choose standalone development or combine with 1-month social media to save 10,000 LKR.
          </p>
          <p className="text-xs text-slate-500">USD estimates rounded to $10 at 330 LKR/USD. LKR prices are shown on each package.</p>

          {/* Capsule Switcher 1: Platform Categories */}
          <div className="pt-2 flex items-center justify-center">
            <div className="grid grid-cols-2 sm:flex sm:flex-nowrap items-stretch sm:items-center w-full sm:w-auto p-1.5 rounded-2xl sm:rounded-full bg-slate-100/90 border border-slate-200/90 shadow-xs gap-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const isOffer = cat.id === 'combined';
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      if (cat.id === 'combined') {
                        setIncludeSocial(true);
                      }
                    }}
                    className={`inline-flex min-h-11 items-center justify-center gap-1.5 px-2 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs sm:text-sm text-center font-bold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] cursor-pointer ${
                      isActive
                        ? 'bg-ink text-white shadow-sm'
                        : isOffer
                        ? 'text-[#FF5722] hover:bg-orange-50 font-extrabold'
                        : 'text-slate-600 hover:text-ink hover:bg-white/80'
                    }`}
                  >
                    <cat.icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Capsule Switcher 2: Bundle Toggle (Like NinjaPromo duration pills) */}
          {(activeCategory === 'website' || activeCategory === 'mobile') && (
            <div className="pt-1 flex items-center justify-center">
              <div className="grid grid-cols-2 sm:inline-flex items-center w-full sm:w-auto p-1 bg-white rounded-2xl sm:rounded-full border border-slate-200 shadow-xs">
                <button
                  type="button"
                  onClick={() => setIncludeSocial(false)}
                  className={`min-h-11 py-1.5 px-2 sm:px-4 rounded-xl sm:rounded-full text-xs font-bold transition-all cursor-pointer ${
                    !includeSocial
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-ink'
                  }`}
                >
                  ⚡ Development Only
                </button>
                <button
                  type="button"
                  onClick={() => setIncludeSocial(true)}
                  className={`inline-flex items-center justify-center gap-1.5 min-h-11 py-1.5 px-2 sm:px-4 rounded-xl sm:rounded-full text-xs text-center font-bold transition-all cursor-pointer ${
                    includeSocial
                      ? 'bg-ink text-white shadow-xs'
                      : 'text-[#FF5722] hover:bg-orange-50'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>+ Social Media (10,000 LKR OFF)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 2. 4-COLUMN CARDS GRID (NinjaPromo High-Impact Layout)    */}
        {/* ========================================================= */}
        <div className="mobile-card-rail plans-pricing-rail grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch pt-2">
          {currentTiers.map((tier, idx) => {
            const isPopular = tier.isPopular;
            const lkrAmount = Number(tier.price.replace(/,/g, ''));
            const hasLkrPrice = Number.isFinite(lkrAmount);
            const startingAt = tier.priceSub.includes('LKR +') ? '+' : '';
            const billingNote = tier.priceSub.replace(/^LKR\s*\+?\s*(?:·\s*)?/, '').replace('then 35k/mo', `then ≈ ${approximateUsd(35000)} USD/mo (35,000 LKR/mo)`);

            // Background liquid glass glow accents
            const cornerGlows = [
              'bg-blue-400/[0.08]',
              'bg-purple-400/[0.08]',
              'bg-[#FF5722]/[0.14]',
              'bg-emerald-400/[0.08]',
            ];
            const glowColor = isPopular ? 'bg-sky-400/[0.14]' : cornerGlows[idx % cornerGlows.length];

            return (
              <div
                key={tier.id}
                className={`relative rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group ${
                  isPopular
                    ? 'bg-gradient-to-b from-violet-50/50 via-white/95 to-sky-50/40 backdrop-blur-xl border-2 border-[#6540e8] shadow-[0_12px_36px_-8px_rgba(80,70,220,0.18)] ring-4 ring-[#6540e8]/10 hover:-translate-y-1.5'
                    : 'bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.10)] hover:border-slate-300 hover:-translate-y-1.5'
                }`}
              >
                {/* Subtle corner liquid glow */}
                <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden pointer-events-none">
                  <div
                    className={`absolute -bottom-8 -right-8 w-44 h-44 rounded-full ${glowColor} blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
                  />
                </div>

                {/* Centered Top MOST POPULAR Pill (NinjaPromo Style) */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-gradient-to-r from-[#a600ef] via-[#4b17f2] to-[#03a9e8] text-white text-[10px] font-black uppercase tracking-widest shadow-md shadow-violet-500/25">
                    Most Popular
                  </div>
                )}

                <div className="relative z-10 space-y-4">
                  {/* Top Header Row: Tier Name + Scope/Hours Pill Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
                        {tier.name}
                      </h3>
                      <p className="text-xs text-ink-500 font-medium mt-0.5 leading-snug line-clamp-1">
                        {tier.tagline}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                          isPopular
                            ? 'bg-violet-50 text-[#5635e9] border-violet-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {tier.scopeBadge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {tier.badge}
                      </span>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* GIANT PROMINENT PRICING (Exactly Like NinjaPromo $3200/mo) */}
                  {/* ========================================================= */}
                  <div className="pt-2 pb-1 space-y-1">
                    {/* If discount applied */}
                    {tier.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          {tier.originalPrice}
                        </span>
                        {tier.discountBadge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${isPopular ? 'bg-violet-100 text-[#5635e9]' : 'bg-orange-100 text-[#FF5722]'}`}>
                            {tier.discountBadge}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col gap-0.5">
                      <span className="text-3xl sm:text-4xl font-black text-ink tracking-tight">
                        {hasLkrPrice ? `≈ ${approximateUsd(lkrAmount)}${startingAt} USD` : tier.price}
                      </span>
                      {hasLkrPrice && <span className="text-sm font-bold text-slate-600">{tier.price} LKR{startingAt}</span>}
                      <span className="text-xs font-semibold text-slate-500">{billingNote}</span>
                    </div>
                  </div>

                  {/* Separator Line */}
                  <div className="relative py-1 flex items-center justify-center">
                    <div
                      className={`w-full border-t ${
                        isPopular ? 'border-violet-200/80' : 'border-slate-200/80'
                      }`}
                    />
                  </div>

                  {/* Deliverables Checklist (With Styled Check Icons) */}
                  <ul className="space-y-2.5 pt-1">
                    {tier.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-ink-700 leading-snug font-medium">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                            isPopular
                              ? 'bg-violet-50 text-[#5635e9] border-violet-200'
                              : 'bg-emerald-50 text-emerald-600 border-emerald-200/70'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button: Book a call [ → ] (NinjaPromo Style) */}
                <div
                  className={`relative z-10 pt-5 mt-5 border-t ${
                    isPopular ? 'border-violet-200/60' : 'border-slate-100'
                  }`}
                >
                  <Link
                    href={`/contact?plan=${tier.ctaPlanSlug}&category=${activeCategory}`}
                    className="group/btn flex items-center justify-between w-full py-3 px-4 rounded-full brand-gradient-button text-ink text-xs font-bold tracking-tight transition-all duration-300 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40"
                  >
                    <span>Book a call</span>
                    <span className="w-6 h-6 rounded-full bg-white text-[#5635e9] font-black flex items-center justify-center text-xs shadow-sm transition-transform duration-300 group-hover/btn:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 3. FOOTER: LINK TO FULL DETAILED PLANS                    */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-ink">
              Looking for full milestone timelines & scope breakdown?
            </h4>
            <p className="text-xs sm:text-sm text-ink-600">
              Explore exhaustive technical deliverables, mobile APK packaging, and launch offer terms.
            </p>
          </div>

          <Link
            href="/plans"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-ink font-bold text-xs sm:text-sm tracking-tight transition-all border border-slate-300 shadow-sm"
          >
            <span>Compare All 17 Packages</span>
            <ArrowRight className="w-4 h-4 text-ink" />
          </Link>
        </div>

      </div>

    </section>
  );
}
