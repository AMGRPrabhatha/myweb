'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PrincipleCard {
  id: string;
  num: string;
  title: string;
  tag: string;
  description: string;
  colorName: string;
  titleColor: string;
  tagColor: string;
  tagBg: string;
  borderColor: string;
  hoverBorder: string;
  hoverShadow: string;
  glowColor: string;
  renderVisual: () => React.ReactNode;
}

const principleCards: PrincipleCard[] = [
  {
    id: 'claims',
    num: '01',
    title: 'No Invented Claims',
    tag: 'Attributable Analytics',
    description:
      'We only publish attributable case studies and verified client metrics. Every lead source, conversion rate, and revenue figure is verifiable — all concept prototypes are prominently labeled.',
    colorName: 'blue',
    titleColor: 'text-[#2563EB]',
    tagColor: 'text-blue-700',
    tagBg: 'bg-blue-50 border-blue-200/80',
    borderColor: 'border-slate-200/90',
    hoverBorder: 'hover:border-blue-300',
    hoverShadow: 'hover:shadow-blue-500/10',
    glowColor: 'bg-blue-500/10',
    renderVisual: () => (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cloudGrad" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="cloudUnderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <filter id="cloudGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#3B82F6" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Shadow Pedestal */}
        <ellipse cx="80" cy="128" rx="46" ry="10" fill="#E2E8F0" opacity="0.6" />

        {/* 3D Isometric / Volumetric Cloud Base (Underbelly) */}
        <g filter="url(#cloudGlow)">
          <path
            d="M50 114 C36 114 26 102 26 89 C26 78 33 68 43 65 C45 52 56 42 70 42 C74 42 78 43 82 45 C88 38 98 33 109 33 C125 33 138 46 138 62 C143 66 146 72 146 79 C146 90 137 99 126 99 L50 99 Z"
            transform="translate(0, 10)"
            fill="url(#cloudUnderGrad)"
            opacity="0.35"
          />

          {/* Cloud Main Bulbous 3D Body */}
          <path
            d="M50 106 C36 106 26 95 26 82 C26 71 33 62 43 59 C45 47 56 38 70 38 C74 38 78 39 82 41 C88 34 98 29 109 29 C125 29 138 42 138 58 C144 62 147 68 147 75 C147 86 138 95 127 95 L50 95 Z"
            fill="url(#cloudGrad)"
          />

          {/* Glossy Top Specular Highlight */}
          <path
            d="M70 44 C60 44 51 51 49 61 C53 58 59 56 66 56 C73 56 80 59 84 63 C86 52 97 45 108 45 C116 45 123 49 127 55 C124 43 115 36 105 36 C96 36 88 40 83 47 C79 45 75 44 70 44 Z"
            fill="#FFFFFF"
            opacity="0.5"
          />
        </g>

        {/* Verification Check Badge Floating in 3D */}
        <g transform="translate(98, 76)">
          <circle cx="16" cy="16" r="16" fill="url(#starGrad)" />
          <path
            d="M10 16 L14 20 L22 12"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
  },
  {
    id: 'ownership',
    num: '02',
    title: '100% Asset Ownership',
    tag: 'Zero Vendor Lock-In',
    description:
      'You retain complete, permanent ownership of your Git repository, Supabase database credentials, domain DNS, and advertising accounts. Code handover is instant and 100% unencumbered.',
    colorName: 'purple',
    titleColor: 'text-[#7C3AED]',
    tagColor: 'text-purple-700',
    tagBg: 'bg-purple-50 border-purple-200/80',
    borderColor: 'border-slate-200/90',
    hoverBorder: 'hover:border-purple-300',
    hoverShadow: 'hover:shadow-purple-500/10',
    glowColor: 'bg-purple-500/10',
    renderVisual: () => (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="templeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id="templeDarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#581C87" />
            <stop offset="100%" stopColor="#3B0764" />
          </linearGradient>
          <filter id="templeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#8B5CF6" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Shadow Pedestal */}
        <ellipse cx="80" cy="132" rx="48" ry="10" fill="#E2E8F0" opacity="0.6" />

        <g filter="url(#templeGlow)">
          {/* Triangular Pediment / Roof */}
          <path
            d="M80 34 L132 58 L28 58 Z"
            fill="url(#templeGrad)"
          />
          {/* Pediment Ceiling Trim */}
          <rect x="24" y="58" width="112" height="6" rx="2" fill="url(#templeDarkGrad)" />

          {/* 4 Classical Columns */}
          <rect x="34" y="66" width="12" height="42" rx="2" fill="url(#templeGrad)" />
          <rect x="58" y="66" width="12" height="42" rx="2" fill="url(#templeGrad)" />
          <rect x="90" y="66" width="12" height="42" rx="2" fill="url(#templeGrad)" />
          <rect x="114" y="66" width="12" height="42" rx="2" fill="url(#templeGrad)" />

          {/* Stepped Base Foundation */}
          <rect x="22" y="108" width="116" height="8" rx="2" fill="url(#templeDarkGrad)" />
          <rect x="16" y="116" width="128" height="10" rx="3" fill="url(#templeGrad)" />

          {/* Center Glowing Keyhole / Vault Symbol */}
          <circle cx="80" cy="84" r="8" fill="#EDE9FE" />
          <path d="M78 84 L76 95 L84 95 L82 84 Z" fill="#EDE9FE" />
        </g>
      </svg>
    ),
  },
  {
    id: 'security',
    num: '03',
    title: 'Server-Side Security',
    tag: 'PostgreSQL & RLS Policies',
    description:
      'Privileged API keys and customer records remain strictly server-side. Private databases are fortified by PostgreSQL Row-Level Security policies, server actions, and automated encrypted webhooks.',
    colorName: 'rose',
    titleColor: 'text-[#EC4899]',
    tagColor: 'text-pink-700',
    tagBg: 'bg-pink-50 border-pink-200/80',
    borderColor: 'border-slate-200/90',
    hoverBorder: 'hover:border-pink-300',
    hoverShadow: 'hover:shadow-pink-500/10',
    glowColor: 'bg-pink-500/10',
    renderVisual: () => (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#BE185D" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
          <filter id="roseGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#EC4899" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Shadow Pedestal */}
        <ellipse cx="80" cy="132" rx="44" ry="10" fill="#E2E8F0" opacity="0.6" />

        <g filter="url(#roseGlow)">
          {/* Server Rack Tier 1 (Top) */}
          <rect x="36" y="38" width="88" height="22" rx="6" fill="url(#roseGrad)" />
          <circle cx="48" cy="49" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="58" cy="49" r="3" fill="#FBCFE8" opacity="0.7" />
          <rect x="74" y="47" width="40" height="4" rx="2" fill="#831843" opacity="0.5" />

          {/* Server Rack Tier 2 (Middle) */}
          <rect x="36" y="65" width="88" height="22" rx="6" fill="url(#roseGrad)" />
          <circle cx="48" cy="76" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="58" cy="76" r="3" fill="#FBCFE8" opacity="0.7" />
          <rect x="74" y="74" width="40" height="4" rx="2" fill="#831843" opacity="0.5" />

          {/* Server Rack Tier 3 (Bottom) */}
          <rect x="36" y="92" width="88" height="22" rx="6" fill="url(#roseGrad)" />
          <circle cx="48" cy="103" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="58" cy="103" r="3" fill="#FBCFE8" opacity="0.7" />
          <rect x="74" y="101" width="40" height="4" rx="2" fill="#831843" opacity="0.5" />

          {/* Foreground 3D Fortress Shield Badge */}
          <g transform="translate(94, 62)">
            <path
              d="M16 2 L30 8 C30 20 23 30 16 34 C9 30 2 20 2 8 L16 2 Z"
              fill="url(#shieldGrad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Inner Lock */}
            <rect x="11" y="16" width="10" height="9" rx="2" fill="#FFFFFF" />
            <path
              d="M13 16 V12 C13 10.3 14.3 9 16 9 C17.7 9 19 10.3 19 12 V16"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
      </svg>
    ),
  },
  {
    id: 'communication',
    num: '04',
    title: 'Direct Communication',
    tag: 'Zero Middle-Men Delays',
    description:
      'You speak directly with the senior engineers, UI designers, and creative leads executing your project via dedicated Slack and WhatsApp triage — no ticketing bureaucracy or lost context.',
    colorName: 'orange',
    titleColor: 'text-[#EA580C]',
    tagColor: 'text-orange-700',
    tagBg: 'bg-orange-50 border-orange-200/80',
    borderColor: 'border-slate-200/90',
    hoverBorder: 'hover:border-orange-300',
    hoverShadow: 'hover:shadow-orange-500/10',
    glowColor: 'bg-orange-500/10',
    renderVisual: () => (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>
          <linearGradient id="bubbleSmallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#F97316" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Shadow Pedestal */}
        <ellipse cx="80" cy="132" rx="46" ry="10" fill="#E2E8F0" opacity="0.6" />

        <g filter="url(#orangeGlow)">
          {/* Main 3D Chat Bubble */}
          <path
            d="M32 40 C32 30 42 22 56 22 L108 22 C122 22 132 30 132 40 L132 82 C132 92 122 100 108 100 L68 100 L44 118 L46 100 C37 98 32 91 32 82 Z"
            fill="url(#orangeGrad)"
          />

          {/* Lightning Bolt Symbol Inside Chat */}
          <path
            d="M84 38 L68 62 L80 62 L74 84 L96 58 L82 58 Z"
            fill="#FFFFFF"
          />

          {/* Smaller Accent Chat Bubble */}
          <path
            d="M96 82 C96 74 104 68 114 68 L136 68 C146 68 152 74 152 82 L152 106 C152 114 146 120 136 120 L132 120 L126 130 L124 120 L114 120 C104 120 96 114 96 106 Z"
            fill="url(#bubbleSmallGrad)"
            opacity="0.95"
          />
          <circle cx="114" cy="94" r="3" fill="#FFFFFF" />
          <circle cx="124" cy="94" r="3" fill="#FFFFFF" />
          <circle cx="134" cy="94" r="3" fill="#FFFFFF" />
        </g>
      </svg>
    ),
  },
];

