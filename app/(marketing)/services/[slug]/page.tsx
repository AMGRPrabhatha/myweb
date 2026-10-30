import ServiceDetailContent from '@/components/ServiceDetailContent';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

const serviceData: Record<string, {
  title: string;
  categoryPill: string;
  tagline: string;
  description: string;
  deliverables: string[];
  responsibilities: { agency: string[]; client: string[] };
  process: string[];
  exclusions: string[];
  preselectedService: 'website' | 'social';
  suggestedPlanSlug: string;
}> = {
  'website-development': {
    title: 'Website Development & Web Portals',
    categoryPill: 'Engineering & Interface Architecture',
    tagline: 'Modern, accessible, search-ready websites built with Next.js App Router and Supabase.',
    description: 'We design and develop high-performance marketing websites and administrative portals tailored specifically for early-stage startups and established small businesses. Every site includes semantic markup, mobile-first design, database lead capture, and a clean administrative interface.',
    deliverables: [
      'Responsive multi-page layout built on Next.js 14 App Router and TypeScript',
      'Supabase PostgreSQL database configuration with Row Level Security (RLS)',
      'Protected staff administration panel for lead triage, project updates, and site settings',
      'Server-validated contact forms with duplicate submission prevention and email alerts',
      'WCAG 2.2 AA accessibility standards, visible keyboard focus, and reduced-motion support',
      'Automated sitemap.xml, robots.txt, canonical metadata, and Open Graph share previews',
      'Full deployment to commercial hosting infrastructure and custom domain DNS setup',
      'Complete repository handover, database migrations, and staff training walk-through'
    ],
    responsibilities: {
      agency: [
        'Full UI engineering, component styling, and database schema migrations',
        'Mobile, tablet, and desktop cross-browser visual verification',
        'Setting up secure Server Actions and privileged credential boundaries',
        'Performance optimization achieving sub-second mobile Core Web Vitals'
      ],
      client: [
        'Supply approved business logo, branding guidelines, and photography assets',
        'Provide or review written copy for key pages (About, Services, Team)',
        'Maintain commercial ownership of domain name and third-party hosting accounts'
      ]
    },
    process: [
      'Discovery & Information Architecture: confirming required pages, user tasks, and conversion points',
      'Wireframing & Interface Prototyping: reviewing desktop and mobile navigation layouts',
      'Next.js & Supabase Engineering: component development, database integration, and RLS policies',
      'Staging Review & Form Testing: validating lead capture, email alerts, and accessibility standards',
      'Production Launch & Handover: DNS record mapping, SSL verification, and staff handover'
    ],
    exclusions: [
      'Ongoing monthly social content creation (handled under our Social plans)',
      'Third-party domain registration and database hosting fees (paid direct to providers)',
      'Complex custom ecommerce payment gateways (quoted as a separate milestone phase)'
    ],
    preselectedService: 'website',
    suggestedPlanSlug: 'launch-website',
  },
  'social-media-management': {
    title: 'Social Media Management & Video Production',
    categoryPill: 'Content Strategy & Platform Management',
    tagline: 'Consistent, dependable social content creation, short-form video editing, and account triage.',
    description: 'We manage your brand’s active social presence across Instagram, Facebook, TikTok, and LinkedIn. From 30-day content calendars and static carousel graphics to high-engagement 9:16 short-form video edits, we keep your business in front of your target audience.',
    deliverables: [
      'Monthly content calendar prepared and delivered 7 days prior to each month for approval',
      'Platform-specific graphic design for feed carousels, infographics, and announcement posts',
      'Short-form vertical video editing (Reels & TikToks) with dynamic hooks, captions, and music',
      'Engaging copywriting tailored to platform algorithms and your brand voice guidelines',
      'Publishing and scheduling across agreed social media accounts',
      'Direct message and comment handling during business hours with defined escalation rules',
      'Monthly performance analysis highlighting engagement, top formats, and website click attribution'
    ],
    responsibilities: {
      agency: [
        'Drafting monthly content calendar themes and captions',
        'Editing supplied video footage with subtitles, audio, and visual pacing',
        'Designing multi-slide carousel layouts aligned with your brand palette',
        'Publishing scheduled posts and providing monthly conversion reporting'
      ],
      client: [
        'Supply raw video footage and high-resolution photo assets for upcoming batches',
        'Review and approve monthly content calendar within the agreed review window',
        'Provide technical or factual answers to complex customer inbox inquiries'
      ]
    },
    process: [
      'Platform & Voice Audit: reviewing target audience, competitors, and profile optimization',
      'Calendar Planning: mapping out 30 days of themes, educational topics, and promotional hooks',
      'Batch Production: creating graphic templates, writing captions, and editing video reels',
      'Client Review & Approval: incorporating structured feedback within the agreed review round',
      'Publishing & Monthly Reporting: monitoring engagement and channeling traffic to your website'
    ],
    exclusions: [
      'On-site filming crew or raw footage capture (customer supplies raw video assets)',
      'Paid advertising media budget paid directly to Meta / Google / TikTok',
      '24/7 round-the-clock emergency inbox monitoring'
    ],
    preselectedService: 'social',
    suggestedPlanSlug: 'social-essentials',
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = serviceData[params.slug];
  if (!data) return { title: 'Service Details' };

  return {
    title: `${data.title} | Services`,
    description: data.tagline,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const data = serviceData[params.slug];
  if (!data) notFound();
  return <ServiceDetailContent data={data} />;
}
