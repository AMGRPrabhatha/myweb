import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getAdminProfile, isAdminAuthConfigured } from '@/lib/admin-auth';
import { signInAdmin } from '@/lib/admin-auth-actions';

export const metadata = {
  title: 'Staff Sign In | Admin Portal',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  const configured = isAdminAuthConfigured();
  if (configured && await getAdminProfile()) redirect('/admin');
  const errors: Record<string, string> = {
    invalid: 'Email or password is incorrect.',
    unauthorized: 'This account does not have active staff access.',
    setup: 'Staff sign-in is not configured yet. Add the Supabase environment variables.',
  };
  const message = searchParams?.error ? errors[searchParams.error] : null;
  return (
    <div className="min-h-screen bg-warm-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-warm-300 shadow-card space-y-6">
        <Link
          href="https://design1x.com"
          className="inline-flex items-center gap-2 text-xs font-bold text-cobalt hover:text-cobalt-700"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </Link>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-cobalt-50 text-cobalt flex items-center justify-center mx-auto font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">
            Staff Portal Access
          </h1>
          <p className="text-xs text-ink-500">
            Invite-only administrative access for agency operators and content leads.
          </p>
        </div>

        {(message || !configured) && <p role="alert" className="rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs text-ink-700">{message || errors.setup}</p>}

        <form action={signInAdmin} className="space-y-4 text-xs text-ink-700">
          <div>
            <label htmlFor="admin-email" className="block font-bold text-ink mb-1">Staff Email</label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              disabled={!configured}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block font-bold text-ink mb-1">Password</label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              disabled={!configured}
              required
              className="w-full p-2.5 rounded-xl border border-warm-300 bg-warm-50 text-ink text-xs focus:ring-2 focus:ring-cobalt focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!configured}
            className="w-full py-3 px-4 rounded-xl bg-cobalt hover:bg-cobalt-600 text-white font-bold text-sm shadow-subtle hover:shadow-float transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In to Staff Panel
          </button>
        </form>

      </div>
    </div>
  );
}
