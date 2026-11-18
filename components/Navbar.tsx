'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import styles from './Navbar.module.css';

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
  const mobileNavLinks = [...navLinks, { href: '/contact', label: 'Contact' }];

  return (
    <header className={`fixed inset-x-0 top-3 sm:top-5 ${mobileMenuOpen ? 'z-[60]' : 'z-50'} px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pointer-events-none`}>

      <div className="flex pointer-events-auto items-center justify-between gap-2 xl:hidden">
        <Link href="/" className={`${styles.mobileGlass} inline-flex min-w-0 items-center gap-2 rounded-full py-1.5 pl-2 pr-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]`}>
          <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
            <Image
              src="/images/logo.webp"
              alt="Logo"
              width={32}
              height={28}
              priority
              className="w-auto h-6 object-contain"
            />
          </div>
          <span className="design1x-wordmark truncate text-[13px] sm:text-sm"><span className={styles.adaptiveInk}>Design</span><span className="design1x-wordmark-accent">1X</span></span>
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className={`${styles.mobileGlass} grid h-11 w-11 shrink-0 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]`}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Open navigation menu"
        >
          <Menu className={`${styles.adaptiveInk} h-5 w-5`} strokeWidth={2} />
        </button>
      </div>
      
      {/* Floating liquid glass navigation */}
      <div
        className={`${styles.glassShell} ${isScrolled ? styles.scrolled : ''} pointer-events-auto hidden xl:flex`}
      >
        
        {/* ========================================================= */}
        {/* 1. LEFT: Brand Logo                                       */}
        {/* ========================================================= */}
        <Link
          href="/"
          className="group relative z-10 flex shrink-0 items-center gap-2.5 rounded-full p-1 pl-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]"
        >
          {/* Logo Mark */}
          <div className="relative w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
            <Image
              src="/images/logo.webp"
              alt="Design1X logo"
              width={36}
              height={32}
              priority
              className="w-auto h-7 object-contain"
            />
          </div>

          <span className="design1x-wordmark text-base sm:text-[17px] leading-tight">
            <span className={styles.adaptiveInk}>Design</span><span className="design1x-wordmark-accent">1X</span>
          </span>
        </Link>

        <span aria-hidden="true" className={styles.divider} />

        {/* ========================================================= */}
        {/* 2. CENTER: Clean Centered Navigation Links                */}
        {/* ========================================================= */}
        <nav className="relative z-10 hidden items-center xl:flex" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={styles.adaptiveInk}>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ========================================================= */}
        {/* 3. RIGHT: Quick Status / Contact + Orange CTA Button      */}
        {/* ========================================================= */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          
          {/* Quick online status */}
          <div className="hidden 2xl:flex items-center gap-2 px-2 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className={`${styles.adaptiveInk} font-bold`}>Online</span>
          </div>

          {/* Design1X gradient CTA */}
          <Link
            href="/contact"
            className="brand-solid-button hidden shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold tracking-tight transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] sm:inline-flex sm:gap-2 sm:px-5 sm:text-sm"
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
                <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                  <Image
                    src="/images/logo.webp"
                    alt="Design1X logo"
                    width={40}
                    height={36}
                    className="w-auto h-8 object-contain"
                  />
                </div>
                <span className="design1x-wordmark truncate text-base sm:text-lg">Design<span className="design1x-wordmark-accent">1X</span></span>
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
              {mobileNavLinks.map((link) => {
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
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="brand-solid-button inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="design1x-wordmark mt-3 text-base">Design<span className="design1x-wordmark-accent">1X</span></p>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
