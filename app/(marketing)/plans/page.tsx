import HeroTicker from '@/components/HeroTicker';
import { Metadata } from 'next';
import Link from 'next/link';
import PlansHero from '@/components/PlansHero';
import PlanTabs from '@/components/PlanTabs';
import UniversalStandardsSlider from '@/components/UniversalStandardsSlider';
import ProofAndFaq from '@/components/ProofAndFaq';
import { db } from '@/lib/db';
import {
  ShieldCheck,
  Info,
  Clock,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  Users,
  Compass,
  Zap,
  Lock,
  MessageSquare,
  Rocket,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plans & Packages | Transparent Digital Agency Pricing',
  description:
    'Compare our transparent package options: Launch Website, Custom Website, Social Essentials, Social Growth, and Launch & Grow (Combined).',
};

export const revalidate = 60;

export default async function PlansPage({ searchParams }: { searchParams?: { category?: string } }) {
  const plans = await db.getAllPlans();
  const selectedCategory = (['website', 'mobile', 'combined', 'social', 'all'] as const).find(category => category === searchParams?.category) || 'website';

  const roadmapSteps = [
    {
      step: 'Step 01',
      title: 'Initial Fit',
      desc: '15-min discovery call or brief submission with our solutions specialist to outline requirements.',
      icon: MessageSquare,
      iconBg: 'bg-blue-50 text-cobalt border-blue-100',
      glowGradient: 'from-blue-500/[0.12] via-blue-300/[0.03] to-transparent',
      borderHover: 'hover:border-blue-300/80',
    },
    {
      step: 'Step 02',
      title: 'Deep Discovery',
      desc: 'We analyze your target audience, competitors, technical bottlenecks, and existing brand presence.',
      icon: Compass,
      iconBg: 'bg-orange-50 text-[#FF5722] border-orange-100',
      glowGradient: 'from-orange-500/[0.12] via-orange-300/[0.03] to-transparent',
      borderHover: 'hover:border-orange-300/80',
    },
    {
      step: 'Step 03',
      title: '90-Day Roadmap',
      desc: 'A tailored plan presented by a lead architect with concrete milestones, wireframes, and counting rules.',
      icon: ClipboardList,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      glowGradient: 'from-purple-500/[0.12] via-purple-300/[0.03] to-transparent',
      borderHover: 'hover:border-purple-300/80',
    },
    {
      step: 'Step 04',
      title: 'Execute & Launch',
      desc: 'You can execute the roadmap with our dedicated team or take it internally. No lock-in.',
      icon: Rocket,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      glowGradient: 'from-emerald-500/[0.12] via-emerald-300/[0.03] to-transparent',
      borderHover: 'hover:border-emerald-300/80',
    },
  ];

  return (
    <div className="bg-white min-h-screen text-ink">
      
      <PlansHero />
      <HeroTicker />

      <section id="packages" className="scroll-mt-28 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PlanTabs key={selectedCategory} plans={plans} initialCategory={selectedCategory} />
      </section>

      {/* ========================================================= */}
      {/* 3. UNIVERSAL STANDARDS - NINJA PROMO FOCUS SLIDER         */}
      {/* ========================================================= */}
      <UniversalStandardsSlider />

      {/* ========================================================= */}
      {/* 4. NOT READY TO COMMIT? 90-DAY ROADMAP (Glass Look Cards) */}
      {/* ========================================================= */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        {/* Subtle background radial dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(#151B25 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-[1.15]">
              Not Ready to Commit? Get a{' '}
              <span className="brand-gradient-text">
                90-Day Growth Roadmap
              </span>{' '}
              First.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              A custom roadmap with clear milestones, platform recommendations, and quick wins. No obligation. No hidden charges.
            </p>
          </div>

          <div className="mobile-card-rail grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className={`group relative bg-white/95 backdrop-blur-xl rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 border border-slate-200/90 ${step.borderHover} shadow-[0_4px_24px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(255,87,34,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
                >
                  {/* Dynamic Liquid Glass Shade on Mouse Hover */}
                  <div
                    className={`absolute inset-0 rounded-[28px] sm:rounded-[32px] bg-gradient-to-tr ${step.glowGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  <div className="relative z-10 space-y-4">
                    {/* Header Row: Step Pill + Micro Glass Icon */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/70 text-[11px] font-mono font-bold text-slate-700">
                        {step.step}
                      </span>
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${step.iconBg} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-ink tracking-tight group-hover:text-[#FF5722] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  {/* Micro bottom hint */}
                  <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-[#FF5722] transition-colors">
                    <span>Explore Phase</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full brand-gradient-button text-ink font-bold text-sm tracking-tight transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Request a Free 15-Minute Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ on pricing & terms */}
      <ProofAndFaq />


    </div>
  );
}
