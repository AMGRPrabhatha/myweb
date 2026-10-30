'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import CategoryFilterBar from './CategoryFilterBar';

interface WorkFilterGridProps {
  initialProjects: Project[];
  initialCategory?: string;
}

export default function WorkFilterGrid({ initialProjects, initialCategory = 'All' }: WorkFilterGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  const categories: Array<{ id: string; label: string }> = [
    { id: 'All', label: 'All Projects' },
    { id: 'Websites', label: 'Websites & Portals' },
    { id: 'UI/UX Design', label: 'UI/UX & Mobile Apps' },
    { id: 'Social Content', label: 'Social Content & Video' },
    { id: 'Combined Projects', label: 'Combined Launch' },
  ];

  const filteredProjects = activeCategory === 'All'
    ? initialProjects
    : initialProjects.filter((p) => {
        if (activeCategory === 'Websites') return p.category === 'Websites' || p.category === 'Web Design';
        if (activeCategory === 'UI/UX Design') return p.category === 'UI/UX Design' || p.category === 'Mobile Apps';
        if (activeCategory === 'Social Content') return p.category === 'Social Content';
        if (activeCategory === 'Combined Projects') return p.category === 'Combined Projects';
        return p.category === activeCategory;
      });

  // Extract modern tags / pills for each project (Ninja Promo style)
  const getProjectPills = (project: Project): string[] => {
    const pillMap: Record<string, string[]> = {
      'devion-ecommerce': ['Web Design', 'Next.js', 'E-Commerce'],
      'velio-ai-chatbot': ['UI/UX Design', 'AI Mobile App', 'Dark Mode'],
      'eatzy-food-delivery': ['Mobile Apps', 'Food Delivery', 'Live GPS'],
      'aura-fintech-launch': ['Fintech', 'Next.js Web', 'Social Reels'],
      'kura-organic-social': ['Social Media', 'Reels', 'TikTok'],
      'verve-telehealth-portal': ['Healthcare', 'Accessibility', 'Supabase'],
      'solaris-energy-social-growth': ['B2B Social', 'Infographics', 'LinkedIn'],
    };

    if (pillMap[project.slug]) {
      return pillMap[project.slug];
    }

    const pills: string[] = [project.category];
    if (project.isConcept) pills.push('Concept Demo');
    return pills;
  };

  // Format meta string (Ninja Promo date & delivery tag)
  const getProjectMeta = (project: Project): { date: string; metaTag: string } => {
    const date = project.publishedAt
      ? new Date(project.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'October 24, 2026';

    const tagMap: Record<string, string> = {
      'devion-ecommerce': '2 Weeks Delivery',
      'velio-ai-chatbot': 'Mobile App Case',
      'eatzy-food-delivery': '3 Weeks Delivery',
      'aura-fintech-launch': 'Combined Launch',
      'kura-organic-social': 'Monthly Retainer',
      'verve-telehealth-portal': '4 Weeks Delivery',
      'solaris-energy-social-growth': 'Monthly Retainer',
    };

    return {
      date,
      metaTag: tagMap[project.slug] || 'Verified Case Study',
    };
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      <CategoryFilterBar
        label="Filter by project type"
        options={categories}
        value={activeCategory}
        onChange={setActiveCategory}
        resultCount={filteredProjects.length}
        resultNoun="project"
      />

      {/* Modern 3-Column Card Grid (Matching Image 1 / Ninja Promo Articles UI) */}
      <div className="mobile-card-rail grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {filteredProjects.map((project) => {
          const pills = getProjectPills(project);
          const { date, metaTag } = getProjectMeta(project);

          return (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group flex flex-col justify-between bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]"
            >
              <div>
                {/* 1. Framed Image Mockup with Clean Rounded Corners */}
                <div className="relative aspect-[16/10] w-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-900 border border-slate-200/80">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Subtle dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* 2. Category Pills Row (Directly below image) */}
                <div className="pt-4 sm:pt-5 flex flex-wrap items-center gap-2">
                  {pills.map((pill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full border border-slate-200 bg-white text-[11px] font-bold uppercase tracking-wider text-slate-700 shadow-2xs group-hover:border-slate-300 transition-colors"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                {/* 3. Bold Card Title */}
                <h3 className="mt-3.5 mb-2 text-lg sm:text-[1.22rem] font-bold text-ink group-hover:text-[#FF5722] transition-colors leading-snug line-clamp-2 tracking-tight">
                  {project.title}
                </h3>

                {/* 4. Concise Summary Description */}
                <p className="text-xs sm:text-sm text-slate-500 font-normal line-clamp-2 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* 5. Bottom Meta Info (Date • Tag) */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <span>{date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{metaTag}</span>
                </div>

                <span className="text-[#FF5722] font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  View →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State fallback */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm font-medium">
            No projects currently matching this filter. Select &quot;All Projects&quot; to browse all case studies.
          </p>
        </div>
      )}

    </div>
  );
}
