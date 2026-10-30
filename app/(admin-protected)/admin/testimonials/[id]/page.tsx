import { notFound } from 'next/navigation';
import TestimonialEditor from '@/components/admin/TestimonialEditor';
import { db } from '@/lib/db';

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const testimonials = await db.getAllTestimonials();
  const testimonial = testimonials.find((t) => t.id === params.id);
  return {
    title: testimonial
      ? `Edit: ${testimonial.companyName} | Staff Admin`
      : 'Edit Testimonial | Staff Admin',
  };
}

export default async function EditTestimonialPage({ params }: Props) {
  const testimonials = await db.getAllTestimonials();
  const testimonial = testimonials.find((t) => t.id === params.id);

  if (!testimonial) {
    notFound();
  }

  return <TestimonialEditor initialTestimonial={testimonial} isNew={false} />;
}
