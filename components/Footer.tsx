'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUp,
} from 'lucide-react';
import { initialSiteSettings } from '@/lib/sample-data';

export default function Footer({ settings = initialSiteSettings }: { settings?: typeof initialSiteSettings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white text-ink overflow-hidden">
      
      {/* Subtle ambient radial dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#151B25 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 sm:pb-16 space-y-16 sm:space-y-20">
        
        {/* ========================================================= */}
        {/* 1. GRAND TOP CALLOUT BANNER (Big Modern Agency Header)     */}
        {/* ========================================================= */}
        <div className="relative rounded-[32px] sm:rounded-[36px] bg-slate-50/80 backdrop-blur-xl border border-slate-200/90 p-8 sm:p-12 lg:p-14 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 overflow-hidden group">
          {/* Subtle liquid glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5722]/[0.06] via-cobalt/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-[1.12]">
              Ready to elevate your digital presence?{' '}
              <span className="brand-gradient-text">
                Let&apos;s talk.
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tell us about your startup or business goals. We review your requirements and send back an actionable scope proposal within 1 business day.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full lg:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full brand-gradient-button text-ink font-bold text-sm tracking-tight transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Start a Project with Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/plans"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-slate-100 text-ink font-bold text-sm border border-slate-200/90 shadow-sm transition-all"
            >
              <span>Explore Plans</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MAIN SPACIOUS FOOTER GRID (Clean, Essential Links Only) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Brand & Contact Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus-visible:outline-none"
            >
              <div className="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
                <Image
                  src="/images/logo.webp"
                  alt="Design1X logo"
                  width={44}
                  height={40}
                  className="w-auto h-9 object-contain"
                />
              </div>
              <span className="design1x-wordmark text-xl sm:text-2xl leading-none">
                Design<span className="design1x-wordmark-accent">1X</span>
              </span>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Your website and social media, coordinated by one dedicated team. High-performance Next.js web applications and 30-day ongoing creative management.
            </p>

            <address className="space-y-2 pt-2 text-sm not-italic text-slate-600">
              <p><span className="font-semibold text-ink">Email:</span>{' '}
                <a href="mailto:design1xconnect@gmail.com" className="break-words hover:text-cobalt transition-colors">design1xconnect@gmail.com</a>
              </p>
              <p><span className="font-semibold text-ink">Phone:</span>{' '}
                <a href="tel:+94758429898" className="hover:text-cobalt transition-colors">075 8429898</a>
              </p>
              <p><span className="font-semibold text-ink">Location:</span> Nawala, Sri Lanka</p>
            </address>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-ink font-mono">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li>
                <Link href="/" className="hover:text-[#FF5722] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#FF5722] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#FF5722] transition-colors">
                  Work & Projects
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-[#FF5722] transition-colors">
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[#FF5722] transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FF5722] transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF5722] transition-colors">
                  About Agency
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-ink font-mono">
              Core Services
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li>
                <Link href="/services/website-development" className="hover:text-[#FF5722] transition-colors">
                  Next.js Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-management" className="hover:text-[#FF5722] transition-colors">
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-[#FF5722] transition-colors">
                  Combined Launch & Grow Plan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF5722] transition-colors">
                  Custom Enterprise Portals
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-[#FF5722] transition-colors">
                  90-Day Growth Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Guarantees (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-ink font-mono">
              Guarantees
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li>100% Code Handover</li>
              <li>Full IP & NDA Security</li>
              <li>Zero Hidden Fees</li>
              <li>Direct Lead Contact</li>
            </ul>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. SOCIAL CHANNELS                                        */}
        {/* ========================================================= */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Social Channels */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href={settings.facebookUrl || 'https://facebook.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#4b26df] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Twitter"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#4b26df] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#4b26df] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={settings.linkedinUrl || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#4b26df] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={settings.instagramUrl || 'https://instagram.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#4b26df] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 4. COPYRIGHT & LEGAL ROW                                  */}
        {/* ========================================================= */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <a href="#top" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-bold text-ink shadow-sm transition-colors hover:border-[#FF5722] hover:text-[#FF5722]">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Back to top
          </a>
          <p>
            © {currentYear} Design1X. All rights reserved. Built with Next.js App Router.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-[#FF5722] transition-colors">
              Contact Agency
            </Link>
          </div>
        </div>

      </div>

    </footer>
  );
}
