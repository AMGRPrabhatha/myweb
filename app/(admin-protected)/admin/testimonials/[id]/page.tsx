import { notFound } from 'next/navigation';
import TestimonialEditor from '@/components/admin/TestimonialEditor';
import { db } from '@/lib/db';

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const testimonial = await db.getTestimonialById(params.id);
  return {
    title: testimonial
      ? `Edit: ${testimonial.companyName} | Staff Admin`
      : 'Edit Testimonial | Staff Admin',
  };
}

export default async function EditTestimonialPage({ params }: Props) {
  const testimonial = await db.getTestimonialById(params.id);

  if (!testimonial) {
    notFound();
  }

  return <TestimonialEditor initialTestimonial={testimonial} isNew={false} />;
}
