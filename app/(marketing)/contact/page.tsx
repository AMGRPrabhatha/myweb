import HeroTicker from '@/components/HeroTicker';
import TypewriterText from '@/components/TypewriterText';
import { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import { db } from '@/lib/db';
import { Plus, Globe2, Mail, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Start a Project | Cobalt & Kinetic Digital',
  description:
    'Book a discovery call with Cobalt & Kinetic to discuss your website and marketing goals.',
};

export default async function ContactPage() {
  const [plans, settings] = await Promise.all([
    db.getAllPlans(),
    db.getSettings(),
  ]);

  // Social Channels for the Follow Us section (Matching Ninja Promo UI - KEEP EXACTLY UNCHANGED)
  const socialLeft = [
    {
      name: 'Facebook',
      url: settings.facebookUrl || 'https://facebook.com',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
    },
    {
      name: 'Instagram',
      url: settings.instagramUrl || 'https://instagram.com',
    },
  ];

  const socialRight = [
    {
      name: 'Twitter (now known as X)',
      url: 'https://x.com',
    },
    {
      name: 'LinkedIn',
      url: settings.linkedinUrl || 'https://linkedin.com',
    },
    {
      name: 'Behance',
      url: 'https://behance.net',
    },
  ];

  return (
    <div className="bg-white min-h-screen text-ink">
      <section className="bg-white min-h-[calc(100svh-42px)] py-12 sm:py-16 lg:pt-20 lg:pb-10" style={{ paddingTop: 'var(--marketing-hero-top-space)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-12 items-start">
            <div className="lg:col-span-6 flex flex-col justify-between gap-12">
              <div>
                <h1 className="max-w-[680px] text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-ink tracking-tight leading-[1.12]">
                  <TypewriterText lines={['Ready to take your marketing to the next level?']} />
                </h1>
                <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-ink">Get a look at:</h2>
                <ul className="mt-5 space-y-4 pl-6 list-disc text-base sm:text-lg leading-relaxed text-slate-600 marker:text-slate-400">
                  <li>How Cobalt &amp; Kinetic works with your team;</li>
                  <li>How a coordinated website and social strategy can support your goals;</li>
                  <li>How we plan scope, timelines, and deliverables;</li>
                  <li>Which service plan is most suitable for your needs.</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 border-t border-slate-200 pt-6 text-sm sm:text-base font-bold text-slate-500">
                <span>Web Development</span>
                <span>Social Content</span>
                <span>Combined Projects</span>
              </div>
            </div>

            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[560px] bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-slate-200 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] text-ink">
                <h2 className="text-2xl sm:text-[1.75rem] font-semibold uppercase text-ink text-center tracking-tight mb-5">
                  Book a call with us
                </h2>
                <Suspense fallback={<div className="py-12 text-center text-slate-400 text-sm">Loading form...</div>}>
                  <ContactForm plans={plans} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HeroTicker />

      {/* ========================================================= */}
      {/* 2. FIND US — Contact Details + Nawala, Sri Lanka Map       */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* LEFT: Contact Details (5 cols) */}
            <div className="lg:col-span-5 space-y-8 sm:space-y-10">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
                  Find Us
                </h2>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  We operate as a distributed digital pod with headquarters in Nawala, Sri Lanka — serving startups and growing businesses globally.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-3.5">
                {/* Email */}
                <a
                  href={`mailto:${settings.businessEmail}`}
                  className="group flex items-start gap-4 p-4.5 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                    <Mail className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Us</div>
                    <div className="break-all text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      {settings.businessEmail}
                    </div>
                    <div className="text-xs text-slate-500">Response within {settings.responseExpectation}</div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4.5 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-300">
                    <MessageSquare className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">WhatsApp</div>
                    <div className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">
                      {settings.phone}
                    </div>
                    <div className="text-xs text-slate-500">Tap to start a conversation</div>
                  </div>
                </a>

                {/* Office Location - Nawala, Sri Lanka */}
                <div className="group flex items-start gap-4 p-4.5 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-orange-300 hover:shadow-md hover:shadow-orange-500/10 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF5722] group-hover:border-[#FF5722] transition-all duration-300">
                    <MapPin className="w-5 h-5 text-[#FF5722] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Headquarters</div>
                    <div className="text-base font-bold text-slate-900">Nawala, Sri Lanka</div>
                    <div className="text-xs text-slate-500">Colombo District, Western Province</div>
                  </div>
                </div>
              </div>

              {/* Proof Strip */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Available Mon–Sat</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>GMT+5:30 (SLST)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
                  <span>Remote Friendly</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Real Street Map Highlighting Nawala, Sri Lanka (7 cols) */}
            <div className="lg:col-span-7 relative">
              {/* Soft ambient blur backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 via-purple-100/30 to-orange-100/40 rounded-[32px] blur-2xl pointer-events-none" />

              <div className="relative bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200 shadow-xl shadow-slate-100/80 p-5 sm:p-7 overflow-hidden">
                {/* Header inside map card */}
                <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Live Map Location
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Nawala, Sri Lanka
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active Hub</span>
                  </div>
                </div>

                {/* Google Maps Street View Frame */}
                <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                  <iframe
                    title="Cobalt & Kinetic Digital Headquarters - Nawala, Sri Lanka"
                    src="https://maps.google.com/maps?q=Nawala%2C%20Sri%20Lanka&t=m&z=15&output=embed&iwloc=near"
                    className="w-full h-full border-0 filter contrast-[1.02] saturate-[1.1]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />

                  {/* Top-Left Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                    <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5722]" />
                      </span>
                      <div>
                        <div className="text-xs font-black text-slate-900 leading-tight">Nawala HQ</div>
                        <div className="text-[10px] text-slate-500 font-medium leading-tight">Western Province, Sri Lanka</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom-Right Floating "Open in Google Maps" Button */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Nawala,+Sri+Lanka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white text-xs font-bold text-slate-800 hover:text-blue-600 border border-slate-200 shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
                  </a>
                </div>

                {/* Bottom info strip */}
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500 font-medium pt-1">
                  <div className="flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span>Serving clients in Sri Lanka, Japan, Europe &amp; USA</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    6.8868° N, 79.8893° E
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FOLLOW US SECTION (Matching Ninja Promo UI - UNCHANGED) */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 sm:space-y-14">
            
            {/* Header */}
            <div className="space-y-3">
              <h2 className="text-4xl sm:text-6xl font-black text-ink tracking-tight">
                Follow Us
              </h2>
            </div>

            {/* Two-Column Social Rows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24">
              
              {/* Left Column (Facebook, YouTube, Instagram) */}
              <div className="flex flex-col">
                {socialLeft.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${channel.name}`}
                    className="group flex items-center justify-between py-6 sm:py-8 border-b border-warm-200 hover:border-ink transition-colors cursor-pointer"
                  >
                    <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink group-hover:text-[#FF5722] transition-colors tracking-tight">
                      {channel.name}
                    </span>
                    <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-ink group-hover:text-[#FF5722] group-hover:bg-orange-50 transition-all duration-300">
                      <Plus
                        className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
                        strokeWidth={1.5}
                      />
                    </span>
                  </a>
                ))}
              </div>

              {/* Right Column (Twitter / X, LinkedIn, Behance) */}
              <div className="flex flex-col">
                {socialRight.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${channel.name}`}
                    className="group flex items-center justify-between py-6 sm:py-8 border-b border-warm-200 hover:border-ink transition-colors cursor-pointer"
                  >
                    <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink group-hover:text-[#FF5722] transition-colors tracking-tight">
                      {channel.name}
                    </span>
                    <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-ink group-hover:text-[#FF5722] group-hover:bg-orange-50 transition-all duration-300">
                      <Plus
                        className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
                        strokeWidth={1.5}
                      />
                    </span>
                  </a>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
