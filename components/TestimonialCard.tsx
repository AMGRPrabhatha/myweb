import Image from 'next/image';
import { Star } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import styles from './TestimonialCard.module.css';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = Math.max(0, Math.min(5, Math.round(testimonial.rating || 0)));

  return (
    <article className={styles.card}>
      <div className={styles.image}>
        <Image
          src={testimonial.videoThumbnail}
          alt={`${testimonial.companyName} showcase`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
      </div>

      <span className={styles.category}>{testimonial.serviceCategory}</span>
      <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>

      <div className={styles.footer}>
        <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: rating }, (_, index) => <Star key={index} size={12} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />)}
        </div>
        <p className={styles.client}>{testimonial.clientName}</p>
        <p className={styles.role}>{testimonial.clientRole} · {testimonial.companyName}</p>
        <p className={styles.company}>{testimonial.companySubtitle}</p>
      </div>
    </article>
  );
}
