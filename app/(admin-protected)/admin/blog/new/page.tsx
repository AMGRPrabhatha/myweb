import BlogEditor from '@/components/admin/BlogEditor';

export const metadata = {
  title: 'Write New Blog Article | Staff Admin',
};

export default function NewBlogPage() {
  return <BlogEditor isNew={true} />;
}
