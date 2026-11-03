'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Testimonial } from '@/lib/types';
import { saveTestimonialAction, deleteTestimonialAction } from '@/lib/actions';
import TestimonialCard from '@/components/TestimonialCard';
import { cleanupTestimonialImage, testimonialImagePath, uploadTestimonialImage } from '@/lib/testimonial-image-upload-client';
import {
  ArrowLeft,
  Save,
  Trash2,
  CheckCircle2,
  Loader2,
  Sparkles,
  Building,
  User,
  Star,
  Quote,
  Image as ImageIcon,
  Eye,
} from 'lucide-react';

interface TestimonialEditorProps {
  initialTestimonial?: Testimonial;
  isNew?: boolean;
}

const PRESET_IMAGES = [
  {
    label: 'EV Mobility App',
    url: '/images/projects/dribbble-devion.png',
  },
  {
    label: 'Food Delivery UI',
    url: '/images/projects/dribbble-eatzy.png',
  },
  {
    label: 'Fintech Portal',
    url: '/images/projects/dribbble-fintech.png',
  },
  {
    label: 'Clean Workspace Studio',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Tech Meeting & Strategy',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'E-commerce Modern Store',
    url: 'https://images.unsplash.com/photo-1556742049-0a67e5572248?auto=format&fit=crop&w=800&q=80',
  },
];

const CATEGORIES: ('Website Development' | 'Social Media' | 'Combined Delivery')[] = [
  'Combined Delivery',
  'Website Development',
  'Social Media',
];

