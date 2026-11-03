import * as leadDb from './lead-db';
import { getDeletedProjectIds, markProjectDeleted } from './project-deletions';
import { unstable_noStore as noStore } from 'next/cache';
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

/**
 * Existing local store for public content still backed by sample data.
 * Enquiries and notification jobs are routed to Supabase below and never use this store.
 */
class LocalDatabaseStore {
  private projects: Project[] = loadProjects();
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
    noStore();
    const [projects, deletedIds] = await Promise.all([localDb.getProjects(filter), getDeletedProjectIds()]);
    return projects.filter(project => !deletedIds.has(project.id));
  },
  getProjectBySlug: async (slug: string) => {
    noStore();
    const [project, deletedIds] = await Promise.all([localDb.getProjectBySlug(slug), getDeletedProjectIds()]);
    return project && !deletedIds.has(project.id) ? project : null;
  },
  saveProject: async (project: Project) => {
    return localDb.saveProject(project);
  },
  deleteProject: async (id: string, userId: string) => {
    const project = (await localDb.getProjects()).find(item => item.id === id);
    if (!project) return false;
    await markProjectDeleted(id, userId);
    return true;
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
