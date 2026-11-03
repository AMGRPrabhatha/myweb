import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { createAdminSessionClient } from './admin-auth';

export async function getDeletedProjectIds(): Promise<Set<string>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Project deletion storage is not configured');

  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.from('project_deletions').select('project_id');
  // Keep existing pages available while this migration is being deployed.
  if (error?.code === '42P01' || error?.code === 'PGRST205') return new Set();
  if (error) throw error;
  return new Set((data ?? []).map(row => row.project_id as string));
}

export async function markProjectDeleted(projectId: string, userId: string): Promise<void> {
  const client = createAdminSessionClient();
  if (!client) throw new Error('Admin access is not configured');
  const { error } = await client.from('project_deletions').upsert(
    { project_id: projectId, deleted_by: userId },
    { onConflict: 'project_id' },
  );
  if (error) throw error;
}
