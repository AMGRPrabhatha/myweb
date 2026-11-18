import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.design1x.com'),
  title: {
    default: 'Design1X | Website Development, UI/UX & Social Media in Sri Lanka',
    template: '%s | Design1X',
  },
  description:
    'Design1X builds websites, web apps and UI/UX experiences and manages social media for businesses in Sri Lanka and beyond.',
  authors: [{ name: 'Design1X Team' }],
  creator: 'Design1X',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.design1x.com/',
    title: 'Design1X | Website Development, UI/UX & Social Media in Sri Lanka',
    description: 'Design1X builds websites, web apps and UI/UX experiences and manages social media for businesses in Sri Lanka and beyond.',
    siteName: 'Design1X',
    images: [
      {
        url: '/images/logo.png',
        width: 454,
        height: 406,
        alt: 'Design1X logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Design1X | Website Development, UI/UX & Social Media in Sri Lanka',
    description: 'Design1X builds websites, web apps and UI/UX experiences and manages social media for businesses in Sri Lanka and beyond.',
    images: ['/images/logo.png'],
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
