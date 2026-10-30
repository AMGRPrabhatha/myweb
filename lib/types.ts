export type ServiceInterest = 'website' | 'social' | 'both' | 'help_me_decide';

export type LeadStatus = 'New' | 'Contacted' | 'Proposal Sent' | 'Won' | 'Closed';

export type PlanCategory = 'website' | 'mobile' | 'combined' | 'social';

export type PricingMode = 'fixed' | 'milestone' | 'recurring' | 'hybrid';

export interface PlanSnapshot {
  id: string;
  slug: string;
  title: string;
  category: PlanCategory;
  pricingMode: PricingMode;
  oneTimeAmount?: number | null;
  monthlyAmount?: number | null;
  currency: string;
  inclusions: string[];
  exclusions: string[];
}

export interface Lead {
  id: string;
  submissionKey: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  serviceInterest: ServiceInterest;
  projectBrief: string;
  budgetRange?: string;
  targetTimeline?: string;
  existingWebsite?: string;
  existingPlatforms?: string;
  selectedPlanId?: string;
  planSnapshot?: PlanSnapshot | null;
  source?: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LeadNote {
  id: string;
  leadId: string;
  authorId: string;
  authorName: string;
  note: string;
  followUpDate?: string | null;
  createdAt: string;
}

export type ProjectServiceTag = 'Websites' | 'Social Content' | 'Combined Projects' | 'Web Design' | 'UI/UX Design' | 'Mobile Apps';

export interface ProjectMedia {
  id: string;
  projectId: string;
  storageObjectKey: string;
  url: string;
  altText: string;
  displayOrder: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  category: ProjectServiceTag;
  summary: string;
  isConcept: boolean;
  businessNeed: string;
  deliveredScope: string[];
  resultsSummary?: string;
  coverImage: string;
  galleryImages: ProjectMedia[];
  status: 'draft' | 'published';
  displayOrder: number;
  publishedAt: string;
}

export interface Plan {
  id: string;
  slug: string;
  category: PlanCategory;
  title: string;
  subtitle: string;
  pricingMode: PricingMode;
  oneTimeAmount?: number | null;
  monthlyAmount?: number | null;
  currency: string;
  isEnquiryBased?: boolean;
  inclusions: string[];
  exclusions: string[];
  turnaroundTime?: string;
  revisions?: string;
  status: 'draft' | 'published';
  displayOrder: number;
  platform?: 'website' | 'mobile' | 'social';
  scopeType?: 'frontend' | 'fullstack';
  pageCount?: string;
  originalPrice?: number | null;
  discountAmount?: number | null;
  finalPrice?: number | null;
  hasSocialBundle?: boolean;
  socialMonthlyAfter?: number | null;
  priceDisplay?: string;
}

export interface SiteSettings {
  agencyName: string;
  tagline: string;
  businessEmail: string;
  phone: string;
  whatsappNumber: string;
  responseExpectation: string;
  officeLocation: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface NotificationJob {
  id: string;
  leadId: string;
  eventType: 'lead_created' | 'lead_updated';
  state: 'pending' | 'success' | 'failed';
  attemptCount: number;
  nextAttemptTime: string;
  errorSummary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProfile {
  id: string;
  authUserId: string;
  email: string;
  name: string;
  role: 'owner' | 'editor';
  isActive: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  categorySlug: string;
  readTime: string;
  publishedAt: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  companySubtitle: string;
  quote: string;
  fullReview?: string;
  videoDuration?: string;
  videoThumbnail: string;
  companyLogo?: string;
  rating: number;
  highlightKpi: string;
  serviceCategory: 'Website Development' | 'Social Media' | 'Combined Delivery';
}
