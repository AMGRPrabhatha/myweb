'use client';

import React, { useState } from 'react';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '@/lib/types';
import CategoryFilterBar from './CategoryFilterBar';
import styles from './TestimonialsList.module.css';

interface TestimonialsListProps {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsList({ initialTestimonials }: TestimonialsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Reviews');

  const categories = ['All Reviews', 'Combined Delivery', 'Website Development', 'Social Media'];

  const filteredTestimonials = selectedCategory === 'All Reviews'
    ? initialTestimonials
    : initialTestimonials.filter(t => t.serviceCategory.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-8 sm:space-y-10">
      <CategoryFilterBar
        label="Filter by service"
        options={categories.map((category) => ({ id: category, label: category }))}
        value={selectedCategory}
        onChange={setSelectedCategory}
        resultCount={filteredTestimonials.length}
        resultNoun="review"
      />

      <div className={styles.gallery} tabIndex={0} aria-label="Client reviews, swipe to see more">
        {filteredTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
        {filteredTestimonials.length === 0 && <p className="px-6 py-12 text-sm text-slate-500">No reviews in this category yet.</p>}
      </div>
    </div>
  );
}