export default function TestimonialEditor({
  initialTestimonial,
  isNew = false,
}: TestimonialEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const stagedUpload = useRef<{ path: string; url: string }>();
  const testimonialId = useRef(initialTestimonial?.id || `test-${crypto.randomUUID()}`);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);
  useEffect(() => () => { if (stagedUpload.current) void cleanupTestimonialImage(stagedUpload.current.path); }, []);

  // Form State
  const [companyName, setCompanyName] = useState(initialTestimonial?.companyName || '');
  const [companySubtitle, setCompanySubtitle] = useState(
    initialTestimonial?.companySubtitle || ''
  );
  const [clientName, setClientName] = useState(initialTestimonial?.clientName || '');
  const [clientRole, setClientRole] = useState(initialTestimonial?.clientRole || '');
  const [serviceCategory, setServiceCategory] = useState<
    'Website Development' | 'Social Media' | 'Combined Delivery'
  >(initialTestimonial?.serviceCategory || 'Combined Delivery');
  const [highlightKpi, setHighlightKpi] = useState(
    initialTestimonial?.highlightKpi || '+180% Lead Conversion Rate'
  );
  const [quote, setQuote] = useState(initialTestimonial?.quote || '');
  const [fullReview, setFullReview] = useState(
    initialTestimonial?.fullReview || ''
  );
  const [rating, setRating] = useState(initialTestimonial?.rating || 5);
  const [imageUrl, setImageUrl] = useState(
    initialTestimonial?.videoThumbnail || PRESET_IMAGES[0].url
  );

  const currentTestimonial: Testimonial = {
    id: testimonialId.current,
    companyName: companyName || 'Company Name',
    companySubtitle: companySubtitle || 'Industry, Market & Location',
    clientName: clientName || 'Client Name',
    clientRole: clientRole || 'Title, e.g. Founder & CEO',
    serviceCategory: serviceCategory,
    highlightKpi: highlightKpi || '+150% Performance KPI',
    quote:
      quote ||
      'Design1X delivered outstanding engineering and creative strategy for our platform.',
    fullReview: fullReview || quote,
    videoDuration: initialTestimonial?.videoDuration,
    companyLogo: initialTestimonial?.companyLogo,
    rating: rating,
    videoThumbnail: previewUrl || imageUrl,
    publicationStatus: initialTestimonial?.publicationStatus ?? 'published',
  };

  const chooseImageUrl = (url: string) => {
    if (stagedUpload.current && stagedUpload.current.url !== url) {
      void cleanupTestimonialImage(stagedUpload.current.path);
      stagedUpload.current = undefined;
    }
    setImageUrl(url);
    setUploadError('');
    setPreviewUrl('');
  };

  const handleImageFile = async (file?: File) => {
    if (!file) return;
    setUploadError('');
    setSaveError('');
    setUploading(true);
    setPreviewUrl(URL.createObjectURL(file));
    try {
      const uploaded = await uploadTestimonialImage(file);
      const previous = stagedUpload.current;
      stagedUpload.current = uploaded;
      setImageUrl(uploaded.url);
      setPreviewUrl('');
      if (previous) void cleanupTestimonialImage(previous.path);
    } catch (error) {
      setPreviewUrl('');
      setUploadError(error instanceof Error ? error.message : 'Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (uploading) return;
    setSaveError('');
    if (uploadError) {
      setSaveError('The image upload failed. Choose another file or select an image URL before saving.');
      return;
    }
    if (!companyName.trim()) {
      alert('Please enter a Company Name.');
      return;
    }
    if (!clientName.trim()) {
      alert('Please enter the Client Name.');
      return;
    }
    if (!quote.trim()) {
      alert('Please enter a client quote.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await saveTestimonialAction({ ...currentTestimonial, videoThumbnail: imageUrl });
        if (res.success) {
          const oldPath = initialTestimonial && initialTestimonial.videoThumbnail !== imageUrl
            ? testimonialImagePath(initialTestimonial.videoThumbnail)
            : null;
          if (oldPath) void cleanupTestimonialImage(oldPath);
          stagedUpload.current = undefined;
          setSaveSuccess(true);
          setTimeout(() => {
            setSaveSuccess(false);
            router.push('/admin/testimonials');
            router.refresh();
          }, 1200);
        } else {
          setSaveError(res.error || 'Could not save testimonial. Please try again.');
        }
      } catch {
        setSaveError('Could not save testimonial. Please check your connection and try again.');
      }
    });
  };

  const handleDelete = () => {
    if (!initialTestimonial?.id) return;
    if (confirm(`Are you sure you want to delete the testimonial from "${initialTestimonial.companyName}"?`)) {
      startTransition(async () => {
        try {
          const result = await deleteTestimonialAction(initialTestimonial.id);
          if (!result.success) {
            setSaveError(result.error || 'Could not delete testimonial.');
            return;
          }
          const path = testimonialImagePath(initialTestimonial.videoThumbnail);
          if (path) void cleanupTestimonialImage(path);
          router.push('/admin/testimonials');
          router.refresh();
        } catch {
          setSaveError('Could not delete testimonial. Please try again.');
        }
      });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn pb-16">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-300">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/testimonials"
            className="w-9 h-9 rounded-xl bg-white hover:bg-warm-100 border border-warm-300 flex items-center justify-center text-ink hover:text-cobalt transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
              {isNew ? 'Add Client Testimonial' : `Edit: ${initialTestimonial?.companyName}`}
            </h1>
            <p className="text-xs text-ink-500">
              Manage client quote, company details, KPI badge, and showcase card image.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {!isNew && initialTestimonial && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending || uploading}
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
              title="Delete Testimonial"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isPending || uploading}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl brand-solid-button font-bold text-xs tracking-tight shadow-sm transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {isPending || uploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{uploading ? 'Uploading...' : 'Saving...'}</span>
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Testimonial</span>
              </>
            )}
          </button>
        </div>
      </div>

      {saveError && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">{saveError}</p>}

      {/* Main 2-Column Split: Left Editor, Right Live Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Company & Client Info */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-warm-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-600">
              <Building className="w-4 h-4 text-cobalt" />
              <span>Company &amp; Project Info</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyName" className="block text-xs font-bold text-ink-600 mb-1">
                  Company / Brand Name <span className="text-[#FF5722]">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. NIO Mobility"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink focus:outline-none focus:border-[#FF5722] font-bold"
                />
              </div>

              <div>
                <label htmlFor="serviceCategory" className="block text-xs font-bold text-ink-600 mb-1">
                  Service Category <span className="text-[#FF5722]">*</span>
                </label>
                <select
                  id="serviceCategory"
                  value={serviceCategory}
                  onChange={(e) =>
                    setServiceCategory(
                      e.target.value as 'Website Development' | 'Social Media' | 'Combined Delivery'
                    )
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink bg-warm-50 focus:bg-white focus:outline-none focus:border-[#FF5722] cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="companySubtitle" className="block text-xs font-bold text-ink-600 mb-1">
                Company Subtitle / Stats
              </label>
              <input
                type="text"
                id="companySubtitle"
                value={companySubtitle}
                onChange={(e) => setCompanySubtitle(e.target.value)}
                placeholder="e.g. Electric EV platform, $12M revenue, 320K users"
                className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink focus:outline-none focus:border-[#FF5722]"
              />
            </div>
          </div>

          {/* 2. Client Person Details */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-warm-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-600">
              <User className="w-4 h-4 text-cobalt" />
              <span>Client Reviewer</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="clientName" className="block text-xs font-bold text-ink-600 mb-1">
                  Client Full Name <span className="text-[#FF5722]">*</span>
                </label>
                <input
                  type="text"
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Tim Noort"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label htmlFor="clientRole" className="block text-xs font-bold text-ink-600 mb-1">
                  Role &amp; Title
                </label>
                <input
                  type="text"
                  id="clientRole"
                  value={clientRole}
                  onChange={(e) => setClientRole(e.target.value)}
                  placeholder="e.g. Head of Digital Growth"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink focus:outline-none focus:border-[#FF5722]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ratingSelect" className="block text-xs font-bold text-ink-600 mb-1">
                Star Rating
              </label>
              <select
                id="ratingSelect"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink bg-warm-50 focus:bg-white focus:outline-none focus:border-[#FF5722] cursor-pointer"
              >
                <option value={5}>5 Stars (★★★★★)</option>
                <option value={4}>4 Stars (★★★★☆)</option>
                <option value={3}>3 Stars (★★★☆☆)</option>
              </select>
            </div>
          </div>

          {/* 3. Quote */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-warm-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-600">
              <Quote className="w-4 h-4 text-cobalt" />
              <span>Client Quote &amp; Review</span>
            </div>

            <div>
              <label htmlFor="testimonialQuote" className="block text-xs font-bold text-ink-600 mb-1">
                Card Quote <span className="text-[#FF5722]">*</span>
              </label>
              <textarea
                id="testimonialQuote"
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="I'm really happy we're now working together. Design1X's clear plan made it clear from the start that they understood our business and could deliver results."
                className="w-full p-3.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink focus:outline-none focus:border-[#FF5722] leading-relaxed"
              />
            </div>
          </div>

          {/* 4. Showcase Card Image */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-warm-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-600">
              <ImageIcon className="w-4 h-4 text-[#FF5722]" />
              <span>Card Showcase Image (No video)</span>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-xs font-bold text-ink-600 mb-1">
                Image URL (Screenshot or Photo)
              </label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                disabled={uploading}
                onChange={(e) => chooseImageUrl(e.target.value)}
                placeholder="/images/projects/dribbble-devion.png"
                className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink font-mono focus:outline-none focus:border-[#FF5722]"
              />
            </div>

            <div>
              <label htmlFor="testimonialImageFile" className="block text-xs font-bold text-ink-600 mb-1">
                Upload Image / Choose File
              </label>
              <input
                id="testimonialImageFile"
                type="file"
                disabled={uploading}
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => void handleImageFile(e.target.files?.[0])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 text-xs sm:text-sm text-ink bg-warm-50 file:mr-3 file:border-0 file:rounded-lg file:bg-white file:px-3 file:py-1.5 file:font-bold file:text-cobalt"
              />
              <p className="mt-1 text-[11px] text-ink-500">PNG, JPEG or WebP · 10 MB maximum</p>
              {uploadError && <p role="alert" className="mt-1 text-xs text-rose-700">{uploadError}</p>}
              {uploading && <p role="status" className="mt-1 text-xs text-cobalt">Uploading image...</p>}
            </div>

            {/* Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-ink-500">Quick Image Presets:</span>
              <div className="flex flex-wrap gap-2">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    disabled={uploading}
                    onClick={() => chooseImageUrl(preset.url)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      imageUrl === preset.url
                        ? 'brand-solid-button border-[#6556ed]'
                        : 'bg-warm-50 hover:bg-warm-100 text-ink-700 border-warm-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Live Card Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Eye className="w-4 h-4 text-cobalt" />
            <span>Live Card Preview (Exact Same UI)</span>
          </div>

          {/* Testimonial Card Preview */}
          <div className="max-w-md mx-auto">
            <TestimonialCard testimonial={currentTestimonial} />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 text-slate-600 text-xs space-y-1">
            <div className="font-bold text-ink">Preview Note:</div>
            <p>
              This preview matches the exact liquid glass styling rendered on the public{' '}
              <Link href="/testimonials" target="_blank" className="text-cobalt underline">
                /testimonials
              </Link>{' '}
              page, with zero video controls and pure static image display.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
