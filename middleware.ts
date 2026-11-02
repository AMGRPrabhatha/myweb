import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const isAdminRoot = request.nextUrl.pathname === '/' &&
    request.headers.get('host')?.toLowerCase().replace(/:\d+$/, '') === 'admin.design1x.com';

  if (request.nextUrl.pathname === '/' && !isAdminRoot) return NextResponse.next();
  if (request.nextUrl.pathname === '/admin/login') return NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.redirect(new URL('/admin/login?error=setup', request.url));

  let response = NextResponse.next({ request });
  const redirectWithCookies = (path: string) => {
    const redirectResponse = NextResponse.redirect(new URL(path, request.url));
    response.cookies.getAll().forEach(cookie => redirectResponse.cookies.set(cookie));
    return redirectResponse;
  };
  const client = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user) return redirectWithCookies('/admin/login');

  const { data: profile, error: profileError } = await client
    .from('admin_profiles')
    .select('id')
    .eq('auth_user_id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (profileError || !profile) return redirectWithCookies('/admin/login?error=unauthorized');
  return isAdminRoot ? redirectWithCookies('/admin') : response;
}

export const config = { matcher: ['/', '/admin/:path*'] };
