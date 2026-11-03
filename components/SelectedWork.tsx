'use client';


import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface SelectedWorkProps {
  projects?: Project[];
}

export default function SelectedWork({ projects = [] }: SelectedWorkProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All Projects');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const projectList = useMemo(() => {
    const list = [...projects];
    return list.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  }, [projects]);

  const categories = [
    'All Projects',
    'Branding',
    'UI/UX Design',
    'Web Design',
    'Mobile Apps',
  ];

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Projects') {
      return projectList;
    }
    return projectList.filter((p) => {
      const cat = p.category as string;
      if (cat === activeCategory) return true;
      if (activeCategory === 'Web Design' && (cat === 'Websites' || cat === 'Web Design')) return true;
      if (activeCategory === 'UI/UX Design' && (cat === 'UI/UX Design' || cat === 'Websites')) return true;
      if (activeCategory === 'Mobile Apps' && (cat === 'Mobile Apps' || cat === 'Combined Projects')) return true;
      if (activeCategory === 'Branding' && (cat === 'Combined Projects' || cat === 'Social Content')) return true;
      return false;
    });
  }, [projectList, activeCategory]);

  // Show only latest projects (3 items per view)
  const pageSize = 3;
  const maxIndex = Math.max(0, filteredProjects.length - pageSize);
  const displayedProjects = filteredProjects.slice(currentIndex, currentIndex + pageSize);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  return (
    <section className="relative bg-white text-ink py-16 sm:py-24 overflow-hidden">
      
      {/* Subtle Background Radial Grid on White */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#151B25 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* ========================================================= */}
        {/* 1. SECTION HEADER: Headline Left + Description Right      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start justify-between">
          {/* Left: Headline */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-ink tracking-tight leading-[1.08]">
              Our Work,<br />
              <span className="text-ink">Your Growth</span>
            </h2>
          </div>

          {/* Right: Paragraph */}
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-sm sm:text-base text-ink-600 font-normal leading-relaxed max-w-md">
              Discover the projects we’ve crafted with passion and precision—each designed to deliver real business impact.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. CATEGORY PILLS BAR + "VIEW MORE PROJECTS" ACTION       */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Filter Pills (Scrollable on small screens) */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none flex-1" tabIndex={0} aria-label="Project categories, swipe to see more">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`whitespace-nowrap px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] ${
                    isActive
                      ? 'bg-ink text-white shadow-md scale-[1.02]'
                      : 'bg-warm-100 text-ink-700 hover:text-ink hover:bg-warm-200/80 border border-warm-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Action Row: Prev / Next Controls + View More Projects Button */}
          <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
            {/* Slider Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous projects"
                className={`w-10 h-10 rounded-full border border-warm-300 flex items-center justify-center transition-all ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed text-warm-400'
                    : 'text-ink hover:bg-warm-100 hover:border-warm-400'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next projects"
                className={`w-10 h-10 rounded-full border border-warm-300 flex items-center justify-center transition-all ${
                  currentIndex >= maxIndex
                    ? 'opacity-30 cursor-not-allowed text-warm-400'
                    : 'text-ink hover:bg-warm-100 hover:border-warm-400'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* "View More Projects" Button (Moved above cards) */}
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full brand-gradient-button text-ink font-bold text-xs sm:text-sm tracking-tight transition-all shadow-md shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]"
            >
              <span>View More Projects</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. LATEST PROJECTS DISPLAY (3-Card Showcase Grid)         */}
        {/* ========================================================= */}
        <div className="mobile-card-rail grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProjects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] rounded-[30px]"
            >
              {/* Card Preview Mockup */}
              <div className="relative w-full aspect-[16/11] sm:aspect-[4/3] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-warm-100 border border-warm-300 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:border-warm-400">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Meta & Circular Arrow Button */}
              <div className="mt-5 flex items-start justify-between gap-4 px-1">
                <div className="space-y-1 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-ink group-hover:text-[#FF5722] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-600 font-normal line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Circular Arrow Button (matching Dribbble screenshot) */}
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-warm-300 text-ink flex items-center justify-center group-hover:bg-[#4b26df] group-hover:text-white group-hover:border-[#4b26df] transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State fallback */}
        {displayedProjects.length === 0 && (
          <div className="py-12 text-center text-ink-500 text-sm">
            No projects in this category yet. Click &quot;All Projects&quot; to view our portfolio.
          </div>
        )}

      </div>

    </section>
  );
}
