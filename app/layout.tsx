import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cobaltkinetic.example.com'),
  title: {
    default: 'Cobalt & Kinetic Digital | Website Development & Social Media Management',
    template: '%s | Cobalt & Kinetic Digital',
  },
  description:
    'We build responsive, functional websites with Next.js and Supabase, and manage the ongoing social media content that keeps startups active across Instagram, Facebook, TikTok, and LinkedIn.',
  keywords: [
    'digital agency',
    'website development',
    'social media management',
    'Next.js development',
    'startup website',
    'short-form video editing',
    'Supabase web application',
  ],
  authors: [{ name: 'Cobalt & Kinetic Team' }],
  creator: 'Cobalt & Kinetic Digital',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cobaltkinetic.example.com',
    title: 'Cobalt & Kinetic Digital | Web & Social Media Agency',
    description:
      'Your website and social media, working together. Responsive web applications and coordinated monthly content management for startups.',
    siteName: 'Cobalt & Kinetic Digital',
    images: [
      {
        url: '/images/projects/aura-cover.svg',
        width: 1200,
        height: 630,
        alt: 'Cobalt & Kinetic Digital Agency Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cobalt & Kinetic Digital | Web & Social Media Agency',
    description:
      'Responsive web applications and coordinated monthly content management for startups.',
    images: ['/images/projects/aura-cover.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-ink selection:bg-[#FF5722]/20 selection:text-ink">
        <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0 overflow-hidden">
          <defs>
            <filter id="button-glass-corner" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="2" seed="6" result="ripples" />
              <feDisplacementMap in="SourceGraphic" in2="ripples" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
