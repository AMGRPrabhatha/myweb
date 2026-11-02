'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ServiceSlide {
  id: string;
  title: string;
  description: string;
  pills: string[];
  graphicType: 'strategy' | 'digital' | 'design' | 'development';
}

export default function AboutServicesCarousel() {
  const slides: ServiceSlide[] = [
    {
      id: 'strategy',
      title: 'Strategy',
      description:
        'We develop full-funnel marketing strategies tailored to your goals, audience, and business model — with a clear focus on growth, not guesswork.',
      pills: [
        'Go-to-Market',
        'Channel Planning',
        'Growth Mapping',
        'Funnel Architecture',
        'KPI Alignment',
        'Budget Modeling',
        'Execution Roadmaps',
      ],
      graphicType: 'strategy',
    },
    {
      id: 'digital',
      title: 'Digital',
      description:
        'From paid media to SEO and content — we run data-backed digital campaigns that drive qualified traffic and turn attention into revenue.',
      pills: [
        'SEO & PPC',
        'Social Ads',
        'Email Flows',
        'Lead Generation',
        'Paid Scaling',
        'Traffic Growth',
        'Conversion Strategy',
      ],
      graphicType: 'digital',
    },
    {
      id: 'design',
      title: 'Design',
      description:
        'We create brand-consistent visual design, interactive UI/UX component systems, and motion assets that look great — and drive real conversions.',
      pills: [
        'Social Creatives',
        'Reels & Video',
        'UI/UX Design Systems',
        'Motion Graphics',
        'Figma Libraries',
        'Brand Identity',
        'Interactive Prototypes',
      ],
      graphicType: 'design',
    },
    {
      id: 'development',
      title: 'Development',
      description:
        'We build fast, secure Next.js web applications, PostgreSQL data models, and scalable digital architectures that present your brand with authority.',
      pills: [
        'Next.js 14 App Router',
        'PostgreSQL & Supabase',
        'TypeScript',
        'Sub-second LCP',
        'Row-Level Security',
        'Tailwind CSS',
        'Edge CDN Handover',
      ],
      graphicType: 'development',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const current = slides[currentIndex];
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;
  const prevCard = slides[prevIndex];
  const nextCard = slides[nextIndex];

  // Render SVG Vector Art for each capability (Refined for white glass background)
  const renderIllustration = (type: ServiceSlide['graphicType']) => {
    switch (type) {
      case 'strategy':
        return (
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="knightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="62" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 5" />
            {/* Abstract Chess Knight wireline (Tactical Strategy) */}
            <path
              d="M 85 145 C 80 135, 75 125, 78 110 C 82 95, 95 85, 90 70 C 86 58, 98 52, 106 58 C 114 64, 116 75, 126 82 C 136 89, 134 100, 128 112 C 122 124, 125 138, 120 145 Z"
              stroke="url(#knightGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 90 70 C 102 75, 112 85, 115 102"
              stroke="url(#knightGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="104" cy="68" r="3" fill="#3B82F6" />
          </svg>
        );

      case 'digital':
        return (
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            {/* Center Globe with Grid Latitudes */}
            <circle cx="105" cy="100" r="26" stroke="url(#nodeGrad)" strokeWidth="2" />
            <ellipse cx="105" cy="100" rx="26" ry="12" stroke="url(#nodeGrad)" strokeWidth="1.2" strokeOpacity="0.8" />
            <line x1="105" y1="74" x2="105" y2="126" stroke="url(#nodeGrad)" strokeWidth="1.2" strokeOpacity="0.8" />
            {/* Connecting Spokes & Outer Nodes */}
            <line x1="85" y1="85" x2="58" y2="65" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="55" cy="62" r="6" stroke="#64748B" strokeWidth="1.5" fill="#F8FAFC" />
            <line x1="125" y1="82" x2="150" y2="60" stroke="url(#nodeGrad)" strokeWidth="1.5" />
            <circle cx="152" cy="58" r="8" stroke="#EC4899" strokeWidth="2" fill="#FDF2F8" />
            <line x1="128" y1="108" x2="155" y2="120" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="158" cy="122" r="6" stroke="#64748B" strokeWidth="1.5" fill="#F8FAFC" />
            <line x1="105" y1="126" x2="110" y2="155" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="112" cy="158" r="6" stroke="#64748B" strokeWidth="1.5" fill="#F8FAFC" />
            <line x1="82" y1="112" x2="55" y2="130" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="52" cy="132" r="7" stroke="#64748B" strokeWidth="1.5" fill="#F8FAFC" />
          </svg>
        );

      case 'design':
        return (
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="designGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF5722" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Geometric Drafting Grid & Pen/Palette Wireline */}
            <rect x="65" y="65" width="70" height="70" rx="14" stroke="url(#designGrad)" strokeWidth="2" />
            <circle cx="100" cy="100" r="22" stroke="url(#designGrad)" strokeWidth="1.5" strokeDasharray="3 4" />
            <line x1="50" y1="100" x2="150" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="100" y1="50" x2="100" y2="150" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx="65" cy="65" r="4" fill="#FF5722" />
            <circle cx="135" cy="135" r="4" fill="#F59E0B" />
          </svg>
        );

      case 'development':
        return (
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="devGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            {/* Browser Architecture Window */}
            <rect x="45" y="55" width="110" height="90" rx="10" stroke="url(#devGrad)" strokeWidth="2" />
            <line x1="45" y1="75" x2="155" y2="75" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="58" cy="65" r="3" fill="#EF4444" />
            <circle cx="68" cy="65" r="3" fill="#F59E0B" />
            <circle cx="78" cy="65" r="3" fill="#10B981" />
            {/* Code Brackets */}
            <path
              d="M 80 92 L 70 105 L 80 118 M 120 92 L 130 105 L 120 118 M 105 88 L 95 122"
              stroke="url(#devGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
      
      {/* Subtle ambient radial dot pattern on pure white */}
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
        {/* 1. HEADER                                                 */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl lg:text-[3.75rem] font-black text-ink tracking-tight leading-[1.12]">
            Every marketing service you could wish for{' '}
            <br className="hidden sm:inline" />
            <span className="font-extrabold text-ink-700">— all under one roof</span>
          </h2>
        </div>

        {/* ========================================================= */}
        {/* 2. 3D CENTER-FOCUSED CAROUSEL STAGE (White Liquid Glass)  */}
        {/* ========================================================= */}
        <div className="relative max-w-6xl mx-auto flex items-center justify-center">
          
          {/* Left Peeking Card (Dimmed White Glass Preview) */}
          <div
            onClick={prevSlide}
            className="hidden lg:block absolute left-[-60px] xl:left-[-80px] w-[340px] h-[340px] bg-slate-50/90 backdrop-blur-md text-ink rounded-[32px] p-8 border border-slate-200/80 shadow-md opacity-40 scale-90 cursor-pointer hover:opacity-70 transition-all duration-500 overflow-hidden select-none pointer-events-auto"
          >
            <h3 className="text-3xl font-black text-ink">{prevCard.title}</h3>
            <p className="mt-3 text-xs text-slate-500 line-clamp-3 leading-relaxed">
              {prevCard.description}
            </p>
            <div className="absolute -bottom-6 -right-6 w-36 h-36 opacity-30 pointer-events-none">
              {renderIllustration(prevCard.graphicType)}
            </div>
          </div>

          {/* Active Center Card (White Liquid Glass Look) */}
          <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl text-ink rounded-[32px] sm:rounded-[36px] p-8 sm:p-12 border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] hover:shadow-[0_28px_70px_-15px_rgba(255,87,34,0.12)] z-10 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[420px] group">
            
            {/* Dynamic Liquid Glass Shade on Hover */}
            <div className="absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-gradient-to-tr from-[#FF5722]/[0.06] via-cobalt/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top Row: Title + Description on Left & Graphic on Right */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              <div className="md:col-span-8 space-y-4">
                <h3 className="text-3xl sm:text-5xl font-black text-ink tracking-tight group-hover:text-[#FF5722] transition-colors">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
                  {current.description}
                </p>
              </div>

              {/* Right Side Vector Line Illustration in Glass Circle */}
              <div className="md:col-span-4 flex items-center justify-center md:justify-end">
                <div className="w-28 h-28 sm:w-36 sm:h-36 relative p-3 rounded-full bg-slate-50/80 border border-slate-200/80 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  {renderIllustration(current.graphicType)}
                </div>
              </div>

            </div>

            {/* Bottom Row: Tag Pills */}
            <div className="relative z-10 pt-8 sm:pt-10 flex flex-wrap gap-2 sm:gap-2.5">
              {current.pills.map((pill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200/90 shadow-2xs transition-colors"
                >
                  {pill}
                </span>
              ))}
            </div>

          </div>

          {/* Right Peeking Card (Dimmed White Glass Preview) */}
          <div
            onClick={nextSlide}
            className="hidden lg:block absolute right-[-60px] xl:right-[-80px] w-[340px] h-[340px] bg-slate-50/90 backdrop-blur-md text-ink rounded-[32px] p-8 border border-slate-200/80 shadow-md opacity-40 scale-90 cursor-pointer hover:opacity-70 transition-all duration-500 overflow-hidden select-none pointer-events-auto"
          >
            <h3 className="text-3xl font-black text-ink">{nextCard.title}</h3>
            <p className="mt-3 text-xs text-slate-500 line-clamp-3 leading-relaxed">
              {nextCard.description}
            </p>
            <div className="absolute -bottom-6 -right-6 w-36 h-36 opacity-30 pointer-events-none">
              {renderIllustration(nextCard.graphicType)}
            </div>
          </div>

          {/* Left Arrow Button (<) */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous service"
            className="absolute left-2 sm:-left-6 lg:left-6 z-20 w-12 h-12 rounded-full bg-white border border-slate-200/90 text-ink flex items-center justify-center hover:bg-[#4b26df] hover:text-white hover:border-[#4b26df] transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button (>) */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next service"
            className="absolute right-2 sm:-right-6 lg:right-6 z-20 w-12 h-12 rounded-full bg-white border border-slate-200/90 text-ink flex items-center justify-center hover:bg-[#4b26df] hover:text-white hover:border-[#4b26df] transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* ========================================================= */}
        {/* 3. PAGINATION DOT INDICATORS                              */}
        {/* ========================================================= */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-[#FF5722]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
