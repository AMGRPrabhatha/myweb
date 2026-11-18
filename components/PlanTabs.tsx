'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Clock3, Gift, Globe2, Layers3, Share2, Smartphone } from 'lucide-react';
import { Plan } from '@/lib/types';
import styles from './PlanTabs.module.css';

type Category = 'website' | 'mobile' | 'combined' | 'social' | 'all';

const categories = [
  { id: 'website', label: 'Websites', description: 'Design and development', icon: Globe2 },
  { id: 'mobile', label: 'Mobile apps', description: 'Apps and connected systems', icon: Smartphone },
  { id: 'combined', label: 'Combined bundles', description: 'Build plus social', icon: Gift },
  { id: 'social', label: 'Social media', description: 'Ongoing creative support', icon: Share2 },
  { id: 'all', label: 'All packages', description: 'Browse every option', icon: Layers3 },
] as const;

const belongsTo = (plan: Plan, category: Category) => {
  if (category === 'all') return true;
  if (category === 'combined') return plan.category === 'combined' || Boolean(plan.hasSocialBundle);
  if (plan.category === 'combined' || plan.hasSocialBundle) return false;
  return plan.platform === category || plan.category === category;
};

function withoutMonetaryText(value: string) {
  return value
    .replace(/Special\s+[\d,]+\s+LKR\s+Launch Discount applied\s*\(Was\s+[\d,]+\s+LKR\)/gi, 'Offer')
    .replace(/Save\s+[\d,]+\s+LKR(?:\s+launch offer)?!?/gi, 'Offer')
    .replace(/\b(?:Savings?|Discount) of\s+[\d,.]+k?\s*(?:LKR|USD)\b/gi, 'Offer')
    .replace(/\b(?:Save\s+)?[\d,.]+k?\s*(?:LKR|USD)\s+OFF\b/gi, 'Offer')
    .replace(/Social continues at\s+[\d,]+\s+LKR\/mo after 1st month/gi, 'Social continues after the first month')
    .replace(/(?:≈\s*)?\$\s*[\d,.]+\+?\s*(?:USD)?(?:\/mo|\/month)?/gi, '')
    .replace(/\b[\d,.]+k\s*\/(?:mo|month)\b/gi, '')
    .replace(/\b(?:USD|LKR)\s*[\d,.]+\+?(?:\/mo|\/month)?|\b[\d,.]+k?\+?\s*(?:USD|LKR)\+?(?:\/mo|\/month)?/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export default function PlanTabs({ plans, initialCategory = 'website' }: { plans: Plan[]; initialCategory?: Category }) {
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  const visiblePlans = plans.filter(plan => belongsTo(plan, activeCategory));
  const active = categories.find(category => category.id === activeCategory)!;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Package categories">
        <h2>Find the right starting point.</h2>
        <p className={styles.sidebarIntro}>Choose a service to see its scope and what is included.</p>
        <nav className={styles.categoryList} aria-label="Package categories" tabIndex={0}>
          {categories.map(category => {
            const Icon = category.icon;
            const selected = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                className={`${styles.categoryButton} ${selected ? styles.categoryActive : ''}`}
                aria-current={selected ? 'true' : undefined}
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon size={19} aria-hidden="true" />
                <span className={styles.categoryCopy}><strong>{category.label}</strong><small>{category.description}</small></span>
                <span className={styles.categoryCount}>{plans.filter(plan => belongsTo(plan, category.id)).length}</span>
              </button>
            );
          })}
        </nav>
        <div className={styles.sidebarHelp}>
          <strong>Have a specific project?</strong>
          <p>Tell us what you need and we’ll shape a proposal around it.</p>
          <Link href="/contact">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </aside>

      <div className={styles.results}>
        <div className={styles.resultsHeader}>
          <div>
            <h2>{active.label}</h2>
            <p>{active.description}. Clear deliverables and ownership from day one.</p>
          </div>
          <span className={styles.resultsCount}>{visiblePlans.length} {visiblePlans.length === 1 ? 'package' : 'packages'}</span>
        </div>

        <div className={styles.planList} tabIndex={0} aria-label="Available packages, swipe to see more">
          {visiblePlans.map(plan => {
            const bundle = plan.category === 'combined' || Boolean(plan.hasSocialBundle);
            const subtitle = withoutMonetaryText(plan.subtitle);
            const inclusions = plan.inclusions.map(withoutMonetaryText).filter(Boolean);
            return (
              <article key={plan.id} className={styles.planCard}>
                <div className={styles.planTop}>
                  <div className={styles.planHeading}>
                    <div className={styles.badges}>
                      {bundle && <span className={styles.bundleBadge}><Gift size={14} aria-hidden="true" /> Offer</span>}
                      {plan.scopeType && <span className={styles.scopeBadge}>{plan.scopeType === 'frontend' ? 'Front-end' : 'Full-stack'}</span>}
                      {plan.pageCount && <span className={styles.scopeBadge}>{plan.pageCount}</span>}
                    </div>
                    <h3>{withoutMonetaryText(plan.title)}</h3>
                    {subtitle && <p>{subtitle}</p>}
                  </div>
                </div>

                <div className={styles.included}>
                  <p className={styles.includedLabel}>What’s included</p>
                  <ul>{inclusions.map((item, index) => <li key={index}><Check size={15} aria-hidden="true" />{item}</li>)}</ul>
                </div>

                <div className={styles.planFooter}>
                  <div className={styles.planMeta}>
                    {plan.turnaroundTime && <span><Clock3 size={16} aria-hidden="true" /> {plan.turnaroundTime}</span>}
                    {plan.revisions && <span>{plan.revisions}</span>}
                  </div>
                  <Link href={`/contact?plan=${plan.slug}&service=${bundle ? 'both' : plan.platform || plan.category}`} className={styles.selectLink}>
                    Select package <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>
                {bundle && <p className={styles.bundleNote}>After the first month, social media management continues. Cancel anytime.</p>}
              </article>
            );
          })}
        </div>

        <div className={styles.ownershipNote}>
          <strong>Built for full ownership.</strong> Your agreed deliverables and assets are handed over at the agreed milestone. Third-party hosting and service costs are scoped separately.
        </div>
      </div>
    </div>
  );
}
