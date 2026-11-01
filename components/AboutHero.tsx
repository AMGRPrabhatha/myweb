import Link from 'next/link';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import styles from './AboutHero.module.css';
import TypewriterText from './TypewriterText';

export default function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-heading">
      <div className={styles.art} aria-hidden="true">
        <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" focusable="false">
          <defs>
            <linearGradient id="about-ribbon-color" x1="550" y1="760" x2="1400" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a8c6fa" />
              <stop offset=".26" stopColor="#a889ec" />
              <stop offset=".55" stopColor="#ec80bf" />
              <stop offset=".78" stopColor="#ffb188" />
              <stop offset="1" stopColor="#ffd6a1" />
            </linearGradient>
            <linearGradient id="about-ribbon-fold" x1="900" y1="740" x2="1360" y2="170" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8067db" stopOpacity=".1" />
              <stop offset=".5" stopColor="#d96ab6" stopOpacity=".5" />
              <stop offset="1" stopColor="#ffddd0" stopOpacity=".7" />
            </linearGradient>
          </defs>
          <path d="M320 850C590 620 930 740 1130 400C1250 195 1305 100 1480-20L1610 110C1425 285 1440 515 1230 690C1010 875 700 820 450 995Z" fill="url(#about-ribbon-color)" />
          <path d="M460 855C770 620 1025 730 1200 410C1330 170 1400 110 1490 40L1530 160C1400 330 1425 550 1210 710C1000 865 770 795 520 930Z" fill="url(#about-ribbon-fold)" />
          <path d="M450 855C750 660 1010 710 1190 410C1310 210 1350 140 1490 45" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="2" />
        </svg>
      </div>
      <div className={styles.container}>
        <h1 id="about-hero-heading" className={styles.heading}><TypewriterText lines={['A digital team.', 'On your side.']} /></h1>
        <p className={styles.description}>We bring website development and social strategy together for startups and growing businesses. One connected team, from the first conversation to launch.</p>
        <div className={styles.actions}>
          <Link href="/contact" className={`${styles.contact} brand-gradient-button hero-button-motion`}>Let’s talk <ArrowRight size={16} aria-hidden="true" /></Link>
          <a href="#about-company" className={styles.storyLink}>Get to know us <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <p className={styles.location}><MapPin size={14} aria-hidden="true" /> Based in Nawala, Sri Lanka</p>
      </div>
    </section>
  );
}
