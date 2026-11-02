'use client';

import { useEffect, useRef, useState } from 'react';

const metrics = [
  {
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    detail: 'Over 100+ delivered web and social projects',
  },
  {
    value: 1,
    suffix: ' Business Day',
    label: 'Proposal Response SLA',
    detail: 'Fast feasibility check and milestone pricing',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Code & Asset Ownership',
    detail: 'Complete IP handover with zero lock-in',
  },
] as const;

export default function ResultsMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeMetric, setActiveMetric] = useState(0);

  const scrollToMetric = (index: number) => {
    const rail = railRef.current;
    const card = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !card) return;
    rail.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  };

  const updateActiveMetric = () => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.children) as HTMLElement[];
    const nearest = cards.reduce((best, card, index) =>
      Math.abs(card.offsetLeft - rail.scrollLeft) <
      Math.abs(cards[best].offsetLeft - rail.scrollLeft) ? index : best, 0);
    setActiveMetric(nearest);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let started = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        if (reducedMotion) {
          setProgress(1);
          return;
        }

        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const elapsed = Math.min((now - start) / duration, 1);
          setProgress(1 - Math.pow(1 - elapsed, 3));
          if (elapsed < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="results"
      aria-labelledby="results-heading"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="relative z-10">
        <h2 id="results-heading" className="max-w-3xl text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Our work, in three numbers.
        </h2>
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none relative mt-8 block h-32 w-full opacity-70 sm:absolute sm:inset-x-0 sm:top-16 sm:mt-0 sm:h-[390px]"
        viewBox="0 0 1200 390"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="results-wave" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#FFB2A0" />
            <stop offset="48%" stopColor="#B774E9" />
            <stop offset="100%" stopColor="#8E8FF2" />
          </linearGradient>
        </defs>
        {Array.from({ length: 18 }, (_, index) => (
          <path
            key={index}
            d={`M -80 ${260 + index * 5} C 230 ${145 + index * 4}, 365 ${330 + index * 2}, 565 ${278 - index * 4} S 915 ${120 + index * 5}, 1280 ${186 + index * 4}`}
            fill="none"
            stroke="url(#results-wave)"
            strokeWidth="1.15"
            opacity={0.65 - index * 0.02}
          />
        ))}
      </svg>

      <div
        ref={railRef}
        className="relative z-10 mt-2 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-5 [scrollbar-color:#8B77E8_#E9EAF5] [scrollbar-width:thin] sm:mt-44 sm:grid sm:grid-cols-2 sm:gap-0 sm:overflow-visible sm:pb-0 lg:mt-48 lg:grid-cols-3"
        tabIndex={0}
        aria-label="Results metrics"
        onScroll={updateActiveMetric}
      >
        {metrics.map((metric, index) => (
          <article
            key={metric.label}
            className="flex min-w-[82%] max-w-[82%] shrink-0 snap-start flex-col rounded-2xl border border-[#E8E5F4] bg-gradient-to-br from-white to-[#F8F7FF] p-5 shadow-[0_12px_32px_rgba(71,55,138,0.07)] sm:min-w-0 sm:max-w-none sm:rounded-none sm:border-0 sm:bg-white/90 sm:px-8 sm:py-9 sm:shadow-none lg:border-r lg:border-[#E6EAF2] lg:px-10 lg:last:border-r-0"
          >
            <span className="text-xs font-bold tracking-[0.18em] text-[#8B94A8]">0{index + 1} / 03</span>
            <div
              className={`mt-8 bg-gradient-to-r from-[#ED836C] via-[#AD5ECF] to-[#756BEC] bg-clip-text text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-tight tracking-[-0.055em] text-transparent ${index === 1 ? 'text-[clamp(2rem,6.5vw,3.4rem)]' : ''}`}
              aria-label={`${metric.value}${metric.suffix}`}
            >
              <span aria-hidden="true">{Math.round(metric.value * progress)}{metric.suffix}</span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-ink sm:text-xl">{metric.label}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500 sm:text-base">{metric.detail}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2 sm:hidden" aria-label="Select a result">
        {metrics.map((metric, index) => (
          <button
            key={metric.label}
            type="button"
            onClick={() => scrollToMetric(index)}
            aria-label={`Show ${metric.label}`}
            aria-current={activeMetric === index ? 'true' : undefined}
            className={`h-2 rounded-full transition-[width,background-color] duration-300 ${activeMetric === index ? 'w-8 bg-[#7764DE]' : 'w-2 bg-[#D8D2EF]'}`}
          />
        ))}
      </div>
    </section>
  );
}
