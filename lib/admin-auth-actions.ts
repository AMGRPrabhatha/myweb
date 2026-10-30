'use server';

import { redirect } from 'next/navigation';
import { createAdminSessionClient } from './admin-auth';

export async function signInAdmin(formData: FormData) {
  const email = formData.get('email')?.toString().trim() || '';
  const password = formData.get('password')?.toString() || '';
  const client = createAdminSessionClient();

  if (!client) redirect('/admin/login?error=setup');
  if (!email || !password) redirect('/admin/login?error=invalid');

  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data.user) redirect('/admin/login?error=invalid');

  const { data: profile, error: profileError } = await client
    .from('admin_profiles')
    .select('id')
    .eq('auth_user_id', data.user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (profileError || !profile) {
    await client.auth.signOut({ scope: 'local' });
    redirect('/admin/login?error=unauthorized');
  }

  redirect('/admin');
}

export async function signOutAdmin() {
  const client = createAdminSessionClient();
  if (client) await client.auth.signOut({ scope: 'local' });
  redirect('/admin/login');
}
