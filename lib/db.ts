import * as leadDb from './lead-db';
import * as projectDb from './project-db';
import { initialPlans, initialSiteSettings, initialBlogPosts, initialTestimonials } from './sample-data';
import { Lead, LeadNote, NotificationJob, Plan, Project, SiteSettings, BlogPost, Testimonial } from './types';

/**
 * Existing local store for non-project public content.
 * Projects, enquiries, and notification jobs use Supabase below.
 */
class LocalDatabaseStore {
  private plans: Plan[] = [...initialPlans];
  private blogPosts: BlogPost[] = [...initialBlogPosts];
  private testimonials: Testimonial[] = [...initialTestimonials];
  private settings: SiteSettings = { ...initialSiteSettings };

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
// Keep the live dev store while applying updated content methods after hot reloads.
if (globalForDb.localStore) {
  Object.setPrototypeOf(globalForDb.localStore, LocalDatabaseStore.prototype);
}
export const localDb = globalForDb.localStore || new LocalDatabaseStore();
if (process.env.NODE_ENV !== 'production') globalForDb.localStore = localDb;

// Unified Data Access API
export const db = {
  getProjects: async (filter?: { category?: string; status?: 'draft' | 'published' }) => {
    return projectDb.getProjects(filter);
  },
  getProjectBySlug: async (slug: string) => {
    return projectDb.getProjectBySlug(slug);
  },
  saveProject: async (project: Project) => {
    return projectDb.saveProject(project);
  },
  deleteProject: async (id: string) => {
    return projectDb.deleteProject(id);
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
    return leadDb.saveLeadWithJob(leadData);
  },
  getLeads: async (filter?: { status?: string; search?: string }) => {
    return leadDb.getLeads(filter);
  },
  getLeadById: async (id: string) => {
    return leadDb.getLeadById(id);
  },
  updateLeadStatus: async (id: string, status: Lead['status']) => {
    return leadDb.updateLeadStatus(id, status);
  },
  getLeadNotes: async (leadId: string) => {
    return leadDb.getLeadNotes(leadId);
  },
  addLeadNote: async (noteData: Omit<LeadNote, 'id' | 'createdAt'>) => {
    return leadDb.addLeadNote(noteData);
  },
  getNotificationJobs: async () => {
    return leadDb.getNotificationJobs();
  },
  updateNotificationJob: async (id: string, update: Partial<NotificationJob>) => {
    return leadDb.updateNotificationJob(id, update);
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
