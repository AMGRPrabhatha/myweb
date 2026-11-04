import HeroTicker from '@/components/HeroTicker';
import { Metadata } from 'next';
import AboutHero from '@/components/AboutHero';
import AboutServicesCarousel from '@/components/AboutServicesCarousel';
import WhyCoordinateSection from '@/components/WhyCoordinateSection';
import OperatingArrangementsSection from '@/components/OperatingArrangementsSection';
import DedicatedTeamAccordion from '@/components/DedicatedTeamAccordion';
import orbitStyles from '@/components/AboutOrbit.module.css';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'About Us | Coordinated Digital Agency & Core Team',
  description:
    'Learn about Design1X, our coordinated website and social media delivery model, and our commitment to truthful startup partnerships.',
};

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await db.getSettings();

  return (
    <div className="bg-white min-h-screen text-ink">

      <AboutHero />
      <HeroTicker />

      {/* ========================================================= */}
      {/* 2. COMPANY INTRODUCTION */}
      {/* ========================================================= */}
      <section id="about-company" aria-labelledby="about-company-heading" className="scroll-mt-28 relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#6A6BEB]/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#FF6A3D]/[0.06] blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="about-company-heading" className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Digital work, <span className="brand-gradient-text">working together.</span>
          </h2>

          <div className="mt-10 grid items-center gap-10 sm:mt-14 lg:grid-cols-2 lg:gap-16">
            <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
              <svg viewBox="0 0 520 520" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="about-orbit" x1="70" y1="80" x2="455" y2="440" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#477DF7" />
                    <stop offset="0.52" stopColor="#9361C9" />
                    <stop offset="1" stopColor="#FF6840" />
                  </linearGradient>
                  <linearGradient id="about-core" x1="211" y1="211" x2="309" y2="309" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EDF2FF" />
                    <stop offset="1" stopColor="#FFF1EB" />
                  </linearGradient>
                </defs>
                <g className={orbitStyles.outerOrbit}>
                  <circle cx="260" cy="260" r="219" stroke="url(#about-orbit)" strokeOpacity=".48" strokeWidth="1.5" />
                  <circle cx="260" cy="41" r="5" fill="#FF6840" />
                  <circle cx="107" cy="417" r="5" fill="#9361C9" />
                </g>
                <g className={orbitStyles.verticalOrbit}>
                  <ellipse cx="260" cy="260" rx="111" ry="219" stroke="#7B85A3" strokeOpacity=".55" strokeWidth="1.5" />
                </g>
                <g className={orbitStyles.horizontalOrbit}>
                  <ellipse cx="260" cy="260" rx="219" ry="111" stroke="#7B85A3" strokeOpacity=".55" strokeWidth="1.5" />
                  <circle cx="479" cy="260" r="5" fill="#477DF7" />
                </g>
                <g className={orbitStyles.core}>
                  <circle cx="260" cy="260" r="70" fill="url(#about-core)" stroke="white" strokeWidth="2" />
                  <path d="M222 284V237L260 214L298 237V284L260 307L222 284Z" fill="white" stroke="url(#about-orbit)" strokeWidth="2" />
                  <path d="M222 237L260 260L298 237M260 260V307" stroke="url(#about-orbit)" strokeWidth="2" strokeLinejoin="round" />
                </g>
              </svg>
              <span className={`${orbitStyles.labelOne} absolute left-[2%] top-[42%] rounded-xl border border-[#E8C1DB] bg-white/75 px-3 py-2 text-xs font-bold text-[#9255AA] shadow-sm backdrop-blur-xl sm:text-sm`}>Clear scope</span>
              <span className={`${orbitStyles.labelTwo} absolute right-[1%] top-[18%] rounded-xl border border-[#FFD0BE] bg-white/75 px-3 py-2 text-xs font-bold text-[#E45E3D] shadow-sm backdrop-blur-xl sm:text-sm`}>Direct collaboration</span>
              <span className={`${orbitStyles.labelThree} absolute bottom-[12%] right-[2%] rounded-xl border border-[#C4D4FF] bg-white/75 px-3 py-2 text-xs font-bold text-[#477DF7] shadow-sm backdrop-blur-xl sm:text-sm`}>Full ownership</span>
            </div>

            <div className="max-w-xl">
              <h3 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">Our mission and values</h3>
              <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">
                Design1X is a coordinated digital agency based in Colombo, Sri Lanka. We bring website development and social strategy together for startups and growing businesses.
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">
                Our team works with you through clear scopes, direct communication, and transparent milestones, connecting your website and content to the goals that matter to your business.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 3. FULL-SERVICE 3D CAROUSEL (Ninja Promo Style)           */}
      {/* ========================================================= */}
      <AboutServicesCarousel />

      {/* ========================================================= */}
      {/* 4. WHY WE COORDINATE WEB & SOCIAL (NinjaPromo Style UI)   */}
      {/* ========================================================= */}
      <WhyCoordinateSection />

      {/* ========================================================= */}
      {/* 5. OPERATING ARRANGEMENTS & ROLES (NinjaPromo Step UI)     */}
      {/* ========================================================= */}
      <OperatingArrangementsSection settings={settings} />
      <DedicatedTeamAccordion />


    </div>
  );
}
