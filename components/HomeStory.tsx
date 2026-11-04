'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PanelsTopLeft, MessagesSquare, Layers3 } from 'lucide-react';
import styles from './HomeStory.module.css';

const stories = [
  { type: 'people', label: 'Our people', title: 'Different skills. One shared direction.', description: 'Based in Colombo, Sri Lanka, we bring website development and social strategy together.', href: '/about', action: 'Get to know us' },
  { type: 'build', label: 'Our craft', title: 'Thoughtful design, built to work.', description: 'We turn business ideas into websites and interfaces that are clear, responsive and easy to use.', href: '/services/website-development', action: 'Explore our approach' },
  { type: 'connect', label: 'Our perspective', title: 'A brand is more than a website.', description: 'Social content and creative campaigns carry your story into the places your customers spend time.', href: '/services/social-media-management', action: 'See how we connect' },
  { type: 'together', label: 'Our process', title: 'Good work starts with a conversation.', description: 'Clear scopes, direct communication and transparent milestones keep us moving in the same direction.', href: '/about#about-company', action: 'Read our story' },
];

export default function HomeStory() {
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = storyRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    section.classList.add(styles.motionReady);
    if (!('IntersectionObserver' in window)) {
      section.classList.add(styles.motionVisible);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      section.classList.add(styles.motionVisible);
      observer.disconnect();
    }, { threshold: 0.18 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={storyRef} className={styles.story} aria-labelledby="our-story-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div><h2 id="our-story-heading">A shared idea.<br />A connected way of working.</h2></div>
            <p>We’re Design1X. We help startups and growing businesses bring their website, content and digital presence together.</p>
          </div>
          <div className={`${styles.grid} mobile-card-rail`} tabIndex={0} aria-label="Our story cards, swipe to see more">
            {stories.map(story => <article className={styles.card} key={story.type}>
              <Link href={story.href} className={`${styles.poster} ${styles[story.type]}`} aria-label={story.action}>
                {story.type === 'people' ? <Image src="/images/agency-team-collab.jpg" alt="People exchanging ideas around a table" fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 300px" className={styles.photo} /> : <div className={styles.graphic} aria-hidden="true">
                  {story.type === 'build' && <><div className={styles.window}><i /><i /><i /><div /><div /><div /></div><PanelsTopLeft size={90} strokeWidth={1} /></>}
                  {story.type === 'connect' && <><div className={styles.bubble} /><div className={styles.bubble} /><MessagesSquare size={100} strokeWidth={1} /></>}
                  {story.type === 'together' && <><div className={styles.orbit} /><div className={styles.orbit} /><Layers3 size={100} strokeWidth={1} /></>}
                </div>}
                <div className={styles.posterCaption}><span>{story.label}</span><strong>{story.type === 'people' ? 'Design1X' : story.type === 'build' ? 'Build.' : story.type === 'connect' ? 'Connect.' : 'Together.'}</strong></div>
              </Link>
              <h3>{story.title}</h3><p>{story.description}</p>
              <Link className={styles.storyLink} href={story.href}>{story.action} <ArrowRight size={16} aria-hidden="true" /></Link>
            </article>)}
          </div>
        </div>
      </section>

      <section className={styles.next} aria-labelledby="next-chapter-heading">
        <div className={styles.container}>
          <h2 id="next-chapter-heading" className={styles.nextHeading}>Your next chapter starts here.</h2>
          <div className={`${styles.panels} mobile-card-rail`} tabIndex={0} aria-label="Next steps, swipe to see more">
            <article className={`${styles.panel} ${styles.projectPanel}`}>
              <div className={styles.panelArt} aria-hidden="true" />
              <div className={styles.panelCopy}><h3>Bring us your next idea.</h3><p>Tell us what you’re building. We’ll help shape the scope, connect the right services and plan a clear path to launch.</p><Link href="/contact" className={styles.storyLink}>Start your project brief <ArrowRight size={17} aria-hidden="true" /></Link></div>
            </article>
            <article className={`${styles.panel} ${styles.plansPanel}`}>
              <div className={styles.panelArt} aria-hidden="true" />
              <div className={styles.panelCopy}><h3>A plan that fits your business.</h3><p>Explore website builds, social retainers and combined packages with clear deliverables and transparent milestones.</p><Link href="/plans" className={styles.storyLink}>Explore our plans <ArrowRight size={17} aria-hidden="true" /></Link></div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
