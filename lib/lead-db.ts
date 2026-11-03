import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { createAdminSessionClient } from './admin-auth';
import type { Lead, LeadNote, NotificationJob } from './types';

function writeClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase lead storage is not configured');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function adminClient() {
  const client = createAdminSessionClient();
  if (!client) throw new Error('Supabase admin access is not configured');
  return client;
}

function mapLead(row: any): Lead {
  return {
    id: row.id, submissionKey: row.submission_key, name: row.name, email: row.email,
    phone: row.phone ?? undefined, businessName: row.business_name ?? undefined,
    serviceInterest: row.service_interest, projectBrief: row.project_brief,
    budgetRange: row.budget_range ?? undefined, targetTimeline: row.target_timeline ?? undefined,
    existingWebsite: row.existing_website ?? undefined, existingPlatforms: row.existing_platforms ?? undefined,
    selectedPlanId: row.selected_plan_id ?? undefined, planSnapshot: row.plan_snapshot,
    source: row.source ?? undefined, status: row.status,
    createdAt: row.created_at, updatedAt: row.updated_at,
  };
}

function mapJob(row: any): NotificationJob {
  return {
    id: row.id, leadId: row.lead_id, eventType: row.event_type, state: row.state,
    attemptCount: row.attempt_count, nextAttemptTime: row.next_attempt_time,
    errorSummary: row.error_summary ?? undefined, createdAt: row.created_at, updatedAt: row.updated_at,
  };
}

function mapNote(row: any): LeadNote {
  return {
    id: row.id, leadId: row.lead_id, authorId: row.author_id, authorName: row.author_name,
    note: row.note, followUpDate: row.follow_up_date, createdAt: row.created_at,
  };
}

export async function saveLeadWithJob(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<{ lead: Lead; job: NotificationJob | null; created: boolean }> {
  const client = writeClient();
  const existing = await client.from('leads').select('*').eq('submission_key', leadData.submissionKey).maybeSingle();
  if (existing.error) throw existing.error;
  if (existing.data && (existing.data.email !== leadData.email || existing.data.name !== leadData.name)) {
    throw new Error('Submission key belongs to a different enquiry');
  }

  let row = existing.data;
  let created = false;
  if (!row) {
    let selectedPlanId: string | null = null;
    if (leadData.selectedPlanId) {
      const plan = await client.from('plans').select('id').eq('id', leadData.selectedPlanId).maybeSingle();
      if (plan.error) throw plan.error;
      selectedPlanId = plan.data?.id ?? null;
    }
    const inserted = await client.from('leads').insert({
      submission_key: leadData.submissionKey,
      name: leadData.name, email: leadData.email, phone: leadData.phone ?? null,
      business_name: leadData.businessName ?? null, service_interest: leadData.serviceInterest,
      project_brief: leadData.projectBrief, budget_range: leadData.budgetRange ?? null,
      target_timeline: leadData.targetTimeline ?? null, existing_website: leadData.existingWebsite ?? null,
      existing_platforms: leadData.existingPlatforms ?? null, selected_plan_id: selectedPlanId,
      plan_snapshot: leadData.planSnapshot ?? null, source: leadData.source ?? 'Website Contact Form',
    }).select('*').single();
    if (inserted.error) {
      if (inserted.error.code !== '23505') throw inserted.error;
      const duplicate = await client.from('leads').select('*').eq('submission_key', leadData.submissionKey).single();
      if (duplicate.error || !duplicate.data) throw duplicate.error ?? inserted.error;
      if (duplicate.data.email !== leadData.email || duplicate.data.name !== leadData.name) {
        throw new Error('Submission key belongs to a different enquiry');
      }
      row = duplicate.data;
    } else {
      row = inserted.data;
      created = true;
    }
  }
  if (!row?.id) throw new Error('Lead insertion returned no record');

  // A notification failure must never turn a persisted enquiry into a false form failure.
  const existingJob = await client.from('notification_jobs').select('*').eq('lead_id', row.id).eq('event_type', 'lead_created').order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (existingJob.error) console.error('Could not read notification job:', existingJob.error);
  let job = existingJob.data;
  if (!job && created) {
    const insertedJob = await client.from('notification_jobs').insert({ lead_id: row.id, event_type: 'lead_created' }).select('*').single();
    if (insertedJob.error) console.error('Could not create notification job:', insertedJob.error);
    job = insertedJob.data;
  }
  return { lead: mapLead(row), job: job ? mapJob(job) : null, created };
}

export async function getLeads(filter?: { status?: string; search?: string }): Promise<Lead[]> {
  let query = adminClient().from('leads').select('*').order('created_at', { ascending: false });
  if (filter?.status && filter.status !== 'All') query = query.eq('status', filter.status);
  if (filter?.search) {
    const search = filter.search.replace(/[%,()]/g, ' ').trim();
    if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,business_name.ilike.%${search}%`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapLead);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const { data, error } = await adminClient().from('leads').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? mapLead(data) : null;
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<Lead | null> {
  const { data, error } = await adminClient().from('leads').update({ status, updated_at: new Date().toISOString() }).eq('id', id).select('*').maybeSingle();
  if (error) throw error;
  return data ? mapLead(data) : null;
}

export async function getLeadNotes(leadId: string): Promise<LeadNote[]> {
  const { data, error } = await adminClient().from('lead_notes').select('*').eq('lead_id', leadId).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapNote);
}

export async function addLeadNote(note: Omit<LeadNote, 'id' | 'createdAt'>): Promise<LeadNote> {
  const { data, error } = await adminClient().from('lead_notes').insert({ lead_id: note.leadId, author_id: note.authorId, author_name: note.authorName, note: note.note, follow_up_date: note.followUpDate ?? null }).select('*').single();
  if (error) throw error;
  return mapNote(data);
}

export async function getNotificationJobs(): Promise<NotificationJob[]> {
  const { data, error } = await adminClient().from('notification_jobs').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapJob);
}

export async function updateNotificationJob(id: string, update: Partial<NotificationJob>): Promise<NotificationJob | null> {
  const { data, error } = await writeClient().from('notification_jobs').update({
    ...(update.state !== undefined && { state: update.state }),
    ...(update.attemptCount !== undefined && { attempt_count: update.attemptCount }),
    ...(update.nextAttemptTime !== undefined && { next_attempt_time: update.nextAttemptTime }),
    ...(update.errorSummary !== undefined && { error_summary: update.errorSummary }),
    updated_at: new Date().toISOString(),
  }).eq('id', id).select('*').maybeSingle();
  if (error) throw error;
  return data ? mapJob(data) : null;
}
