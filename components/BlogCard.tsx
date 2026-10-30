'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative bg-white/95 backdrop-blur-xl rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_-12px_rgba(255,87,34,0.12)] hover:-translate-y-1.5 hover:border-[#FF5722]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Dynamic Liquid Glass Shade on Hover */}
      <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] bg-gradient-to-tr from-[#FF5722]/[0.08] via-cobalt/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Featured Image with Floating Category Pill (Matching Nexca UI) */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

          {/* Floating Category Pill in top-left */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/70 shadow-sm text-[10px] font-extrabold uppercase tracking-wider text-ink flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-[#FF5722]" />
            <span>{post.category}</span>
          </div>
        </div>

        {/* Date & Reading Time Meta Row */}
        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{post.publishedAt}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>{post.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-ink group-hover:text-[#FF5722] transition-colors tracking-tight leading-snug line-clamp-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* Bottom Action Row: Read Article ↗ + BookOpen Icon */}
      <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ink group-hover:text-[#FF5722] transition-colors"
        >
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#FF5722] group-hover:bg-orange-50 transition-colors">
          <BookOpen className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
}
