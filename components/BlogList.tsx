'use client';

import React, { useState } from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '@/lib/types';
import CategoryFilterBar from './CategoryFilterBar';

interface BlogListProps {
  initialPosts: BlogPost[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'All articles' },
    { id: 'WEB DEVELOPMENT', label: 'Web development' },
    { id: 'SOCIAL STRATEGY', label: 'Social strategy' },
    { id: 'ARCHITECTURE', label: 'Architecture' },
    { id: 'CONTENT & VIDEO', label: 'Content & video' },
    { id: 'MARKET TRENDS', label: 'Market trends' },
    { id: 'SEO & GROWTH', label: 'SEO & growth' },
  ];

  const filteredPosts = selectedCategory === 'ALL'
    ? initialPosts
    : initialPosts.filter(p => p.category.toUpperCase() === selectedCategory.toUpperCase());

  return (
    <div className="space-y-8 sm:space-y-10">
      <CategoryFilterBar
        label="Explore by topic"
        options={categories}
        value={selectedCategory}
        onChange={setSelectedCategory}
        resultCount={filteredPosts.length}
        resultNoun="article"
      />

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="mobile-card-rail grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/80 rounded-[32px] border border-slate-200 p-8 space-y-3">
          <p className="text-slate-500 font-semibold text-sm">
            No articles found in this category right now.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className="px-5 py-2 rounded-full bg-slate-100 text-ink font-bold text-xs hover:bg-slate-200 transition-colors"
          >
            Show All Articles
          </button>
        </div>
      )}
    </div>
  );
}
