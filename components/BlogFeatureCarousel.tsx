'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import styles from './BlogFeatureCarousel.module.css';

export default function BlogFeatureCarousel({ posts }: { posts: BlogPost[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const swiped = useRef(false);

  if (posts.length === 0) return null;

  const active = posts[activeIndex];
  const ordered = posts.map((_, offset) => posts[(activeIndex + offset) % posts.length]);
  const move = (step: number) => setActiveIndex(index => (index + step + posts.length) % posts.length);

  return (
    <section className={styles.section} aria-labelledby="featured-articles-heading" aria-roledescription="carousel">
      <div className={styles.header}>
        <div>
          <h2 id="featured-articles-heading">Ideas worth exploring.<span> The latest in tech and digital.</span></h2>
        </div>
        {posts.length > 1 && <div className={styles.controls}>
          <button type="button" onClick={() => move(-1)} aria-label="Previous article"><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next article"><ArrowRight size={20} aria-hidden="true" /></button>
        </div>}
      </div>

      <div
        className={styles.viewport}
        onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={event => {
          if (touchStart.current === null) return;
          const distance = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(distance) > 45) {
            swiped.current = true;
            move(distance < 0 ? 1 : -1);
            window.setTimeout(() => { swiped.current = false; }, 300);
          }
          touchStart.current = null;
        }}
        onTouchCancel={() => { touchStart.current = null; }}
        onClickCapture={event => { if (swiped.current) { event.preventDefault(); swiped.current = false; } }}
      >
        <div key={active.id} className={styles.track}>
          {ordered.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`${styles.slide} ${index === 0 ? styles.featured : styles.preview}`}
              aria-label={`Read ${post.title}`}
            >
              <Image src={post.coverImage} alt={post.title} fill sizes={index === 0 ? '(max-width: 768px) 90vw, 65vw' : '20vw'} className={styles.image} />
              {index === 0 && <span className={styles.imageLabel}>{post.category}</span>}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.details} aria-live="polite">
        <div>
          <p className={styles.meta}>{active.category} · {active.readTime}</p>
          <h3>{active.title}</h3>
          <p className={styles.excerpt}>{active.excerpt}</p>
        </div>
        <Link href={`/blog/${active.slug}`} className={styles.readLink}>Read article <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
