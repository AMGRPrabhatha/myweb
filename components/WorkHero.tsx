import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import styles from './WorkHero.module.css';

export default function WorkHero() {
  return (
    <section className={styles.hero} aria-labelledby="work-hero-heading">
      <div className={styles.art} aria-hidden="true">
        <svg viewBox="0 0 900 740" preserveAspectRatio="xMaxYMid slice" focusable="false">
          <defs>
            <linearGradient id="work-flow-main" x1="350" y1="50" x2="780" y2="690" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c8d9ff" />
              <stop offset=".3" stopColor="#a399e8" />
              <stop offset=".55" stopColor="#d1a5e2" />
              <stop offset=".8" stopColor="#a4dfe1" />
              <stop offset="1" stopColor="#d1f1e6" />
            </linearGradient>
            <linearGradient id="work-flow-fold" x1="580" y1="90" x2="700" y2="680" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e7d5f8" />
              <stop offset=".45" stopColor="#b6aff1" />
              <stop offset=".72" stopColor="#ffd2ba" />
              <stop offset="1" stopColor="#ffe2bf" />
            </linearGradient>
          </defs>
          <path d="M380-150C110 100 990 115 615 405C310 640 530 805 1060 830L1100 575C715 660 585 615 810 425C1125 158 670-25 680-130Z" fill="url(#work-flow-main)" />
          <path d="M560-140C290 105 1080 180 730 450C585 565 565 680 1000 795L1080 655C745 655 730 595 880 420C1095 165 740 55 740-130Z" fill="url(#work-flow-fold)" opacity=".85" />
          <path d="M555-95C335 130 1050 170 715 430C500 600 655 725 1020 770" fill="none" stroke="#fff" strokeWidth="2" strokeOpacity=".4" />
        </svg>
      </div>
      <div className={styles.container}>
        <p className={styles.eyebrow}><span aria-hidden="true" /> Selected work</p>
        <h1 id="work-hero-heading" className={styles.heading}>Digital work, built around your business.</h1>
        <p className={styles.lead}>Websites. Interfaces. Social creative.</p>
        <p className={styles.description}>Discover the ideas, design decisions and thoughtful details behind our projects. A closer look at what we build and how it comes together.</p>
        <div className={styles.actions}>
          <Link href="#projects" className={`${styles.primary} brand-gradient-button`}>Browse our projects <ArrowDown size={17} aria-hidden="true" /></Link>
          <Link href="/contact" className={styles.secondary}>Start a project <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <p className={styles.note}>Project work and clearly labelled concept studies.</p>
      </div>
    </section>
  );
}
