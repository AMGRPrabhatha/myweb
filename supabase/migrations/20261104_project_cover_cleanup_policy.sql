-- Signed upload creation uses the existing active-admin INSERT policy.
-- Restrict cleanup to an active admin's own temporary upload folder.
CREATE POLICY "Active admins inspect own pending project covers"
    ON storage.objects FOR SELECT TO authenticated
    USING (
        bucket_id = 'project-covers'
        AND agency_private.is_active_admin()
        AND name LIKE ('incoming/' || auth.uid()::text || '/%')
    );

CREATE POLICY "Active admins remove own pending project covers"
    ON storage.objects FOR DELETE TO authenticated
    USING (
        bucket_id = 'project-covers'
        AND agency_private.is_active_admin()
        AND name LIKE ('incoming/' || auth.uid()::text || '/%')
    );
