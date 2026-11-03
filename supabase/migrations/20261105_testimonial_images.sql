-- Testimonial image bucket only. Apply the separate testimonials table migration
-- before deploying code that reads or writes testimonial records.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'testimonial-images', 'testimonial-images', true, 10485760,
    ARRAY['image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Active admins upload testimonial images"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'testimonial-images'
        AND agency_private.is_active_admin()
        AND name LIKE ('incoming/' || auth.uid()::text || '/%')
    );

CREATE POLICY "Active admins inspect testimonial images"
    ON storage.objects FOR SELECT TO authenticated
    USING (bucket_id = 'testimonial-images' AND agency_private.is_active_admin());

CREATE POLICY "Active admins delete testimonial images"
    ON storage.objects FOR DELETE TO authenticated
    USING (bucket_id = 'testimonial-images' AND agency_private.is_active_admin());
