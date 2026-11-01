import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import styles from './PlansHero.module.css';
import TypewriterText from './TypewriterText';

const packageLinks = [
  { category: 'website', label: 'Websites & portals' },
  { category: 'mobile', label: 'Mobile apps' },
  { category: 'social', label: 'Social media' },
];

export default function PlansHero() {
  return (
    <section className={styles.hero} aria-labelledby="plans-hero-heading">
      <div className={styles.guides} aria-hidden="true" />
      <div className={styles.band} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.intro}>
          <h1 id="plans-hero-heading" className={styles.heading}><TypewriterText lines={['Clear plans for', 'your next stage.']} /></h1>
          <p className={styles.lead}>Websites, apps and social media. Clear options for what comes next.</p>
          <p className={styles.description}>Choose a package or start with a conversation. We’ll help you find the right fit.</p>
          <Link href="/contact" className={`${styles.contactCta} hero-button-motion`}>Discuss your project <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>

        <article className={styles.packageCard} aria-labelledby="package-options-heading">
          <div className={styles.cardIntro}>
            <h2 id="package-options-heading">Structured packages</h2>
            <p>Find the right starting point for your website, mobile app or social presence. Clear deliverables, with build fees and monthly retainers listed separately.</p>
          </div>
          <nav className={styles.packageLinks} aria-label="Browse packages by service">
            {packageLinks.map(option => <Link key={option.category} href={`/plans?category=${option.category}#packages`}>
              <span>{option.label}</span><ArrowRight size={16} aria-hidden="true" />
            </Link>)}
            <Link href="/plans?category=combined#packages"><span>Website + social</span><ArrowRight size={16} aria-hidden="true" /></Link>
          </nav>
          <Link href="/plans?category=all#packages" className={`${styles.primary} brand-gradient-button hero-button-motion`}>Compare packages <ArrowDown size={17} aria-hidden="true" /></Link>
        </article>
      </div>
    </section>
  );
}
