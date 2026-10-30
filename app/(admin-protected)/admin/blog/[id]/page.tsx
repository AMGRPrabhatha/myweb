import { notFound } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';
import { db } from '@/lib/db';

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const allPosts = await db.getAllBlogPosts();
  const post = allPosts.find((p) => p.id === params.id || p.slug === params.id);
  return {
    title: post ? `Edit: ${post.title} | Staff Admin` : 'Edit Blog Post | Staff Admin',
  };
}

export default async function EditBlogPage({ params }: Props) {
  const allPosts = await db.getAllBlogPosts();
  const post = allPosts.find((p) => p.id === params.id || p.slug === params.id);

  if (!post) {
    notFound();
  }

  return <BlogEditor initialPost={post} isNew={false} />;
}
