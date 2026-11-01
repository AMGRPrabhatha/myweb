import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import styles from './ContentHero.module.css';
import TypewriterText from './TypewriterText';

const content = {
  testimonials: {
    heading: ['Client stories.', 'In their own words.'],
    lead: 'The people. The projects. The experience.',
    description: 'Explore feedback on our website development, social media and combined delivery. Get a closer look at the experience of working with Cobalt & Kinetic.',
    primary: 'Read the reviews',
    target: '#client-reviews',
    secondary: 'Explore our work',
    secondaryTarget: '/work',
  },
  blog: {
    heading: ['Ideas to build on.', 'Insights to move forward.'],
    lead: 'Web development. Social strategy. Growth.',
    description: 'Practical guides and perspectives on building websites, creating content and connecting your digital presence. Explore the thinking behind our work.',
    primary: 'Explore the articles',
    target: '#journal-articles',
    secondary: 'Get to know us',
    secondaryTarget: '/about',
  },
};

export default function ContentHero({ variant }: { variant: 'testimonials' | 'blog' }) {
  const page = content[variant];
  return (
    <section className={`${styles.hero} ${styles[variant]}`} aria-labelledby={`${variant}-hero-heading`}>
      <div className={styles.art} aria-hidden="true">
        {variant === 'testimonials' ? (
          <svg viewBox="0 0 900 760" preserveAspectRatio="xMaxYMid slice" focusable="false">
            <defs>
              <linearGradient id="reviews-sweep" x1="280" y1="100" x2="900" y2="700" gradientUnits="userSpaceOnUse"><stop stopColor="#ffe6ba" /><stop offset=".36" stopColor="#f4b8ad" /><stop offset=".7" stopColor="#e0a1ca" /><stop offset="1" stopColor="#b7a9ed" /></linearGradient>
              <linearGradient id="reviews-inner" x1="630" y1="110" x2="920" y2="680" gradientUnits="userSpaceOnUse"><stop stopColor="#fff0d6" /><stop offset=".55" stopColor="#f7c9b6" /><stop offset="1" stopColor="#e6c8ed" /></linearGradient>
            </defs>
            <path d="M720-180C240-50 220 290 590 390C955 490 650 700 390 875L1040 920C1290 580 1210 315 840 240C585 185 730 50 1030-50Z" fill="url(#reviews-sweep)" />
            <path d="M865-140C430 10 435 220 750 305C1105 400 955 690 710 870L1080 900C1330 545 1160 315 925 210C720 120 935 35 1060-40Z" fill="url(#reviews-inner)" />
            <path d="M840-100C390 35 430 245 740 325C1080 415 875 695 650 865" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
          </svg>
        ) : (
          <svg viewBox="0 0 900 760" preserveAspectRatio="xMaxYMid slice" focusable="false">
            <defs>
              <linearGradient id="journal-fold" x1="300" y1="50" x2="870" y2="720" gradientUnits="userSpaceOnUse"><stop stopColor="#d4d8fc" /><stop offset=".38" stopColor="#a1b8f0" /><stop offset=".7" stopColor="#a6dfde" /><stop offset="1" stopColor="#d8edd2" /></linearGradient>
              <linearGradient id="journal-edge" x1="510" y1="0" x2="960" y2="680" gradientUnits="userSpaceOnUse"><stop stopColor="#e4d0f5" /><stop offset=".5" stopColor="#b4a5eb" /><stop offset="1" stopColor="#c4eaf4" /></linearGradient>
            </defs>
            <path d="M620-150L1080-40L650 400Q580 470 680 530L1080 820L680 900L350 590Q220 455 350 320Z" fill="url(#journal-fold)" />
            <path d="M835-110L1120-35L770 365Q680 455 765 520L1100 780L965 830L560 530Q480 460 560 375Z" fill="url(#journal-edge)" opacity=".9" />
            <path d="M792-90L510 350Q410 460 535 555L945 865" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="2" />
          </svg>
        )}
      </div>
      <div className={styles.container}>
        <h1 id={`${variant}-hero-heading`} className={styles.heading}><TypewriterText lines={page.heading} /></h1>
        <p className={styles.lead}>{page.lead}</p>
        <p className={styles.description}>{page.description}</p>
        <div className={styles.actions}>
          <a href={page.target} className={`${styles.primary} brand-gradient-button hero-button-motion`}>{page.primary}<ArrowDown size={17} aria-hidden="true" /></a>
          <Link href={page.secondaryTarget} className={`${styles.secondary} hero-button-motion`}>{page.secondary}<ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
