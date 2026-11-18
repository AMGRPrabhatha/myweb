-- Wedding and engagement invitation offer and optional portfolio concept.
-- Deploy its cover asset before applying these inserts.
-- This is a Design1X concept, not a commissioned client project.
-- No schema, policy, or existing rows are changed.
-- The plan row lets contact enquiries retain selected_plan_id as well as plan_snapshot.
INSERT INTO public.plans (
  id, slug, category, title, subtitle, pricing_mode, one_time_amount,
  currency, is_enquiry_based, inclusions, exclusions, turnaround_time,
  revisions, status, display_order
) VALUES (
  'plan-wedding-engagement-invitation',
  'wedding-engagement-invitation',
  'website',
  'Wedding & Engagement Digital Invitation',
  'A personalized, mobile-friendly invitation you can share with guests for your wedding or engagement.',
  'fixed',
  8000,
  'LKR',
  false,
  ARRAY[
    'Personalized digital invitation design',
    'Wedding or engagement event details and schedule',
    'Mobile-friendly layout and shareable invitation link',
    'Venue location and directions link',
    'One review round before delivery'
  ],
  ARRAY['Custom domain and hosting fees', 'Guest management or RSVP database', 'Printed invitations'],
  'Timeline agreed after your brief',
  '1 review round',
  'published',
  18
)
ON CONFLICT DO NOTHING;

INSERT INTO public.projects (
  id, slug, title, client_name, category, summary, is_concept,
  business_need, delivered_scope, results_summary, cover_image,
  status, display_order, published_at
) VALUES (
  'proj-wedding-engagement-invitation-concept',
  'wedding-engagement-digital-invitation',
  'Wedding & Engagement Digital Invitation',
  'Design1X concept',
  'Websites',
  'A personalized, mobile-friendly digital invitation concept for sharing wedding and engagement details with guests.',
  true,
  'Explore a polished way to share a celebration online, with event information and directions easy to find on any device.',
  ARRAY[
    'Elegant, personalized invitation design',
    'Mobile-friendly event details and schedule',
    'Shareable invitation link and venue directions',
    'Clear contact or RSVP handoff without a guest database'
  ],
  'Concept direction only. The final visual design, content and guest features are tailored to each event brief.',
  '/images/projects/wedding-engagement-invitation-concept.svg',
  'published',
  100,
  now()
)
ON CONFLICT (slug) DO NOTHING;
