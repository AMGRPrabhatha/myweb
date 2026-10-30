import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function isAdminAuthConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function createAdminSessionClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const cookieStore = cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot write cookies. Middleware refreshes them.
        }
      },
    },
  });
}

export async function getAdminProfile() {
  const client = createAdminSessionClient();
  if (!client) return null;

  const { data: { user }, error: userError } = await client.auth.getUser();
  if (userError || !user) return null;

  const { data: profile, error: profileError } = await client
    .from('admin_profiles')
    .select('id, name, role, is_active')
    .eq('auth_user_id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (profileError || !profile) return null;
  return { user, profile };
}

export async function requireAdmin() {
  const admin = await getAdminProfile();
  if (!admin) redirect('/admin/login');
  return admin;
}
