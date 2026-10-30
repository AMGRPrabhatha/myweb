import { createClient } from '@supabase/supabase-js';
import { initialPlans, initialProjects, initialSiteSettings, initialBlogPosts, initialTestimonials } from './sample-data';
import { Lead, LeadNote, NotificationJob, Plan, Project, SiteSettings, BlogPost, Testimonial } from './types';
import { readFileSync, mkdirSync, writeFileSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const projectsFile = join(process.cwd(), 'data', 'projects.json');

function loadProjects(): Project[] {
  try {
    const saved = JSON.parse(readFileSync(projectsFile, 'utf8')) as Project[];
    if (Array.isArray(saved)) {
      return [...initialProjects.map(seed => saved.find(p => p.id === seed.id) || seed),
        ...saved.filter(p => !initialProjects.some(seed => seed.id === p.id))];
    }
  } catch (error: any) {
    if (error?.code !== 'ENOENT') throw error;
  }
  return [...initialProjects];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isLiveSupabaseConfigured = Boolean(supabaseUrl && (supabaseServiceKey || supabaseAnonKey));

// Server-privileged client (bypasses RLS for secure server actions)
export const getSupabaseServerClient = () => {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
};

// Public client for browser / public reads
export const getSupabaseBrowserClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
};

/**
 * Robust Local In-Memory Fallback Store
 * Used when Supabase credentials have not yet been provided in .env.local
 * Guarantees zero crashing and enables full interactive testing of enquiry submissions,
 * duplicate rejection, notification job failures, admin edits, and note triage.
 */
class LocalDatabaseStore {
  private leads: Lead[] = [];
  private leadNotes: LeadNote[] = [];
  private notificationJobs: NotificationJob[] = [];
  private projects: Project[] = loadProjects();
  private plans: Plan[] = [...initialPlans];
  private blogPosts: BlogPost[] = [...initialBlogPosts];
  private testimonials: Testimonial[] = [...initialTestimonials];
  private settings: SiteSettings = { ...initialSiteSettings };

  constructor() {
    // Seed initial demo lead for admin testing
    const demoLeadId = "lead-demo-seed-01";
    this.leads.push({
      id: demoLeadId,
      submissionKey: "seed-key-demo-001",
      name: "Kasun Perera",
      email: "kasun@samplebrand.lk",
      phone: "+94 77 123 4567",
      businessName: "Ceylon Roast & Brew",
      serviceInterest: "both",
      projectBrief: "We are launching a specialty coffee startup in Colombo. We need a 5-page responsive website with online table booking inquiry and ongoing Instagram/TikTok reels to drive footfall.",
      budgetRange: "$2,000 - $5,000",
      targetTimeline: "1 to 2 months",
      existingWebsite: "",
      existingPlatforms: "Instagram: @ceylonroast_preview",
      selectedPlanId: "plan-launch-and-grow",
      planSnapshot: {
        id: "plan-launch-and-grow",
        slug: "launch-and-grow",
        title: "Launch & Grow (Combined)",
        category: "combined",
        pricingMode: "hybrid",
        currency: "USD",
        inclusions: initialPlans.find(p => p.id === 'plan-launch-and-grow')?.inclusions || [],
        exclusions: initialPlans.find(p => p.id === 'plan-launch-and-grow')?.exclusions || [],
      },
      source: "Plans page CTA",
      status: "New",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    });

    this.leadNotes.push({
      id: "note-01",
      leadId: demoLeadId,
      authorId: "staff-1",
      authorName: "Agency Team Lead",
      note: "Initial review: Solid fit for Launch & Grow package. Schedule discovery call for Tuesday afternoon.",
      followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    });

    this.notificationJobs.push({
      id: "notif-01",
      leadId: demoLeadId,
      eventType: "lead_created",
      state: "success",
      attemptCount: 1,
      nextAttemptTime: new Date().toISOString(),
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    });
  }

  // Blog Posts & Testimonials
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.blogPosts;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    return this.blogPosts.find(b => b.slug === slug) || null;
  }

  async getBlogPostById(id: string): Promise<BlogPost | null> {
    return this.blogPosts.find(b => b.id === id) || null;
  }

  async saveBlogPost(post: BlogPost): Promise<BlogPost> {
    const idx = this.blogPosts.findIndex(b => b.id === post.id);
    if (idx >= 0) {
      this.blogPosts[idx] = { ...post };
    } else {
      this.blogPosts.unshift({ ...post });
    }
    return post;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const initialLen = this.blogPosts.length;
    this.blogPosts = this.blogPosts.filter(b => b.id !== id);
    return this.blogPosts.length < initialLen;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return this.testimonials;
  }

  async getTestimonialById(id: string): Promise<Testimonial | null> {
    return this.testimonials.find(t => t.id === id) || null;
  }

  async saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
    const idx = this.testimonials.findIndex(t => t.id === testimonial.id);
    if (idx >= 0) {
      this.testimonials[idx] = { ...testimonial };
    } else {
      this.testimonials.unshift({ ...testimonial });
    }
    return testimonial;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const initialLen = this.testimonials.length;
    this.testimonials = this.testimonials.filter(t => t.id !== id);
    return this.testimonials.length < initialLen;
  }

  // Projects
  async getProjects(filter?: { category?: string; status?: 'draft' | 'published' }): Promise<Project[]> {
    let result = [...this.projects];
    if (filter?.category && filter.category !== 'All') {
      result = result.filter(p => p.category === filter.category);
    }
    if (filter?.status) {
      result = result.filter(p => p.status === filter.status);
    }
    return result.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return this.projects.find(p => p.slug === slug && p.status === 'published') || null;
  }

  async saveProject(project: Project): Promise<Project> {
    const idx = this.projects.findIndex(p => p.id === project.id);
    if (idx >= 0) {
      this.projects[idx] = { ...project };
    } else {
      this.projects.push(project);
    }
    mkdirSync(join(process.cwd(), 'data'), { recursive: true });
    const temporaryFile = `${projectsFile}.${process.pid}.tmp`;
    writeFileSync(temporaryFile, JSON.stringify(this.projects, null, 2));
    renameSync(temporaryFile, projectsFile);
    return project;
  }

  // Plans
  async getPlans(category?: string): Promise<Plan[]> {
    let result = this.plans.filter(p => p.status === 'published');
    if (category) {
      result = result.filter(p => p.category === category);
    }
    return result.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getAllPlans(): Promise<Plan[]> {
    return [...this.plans].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getPlanById(id: string): Promise<Plan | null> {
    return this.plans.find(p => p.id === id || p.slug === id) || null;
  }

  async savePlan(plan: Plan): Promise<Plan> {
    const idx = this.plans.findIndex(p => p.id === plan.id);
    if (idx >= 0) {
      this.plans[idx] = { ...plan };
    } else {
      this.plans.push(plan);
    }
    return plan;
  }

  // Site Settings
  async getSettings(): Promise<SiteSettings> {
    return { ...this.settings };
  }

  async updateSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
    this.settings = { ...this.settings, ...newSettings };
    return { ...this.settings };
  }

  // Leads
  async saveLeadWithJob(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<{ lead: Lead; job: NotificationJob }> {
    // Duplicate check by unique submissionKey
    const existing = this.leads.find(l => l.submissionKey === leadData.submissionKey);
    if (existing) {
      const existingJob = this.notificationJobs.find(j => j.leadId === existing.id) || {
        id: `job-${Date.now()}`,
        leadId: existing.id,
        eventType: 'lead_created',
        state: 'success',
        attemptCount: 1,
        nextAttemptTime: new Date().toISOString(),
        createdAt: existing.createdAt,
        updatedAt: existing.updatedAt,
      };
      return { lead: existing, job: existingJob };
    }

    const id = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const newLead: Lead = {
      ...leadData,
      id,
      status: 'New',
      createdAt: now,
      updatedAt: now,
    };

    // Create Notification Job
    const jobId = `job-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newJob: NotificationJob = {
      id: jobId,
      leadId: id,
      eventType: 'lead_created',
      state: 'pending',
      attemptCount: 0,
      nextAttemptTime: now,
      createdAt: now,
      updatedAt: now,
    };

    this.leads.unshift(newLead);
    this.notificationJobs.unshift(newJob);

    return { lead: newLead, job: newJob };
  }

  async getLeads(filter?: { status?: string; search?: string }): Promise<Lead[]> {
    let result = [...this.leads];
    if (filter?.status && filter.status !== 'All') {
      result = result.filter(l => l.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(l => 
        l.name.toLowerCase().includes(q) || 
        l.email.toLowerCase().includes(q) || 
        (l.businessName && l.businessName.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async getLeadById(id: string): Promise<Lead | null> {
    return this.leads.find(l => l.id === id) || null;
  }

  async updateLeadStatus(id: string, status: Lead['status']): Promise<Lead | null> {
    const lead = this.leads.find(l => l.id === id);
    if (!lead) return null;
    lead.status = status;
    lead.updatedAt = new Date().toISOString();
    return lead;
  }

  // Lead Notes
  async getLeadNotes(leadId: string): Promise<LeadNote[]> {
    return this.leadNotes
      .filter(n => n.leadId === leadId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async addLeadNote(noteData: Omit<LeadNote, 'id' | 'createdAt'>): Promise<LeadNote> {
    const id = `note-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newNote: LeadNote = {
      ...noteData,
      id,
      createdAt: new Date().toISOString(),
    };
    this.leadNotes.unshift(newNote);
    return newNote;
  }

  // Notification Jobs
  async getNotificationJobs(): Promise<NotificationJob[]> {
    return [...this.notificationJobs];
  }

  async updateNotificationJob(id: string, update: Partial<NotificationJob>): Promise<NotificationJob | null> {
    const job = this.notificationJobs.find(j => j.id === id);
    if (!job) return null;
    Object.assign(job, update, { updatedAt: new Date().toISOString() });
    return job;
  }
}

// Global singleton for in-memory store so it persists during hot-reloads and dev server requests
const globalForDb = globalThis as unknown as { localStore?: LocalDatabaseStore };
if (
  globalForDb.localStore &&
  (typeof globalForDb.localStore.getAllTestimonials !== 'function' ||
    typeof (globalForDb.localStore as any).saveBlogPost !== 'function' ||
    typeof (globalForDb.localStore as any).saveTestimonial !== 'function')
) {
  delete globalForDb.localStore;
}
// Keep the live dev store while applying updated project methods after hot reloads.
if (globalForDb.localStore) {
  Object.setPrototypeOf(globalForDb.localStore, LocalDatabaseStore.prototype);
}
export const localDb = globalForDb.localStore || new LocalDatabaseStore();
if (process.env.NODE_ENV !== 'production') globalForDb.localStore = localDb;

// Unified Data Access API
export const db = {
  getProjects: async (filter?: { category?: string; status?: 'draft' | 'published' }) => {
    return localDb.getProjects ? localDb.getProjects(filter) : initialProjects;
  },
  getProjectBySlug: async (slug: string) => {
    return localDb.getProjectBySlug ? localDb.getProjectBySlug(slug) : (initialProjects.find(p => p.slug === slug) || null);
  },
  saveProject: async (project: Project) => {
    return localDb.saveProject(project);
  },
  getPlans: async (category?: string) => {
    return localDb.getPlans ? localDb.getPlans(category) : initialPlans;
  },
  getAllPlans: async () => {
    return localDb.getAllPlans ? localDb.getAllPlans() : initialPlans;
  },
  getPlanById: async (id: string) => {
    return localDb.getPlanById ? localDb.getPlanById(id) : (initialPlans.find(p => p.id === id) || null);
  },
  savePlan: async (plan: Plan) => {
    return localDb.savePlan(plan);
  },
  getSettings: async () => {
    return localDb.getSettings ? localDb.getSettings() : initialSiteSettings;
  },
  updateSettings: async (settings: Partial<SiteSettings>) => {
    return localDb.updateSettings(settings);
  },
  saveLeadWithJob: async (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    return localDb.saveLeadWithJob(leadData);
  },
  getLeads: async (filter?: { status?: string; search?: string }) => {
    return localDb.getLeads(filter);
  },
  getLeadById: async (id: string) => {
    return localDb.getLeadById(id);
  },
  updateLeadStatus: async (id: string, status: Lead['status']) => {
    return localDb.updateLeadStatus(id, status);
  },
  getLeadNotes: async (leadId: string) => {
    return localDb.getLeadNotes(leadId);
  },
  addLeadNote: async (noteData: Omit<LeadNote, 'id' | 'createdAt'>) => {
    return localDb.addLeadNote(noteData);
  },
  getNotificationJobs: async () => {
    return localDb.getNotificationJobs();
  },
  updateNotificationJob: async (id: string, update: Partial<NotificationJob>) => {
    return localDb.updateNotificationJob(id, update);
  },
  getAllBlogPosts: async () => {
    return (localDb && typeof localDb.getAllBlogPosts === 'function') 
      ? localDb.getAllBlogPosts() 
      : initialBlogPosts;
  },
  getBlogPostBySlug: async (slug: string) => {
    return (localDb && typeof localDb.getBlogPostBySlug === 'function') 
      ? localDb.getBlogPostBySlug(slug) 
      : (initialBlogPosts.find(b => b.slug === slug) || null);
  },
  getBlogPostById: async (id: string) => {
    return (localDb && typeof (localDb as any).getBlogPostById === 'function')
      ? (localDb as any).getBlogPostById(id)
      : (initialBlogPosts.find(b => b.id === id) || null);
  },
  saveBlogPost: async (post: BlogPost) => {
    return (localDb && typeof (localDb as any).saveBlogPost === 'function')
      ? (localDb as any).saveBlogPost(post)
      : post;
  },
  deleteBlogPost: async (id: string) => {
    return (localDb && typeof (localDb as any).deleteBlogPost === 'function')
      ? (localDb as any).deleteBlogPost(id)
      : true;
  },
  getAllTestimonials: async () => {
    return (localDb && typeof localDb.getAllTestimonials === 'function') 
      ? localDb.getAllTestimonials() 
      : initialTestimonials;
  },
  getTestimonialById: async (id: string) => {
    return (localDb && typeof (localDb as any).getTestimonialById === 'function')
      ? (localDb as any).getTestimonialById(id)
      : (initialTestimonials.find(t => t.id === id) || null);
  },
  saveTestimonial: async (testimonial: Testimonial) => {
    return (localDb && typeof (localDb as any).saveTestimonial === 'function')
      ? (localDb as any).saveTestimonial(testimonial)
      : testimonial;
  },
  deleteTestimonial: async (id: string) => {
    return (localDb && typeof (localDb as any).deleteTestimonial === 'function')
      ? (localDb as any).deleteTestimonial(id)
      : true;
  }
};
