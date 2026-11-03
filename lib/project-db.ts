import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { createAdminSessionClient } from './admin-auth';
import type { Project, ProjectMedia } from './types';

function client() {
  const supabase = createAdminSessionClient();
  if (!supabase) throw new Error('Project database is not configured.');
  return supabase;
}

function mapMedia(row: any): ProjectMedia {
  return {
    id: row.id,
    projectId: row.project_id,
    storageObjectKey: row.storage_object_key,
    url: row.url,
    altText: row.alt_text,
    displayOrder: row.display_order,
  };
}

function mapProject(row: any, media: ProjectMedia[]): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    clientName: row.client_name,
    category: row.category,
    summary: row.summary,
    isConcept: row.is_concept,
    businessNeed: row.business_need,
    deliveredScope: row.delivered_scope ?? [],
    resultsSummary: row.results_summary ?? undefined,
    coverImage: row.cover_image,
    galleryImages: media,
    status: row.status,
    displayOrder: row.display_order,
    publishedAt: row.status === 'draft' ? '' : row.published_at,
  };
}

async function mediaFor(ids: string[]): Promise<Map<string, ProjectMedia[]>> {
  const byProject = new Map<string, ProjectMedia[]>();
  if (!ids.length) return byProject;
  const { data, error } = await client().from('project_media').select('*').in('project_id', ids).order('display_order');
  if (error) throw error;
  for (const row of data ?? []) {
    const media = mapMedia(row);
    byProject.set(media.projectId, [...(byProject.get(media.projectId) ?? []), media]);
  }
  return byProject;
}

export async function getProjects(filter?: { category?: string; status?: 'draft' | 'published' }): Promise<Project[]> {
  noStore();
  let query = client().from('projects').select('*').order('display_order').order('published_at', { ascending: false });
  if (filter?.status) query = query.eq('status', filter.status);
  if (filter?.category && filter.category !== 'All') query = query.eq('category', filter.category);
  const { data, error } = await query;
  if (error) throw error;
  const media = await mediaFor((data ?? []).map(row => row.id));
  return (data ?? []).map(row => mapProject(row, media.get(row.id) ?? []));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  noStore();
  const { data, error } = await client().from('projects').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const media = await mediaFor([data.id]);
  return mapProject(data, media.get(data.id) ?? []);
}

export async function saveProject(project: Project): Promise<Project> {
  const supabase = client();
  const { data, error } = await supabase.from('projects').upsert({
    id: project.id,
    slug: project.slug,
    title: project.title,
    client_name: project.clientName,
    category: project.category,
    summary: project.summary,
    is_concept: project.isConcept,
    business_need: project.businessNeed,
    delivered_scope: project.deliveredScope,
    results_summary: project.resultsSummary ?? null,
    cover_image: project.coverImage,
    status: project.status,
    display_order: project.displayOrder,
    published_at: project.publishedAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' }).select('*').single();
  if (error) throw error;

  if (project.galleryImages.length) {
    const { error: mediaError } = await supabase.from('project_media').upsert(
      project.galleryImages.map(item => ({
        id: item.id,
        project_id: data.id,
        storage_object_key: item.storageObjectKey,
        url: item.url,
        alt_text: item.altText,
        display_order: item.displayOrder,
      })),
      { onConflict: 'id' },
    );
    if (mediaError) throw mediaError;
  }
  return mapProject(data, project.galleryImages);
}

export async function deleteProject(id: string): Promise<boolean> {
  const { data, error } = await client().from('projects').delete().eq('id', id).select('id').maybeSingle();
  if (error) throw error;
  return Boolean(data);
}
