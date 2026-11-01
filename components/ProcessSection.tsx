'use client';

import { useEffect, useRef } from 'react';
import styles from './ProcessSection.module.css';

export default function ProcessSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = cardsRef.current;
    if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-process-card]'));
    grid.classList.add(styles.motionReady);

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => { card.dataset.visible = 'true'; });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.visible = 'true';
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const processCards = [
    {
      id: 'planning',
      icon: '📊',
      title: 'Strategic, Channel-Aware Planning',
      description:
        'We design a connected digital ecosystem where your website and social channels support your business goals, reflecting how your audience actually behaves.',
      glowColor: 'bg-blue-400/[0.08]',
      borderHover: 'hover:border-blue-400/60',
    },
    {
      id: 'tailored-mix',
      icon: '🎯',
      title: 'Tailored Mix for Each Business',
      description:
        'Each strategy is built around your specific startup stage and audience, selecting the right balance of Next.js web features and social platforms.',
      glowColor: 'bg-[#FF5722]/[0.10]',
      borderHover: 'hover:border-[#FF5722]/60',
    },
    {
      id: 'one-story',
      icon: '📱',
      title: 'One Story Across All Touchpoints',
      description:
        'From social reels and carousels to responsive website pages, customers experience a consistent visual brand identity as they move through your funnel.',
      glowColor: 'bg-rose-400/[0.08]',
      borderHover: 'hover:border-rose-400/60',
    },
    {
      id: 'data-works',
      icon: '📈',
      title: 'Data & Leads That Work Together',
      description:
        'We track performance across both web and social, understanding how traffic and engagement influence qualified enquiries in your Supabase database.',
      glowColor: 'bg-cyan-400/[0.08]',
      borderHover: 'hover:border-cyan-400/60',
    },
    {
      id: 'continuous-learning',
      icon: '✏️',
      title: 'Continuous Testing, Continuous Learning',
      description:
        'Creatives, captions, and landing pages are reviewed on structured milestone cycles, bringing practical insights into every subsequent publishing batch.',
      glowColor: 'bg-purple-400/[0.08]',
      borderHover: 'hover:border-purple-400/60',
    },
    {
      id: 'predictable-costs',
      icon: '🚀',
      title: 'Flexible Subscription, Predictable Costs',
      description:
        'Milestone-based website delivery and predictable monthly social retainers give you ongoing access to a dedicated digital team with zero hidden fees.',
      glowColor: 'bg-[#FF5722]/[0.12]',
      borderHover: 'hover:border-[#FF5722]/60',
    },
  ];

  return (
    <section className="relative bg-white text-ink py-20 sm:py-28 overflow-hidden">
      
      {/* Subtle Background Radial Pattern on White */}
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
        {/* 1. HEADER (Exact Ninja Promo UI Cadence)                  */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-[1.12]">
            Why brands rely on our digital marketing approach
          </h2>

          <p className="text-base sm:text-lg text-ink-600 leading-relaxed font-normal">
            Every successful project is a partnership. Here is how our coordinated delivery model moves your startup from strategic discovery to dependable growth.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. 6-CARD GRID (Clean Glassy Cards with Atmospheric Shade) */}
        {/* ========================================================= */}
        <div ref={cardsRef} className="mobile-card-rail grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {processCards.map((card) => (
            <div key={card.id} data-process-card className={styles.revealCard}>
              <div
                className={`relative h-full rounded-[28px] sm:rounded-[32px] p-8 sm:p-10 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-8px_rgba(255,87,34,0.14)] ${card.borderHover} hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group`}
              >
              {/* Subtle Atmospheric Corner Shade / Glow */}
              <div
                className={`absolute -bottom-8 -right-8 w-44 h-44 rounded-full ${card.glowColor} blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
              />

              {/* Card Content */}
              <div className="relative z-10 space-y-4">
                {/* Emoji Icon & Title (Inline, Exactly Like Reference) */}
                <div className="flex items-start gap-3.5">
                  <span className="text-2xl sm:text-[1.75rem] flex-shrink-0 leading-none pt-0.5 filter drop-shadow-xs select-none">
                    {card.icon}
                  </span>
                  <h3 className="text-xl sm:text-[1.32rem] font-bold text-ink tracking-tight leading-snug">
                    {card.title}
                  </h3>
                </div>

                {/* Punchy Concise Description */}
                <p className="text-sm sm:text-[15px] text-ink-600 leading-relaxed font-normal pt-1">
                  {card.description}
                </p>
              </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
