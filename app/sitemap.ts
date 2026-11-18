import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static marketing routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/services/website-development`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/social-media-management`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/work`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/plans`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/testimonials`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const [projects, posts] = await Promise.all([
    db.getProjects({ status: 'published' }),
    db.getAllBlogPosts(),
  ]);
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/work/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
