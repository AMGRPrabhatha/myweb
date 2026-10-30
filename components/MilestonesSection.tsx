'use client';

import React from 'react';
import { Trophy, HeartHandshake, Rocket, Globe2, Sparkles } from 'lucide-react';

interface MilestoneCard {
  stat: string;
  label: string;
  labelColor: string;
  glowGradient: string;
  borderColorHover: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  description: string;
  colSpan: string;
}

const milestones: MilestoneCard[] = [
  {
    stat: '40+',
    label: 'Award-Winning Campaigns',
    labelColor: 'text-[#8B5CF6]',
    glowGradient: 'from-purple-500/[0.10] via-purple-300/[0.03] to-transparent',
    borderColorHover: 'hover:border-purple-300/80',
    icon: Trophy,
    iconColor: 'text-[#8B5CF6]',
    iconBg: 'bg-purple-50 text-[#8B5CF6] border-purple-100',
    description:
      'Our creativity and strategic excellence have been recognized with over 40 prestigious industry awards for our impactful campaigns.',
    colSpan: 'lg:col-span-5',
  },
  {
    stat: '98%',
    label: 'Client Satisfaction',
    labelColor: 'text-[#F43F5E]',
    glowGradient: 'from-rose-500/[0.10] via-rose-300/[0.03] to-transparent',
    borderColorHover: 'hover:border-rose-300/80',
    icon: HeartHandshake,
    iconColor: 'text-[#F43F5E]',
    iconBg: 'bg-rose-50 text-[#F43F5E] border-rose-100',
    description:
      'We pride ourselves on building lasting partnerships, with nearly all of our clients reporting high levels of satisfaction and trust.',
    colSpan: 'lg:col-span-7',
  },
  {
    stat: '500+',
    label: 'Successful Projects',
    labelColor: 'text-[#FF5722]',
    glowGradient: 'from-orange-500/[0.10] via-orange-300/[0.03] to-transparent',
    borderColorHover: 'hover:border-orange-300/80',
    icon: Rocket,
    iconColor: 'text-[#FF5722]',
    iconBg: 'bg-orange-50 text-[#FF5722] border-orange-100',
    description:
      'We have successfully delivered over 500 diverse projects, consistently meeting and exceeding our clients\' goals and expectations.',
    colSpan: 'lg:col-span-7',
  },
  {
    stat: '30+',
    label: 'Countries',
    labelColor: 'text-[#2F5BFF]',
    glowGradient: 'from-blue-500/[0.10] via-blue-300/[0.03] to-transparent',
    borderColorHover: 'hover:border-blue-300/80',
    icon: Globe2,
    iconColor: 'text-[#2F5BFF]',
    iconBg: 'bg-blue-50 text-[#2F5BFF] border-blue-100',
    description:
      'Our global reach extends across more than 30 countries, delivering innovative solutions and strategies to an international clientele.',
    colSpan: 'lg:col-span-5',
  },
];

export default function MilestonesSection() {
  return (
    <section className="relative py-10 sm:py-14 bg-white overflow-hidden">
      {/* Subtle ambient radial dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#151B25 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Section Heading - Compact & Modern */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight">
            Our Milestones of Success
          </h2>
        </div>

        {/* Bento Grid: Compact White Liquid Glass Cards */}
        <div className="mobile-card-rail grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`${item.colSpan} group relative rounded-[24px] sm:rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/90 ${item.borderColorHover} p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between`}
              >
                {/* Dynamic Liquid Glass Shade - Only visible on mouse hover */}
                <div
                  className={`absolute inset-0 rounded-[24px] sm:rounded-[28px] bg-gradient-to-tr ${item.glowGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Top Row: Stat Big Number + Sub-label + Glass Micro Icon */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="text-4xl sm:text-5xl font-black text-ink tracking-tight leading-none">
                      {item.stat}
                    </div>
                    <h3 className={`text-sm sm:text-base font-bold tracking-tight ${item.labelColor}`}>
                      {item.label}
                    </h3>
                  </div>

                  {/* Micro Glass Icon Badge */}
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.iconBg} shadow-sm group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Description - Crisp, readable slate typography */}
                <div className="relative z-10 pt-4 sm:pt-5 border-t border-slate-100/90 mt-4 sm:mt-5">
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
