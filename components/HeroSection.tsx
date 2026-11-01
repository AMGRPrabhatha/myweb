import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';
import TypewriterText from './TypewriterText';

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-heading">
      <div className={styles.art} aria-hidden="true"><div className={styles.ribbon} /></div>
      <div className={styles.container}>
        <h1 id="home-hero-heading" className={styles.heading}><TypewriterText lines={['Grow your business with smarter digital marketing.']} /></h1>
        <p className={styles.lead}>Websites that work. Social media that connects. One team to bring your next chapter to life.</p>
        <p className={styles.description}>We bring strategy, design and development together for startups and growing businesses.</p>
        <div className={styles.actions}>
          <Link href="/contact" className={`${styles.primary} brand-gradient-button hero-button-motion`}>Get started <ArrowRight size={18} aria-hidden="true" /></Link>
          <Link href="/work" className={`${styles.secondary} hero-button-motion`}>Explore our work <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
