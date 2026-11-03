INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'project-covers', 'project-covers', true, 10485760,
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Active admins upload project covers"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'project-covers' AND agency_private.is_active_admin());
