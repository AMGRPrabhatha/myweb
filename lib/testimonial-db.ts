import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { unstable_noStore as noStore } from 'next/cache';
import { createAdminSessionClient } from './admin-auth';
import type { Testimonial } from './types';

type TestimonialRow = {
  id: string;
  client_name: string;
  client_role: string;
  company_name: string;
  company_subtitle: string;
  quote: string;
  full_review: string | null;
  video_duration: string | null;
  image_url: string;
  company_logo: string | null;
  rating: number;
  highlight_kpi: string;
  service_category: Testimonial['serviceCategory'];
  publication_status: 'draft' | 'published';
};

function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    clientName: row.client_name,
    clientRole: row.client_role,
    companyName: row.company_name,
    companySubtitle: row.company_subtitle,
    quote: row.quote,
    fullReview: row.full_review ?? undefined,
    videoDuration: row.video_duration ?? undefined,
    videoThumbnail: row.image_url,
    companyLogo: row.company_logo ?? undefined,
    rating: row.rating,
    highlightKpi: row.highlight_kpi,
    serviceCategory: row.service_category,
    publicationStatus: row.publication_status,
  };
}

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Testimonial database is not configured.');
  return createClient(url, key);
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  noStore();
  const { data, error } = await publicClient().from('testimonials').select('*')
    .eq('publication_status', 'published').order('updated_at', { ascending: false });
  if (error) throw error;
  return ((data ?? []) as TestimonialRow[]).map(mapTestimonial);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  noStore();
  const client = createAdminSessionClient();
  if (!client) throw new Error('Testimonial database is not configured.');
  const { data, error } = await client.from('testimonials').select('*').order('updated_at', { ascending: false });
  if (error) throw error;
  return ((data ?? []) as TestimonialRow[]).map(mapTestimonial);
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  noStore();
  const client = createAdminSessionClient();
  if (!client) throw new Error('Testimonial database is not configured.');
  const { data, error } = await client.from('testimonials').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? mapTestimonial(data as TestimonialRow) : null;
}

export async function saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
  const client = createAdminSessionClient();
  if (!client) throw new Error('Testimonial database is not configured.');
  const { data, error } = await client.from('testimonials').upsert({
    id: testimonial.id,
    client_name: testimonial.clientName,
    client_role: testimonial.clientRole,
    company_name: testimonial.companyName,
    company_subtitle: testimonial.companySubtitle,
    quote: testimonial.quote,
    full_review: testimonial.fullReview ?? null,
    video_duration: testimonial.videoDuration ?? null,
    image_url: testimonial.videoThumbnail,
    company_logo: testimonial.companyLogo ?? null,
    rating: testimonial.rating,
    highlight_kpi: testimonial.highlightKpi,
    service_category: testimonial.serviceCategory,
    publication_status: testimonial.publicationStatus ?? 'published',
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' }).select('*').single();
  if (error) throw error;
  return mapTestimonial(data as TestimonialRow);
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const client = createAdminSessionClient();
  if (!client) throw new Error('Testimonial database is not configured.');
  const { data, error } = await client.from('testimonials').delete().eq('id', id).select('id');
  if (error) throw error;
  return Boolean(data?.length);
}
