'use client';

import { SlidersHorizontal } from 'lucide-react';
import styles from './CategoryFilterBar.module.css';

interface CategoryFilterBarProps {
  label: string;
  options: ReadonlyArray<{ id: string; label: string }>;
  value: string;
  onChange: (category: string) => void;
  resultCount: number;
  resultNoun: string;
}

export default function CategoryFilterBar({
  label,
  options,
  value,
  onChange,
  resultCount,
  resultNoun,
}: CategoryFilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.header}>
        <p className={styles.label}>
          <SlidersHorizontal size={15} aria-hidden="true" />
          {label}
        </p>
        <p className={styles.result} role="status" aria-atomic="true">
          <span className={styles.count}>{resultCount}</span>
          {resultNoun}{resultCount === 1 ? '' : 's'}
        </p>
      </div>

      <div className={styles.scroll} tabIndex={0} aria-label={`${label}, swipe to see more filters`}>
        <div className={styles.options} role="group" aria-label={label}>
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={styles.option}
              aria-pressed={value === option.id}
              onClick={() => onChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
