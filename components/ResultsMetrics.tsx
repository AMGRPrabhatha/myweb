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
  const [progress, setProgress] = useState(0);

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
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6E61CF]">The impact</p>
        <h2 id="results-heading" className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Our work, in three numbers.
        </h2>
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-28 h-[280px] w-full opacity-70 sm:top-16 sm:h-[390px]"
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

      <div className="relative z-10 mt-32 flex snap-x snap-mandatory gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-44 lg:mt-48 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {metrics.map((metric, index) => (
          <article
            key={metric.label}
            className="flex min-w-[82%] snap-start flex-col border-r border-[#E6EAF2] bg-white/90 px-5 py-7 last:border-r-0 sm:min-w-[48%] sm:px-8 sm:py-9 lg:min-w-0 lg:px-10"
          >
            <span className="text-xs font-bold tracking-[0.18em] text-[#8B94A8]">0{index + 1} / 03</span>
            <div
              className={`mt-8 whitespace-nowrap bg-gradient-to-r from-[#ED836C] via-[#AD5ECF] to-[#756BEC] bg-clip-text text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.055em] text-transparent ${index === 1 ? 'text-[clamp(2rem,3.5vw,3.4rem)]' : ''}`}
              aria-label={`${metric.value}${metric.suffix}`}
            >
              <span aria-hidden="true">{Math.round(metric.value * progress)}{metric.suffix}</span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-ink sm:text-xl">{metric.label}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500 sm:text-base">{metric.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
