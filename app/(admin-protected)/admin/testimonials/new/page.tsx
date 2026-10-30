import TestimonialEditor from '@/components/admin/TestimonialEditor';

export const metadata = {
  title: 'Add Client Testimonial | Staff Admin',
};

export default function NewTestimonialPage() {
  return <TestimonialEditor isNew={true} />;
}