export default function WhyCoordinateSection() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle ambient light glows */}
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
        
        {/* ========================================================= */}
        {/* Section Header (NinjaPromo Style with narrative subtitle) */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Why We Coordinate Web & Social Under One Roof
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            When a startup launches, brand perception is formed across two primary windows: what people see in their social feed, and what they experience on your website. By coordinating both disciplines under one roof, we eliminate siloed friction, unify brand messaging, and guarantee accountable lead triage.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 4 Core Cards in 2x2 Grid (NinjaPromo UI Layout)           */}
        {/* ========================================================= */}
        <div className="mobile-card-rail grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {principleCards.map((card) => (
            <div
              key={card.id}
              className={`group relative bg-white rounded-3xl border ${card.borderColor} ${card.hoverBorder} p-6 sm:p-8 sm:py-9 shadow-xs hover:shadow-xl ${card.hoverShadow} transition-all duration-300 flex flex-col sm:flex-row items-start gap-6 sm:gap-7 overflow-hidden`}
            >
              {/* Subtle tinted hover glow in background */}
              <div
                className={`absolute -top-16 -left-16 w-48 h-48 rounded-full ${card.glowColor} blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Left Column: 3D Glowing Art Container */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-100/60 border border-slate-200/80 p-2 sm:p-3 flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-[1.03] transition-transform duration-300">
                {card.renderVisual()}
              </div>

              {/* Right Column: Title, Subtitle Tag, & Descriptive Text */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${card.tagBg} ${card.tagColor}`}
                  >
                    <span>{card.tag}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                    {card.num}
                  </span>
                </div>

                <h3
                  className={`text-2xl sm:text-[26px] font-black tracking-tight leading-snug ${card.titleColor}`}
                >
                  {card.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
