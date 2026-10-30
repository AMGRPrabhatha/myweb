import Link from 'next/link';
import { ArrowDown, ArrowRight, Check } from 'lucide-react';
import styles from './PlansHero.module.css';

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
        <p className={styles.eyebrow}>Plans & pricing</p>
        <h1 id="plans-hero-heading" className={styles.heading}>Clear plans for<br />your next stage.</h1>

        <div className={styles.cards}>
          <article className={styles.packageCard} aria-labelledby="package-options-heading">
            <div className={styles.copy}>
              <h2 id="package-options-heading">Structured packages</h2>
              <p>Find the right starting point for your website, mobile app or social presence. Clear deliverables, with build fees and monthly retainers listed separately.</p>
              <Link href="/plans?category=all#packages" className={`${styles.primary} brand-gradient-button`}>Compare packages <ArrowDown size={16} aria-hidden="true" /></Link>
            </div>
            <nav className={styles.packageLinks} aria-label="Browse packages by service">
              {packageLinks.map(option => <Link key={option.category} href={`/plans?category=${option.category}#packages`}>
                <span>{option.label}</span><ArrowRight size={16} aria-hidden="true" />
              </Link>)}
              <Link href="/plans?category=combined#packages"><span>Website + social</span><ArrowRight size={16} aria-hidden="true" /></Link>
            </nav>
          </article>

          <article className={styles.customCard} aria-labelledby="custom-proposal-heading">
            <div className={styles.copy}>
              <h2 id="custom-proposal-heading">Custom proposal</h2>
              <p>Have something more specific in mind? Tell us your goals and we’ll shape the services, scope and milestones around your business.</p>
              <Link href="/contact" className={styles.customCta}>Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <ul className={styles.features}>
              {['Tailored deliverables', 'Transparent milestones', 'Web + social coordination', 'Full asset ownership'].map(feature => <li key={feature}><Check size={15} aria-hidden="true" /><span>{feature}</span></li>)}
            </ul>
          </article>
        </div>
        <p className={styles.note}>Choose a package or start with a conversation. We’ll help you find the right fit.</p>
      </div>
    </section>
  );
}
