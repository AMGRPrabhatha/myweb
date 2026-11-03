import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, PanelsTopLeft, MessagesSquare, Rocket } from 'lucide-react';
import styles from './ServicesHero.module.css';
import TypewriterText from './TypewriterText';

export default function ServicesHero() {
  return (
    <section className={styles.hero} aria-labelledby="services-hero-heading">
      <div className={styles.band} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.intro}>
          <h1 id="services-hero-heading" className={styles.heading}><TypewriterText lines={['Build your website.', 'Connect your brand.']} /></h1>
          <p className={styles.description}>Bring your website and social presence together. We combine strategy, design and development to help startups and growing businesses move from idea to launch.</p>
          <div className={styles.actions}>
            <Link href="/contact" className={`${styles.primary} brand-gradient-button hero-button-motion`}>Start a project <ArrowRight size={16} aria-hidden="true" /></Link>
            <a href="#service-disciplines" className={`${styles.secondary} hero-button-motion`}>Explore services <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.tiles} aria-hidden="true">
            <span><PanelsTopLeft size={27} strokeWidth={1.6} /></span>
            <span><MessagesSquare size={27} strokeWidth={1.6} /></span>
            <span><Rocket size={27} strokeWidth={1.6} /></span>
          </div>
          <div className={styles.board}>
            <div className={styles.boardHeader}><p>Your digital presence</p><h2>Designed to work together.</h2></div>
            <Link href="/services/website-development" className={styles.service}>
              <span className={`${styles.icon} ${styles.web}`}><PanelsTopLeft size={22} strokeWidth={1.6} aria-hidden="true" /></span>
              <div><h3>Website development</h3><p>Responsive websites, interfaces and web portals.</p></div>
              <ArrowUpRight size={18} className={styles.serviceArrow} aria-hidden="true" />
            </Link>
            <Link href="/services/social-media-management" className={styles.service}>
              <span className={`${styles.icon} ${styles.social}`}><MessagesSquare size={22} strokeWidth={1.6} aria-hidden="true" /></span>
              <div><h3>Social media strategy</h3><p>Creative content, campaigns and ongoing management.</p></div>
              <ArrowUpRight size={18} className={styles.serviceArrow} aria-hidden="true" />
            </Link>
            <div className={styles.workflow} aria-label="Strategy, creative, launch"><span>Strategy</span><ArrowRight size={14} aria-hidden="true" /><span>Creative</span><ArrowRight size={14} aria-hidden="true" /><span>Launch</span></div>
          </div>
          <p className={styles.caption}>One connected team. From the first conversation to launch.</p>
        </div>
      </div>
    </section>
  );
}
