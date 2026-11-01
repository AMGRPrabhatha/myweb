'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a, button'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeys);
    };
  }, [mobileMenuOpen]);

  // Track scroll for subtle dynamic glass adjustment (optimized to prevent re-render jank)
  useEffect(() => {
    let lastScrolledState = false;
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20;
      if (shouldBeScrolled !== lastScrolledState) {
        lastScrolledState = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/work', label: 'Work' },
    { href: '/plans', label: 'Plans' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header className={`fixed inset-x-0 top-3 sm:top-5 ${mobileMenuOpen ? 'z-[60]' : 'z-50'} px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pointer-events-none`}>

      <div className="pointer-events-auto flex items-center justify-between gap-2 xl:hidden">
        <Link href="/" className="inline-flex min-w-0 items-center gap-2 rounded-full border border-white/90 bg-white/90 py-1.5 pl-1.5 pr-3 shadow-[0_8px_30px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.05] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FF5722] text-xs font-black text-white">CK</span>
          <span className="truncate text-[13px] font-extrabold tracking-tight text-ink sm:text-sm">Cobalt<span className="text-[#FF5722]">&amp;</span>Kinetic</span>
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/90 bg-white/90 text-ink shadow-[0_8px_30px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.05] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
      
      {/* Floating Centered Liquid Glass Pill */}
      <div
        className={`pointer-events-auto mx-auto hidden w-full transition-all duration-300 rounded-full px-3.5 sm:px-5 py-1.5 xl:flex items-center justify-between border ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-2xl border-white/80 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12),0_1px_2px_0_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]'
            : 'bg-white/75 backdrop-blur-xl border-white/70 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08),0_1px_2px_0_rgba(0,0,0,0.03)] ring-1 ring-black/[0.03]'
        }`}
      >
        
        {/* ========================================================= */}
        {/* 1. LEFT: Brand Logo                                       */}
        {/* ========================================================= */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] rounded-full p-1 pl-1.5"
        >
          {/* Circular Monogram Badge */}
          <div className="w-8 h-8 rounded-full bg-[#FF5722] flex items-center justify-center text-white font-black text-sm shadow-sm transition-transform group-hover:scale-105">
            CK
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-ink tracking-tight text-base sm:text-[17px] leading-tight">
              Cobalt<span className="text-[#FF5722]">&</span>Kinetic
            </span>
            <span className="hidden sm:inline-block text-[9px] font-bold text-ink-500 uppercase tracking-widest -mt-0.5">
              Digital Agency
            </span>
          </div>
        </Link>

        {/* ========================================================= */}
        {/* 2. CENTER: Clean Centered Navigation Links                */}
        {/* ========================================================= */}
        <nav className="hidden xl:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 lg:px-4 py-1 rounded-full text-xs lg:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] ${
                  isActive
                    ? 'bg-ink text-white shadow-xs font-bold'
                    : 'text-ink-700 hover:text-ink hover:bg-black/[0.04]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ========================================================= */}
        {/* 3. RIGHT: Quick Status / Contact + Orange CTA Button      */}
        {/* ========================================================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Online Status Badge (Clean indicator without phone number) */}
          <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-xs font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">Online</span>
          </div>

          {/* Orange Pill CTA Button */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 rounded-full bg-[#FF5722] hover:bg-[#F24B18] text-white font-bold text-xs sm:text-sm tracking-tight transition-all shadow-sm shadow-orange-500/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] focus-visible:ring-offset-2"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>

        </div>

      </div>

      {/* Mobile side navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
            className="pointer-events-auto fixed inset-0 h-[100dvh] w-screen bg-slate-950/35 backdrop-blur-[3px]"
          />
          <div
            id="mobile-navigation"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="pointer-events-auto fixed inset-y-0 right-0 flex h-[100dvh] w-[min(86vw,560px)] flex-col overflow-y-auto bg-white px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-[max(28px,env(safe-area-inset-top))] shadow-[-20px_0_60px_rgba(15,23,42,0.18)] sm:px-10"
          >
            <div className="flex items-center justify-between gap-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#FF5722] text-sm font-black text-white">CK</span>
                <span className="truncate text-base font-extrabold tracking-tight text-ink sm:text-lg">Cobalt<span className="text-[#FF5722]">&amp;</span>Kinetic</span>
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  menuButtonRef.current?.focus();
                }}
                aria-label="Close navigation menu"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-ink shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]"
              >
                <X className="h-6 w-6" strokeWidth={2.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 py-8" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-12 items-center gap-3 py-2 text-[clamp(1.65rem,5vw,2.65rem)] font-black uppercase leading-none tracking-[-0.035em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] ${isActive ? 'text-[#FF5722]' : 'text-[#151B25] hover:text-[#FF5722]'}`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF5722]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="shrink-0 border-t border-slate-200 pt-5">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="inline-flex min-h-11 items-center gap-2 font-bold text-[#FF5722] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-base font-extrabold text-ink">Cobalt &amp; Kinetic</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Digital Agency</p>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
