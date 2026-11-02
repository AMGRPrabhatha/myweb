import Link from 'next/link';
import { ArrowUpRight, PanelsTopLeft, MessagesSquare } from 'lucide-react';
import styles from './WorkPrinciples.module.css';

export default function WorkPrinciples() {
  return (
    <section className={styles.section} aria-labelledby="work-principles-heading">
      <div className={styles.container}>
        <div className={styles.intro}>
          <h2 id="work-principles-heading">What shapes every project.</h2>
        </div>
        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.web}`}>
            <div className={styles.webMark} aria-hidden="true">D1X</div>
            <p className={styles.statement}>A good website makes the complex feel simple.</p>
            <div className={styles.cardFooter}>
              <div className={styles.cardIdentity}>
                <span className={styles.icon}><PanelsTopLeft size={23} strokeWidth={1.7} aria-hidden="true" /></span>
                <div><strong>Website development</strong><span>Clear interfaces, built for real people.</span></div>
              </div>
              <Link href="/services/website-development" className={styles.cardLink} aria-label="Explore website development">
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            </div>
          </article>
          <article className={`${styles.card} ${styles.social}`}>
            <p className={styles.statement}>Social content should sound like your brand.</p>
            <div className={styles.cardFooter}>
              <div className={styles.cardIdentity}>
                <span className={styles.icon}><MessagesSquare size={23} strokeWidth={1.7} aria-hidden="true" /></span>
                <div><strong>Social media strategy</strong><span>Creative with a clear purpose.</span></div>
              </div>
              <Link href="/services/social-media-management" className={styles.cardLink} aria-label="Explore social media strategy">
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
