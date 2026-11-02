import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Tag,
  Settings,
  Bell,
  ExternalLink,
  ShieldAlert,
  BookOpen,
  MessageSquareQuote,
} from 'lucide-react';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';
import { signOutAdmin } from '@/lib/admin-auth-actions';

export const metadata = {
  title: 'Agency Staff Portal | Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  const [leads, jobs, blogPosts, testimonials] = await Promise.all([
    db.getLeads(),
    db.getNotificationJobs(),
    db.getAllBlogPosts(),
    db.getAllTestimonials(),
  ]);

  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const failedJobsCount = jobs.filter(j => j.state === 'failed').length;
  const blogPostsCount = blogPosts.length;
  const testimonialsCount = testimonials.length;

  return (
    <div className="min-h-screen bg-warm-200/60 flex flex-col md:flex-row text-ink">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-ink text-warm-100 flex-shrink-0 flex flex-col justify-between border-r border-ink-800">
        <div className="p-5">
          {/* Brand header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-ink-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-1 shrink-0">
                <Image
                  src="/images/logo.webp"
                  alt="Staff Admin Logo"
                  width={30}
                  height={26}
                  className="w-auto h-6 object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-white text-sm block leading-tight">
                  Staff Admin
                </span>
                <span className="text-[10px] text-cobalt-300 font-semibold uppercase tracking-wider">
                  Internal Portal
                </span>
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              className="text-ink-400 hover:text-white p-1 rounded-md hover:bg-ink-800 transition-colors"
              title="Open public website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold" aria-label="Admin Navigation">
            <Link
              href="/admin"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-ink-800 text-ink-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 text-cobalt" />
                <span>Dashboard</span>
              </div>
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-ink-800 text-ink-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4 text-cobalt" />
                <span>Enquiries & Leads</span>
              </div>
              {newLeadsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-cobalt text-white text-[10px] font-bold">
                  {newLeadsCount}
                </span>
              )}
            </Link>

            <Link
              href="/admin/projects"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-ink-800 text-ink-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="w-4 h-4 text-cobalt" />
                <span>Projects & Work</span>
              </div>
            </Link>

            <Link
              href="/admin/plans"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-ink-800 text-ink-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-cobalt" />
                <span>Plans & Pricing</span>
              </div>
            </Link>

            <Link
              href="/admin/blog"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-ink-800 text-ink-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-cobalt" />
                <span>Blog Articles</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-ink-800 text-ink-300 text-[10px] font-bold">
                {blogPostsCount}
              </span>
            </Link>

            <Link
              href="/admin/testimonials"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-ink-800 text-ink-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquareQuote className="w-4 h-4 text-cobalt" />
                <span>Client Testimonials</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-ink-800 text-ink-300 text-[10px] font-bold">
                {testimonialsCount}
              </span>
            </Link>

            <Link
              href="/admin/notifications"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-ink-800 text-ink-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-cobalt" />
                <span>Notification Queue</span>
              </div>
              {failedJobsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {failedJobsCount} failed
                </span>
              )}
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-ink-800 text-ink-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-cobalt" />
                <span>Site Settings</span>
              </div>
            </Link>
          </nav>
        </div>

        {/* Staff session footer */}
        <div className="p-4 border-t border-ink-800 bg-ink-900/60 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-cobalt/20 text-cobalt flex items-center justify-center font-bold text-xs">
              {admin.profile.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <span className="block font-bold text-white truncate">{admin.profile.name}</span>
              <span className="text-[10px] text-ink-400 capitalize">{admin.profile.role} • Active</span>
            </div>
          </div>
          <form action={signOutAdmin} className="mt-4">
            <button type="submit" className="text-ink-300 hover:text-white underline underline-offset-2">Sign out</button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-warm-300 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono bg-warm-100 text-ink-600 px-2.5 py-1 rounded border border-warm-300">
              Agency Staff Environment
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-500">
            <Link
              href="/"
              className="text-cobalt hover:underline font-semibold"
            >
              View Public Website ↗
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
